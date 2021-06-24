<script>
	import PollStreamTile from '../lib/PollStreamTile.svelte';
	import PollStreamTileContainer from '../lib/PollStreamTileContainer.svelte';
	import FloatingButton from '../lib/FloatingButton.svelte';
	import FloatingButtonContainer from '../lib/FloatingButtonContainer.svelte';
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
	let app;
	if (!firebase.apps.length) {
		app = firebase.initializeApp(firebaseConfig);
	} else {
		app = firebase.app(); // if already initialized, use that one
	}
	let db = firebase.firestore(app);

	let streams = [];

	function appendStreams() {
		streams = [...streams, streams.length.toString()];
		setUserData()
	}

	function removeStream(stream) {
		streams.splice(streams.indexOf(stream), 1);
		streams = streams; // to notify Svelte
		setUserData()
	}

	function setUserData() {
		var data = {
			streams: streams
		}
		db.collection("users").doc(firebase.auth().currentUser.uid).set(data);
	}

	async function getUserData() {
		const doc = await db.collection("users").doc(firebase.auth().currentUser.uid).get();
		return doc.data();
	}

	function buildFromUserData() {
		getUserData().then((data) => {
			// for (const [key, value] of Object.entries(data)) {
			// 	streams = [...streams, `data: ${key}: ${value}`];
			// }
			if (Object.keys(data).includes("streams")) {
				streams = data.streams;
			}
		});
	}

	firebase.auth().onAuthStateChanged((user) => {
		if (user) {
			buildFromUserData();
		} else {
			streams = [];
		}
	});

</script>

<GoogleButton></GoogleButton>

{#if streams.length == 0}
	<p style="margin-top: 100px">No Poll Streams!</p>
	<p>Click the button below to add a stream.</p>
{/if}

<PollStreamTileContainer>
	{#each streams as s}
		<PollStreamTile remove={removeStream}>{s}</PollStreamTile>
	{/each}
</PollStreamTileContainer>

<FloatingButtonContainer>
	<FloatingButton onclick={appendStreams}></FloatingButton>
</FloatingButtonContainer>
