<script>
	import PollStreamTile from '../lib/PollStreamTile.svelte';
	import PollStreamTileContainer from '../lib/PollStreamTileContainer.svelte';
	import FloatingButton from '../lib/FloatingButton.svelte';
	import FloatingButtonContainer from '../lib/FloatingButtonContainer.svelte';
	import GoogleButton from '../lib/GoogleButton.svelte';

	import { PollStream } from '../lib/poll';
	import { Main } from '../lib/main';
	import { getAuth } from '@firebase/auth';
	
	const main = new Main();
	let pollStreams = [];
	let update = 0;

	async function appendStreams() {
		var pollStream = new PollStream();
		await main.writePollStream(pollStream)
		main.getUserData().addPoll(pollStream);
		await main.writeUserData()
		await buildFromUserData()
	}

	async function removeStream(stream) {
		main.getUserData().removePoll(stream);
		await main.writeUserData();
		await main.deletePollStream(stream.getId());
		await buildFromUserData()
	}

	async function buildFromUserData() {
		pollStreams = [];
		var polls = main.getUserData().getPollIDs();
		for (let poll of polls) {
			var p = await main.readPollStream(poll);
			if (p != null) {
				pollStreams = [...pollStreams, p];
			}
		}
	}
	
	getAuth(main.firebaseApp).onAuthStateChanged(async (user) => {
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

<!-- 
{#if auth.currentUser != null && update > 0}
	<button><a href={"/user/" + auth.currentUser.uid}>User Page</a></button>
{/if}
 -->

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
		<FloatingButton onclick={appendStreams}>+ Add</FloatingButton>
	{:else}
		<FloatingButton>Sign in to add.</FloatingButton>
	{/if}
</FloatingButtonContainer>
