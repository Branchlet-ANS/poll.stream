import { v4 as uuidv4 } from 'uuid';

export interface Listener {
	update(listenable: any): void;
}

export interface Listenable {
	addListener(listener: Listener): void;
	removeListener(listener: Listener): void;
	notifyListeners(): void;
}

export class PollStream implements Listener {
	public readonly id: string; // Unique identifier, used in url
	private polls: Array<Poll> = [];
	public __type: string = 'PollStream'; // For deserialization
	public title: string = "";
	public description: string = "";
	private onUpdateFunction: CallableFunction = () => undefined;

	constructor() {
		this.id = uuidv4();
		this.addPoll(new Poll());
	}

	public getPolls() {
		return [...this.polls];
	}
	
	public addPoll(poll: Poll) {
		poll.addListener(this);
		this.polls = [...this.polls, poll];
		this.update();
	}
	
	public removePoll(poll: Poll) {
		poll.removeListener(this);
		this.polls.splice(this.polls.indexOf(poll), 1);
		this.update();
	}

	public async update() {
		await this.onUpdateFunction();
	}
	
	public onUpdate(onUpdateFunction: CallableFunction) {
		this.onUpdateFunction = onUpdateFunction;
	}

	public listenToPolls() {
		for (let poll of this.polls) {
			poll.addListener(this);
		}
	}
}

export class Poll implements Listener, Listenable {
	public question: string;
	private choices: Array<Choice> = [];
	public singleChoice: boolean = true;
	public listeners: Array<Listener> = [];
	public __type: string = 'Poll'; // For deserialization
	
	constructor() {
		this.addChoice(new Choice());
		this.addChoice(new Choice());
	}

	public getChoices() {
		return [...this.choices];
	}

	public addChoice(choice: Choice) {
		choice.addListener(this);
		this.choices.push(choice);
		this.notifyListeners();
	}

	public removeChoice(choice: Choice) {
		choice.removeListener(this);
		this.choices.splice(this.choices.indexOf(choice), 1);
		this.notifyListeners();
	}

	public vote(user: string, choice: Choice) {
		var userChoices = this.getUserChoices(user);
		if (this.singleChoice && userChoices.length != 0) {
			this.unvote(user, userChoices[0]);
		}
		choice.vote(user);
	}
	
	public unvote(user: string, choice: Choice) {
		choice.unvote(user);
	}

	public getUserChoices(user: string) {
		var userChoices = [];
		for (let choice of this.choices) {
			if (choice.isVotedOnBy(user)) {
				userChoices.push(choice);
			}
		}
		return userChoices;
	}

	public update() {
		this.notifyListeners();
	}

	public listenToChoices() {
		for (let choice of this.choices) {
			choice.addListener(this);
		}
	}

	public addListener(listener: Listener): void {
		if (this.listeners.includes(listener)) {
			return;
		}
		this.listeners.push(listener);
	}

	public removeListener(listener: Listener): void {
		this.listeners.splice(this.listeners.indexOf(listener), 1);
	}

	public notifyListeners() {
		for (const listener of this.listeners) {
			listener.update(this);
		}
	}
}

export class Choice implements Listenable {
	public text: string;
	private users: Array<string> = [];
	public listeners: Array<Listener> = [];
	public __type: string = 'Choice';
	
	public vote(user: string): void {
		if (this.users.includes(user)) {
			return;
		}
		this.users.push(user);
		this.notifyListeners();
	}

	public unvote(user: string): void {
		this.users.splice(this.users.indexOf(user), 1);
		this.notifyListeners();
	}

	public isVotedOnBy(user: string): boolean {
		return this.users.includes(user);
	}

	public getUsers() {
		return [...this.users];
	}
	
	public addListener(listener: Listener): void {
		if (this.listeners.includes(listener)) {
			return;
		}
		this.listeners = [listener, ...this.listeners];
	}

	public removeListener(listener: Listener): void {
		this.listeners.splice(this.listeners.indexOf(listener), 1);
	}
	
	public notifyListeners() {
		for (let listener of this.listeners) {
			listener.update(this);
		}
	}
}