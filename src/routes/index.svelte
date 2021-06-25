<script>
	import PollStreamTile from '../lib/PollStreamTile.svelte';
	import PollStreamTileContainer from '../lib/PollStreamTileContainer.svelte';
	import FloatingButton from '../lib/FloatingButton.svelte';
	import FloatingButtonContainer from '../lib/FloatingButtonContainer.svelte';
	import GoogleButton from '../lib/GoogleButton.svelte';

	import { initializeApp, getApps, getApp } from "@firebase/app"
	import { getFirestore, collection, setDoc, doc, getDoc } from "@firebase/firestore";
	import { getAuth } from '@firebase/auth';
	
	const firebaseConfig = {
		apiKey: "AIzaSyCWhCF-poJ_kAFRk0pfFEKtOdW3aJNMuBQ",
		authDomain: "poll-stream.firebaseapp.com",
		projectId: "poll-stream",
		storageBucket: "poll-stream.appspot.com",
		messagingSenderId: "70389726858",
		appId: "1:70389726858:web:ce6df871a0d048ffc13773",
		measurementId: "G-M76SYZGGMZ"
	};
	let firebaseApp;
	if (!getApps().length) {
		firebaseApp = initializeApp(firebaseConfig);
	} else {
		firebaseApp = getApp(); // if already initialized, use that one
	}
	const db = getFirestore(firebaseApp);

	let streams = [];

	function appendStreams() {
		streams = [...streams, streams.length.toString()];
		setUserData()
	}

	/**
	* @param {any} stream
	*/
	function removeStream(stream) {
		streams.splice(streams.indexOf(stream), 1);
		streams = streams; // to notify Svelte
		setUserData()
	}

	function setUserData() {
		var data = {
			streams: streams
		}
		setDoc(doc(collection(db, "users"), getAuth(firebaseApp).currentUser.uid), data)
	}

	async function getUserData() {
		var document = await getDoc(doc(collection(db, "users"), getAuth(firebaseApp).currentUser.uid));
		return document.data();
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

	getAuth(firebaseApp).onAuthStateChanged((user) => {
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
