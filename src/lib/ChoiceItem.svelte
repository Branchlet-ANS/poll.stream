
<script lang="ts">
	import { main } from './main';
	import type { Choice } from '$lib/poll';
	
	export let choice: Choice;
	export let vote = () => undefined;
	export let remove = () => undefined;
	
	let appeardelay = false;
	setTimeout(function() {
		appeardelay = true
	}, 1);

</script>

{#if choice && main.userData}
	<div class="container" class:appeardelay>
		<input type="text" bind:value={choice.text}>
		<span>{choice.getUsers().length} {choice.getUsers().length == 1 ? "vote." : "votes."}</span>
		<button on:click={vote}>{choice.getUsers().includes(main.userData.id) ? "Unvote" : "Vote"}</button>
		<button on:click={remove}> X </button>
	</div>
{/if}

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
