<script lang="ts">
	import { Poll, PollStream } from './poll';
	export let remove;
	export let pollStream: PollStream;

	function addPoll() {
		pollStream.addPoll(new Poll("Hello world?"))
		pollStream = pollStream; // For Svelte
	}

	$: polls = pollStream.getPolls();
</script>

<div class="container">
	<h2>PollStream: {pollStream.getId()}</h2>
	<button on:click={remove}>Delete</button>
	<button on:click={addPoll}>Add Poll</button>
	<a href={"/poll/" + pollStream.getId()}>Poll Page</a>
	<h3>Polls:</h3>
	{#each polls as poll}
		<p>{poll.getQuestion()}</p>
	{/each}
</div>

<style>
	.container {
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
	}

	.container:hover {
		box-shadow: 0px 4px 10px var(--c_light);
	}
</style>
