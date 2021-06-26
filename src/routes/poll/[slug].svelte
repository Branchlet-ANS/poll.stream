<script context="module">
	let pageInfo;
	let pollStreamId;

	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch, session, context }) {
		pageInfo = page;
		pollStreamId = pageInfo.params.slug;
		return { props: { } };
	}
</script>

<script>
	import PollStreamTile from '../../lib/PollStreamTile.svelte';
	import { Main } from '../../lib/main';
	import { onMount } from 'svelte';
	
	const main = new Main();
	let pollStream;

	onMount(async () => {
		pollStream = await main.readPollStream(pollStreamId);
	})
	
</script>

<h1>This is the poll page of {pollStreamId}</h1>
<p>Page Info: {JSON.stringify(pageInfo)}</p>

{#if pollStream != undefined}
	<PollStreamTile pollStream={pollStream}></PollStreamTile>
{/if}
