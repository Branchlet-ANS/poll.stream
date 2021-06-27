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

<script lang="ts">
	import { main } from '$lib/main';
	import { onAuthStateChanged } from '@firebase/auth';
	import { onMount } from 'svelte';
	import PollCard from '$lib/PollCard.svelte';
	import { Poll, PollStream } from '$lib/poll';
	import FloatingButton from '$lib/FloatingButton.svelte';
	import PollCardContainer from '$lib/PollCardContainer.svelte'
	
	let pollStream: PollStream;

	onMount(async () => {
		pollStream = await main.readPollStream(pollStreamId);
	})

	function addPoll() {
		pollStream.addPoll(new Poll());
		pollStream = pollStream;
	}

	function removePoll(poll: Poll) {
		pollStream.removePoll(poll)
		pollStream = pollStream;
	}

	function save() {
		main.writePollStream(pollStream);
	}

	onAuthStateChanged(main.auth, async (user) => {
		if (user) {
			pollStream = await main.readPollStream(pollStreamId);
		} else {
			pollStream = null;
		}
	});
	
</script>

{#if pollStream}
	<p>Title:</p>
	<input type="text" bind:value={pollStream.title}>
	<p>Description:</p>
	<input type="text" bind:value={pollStream.description}>
	<br>
	<button on:click={save}>Save</button>
	
	<PollCardContainer>
		{#each pollStream.getPolls() as poll}
			<PollCard poll={poll} remove={() => removePoll(poll)} save={save}></PollCard>
		{/each}
	</PollCardContainer>

	<FloatingButton onclick={addPoll}>+ New Poll</FloatingButton>
{/if}
