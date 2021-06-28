
<script lang="ts">
	import { main } from './main';
	import type { Choice } from '$lib/poll';
	
	export let choice: Choice;
	export let vote = () => undefined;
	export let remove = () => undefined;
	export let edit: boolean;

	let appeardelay = false;
	setTimeout(function() {
		appeardelay = true
	}, 1);

	$: selected = choice && main.userData ? choice.getUsers().includes(main.userData.id) : false;
</script>

{#if choice && main.userData}
	{#if edit}
		<div class="container" class:appeardelay>
			<input type="text" bind:value={choice.text}>
			<button on:click={remove}> X </button>
		</div>
	{:else}
		<div class="container"
		class:appeardelay
		style={selected ? "border-color: var(--c_blue); border-width: 3pt;" : "border-color: var(--c_light);"}
		on:click={vote}>
			<span style="display: inline;">{choice.text}</span>
			<span style="display: inline; text-align: right;">{choice.getUsers().length} {choice.getUsers().length == 1 ? "vote." : "votes."}</span>
		</div>
	{/if}
{/if}

<style>
	.container {
		display: flex;
		flex-flow: row;
		justify-content: space-between;
		position: relative;
		padding: 10pt;
		margin-top: 15pt;
        margin-bottom: 0pt;
		margin-left: 0pt;
		margin-right: 0pt;

		border-style: solid;
		border-width: 2pt;
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
