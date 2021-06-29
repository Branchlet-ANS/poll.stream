<script context="module">
	let pageInfo;
	let pollStreamId;
	let query;

	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch, session, context }) {
		pageInfo = page;
		pollStreamId = pageInfo.params.slug;
		query = pageInfo.query;

		return { props: { } };
	}
</script>

<script lang="ts">
	import { main, UserData } from '$lib/main';
	import { onAuthStateChanged } from '@firebase/auth';
	import { onMount } from 'svelte';
	import PollCard from '$lib/PollCard.svelte';
	import { Poll, PollStream } from '$lib/poll';
	import BasicButton from '$lib/BasicButton.svelte';
	import Column from '$lib/Column.svelte';
	import Row from '$lib/Row.svelte';
	import FloatingRow from '$lib/FloatingRow.svelte';
	import Box from '$lib/Box.svelte';
	import { goto } from '$app/navigation';
	import ConfirmationButton from '$lib/ConfirmationButton.svelte';
	
	let pollStream: PollStream;
	let index: number = 0;
	let edit: boolean = (query.get('edit') === 'true');
	
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
		edit = false;
	}

	onAuthStateChanged(main.auth, async (user) => {
		if (user) {
			await main.readUserData();
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

	function updateParent() {
		poll = poll;
	}

	$: poll = pollStream ? pollStream.getPolls()[index] : null;
	$: isAdmin = pollStream && main.userData ? main.userData.isAdminOf(pollStream.id) : false;
</script>

{#if pollStream === undefined}
	<p>Loading...</p>
{:else}
	{#if main.auth.currentUser != null}
		{#if !pollStream}
			<h2 style="padding-top: 100pt;">404: Found no poll with this ID.</h2>
			<p>It has either been deleted, or was never created.</p>
		{:else}
			<Row>
				<Column>
					{#if isAdmin && edit}
						<input type="text" class="title" placeholder="Enter title.." bind:value={pollStream.title}>
						<div class="title-split"></div>
						<textarea type="text" class="description" placeholder="Enter description.." bind:value={pollStream.description}></textarea>
						<br>
					{:else}
						<h2>{pollStream.title}</h2>
						<p>{pollStream.description}</p>
					{/if}
				</Column>
				{#if isAdmin}
					{#if edit}
						<BasicButton onclick={save} style="background-color:var(--c_green);">Save</BasicButton>
					{:else}
						<BasicButton onclick={() => edit = true}>Edit</BasicButton>
					{/if}
				{/if}
			</Row>
			
			{#if poll}
				<Column>
					<PollCard {poll} remove={() => removePoll(poll)} {edit} {updateParent}></PollCard>
				</Column>
			{/if}

			<FloatingRow style={"background-color: white; box-shadow: 0px -4px 10px var(--c_light);"}>
				<Box visible={false}>
					{#if index != 0}
						<BasicButton onclick={decrement}> Back </BasicButton>
					{/if}
				</Box>

				<Box visible={false}>
					{#if pollStream.getPolls().length}
						<h3>{index+1} of {pollStream.getPolls().length}</h3>
					{/if}
				</Box>
				
				<Box visible={false}>
					{#if isAdmin && edit && (pollStream.getPolls().length === 0 || index === pollStream.getPolls().length - 1)}
						<BasicButton onclick={addPoll}>+ New Question</BasicButton>
					{:else if index !== pollStream.getPolls().length - 1}
						<BasicButton onclick={increment}
						style={"background-color:var(--" + (!edit && poll && main.userData && poll.getUserChoices(main.userData.id).length ? "c_green" : "c_blue") + ");"}
						>
							Next
						</BasicButton>
					{:else}
						<ConfirmationButton onclick={() => goto("/")}
							style={"background-color:var(--" + (!edit && poll && main.userData && poll.getUserChoices(main.userData.id).length ? "c_green" : "c_blue") + ");"}
						> Complete </ConfirmationButton>
					{/if}
				</Box>
			</FloatingRow>
		{/if}
	{:else}
		<p style="margin-top: 100px">Sign in to access this poll stream!</p>
	{/if}
{/if}

<style>
	.title{
		margin: 20px 0 0 0;
		padding: 10px;
		font-size: 1.5em;
		height: 1em;
		width: 100%;
	}
	.title:focus{
		outline: none;
	}
	.description{
		margin: 20px;
		padding: 10px;
		font-size: 1em;
		height: 3em;
		width: 50%;
		border-color: var(--c_light);
		font-family: 'Roboto', sans-serif;
		border-width: 2px;
	}
</style>
