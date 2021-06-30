
<script lang="ts">
	import { main } from './main';
	import type { Choice, Listener } from '$lib/poll';
	import ConfirmationButton from './ConfirmationButton.svelte';
	import Box from '$lib/Box.svelte';
	import Row from '$lib/Row.svelte';
	import Column from '$lib/Column.svelte';
	import { onMount } from 'svelte';

	export let choice: Choice;
	export let vote = () => undefined;
	export let remove = () => undefined;
	export let edit: boolean;
	
	$: selected = choice && main.auth.currentUser ? choice.getUsers().includes(main.auth.currentUser.uid) : false;
	
	let userNames = [];
	let listener = {
		update(listenable: any) {
			this.getUserNames(choice);
		},
		async getUserNames(choice: Choice) {
			var result = [];
			for (let uid of choice.getUsers()) {
				var user = await main.readUserInfo(uid);
				if (user) {
					result = [...result, user.displayName];
				}
				else {
					result = [...result, "Anon"];
				}
				userNames = result;
			}
			userNames = result;
		}
	}

	onMount(() => {
		choice.addListener(listener);
		listener.getUserNames(choice);
	})

</script>

{#if choice}
	<Column>
		{#if edit}
			<Box>
				<Row>
					<input type="text" placeholder="Enter choice.." bind:value={choice.text}>
					<ConfirmationButton onclick={remove} style={"background-color: var(--c_red);"}> X </ConfirmationButton>
				</Row>
			</Box>
		{:else}
			<Box
			style={selected ? "border-color: var(--c_green); border-width: 3pt;" : ""}
			onclick={vote}>
				<Row>		
					<span style="display: inline;">{choice.text}</span>
					<span style="display: inline; text-align: right;">{choice.getUsers().length} {choice.getUsers().length == 1 ? "vote." : "votes."}</span>
				
				</Row>
			</Box>
		{/if}
		<Row>
			<span></span>
			<span style="font-size: small;">
				{#if main.auth.currentUser && !main.auth.currentUser.isAnonymous}
					<span>Voted on by: </span>
					{#each userNames as name}
						<span>{name}, </span>
					{/each}
				{/if}
			</span>
		</Row>
	</Column>
{/if}