<script lang="ts">
	import { main } from '$lib/main';
	import { onAuthStateChanged } from '@firebase/auth';
	import { PollStream } from '$lib/poll';

	import PollStreamTile from '$lib/PollStreamTile.svelte';
	import PollStreamTileContainer from '$lib/PollStreamTileContainer.svelte';
	import FloatingButton from '$lib/FloatingButton.svelte';
	import FloatingButtonContainer from '$lib/FloatingButtonContainer.svelte';
	import GoogleButton from '$lib/GoogleButton.svelte';

	let pollStreams: Array<PollStream> = [];
	let update: number = 0;
		
	async function appendStreams() {
		var pollStream = new PollStream();
		pollStream.onUpdate(() => main.writePollStream(pollStream));
		await main.writePollStream(pollStream)
		main.userData.addPollStreamId(pollStream.id);
		await buildFromUserData()
	}

	async function removeStream(pollStream: PollStream) {
		main.userData.removePollStreamId(pollStream.id);
		await buildFromUserData()
	}

	async function buildFromUserData() {
		pollStreams = [];
		var polls = main.userData.getPollStreamIds();
		for (let poll of polls) {
			var p = await main.readPollStream(poll);
			if (p != null) {
				pollStreams = [...pollStreams, p];
			}
		}
	}
	
	onAuthStateChanged(main.auth, async (user) => {
		if (user) {
			await main.readUserData();
			buildFromUserData();
		} else {
			pollStreams = [];
		}
		update++; // For Svelte
	});

</script>

<GoogleButton></GoogleButton>

{#if pollStreams.length == 0}
	<p style="margin-top: 100px">No Poll Streams!</p>
	<p>Click the button below to add a stream.</p>
{/if}

<PollStreamTileContainer>
	{#each pollStreams as pollStream}
		<PollStreamTile remove={() => removeStream(pollStream)} pollStream={pollStream}></PollStreamTile>
	{/each}
</PollStreamTileContainer>

<FloatingButtonContainer>
	{#if main.auth.currentUser != null && update > 0}
		<FloatingButton onclick={appendStreams}>+ Create Poll Stream</FloatingButton>
	{:else}
		<FloatingButton>Sign in to add.</FloatingButton>
	{/if}
</FloatingButtonContainer>
