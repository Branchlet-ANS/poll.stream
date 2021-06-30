
<script lang="ts">
	import { main } from '$lib/main';
	import { Choice, Poll } from '$lib/poll';
	import ChoiceItem from '$lib/ChoiceItem.svelte';
	import ConfirmationButton from '$lib/ConfirmationButton.svelte';
	import BasicButton from '$lib/BasicButton.svelte';
	import Box from './Box.svelte';
	import Column from '$lib/Column.svelte';
	import Row from '$lib/Row.svelte';
import { onMount } from 'svelte';

	export let poll: Poll;
	export let remove = () => undefined;
	export let edit: boolean = false;
	export let updateParent = () => undefined;

	async function addChoice() {
		poll.addChoice(new Choice());
		updateParent();
	}

	async function vote(choice: Choice) {
		var user = main.auth.currentUser.uid;
		if (choice.isVotedOnBy(user)) {
			poll.unvote(user, choice);
		}
		else {
			poll.vote(user, choice);
		}
		updateParent();
	}

	function removeChoice(choice: Choice) {
		poll.removeChoice(choice);
		updateParent();
	}
</script>

<Box>
	{#if edit}
		<Row>
			<Column>
				<input class="question" type="text" placeholder="Enter question.." bind:value={poll.question}>
				<Row>
					<BasicButton onclick={() => poll.singleChoice = !poll.singleChoice}>{poll.singleChoice ? "Single Choice" : "Multiple Choice"}</BasicButton>
				</Row>
			</Column>
			<ConfirmationButton onclick={remove} style={"background-color: var(--c_red);"}>Delete</ConfirmationButton>
		</Row>
	{:else}
		<h2>{poll.question}</h2>
		<div class="split"></div>
	{/if}
	{#each poll.getChoices() as choice (choice)}
		<ChoiceItem {choice} vote={() => vote(choice)} remove={() => removeChoice(choice)} {edit}></ChoiceItem>
	{/each}
	{#if edit}
		<Row>
			<div></div>
			<BasicButton onclick={addChoice}> + Add Choice</BasicButton>
		</Row>
	{/if}
</Box>

<style>
	.question{
		display: block;
		font-size: 1.5em;
		width: 100%;
		height: 1em;
	}

	.split{
		width: 80%;
		height: 3px;
		margin: 5px 10px 10px -3px;
		background-color: var(--c_light);
	}
</style>
