
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
	<input class="question" type="text" placeholder="Enter question" bind:value={poll.question}>
	<div class="split"></div>

	<button on:click={remove}>Delete</button>
	<button on:click={save}>Save</button>

	<h4>Choices <button on:click={addChoice}> + </button></h4>

	{#each poll.getChoices() as choice}
		<ChoiceItem choice={choice} vote={() => vote(choice)} remove={() => removeChoice(choice)}></ChoiceItem>
	{/each}
</div>

<style>
	.container {
		position: relative;
		padding: 10pt;
		margin-top: 0pt;
        margin-bottom: 150pt;
		margin-left: 15pt;
		margin-right: 15pt;

		border-style: solid;
		border-width: 2pt;
		border-color: var(--c_dark);
		border-radius: 10pt;

		filter: blur(10px);
		transition: filter 0.3s;
		max-width: 100%;

		flex: 0 0 auto;
	}

	.container.appeardelay
	{
		filter: blur(0px);
	}

	.question{
		display: block;
		font-size: 1.5em;
		width: 100%;
		height: 1em;
	}

	.split{
		width: 100px;
		height: 3px;
		margin: 5px 10px 10px -3px;
		background-color: var(--c_light);
	}

	.container:hover {
		box-shadow: 0px 4px 10px var(--c_light);
	}

</style>
