
<script lang="ts">
	import { main } from './main';
	import type { Choice } from '$lib/poll';
	import { fade } from 'svelte/transition';
	import ConfirmationButton from './ConfirmationButton.svelte';
	import Box from '$lib/Box.svelte';
	import Row from '$lib/Row.svelte';

	export let choice: Choice;
	export let vote = () => undefined;
	export let remove = () => undefined;
	export let edit: boolean;

	$: selected = choice && main.userData ? choice.getUsers().includes(main.userData.id) : false;
</script>

{#if choice && main.userData}
	{#if edit}
		<Box>
			<Row>
				<input type="text" placeholder="Enter choice.." bind:value={choice.text}>
				<ConfirmationButton onclick={remove} style={"background-color: var(--c_red);"}> X </ConfirmationButton>
			</Row>
		</Box>
	{:else}
		<Box
		style={selected ? "border-color: var(--c_green); border-width: 3pt;" : ""}
		onclick={vote}>
			<Row>		
				<span style="display: inline;">{choice.text}</span>
				<span style="display: inline; text-align: right;">{choice.getUsers().length} {choice.getUsers().length == 1 ? "vote." : "votes."}</span>
			</Row>
		</Box>
	{/if}
{/if}