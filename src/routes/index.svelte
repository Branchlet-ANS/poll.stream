<script lang="ts">
	import { main } from '$lib/main';
	import { onAuthStateChanged } from '@firebase/auth';
	import type { PollStream } from '$lib/poll';
	import PollStreamTile from '$lib/PollStreamTile.svelte';
	import Column from '$lib/Column.svelte';
	import BasicButton from '$lib/BasicButton.svelte';
	import FloatingRow from '$lib/FloatingRow.svelte';
	import { goto } from '$app/navigation';
	import Box from '$lib/Box.svelte';

	let pollStreams: Array<PollStream>;

	async function newPollStream() {
		var pollStream = await main.newPollStream();
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
		} else {
			pollStreams = [];
		}
	});
</script>

{#if pollStreams === undefined}
	<p style="margin-top: 100px">Loading...</p>
{:else}
	{#if !main.auth.currentUser || main.auth.currentUser.isAnonymous}
		<p style="margin-top: 100px">Sign in to create your own poll streams!</p>
	{:else}
		{#if !pollStreams || pollStreams.length == 0}
			<p style="margin-top: 100px">No Poll Streams!</p>
			<p>Click the button below to add a stream.</p>
		{:else}	
			<Column>
				{#each pollStreams as pollStream}
					<PollStreamTile remove={() => removePollStream(pollStream)} pollStream={pollStream}></PollStreamTile>
				{/each}
			</Column>
		{/if}
		<FloatingRow>
			<Box visible={false} style={"max-width:200px;"}>
				<BasicButton onclick={newPollStream}>+ Create Poll Stream</BasicButton>
			</Box>
		</FloatingRow>
	{/if}
{/if}
