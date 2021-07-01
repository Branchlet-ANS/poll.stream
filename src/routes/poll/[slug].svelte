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
	import { main } from '$lib/main';
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
	let index: number;
	let edit: boolean = false;
	
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
			edit = edit || (main.userData.isAdminOf(pollStream.id) && query.get('edit') === 'true');
			if (!main.userData.isAdminOf(pollStreamId)) {
				main.userData.addVisitedPollStreamId(pollStreamId);
			}
		} else {
			pollStream = null;
		}
		index = pollStream.description ? -1 : 0;
	});

	function increment() {
		index++;
	}

	function decrement() {
		index--;
	}

	function updateParent() {
		poll = poll;
	}

	function share() {
		navigator.clipboard.writeText("https://poll.stream/poll/" + pollStreamId);
	}

	$: poll = pollStream ? pollStream.getPolls()[index] : null;
	$: isAdmin = pollStream && main.userData ? main.userData.isAdminOf(pollStream.id) : false;
</script>

{#if pollStream === undefined}
	<p>Loading...</p>
{:else}
	{#if !main.auth.currentUser}
		<p style="margin-top: 100px">Sign in to access this poll stream!</p>
	{:else}
		{#if !pollStream}
			<h2 style="padding-top: 100pt;">404: Found no poll with this ID.</h2>
			<p>It has either been deleted, or was never created.</p>
		{:else}
		
			<Row>
				{#if index === -1}
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
				{:else}
					<div></div>
				{/if}
				<div>
					<ConfirmationButton onfirstclick={share} secondText={"Copied url to clipboard."}>Share</ConfirmationButton>
					{#if isAdmin}
						{#if edit}
							<BasicButton onclick={save} style="background-color:var(--c_green);">Save</BasicButton>
						{:else}
							<BasicButton onclick={() => edit = true}>Edit</BasicButton>
						{/if}
					{/if}
				</div>
			</Row>
		

			{#if poll}
				<Column>
					<PollCard {poll} remove={() => removePoll(poll)} {edit} {updateParent}></PollCard>
				</Column>
			{/if}

			<FloatingRow style={"background-color: white; box-shadow: 0px -4px 10px var(--c_light);"}>
				<Box visible={false}>
					{#if index > 0}
						<BasicButton onclick={decrement}> Back </BasicButton>
					{:else if index === 0}
						{#if edit}
							<BasicButton onclick={decrement}> Write Description </BasicButton>
						{:else if pollStream.description}
							<BasicButton onclick={decrement}> View Description </BasicButton>
						{/if}
					{/if}
				</Box>

				<Box visible={false}>
					{#if pollStream.getPolls().length}
						<span style="margin-top:10pt; font-size: large; font-weight: 700;">{index+1} of {pollStream.getPolls().length}</span>
					{/if}
				</Box>
				
				<Box visible={false}>
					{#if isAdmin && edit && (pollStream.getPolls().length === 0 || index === pollStream.getPolls().length - 1)}
						<BasicButton onclick={addPoll}>+ New Question</BasicButton>
					{:else if index !== pollStream.getPolls().length - 1}
						<BasicButton onclick={increment}
						style={"background-color:var(--" + (!edit && poll && main.auth.currentUser && poll.getUserChoices(main.auth.currentUser.uid).length ? "c_green" : "c_blue") + ");"}
						>
							Next
						</BasicButton>
					{:else}
						<BasicButton onclick={() => goto("/")}
							style={"background-color:var(--" + (!edit && poll && main.auth.currentUser && poll.getUserChoices(main.auth.currentUser.uid).length ? "c_green" : "c_blue") + ");"}
						> Complete </BasicButton>
					{/if}
				</Box>
			</FloatingRow>
		{/if}
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
