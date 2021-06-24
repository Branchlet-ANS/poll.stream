<script>
	import PollStreamTile from '../lib/PollStreamTile.svelte';
	import PollStreamTileContainer from '../lib/PollStreamTileContainer.svelte';
	import FloatingButton from '../lib/FloatingButton.svelte';
	let streams = [];

	function appendStreams() {
		streams = [...streams, streams.length.toString()];
	}
</script>

<PollStreamTileContainer>
	{#each streams as s}
		<PollStreamTile>{s}</PollStreamTile>
	{/each}
</PollStreamTileContainer>

<FloatingButton onclick={appendStreams}></FloatingButton>
