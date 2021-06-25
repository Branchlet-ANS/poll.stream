<script>
	import PollStreamTile from '../lib/PollStreamTile.svelte';
	import PollStreamTileContainer from '../lib/PollStreamTileContainer.svelte';
	import FloatingButton from '../lib/FloatingButton.svelte';
	import FloatingButtonContainer from '../lib/FloatingButtonContainer.svelte';
	import GoogleButton from '../lib/GoogleButton.svelte';

	import { PollStream, Poll } from '../lib/poll';
	
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

	let pollStreams = [];
	
	function appendStreams() {
		var user = getAuth(firebaseApp).currentUser;
		var uid = user == null ? "" : user.uid;
		pollStreams = [...pollStreams, new PollStream("id", uid)];
		setUserData()
	}

	/**
	* @param {any} stream
	*/
	function removeStream(stream) {
		pollStreams.splice(pollStreams.indexOf(stream), 1);
		pollStreams = pollStreams; // to notify Svelte
		setUserData()
	}

	function setUserData() {
		var user = getAuth(firebaseApp).currentUser;
		if (user != null) {
			var data = {
				pollStreams: JSON.stringify(pollStreams)
			}
			setDoc(doc(collection(db, "users"), getAuth(firebaseApp).currentUser.uid), data)
		}
	}

	async function getUserData() {
		var document = await getDoc(doc(collection(db, "users"), getAuth(firebaseApp).currentUser.uid));
		return document.data();
	}

	function jsonProvider(key, value) {
		if (typeof value === 'object') {
			switch(value.__type) {
				case 'PollStream':
					return assign(new PollStream("", ""), value);
				case 'Poll':
					return assign(new Poll(""), value);
				default:
					return value;
			}
		}
		else {
			return value;
		}
	}
	
	function assign(obj, value) {
		Object.assign(obj, value);
		return obj;
	}

	function buildFromUserData() {
		getUserData().then((data) => {
			// for (const [key, value] of Object.entries(data)) {
			// 	streams = [...streams, `data: ${key}: ${value}`];
			// }
			if (Object.keys(data).includes("pollStreams")) {
				pollStreams = JSON.parse(data.pollStreams, jsonProvider);
			}
		});
	}

	getAuth(firebaseApp).onAuthStateChanged((user) => {
		if (user) {
			buildFromUserData();
		} else {
			pollStreams = [];
		}
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
	<FloatingButton onclick={appendStreams}></FloatingButton>
</FloatingButtonContainer>
