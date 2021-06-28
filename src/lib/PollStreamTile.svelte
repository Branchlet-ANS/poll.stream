<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PollStream } from './poll';

	export let remove = () => undefined;
	export let pollStream: PollStream;
	
	let appeardelay = false;
	setTimeout(function() {
		appeardelay = true
	}, 1);

</script>

{#if pollStream != undefined}
	<div class="container" class:appeardelay>
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
		width: auto;

		border-style: solid;
		border-width: 2pt;
		border-color: var(--c_light);
		border-radius: 10pt;

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
