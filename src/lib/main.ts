import { PollStream, Poll, UserData } from './poll';
import { initializeApp, getApps, getApp } from "@firebase/app";
import type { FirebaseApp } from "@firebase/app";
import { getFirestore, collection, setDoc, doc, getDoc, deleteDoc } from "@firebase/firestore";
import type { FirebaseFirestore } from "@firebase/firestore";
import { getAuth } from '@firebase/auth';
import type { Auth } from '@firebase/auth';

export class Main {
	private readonly firebaseConfig = {
		apiKey: "AIzaSyCWhCF-poJ_kAFRk0pfFEKtOdW3aJNMuBQ",
		authDomain: "poll-stream.firebaseapp.com",
		projectId: "poll-stream",
		storageBucket: "poll-stream.appspot.com",
		messagingSenderId: "70389726858",
		appId: "1:70389726858:web:ce6df871a0d048ffc13773",
		measurementId: "G-M76SYZGGMZ"
	};
	public readonly firebaseApp: FirebaseApp;
	public readonly db: FirebaseFirestore;
	public readonly auth: Auth;
	private userData: UserData;

	constructor() {
		this.firebaseApp = getApps().length ? getApp() : initializeApp(this.firebaseConfig);
		this.db = getFirestore(this.firebaseApp);
		this.auth = getAuth(this.firebaseApp);
	}

	public getUserData() {
		return this.userData;
	}
	
	public async writeUserData() {
		var user = this.auth.currentUser;
		if (user != null) {
			var data = {
				userData: JSON.stringify(this.userData)
			}
			await setDoc(doc(collection(this.db, "users"), this.auth.currentUser.uid), data)
		}
	}

	public async readUserData() {
		var document = await getDoc(doc(collection(this.db, "users"), this.auth.currentUser.uid));
		var data = document.data();
		if (data && Object.keys(data).includes("userData")) {
			this.userData = JSON.parse(data.userData, jsonProvider);
		}
		else {
			this.userData = null;
		}
	}

	public async writePollStream(pollStream) {
		var data = { data: JSON.stringify(pollStream) };
		await setDoc(doc(collection(this.db, "polls"), pollStream.getId()), data);
	}

	public async readPollStream(id): Promise<PollStream> {
		var document = await getDoc(doc(collection(this.db, "polls"), id));
		var data = document.data();
		if (data && Object.keys(data).includes("data")) {
			return JSON.parse(data.data, jsonProvider);
		}
		return null;
	}

	public async deletePollStream(id) {
		await deleteDoc(doc(this.db, "polls", id));
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
