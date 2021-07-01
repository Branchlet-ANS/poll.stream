import { PollStream, Poll, Choice } from './poll';
import { initializeApp, getApps, getApp } from "@firebase/app";
import type { FirebaseApp } from "@firebase/app";
import { getFirestore, collection, setDoc, doc, getDoc, deleteDoc } from "@firebase/firestore";
import type { FirebaseFirestore } from "@firebase/firestore";
import { getAuth, onAuthStateChanged, User } from '@firebase/auth';

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
	public userData: UserData;
	public editMode: boolean = false;
	
	constructor() {
		this.firebaseApp = getApps().length ? getApp() : initializeApp(this.firebaseConfig);
		this.db = getFirestore(this.firebaseApp);
		this.auth = getAuth(this.firebaseApp);
		

		onAuthStateChanged(this.auth, async (user) => {
			if (user) {
				await main.readUserData();
			}
			else {
				
			}
		});
	}

	public async writeUserData(): Promise<void> {
		var user = this.auth.currentUser;
		if (user && !user.isAnonymous) {
			var data = {
				userData: JSON.stringify(this.userData),
				user: JSON.stringify(user)
			}
			await setDoc(doc(collection(this.db, "users"), user.uid), data)
			console.log("UserData written to database.");
		}
	}

	public async readUserData(): Promise<void> {
		var user = this.auth.currentUser;
		if (user && !user.isAnonymous) { 
			var document = await getDoc(doc(collection(this.db, "users"), user.uid));
			var data = document.data();
			if (data && Object.keys(data).includes("userData")) {
				this.userData = JSON.parse(data.userData, jsonProvider);
			}
			else {
				this.userData = new UserData();
			}
		}
		else {
			this.userData = null;
		}
	}

	public async readUserInfo(uid: string): Promise<User> {
		var document = await getDoc(doc(collection(this.db, "users"), uid));
		var data = document.data();
		if (data && Object.keys(data).includes("user")) {
			return JSON.parse(data.user);
		}
		return null;
	}
	
	public async writePollStream(pollStream: PollStream): Promise<void> {
		var map = new Map();
		for (let poll of pollStream.getPolls()) {
			for (let choice of poll.getChoices()) {
				map.set(choice, choice.listeners)
				delete choice.listeners;
			}
			map.set(poll, poll.listeners)
			delete poll.listeners;
		}
		var json = JSON.stringify(pollStream);
		for (let poll of pollStream.getPolls()) {
			for (let choice of poll.getChoices()) {
				choice.listeners = map.get(choice);
			}
			poll.listeners = map.get(poll);
		}

		var data = { data: json };
		await setDoc(doc(collection(this.db, "polls"), pollStream.id), data);
		console.log("PollStream written to database.");
	}

	public async readPollStream(id: string): Promise<PollStream> {
		var document = await getDoc(doc(collection(this.db, "polls"), id));
		var data = document.data();
		
		if (data && Object.keys(data).includes("data")) {
			return JSON.parse(data.data, jsonProvider);
		}
		if (this.userData) {
			this.userData.removePollStreamId(id);
		}
		return null;
	}

	public async deletePollStream(id: string): Promise<void> {
		if (!this.userData.isAdminOf(id)) {
			throw new Error("User tried to delete someone else's poll stream!");
		}
		await deleteDoc(doc(this.db, "polls", id));
		console.log("PollStream deleted from database.");
		await main.userData.removePollStreamId(id);
	}

	public async newPollStream(): Promise<PollStream> {
		var pollStream = new PollStream();
		pollStream.onUpdate(() => main.writePollStream(pollStream));
		await main.writePollStream(pollStream)
		await main.userData.addPollStreamId(pollStream.id);
		return pollStream;
	}
}

function jsonProvider(_key: string, value: any): any {
	if (typeof value === 'object') {
		switch(value.__type) {
			case 'PollStream':
				var pollStream: PollStream = assign(new PollStream(), value);
				pollStream.listenToPolls()
				pollStream.onUpdate(() => main.writePollStream(pollStream))
				return pollStream;
			case 'Poll':
				var poll: Poll = assign(new Poll(), value);
				poll.listenToChoices()
				return poll;
			case 'Choice':
				return assign(new Choice(), value);
			case 'UserData':
				return assign(new UserData(), value);
			default:
				return value;
		}
	}
	else {
		return value;
	}
}

function assign(obj: any, value: any): any {
	Object.assign(obj, value);
	return obj;
}

export const main = new Main();

export class UserData {
	private pollStreamIds: Array<string> = [];
	private visitedPollStreamIds: Array<string> = [];

	__type = 'UserData'; // For deserialization

	public getPollStreamIds(): Array<string> {
		return [...this.pollStreamIds];
	}

	public async addPollStreamId(pollStreamId: string): Promise<void> {
		if (this.pollStreamIds.includes(pollStreamId)) {
			return;
		}
		this.pollStreamIds.push(pollStreamId);
		await main.writeUserData();
	}

	public async removePollStreamId(pollStreamId: string): Promise<void> {
		this.pollStreamIds.splice(this.pollStreamIds.indexOf(pollStreamId), 1);
		await main.writeUserData();
	}

	public getVisitedPollStreamIds(): Array<string> {
		return [...this.visitedPollStreamIds];
	}

	public async addVisitedPollStreamId(pollStreamId: string): Promise<void> {
		if (this.visitedPollStreamIds.includes(pollStreamId)) {
			return;
		}
		this.visitedPollStreamIds.push(pollStreamId);
		await main.writeUserData();
	}

	public async removeVisitedPollStreamId(pollStreamId: string): Promise<void> {
		this.visitedPollStreamIds.splice(this.visitedPollStreamIds.indexOf(pollStreamId), 1);
		await main.writeUserData();
	}

	public isAdminOf(pollStreamId: string): boolean {
		return this.pollStreamIds.includes(pollStreamId);
	}
}
