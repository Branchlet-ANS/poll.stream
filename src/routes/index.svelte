<script>
	import PollStreamTile from '../lib/PollStreamTile.svelte';
	import PollStreamTileContainer from '../lib/PollStreamTileContainer.svelte';
	import FloatingButton from '../lib/FloatingButton.svelte';
	import FloatingButtonContainer from '../lib/FloatingButtonContainer.svelte';
	import GoogleButton from '../lib/GoogleButton.svelte';

	import { PollStream, Poll, UserData } from '../lib/poll';
	
	import { initializeApp, getApps, getApp } from "@firebase/app"
	import { getFirestore, collection, setDoc, doc, getDoc, deleteDoc } from "@firebase/firestore";
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
	const auth = getAuth(firebaseApp);
	let userData;

	let pollStreams = [];
	let update = 0;
	
	async function appendStreams() {
		var pollStream = new PollStream();
		await writePollStream(pollStream)
		userData.addPoll(pollStream.getId());
		await writeUserData()
		await buildFromUserData()
	}

	async function removeStream(stream) {
		userData.removePoll(stream.getId());
		await writeUserData();
		await deletePollStream(stream.getId());
		await buildFromUserData()
	}
	
	async function writeUserData() {
		var user = auth.currentUser;
		if (user != null) {
			var data = {
				userData: JSON.stringify(userData)
			}
			await setDoc(doc(collection(db, "users"), auth.currentUser.uid), data)
		}
	}

	async function readUserData() {
		var document = await getDoc(doc(collection(db, "users"), auth.currentUser.uid));
		var data = document.data();
		if (data && Object.keys(data).includes("userData")) {
			return JSON.parse(data.userData, jsonProvider);
		}
		return null;
	}

	async function writePollStream(pollStream) {
		var data = { data: JSON.stringify(pollStream) };
		await setDoc(doc(collection(db, "polls"), pollStream.getId()), data);
	}

	async function readPollStream(id) {
		var document = await getDoc(doc(collection(db, "polls"), id));
		var data = document.data();
		if (data && Object.keys(data).includes("data")) {
			return JSON.parse(data.data, jsonProvider);
		}
		return null;
	}

	async function deletePollStream(id) {
		await deleteDoc(doc(db, "polls", id));
	}

	async function buildFromUserData() {
		pollStreams = [];
		var polls = userData.getPollIDs();
		for (let poll of polls) {
			var p = await readPollStream(poll);
			if (p != null) {
				pollStreams = [...pollStreams, p];
			}
		}
	}

	function jsonProvider(key, value) {
		if (typeof value === 'object') {
			switch(value.__type) {
				case 'PollStream':
					return assign(new PollStream(), value);
				case 'Poll':
					return assign(new Poll(""), value);
				case 'UserData':
					return assign(new UserData(""), value);
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

	getAuth(firebaseApp).onAuthStateChanged(async (user) => {
		if (user) {
			userData = await readUserData();
			if (userData == null) {
				userData = new UserData(user.uid);
			}
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
	{#if auth.currentUser != null && update > 0}
		<FloatingButton onclick={appendStreams}>+ Add</FloatingButton>
	{:else}
		<FloatingButton>Sign in to add.</FloatingButton>
	{/if}
</FloatingButtonContainer>
