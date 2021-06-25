
class PollStream {
	private id: String; // Unique identifier, used in url
	private owner: String;
	private users: Array<String> = []; // Users who have access
	private polls: Array<Poll> = [];

	public PollStream(id: String, owner: String) {
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
	
	public addUser(user: String) {
		this.users.push(user);
	}

	public addPoll(poll: Poll) {
		this.polls.push(poll);
	}

	public removePoll(poll: Poll) {
		this.polls.slice(this.polls.indexOf(poll), 1);
	}
}

class Poll {
	private question: String;
	private answers: Map<String, Array<String>>; // Map<Answer, Array<UserID>>
	private singleAnswer: boolean = true;

	public Poll(question: String) {
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
		var previousAnswer = this.getAnswer(user);
		if (previousAnswer == answer) {
			return;
		}
		if (previousAnswer != null && this.singleAnswer) {
			
		}
		this.answers.get(answer).push(user);
	}

	public removeAnswer(user: String, answer: String) {
		var users = this.answers.get(answer);
		users.splice(users.indexOf(user), 1);
	}

	public getAnswer(user: String) {
		for (const [answer, users] of this.answers.entries()) {
			if (users.includes(user)) {
				return answer;
			}
		}
		return null;
	}
}
