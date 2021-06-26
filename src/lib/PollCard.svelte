
<script lang="ts">
	import { main } from './main';
	import { Choice, Poll } from './poll';
	import ChoiceItem from './ChoiceItem.svelte';

	export let poll: Poll;
	export let remove = () => undefined;
	export let save = () => undefined;
	
	async function addChoice() {
		poll.addChoice(new Choice());
		poll = poll; // For Svelte
		console.log(poll.getChoices());
		
	}

	let appeardelay = false;
	setTimeout(function() {
		appeardelay = true
	}, 1);

	function vote(choice: Choice) {
		var user = main.auth.currentUser.uid;
		if (poll.getUserChoices(user).includes(choice)) {
			poll.unvote(user, choice);
		}
		else {
			poll.vote(user, choice);
		}
		poll = poll; // For Svelte
	}

	function removeChoice(choice: Choice) {
		poll.removeChoice(choice);
		poll = poll;
	}

</script>

<div class="container" class:appeardelay>
	<h3>Poll
		<button on:click={remove}>Delete</button>
		<button on:click={save}>Save</button>
	</h3>
	<p>Question: <input type="text" bind:value={poll.question}> ?</p>
	<h4>Choices <button on:click={addChoice}> + </button></h4>
	
	{#each poll.getChoices() as choice}
		<ChoiceItem choice={choice} vote={() => vote(choice)} remove={() => removeChoice(choice)}></ChoiceItem>
	{/each}
</div>

<style>
	.container {
		position: relative;
		padding: 10pt;
		margin-top: 15pt;
        margin-bottom: 0pt;
		margin-left: 0pt;
		margin-right: 0pt;

		border-style: solid;
		border-width: 2pt;
		border-color: var(--c_light);
		border-radius: 10pt;

		cursor: pointer;

		filter: blur(10px);
		transition: filter 0.3s;
	}
	.container.appeardelay
	{
		filter: blur(0px);
	}

	.container:hover {
		box-shadow: 0px 4px 10px var(--c_light);
	}

</style>
