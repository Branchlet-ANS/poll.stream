<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PollStream } from './poll';
	import ConfirmationButton from './ConfirmationButton.svelte';
	import Box from './Box.svelte';
	import Row from '$lib/Row.svelte';
	import Column from '$lib/Column.svelte';
	import { main } from './main';
	import ShareButton from '$lib/ShareButton.svelte';

	export let remove = () => undefined;
	export let pollStream: PollStream;
</script>

{#if pollStream != undefined}
	<Box>
		<Row>
			<Column>
				<div on:click={() => goto("/poll/" + pollStream.id)} style="cursor: pointer;">
					<h2>{pollStream.title ? pollStream.title : "Untitled Poll Stream"}</h2>
					<p>Description: {pollStream.description}</p>
				</div>
			</Column>
			<ShareButton pollStreamId={pollStream.id}></ShareButton>
			{#if main.userData && main.userData.isAdminOf(pollStream.id)}
				<ConfirmationButton onclick={remove} style={"background-color: var(--c_red);"}> Delete </ConfirmationButton>
			{:else}
				<ConfirmationButton onclick={remove} style={"background-color: var(--c_red);"}> Remove </ConfirmationButton>
			{/if}
		</Row>
	</Box>
{/if}