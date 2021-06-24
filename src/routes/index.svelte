<script>
	import PollStreamTile from '../lib/PollStreamTile.svelte';
	import PollStreamTileContainer from '../lib/PollStreamTileContainer.svelte';
	import FloatingButton from '../lib/FloatingButton.svelte';
	import GoogleButton from '../lib/GoogleButton.svelte';

	import firebase from "firebase/app";

	const firebaseConfig = {
		apiKey: "AIzaSyCWhCF-poJ_kAFRk0pfFEKtOdW3aJNMuBQ",
		authDomain: "poll-stream.firebaseapp.com",
		projectId: "poll-stream",
		storageBucket: "poll-stream.appspot.com",
		messagingSenderId: "70389726858",
		appId: "1:70389726858:web:ce6df871a0d048ffc13773",
		measurementId: "G-M76SYZGGMZ"
	};
	if (!firebase.apps.length) {
		firebase.initializeApp(firebaseConfig);
	} else {
		firebase.app(); // if already initialized, use that one
	}
	
	let streams = [];

	function appendStreams() {
		streams = [...streams, streams.length.toString()];
	}
</script>

<GoogleButton></GoogleButton>

{#if streams.length == 0}
	<p style="margin-top: 100px;">No Poll Streams!</p>
	<p>Click the button below to add a stream.</p>
{/if}

<PollStreamTileContainer>
	{#each streams as s}
		<PollStreamTile>{s}</PollStreamTile>
	{/each}
</PollStreamTileContainer>

<FloatingButton onclick={appendStreams}></FloatingButton>
