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
	import Row from '$lib/Row.svelte';

	let pollStreams: Array<PollStream>;
	let view: number = 0;
	
	async function newPollStream() {
		var pollStream = await main.newPollStream();
		goto("/poll/" + pollStream.id + "?edit=true");
	}
	
	async function removePollStream(pollStream: PollStream) {
		if (view === 0) {
			main.deletePollStream(pollStream.id);
		}
		else if (view === 1) {
			main.userData.removeVisitedPollStreamId(pollStream.id)
		}
		pollStreams.splice(pollStreams.indexOf(pollStream), 1);
		pollStreams = pollStreams;
	}
	
	async function readPollStreams(ids: Array<string>) {
		var result = [];
		for (let id of ids) {
			var p = await main.readPollStream(id);
			if (p != null) {
				result = [...result, p];
				pollStreams = result;
			}
		}
		pollStreams = result;
	} 

	async function build() {
		if (main.userData) {
			if (view === 0) {
				await readPollStreams(main.userData.getPollStreamIds());
			}
			else if (view === 1) {
				await readPollStreams(main.userData.getVisitedPollStreamIds());
			}
		}
	}

	onAuthStateChanged(main.auth, async (user) => {
		if (user) {
			await main.readUserData();
			await build();
		}
		if (pollStreams === undefined) {
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
		<Column>
			<Row>
				<div>
					<BasicButton onclick={() => {view = 0; build();}}>My Poll Streams</BasicButton>
					<BasicButton onclick={() => {view = 1; build();}}>Visited</BasicButton>
				</div>
			</Row>
			{#if !pollStreams || pollStreams.length == 0}
				{#if view === 0}	
					<div style="margin-top: 100px">
						<p>No Poll Streams!</p>
						<p>Click the button below to add a stream.</p>
					</div>
				{:else if view === 1}
					<div style="margin-top: 100px">
						<p>No Poll Streams!</p>
						<p>Poll Streams you visit will appear here.</p>
					</div>
				{/if}
			{:else}	
				{#each pollStreams as pollStream}
					<PollStreamTile remove={() => removePollStream(pollStream)} pollStream={pollStream}></PollStreamTile>
				{/each}
			{/if}
		</Column>
		<FloatingRow>
			<Box visible={false} style={"max-width:200px;"}>
				<BasicButton onclick={newPollStream}>+ Create Poll Stream</BasicButton>
			</Box>
		</FloatingRow>
	{/if}
{/if}
