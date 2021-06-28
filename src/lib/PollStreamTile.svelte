<script lang="ts">
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';
	import type { PollStream } from './poll';

	export let remove = () => undefined;
	export let pollStream: PollStream;
</script>

{#if pollStream != undefined}
	<div class="container" in:fade>
		<div on:click={() => goto("/poll/" + pollStream.id)} style="cursor: pointer;">
			<h2>{pollStream.title ? pollStream.title : "Untitled Poll Stream"}</h2>
			<p>ID: {pollStream.id}</p>
		</div>
		<button on:click={remove}>Delete</button>
	</div>
{/if}

<style>
	.container {
		position: relative;
		padding: 20pt;
		padding-top: 5pt;
		margin-top: 15pt;
        margin-bottom: 5pt;
		margin-left: 5pt;
		margin-right: 5pt;

		border-style: solid;
		border-width: 2pt;
		border-radius: 10pt;
		border-color: var(--c_light);
	}

	.container:hover {
		box-shadow: 0px 4px 10px var(--c_light);
	}
</style>
