<script lang="ts">
	import { main } from '$lib/main';
	import { onAuthStateChanged } from '@firebase/auth';
	import type { PollStream } from '$lib/poll';
	import PollStreamTile from '$lib/PollStreamTile.svelte';
	import PollStreamTileContainer from '$lib/PollStreamTileContainer.svelte';
	import Button from '$lib/BasicButton.svelte';
	import FloatingButtonContainer from '$lib/FloatingButtonContainer.svelte';
	import { goto } from '$app/navigation';

	let pollStreams: Array<PollStream>;
	
	async function newPollStream() {
		var pollStream = await main.newPollStream();
		let edit = true;
		goto("/poll/" + pollStream.id + "?edit=true");
	}
	
	async function removePollStream(pollStream: PollStream) {
		main.deletePollStream(pollStream.id);
		pollStreams.splice(pollStreams.indexOf(pollStream), 1);
		pollStreams = pollStreams;
	}
	
	onAuthStateChanged(main.auth, async (user) => {
		if (user) {
			await main.readUserData();
			if (main.userData != null) {
				var result = [];
				var polls = main.userData.getPollStreamIds();
				for (let poll of polls) {
					var p = await main.readPollStream(poll);
					if (p != null) {
						result = [...result, p];
						pollStreams = result;
					}
				}
				pollStreams = result;
			}
		} else {
			pollStreams = [];
		}
	});
</script>

{#if pollStreams === undefined}
	<p style="margin-top: 100px">Loading...</p>
{:else}
	{#if main.auth.currentUser != null}
		{#if !pollStreams || pollStreams.length == 0}
			<p style="margin-top: 100px">No Poll Streams!</p>
			<p>Click the button below to add a stream.</p>
		{:else}	
			<PollStreamTileContainer>
				{#each pollStreams as pollStream}
					<PollStreamTile remove={() => removePollStream(pollStream)} pollStream={pollStream}></PollStreamTile>
				{/each}
			</PollStreamTileContainer>
		{/if}
		<FloatingButtonContainer>
			<Button onclick={newPollStream}>+ Create Poll Stream</Button>
		</FloatingButtonContainer>		
	{:else}
		<p style="margin-top: 100px">Sign in to access your poll streams!</p>
	{/if}
{/if}
