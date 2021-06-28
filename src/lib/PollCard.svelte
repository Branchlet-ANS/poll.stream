
<script lang="ts">
	import { main } from './main';
	import { Choice, Poll } from './poll';
	import ChoiceItem from './ChoiceItem.svelte';
import { fade } from 'svelte/transition';

	export let isAdmin: boolean;
	export let poll: Poll;
	export let remove = () => undefined;
	export let save = () => undefined;

	async function addChoice() {
		poll.addChoice(new Choice());
		poll = poll; // For Svelte
	}

	function saveAndQuitEdit() {
		save();
		edit = false;
	}

	let edit: boolean = false;
	let appeardelay: boolean = false;

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

<div class="container" in:fade>
	{#if edit}
		<input class="question" type="text" placeholder="Enter question" bind:value={poll.question}>
		<div class="split"></div>
		<button on:click={remove}>Delete</button>
		<button on:click={saveAndQuitEdit}>Save</button>
	{:else}
		<h2>{poll.question}</h2>
		<div class="split"></div>
		{#if isAdmin}
			<button on:click={() => edit = !edit}>Edit</button>
		{/if}
	{/if}
	{#if edit}
		<h4>Choices <button on:click={addChoice}> + </button></h4>
	{/if}

	{#each poll.getChoices() as choice}
		<ChoiceItem choice={choice} vote={() => vote(choice)} remove={() => removeChoice(choice)} edit={edit}></ChoiceItem>
	{/each}
</div>

<style>
	.container {
		position: relative;
		padding: 20pt;
		padding-top: 5pt;
		margin-top: 15pt;
        margin-bottom: 15pt;
		margin-left: 5pt;
		margin-right: 5pt;
		
		border-style: solid;
		border-width: 2pt;
		border-radius: 10pt;
		border-color: var(--c_light);
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
