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
	import FloatingButtonContainer from '$lib/FloatingButtonContainer.svelte';
	import PollCardContainer from '$lib/PollCardContainer.svelte';

	let pollStream: PollStream;
	let index: number = 0;

	onMount(async () => {
		pollStream = await main.readPollStream(pollStreamId);
	})

	function addPoll() {
		pollStream.addPoll(new Poll());
		pollStream = pollStream;
		increment();
	}

	function removePoll(poll: Poll) {
		pollStream.removePoll(poll)
		pollStream = pollStream;
		decrement();
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
		index = 0;
	});

	function increment() {
		var len = pollStream.getPolls().length;
		if (len > 1) {
			index = Math.min(index+1, len-1);
		}
	}

	function decrement() {
		index = Math.max(index-1, 0);
	}

	$: poll = pollStream ? pollStream.getPolls()[index] : null;

</script>

{#if pollStream === undefined}
	<p>Loading...</p>
{:else}
	{#if main.auth.currentUser != null}
		{#if !pollStream}
			<h2 style="padding-top: 100pt;">404: Found no poll with this ID.</h2>
			<p>It has either been deleted, or was never created.</p>
		{:else}
			<p>Title:</p>
			<input type="text" bind:value={pollStream.title}>
			<p>Description:</p>
			<input type="text" bind:value={pollStream.description}>
			<br>
			<button on:click={save}>Save</button>
			
			{#if pollStream.getPolls().length}
				<h3>Question {index+1} of {pollStream.getPolls().length}</h3>
			{/if}

			{#if poll}
				<PollCardContainer>
					<PollCard poll={poll} remove={() => removePoll(poll)} save={save}></PollCard>
				</PollCardContainer>
			{/if}
			
			<FloatingButtonContainer>
				{#if index != 0}
					<FloatingButton onclick={decrement}> Back </FloatingButton>
				{/if}
				{#if pollStream.getPolls().length === 0 || index === pollStream.getPolls().length-1}
					<FloatingButton onclick={addPoll}>+ New Question</FloatingButton>
				{:else}
					<FloatingButton onclick={increment}> Next </FloatingButton>
				{/if}
			</FloatingButtonContainer>
		{/if}
	{:else}
		<p style="margin-top: 100px">Sign in to access this poll stream!</p>
	{/if}
{/if}
