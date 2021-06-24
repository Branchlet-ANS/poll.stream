<script>
	import PollStreamTile from '../lib/PollStreamTile.svelte';
	import PollStreamTileContainer from '../lib/PollStreamTileContainer.svelte';
	import FloatingButton from '../lib/FloatingButton.svelte';
	let streams = [];

	function appendStreams() {
		streams = [...streams, streams.length.toString()];
	}
</script>

{#if streams.length == 0}
	<p style="margin-top: 100px;">No Poll Streams!</p>
	<p>Click the button below to add a stream.</p>
{/if}

<PollStreamTileContainer>
	{#each streams as s}
		<PollStreamTile>{s}</PollStreamTile>
	{/each}
</PollStreamTileContainer>

<FloatingButton onclick={appendStreams}></FloatingButton>
