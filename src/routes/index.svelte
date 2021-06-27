<script lang="ts">
	import { main } from '$lib/main';
	import { onAuthStateChanged } from '@firebase/auth';
	import { PollStream } from '$lib/poll';

	import PollStreamTile from '$lib/PollStreamTile.svelte';
	import PollStreamTileContainer from '$lib/PollStreamTileContainer.svelte';
	import FloatingButton from '$lib/FloatingButton.svelte';
	import FloatingButtonContainer from '$lib/FloatingButtonContainer.svelte';
import { onMount } from 'svelte';

	let pollStreams: Array<PollStream>;
	let update: number = 0;
		
	async function appendStreams() {
		var pollStream = new PollStream();
		pollStream.onUpdate(() => main.writePollStream(pollStream));
		main.writePollStream(pollStream)
		main.userData.addPollStreamId(pollStream.id);
		pollStreams = [...pollStreams, pollStream];
	}

	async function removeStream(pollStream: PollStream) {
		main.deletePollStream(pollStream.id);
		main.userData.removePollStreamId(pollStream.id);
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
					<PollStreamTile remove={() => removeStream(pollStream)} pollStream={pollStream}></PollStreamTile>
				{/each}
			</PollStreamTileContainer>
		{/if}
		<FloatingButtonContainer>
			<FloatingButton onclick={appendStreams}>+ Create Poll Stream</FloatingButton>
		</FloatingButtonContainer>		
	{:else}
		<p style="margin-top: 100px">Sign in to access your poll streams!</p>
	{/if}
{/if}
