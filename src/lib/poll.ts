
export class PollStream {
	private id: String; // Unique identifier, used in url
	private owner: String;
	private users: Array<String> = []; // Users who have access
	private polls: Array<Poll> = [];
	__type = 'PollStream'; // For deserialization

	constructor(id: String, owner: String) {
		this.id = id; // generateId() ?
		this.owner = owner;
		this.addUser(owner);
	}

	public getOwner() {
		return this.owner;
	}

	public getId() {
		return this.id;
	}

	public getUsers() {
		return [...this.users];
	}

	public getPolls() {
		return [...this.polls];
	}

	public addUser(user: String) {
		this.users.push(user);
	}

	public addPoll(poll: Poll) {
		this.polls = [...this.polls, poll];
	}

	public removePoll(poll: Poll) {
		this.polls.slice(this.polls.indexOf(poll), 1);
		this.polls = this.polls; // for Svelte
	}
}

export class Poll {
	private question: String;
	private answers: Map<String, Array<String>>; // Map<Answer, Array<UserID>>
	private singleAnswer: boolean = true;
	__type = 'Poll'; // For deserialization
	
	constructor(question: String) {
		this.question = question;
	}

	public setQuestion(question: String) {
		this.question = question;
	}

	public getQuestion() {
		return this.question;
	}

	public getAnswers() {
		return new Map(this.answers);
	}

	public addOption(answer: String) {
		this.answers.set(answer, []);
	}

	public removeOption(answer: String) {
		this.answers.delete(answer);
	}

	public addAnswer(user: String, answer: String) {
		var previousAnswers = this.getAnswersOfUser(user);
		if (previousAnswers.includes(answer)) {
			return;
		}
		if (this.singleAnswer && previousAnswers.length != 0) {
			this.removeAnswer(user, previousAnswers[0]);
		}
		this.answers.get(answer).push(user);
	}
	
	public removeAnswer(user: String, answer: String) {
		var users = this.answers.get(answer);
		users.splice(users.indexOf(user), 1);
	}

	public getAnswersOfUser(user: String) {
		var answers = [];
		for (const [answer, users] of this.answers.entries()) {
			if (users.includes(user)) {
				answers.push(answer);
			}
		}
		return answers;
	}
}
