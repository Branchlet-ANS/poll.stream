
<script lang="ts">
	import { main } from "$lib/main";
	import { onAuthStateChanged, GoogleAuthProvider, signInWithRedirect } from "@firebase/auth";
	import BasicButton from "$lib/BasicButton.svelte";
	import { fade } from 'svelte/transition';
	
	let isExpanded: boolean = false;
	let imgSrc: string;

	onAuthStateChanged(main.auth, (user) => {
		if (user) {
			imgSrc = user.photoURL;
		} else {
			imgSrc = null;
		}
	});

	function signIn() {
		var provider = new GoogleAuthProvider();
		signInWithRedirect(main.auth, provider);
	}

	function signOut() {
		main.auth.signOut();
		isExpanded = false;
	}
</script>

<div class = "container">
	{#if isExpanded}
		<div in:fade on:mouseout={() => isExpanded = false}>
			<BasicButton onclick={signOut}>
				Sign out
			</BasicButton>
		</div>
	{:else}
		{#if imgSrc}
			<img src={imgSrc}
				alt="Google Profile"
				style="border-radius: 50%; width: 36pt;"
				on:click={() => isExpanded = !isExpanded}
				in:fade>
		{:else if imgSrc === null}
			<div in:fade>
				<BasicButton onclick={signIn}>
					Sign in
				</BasicButton>
			</div>
		{/if}
	{/if}
</div>

<style>
	.container {
		display: flex;
		flex-flow: column nowrap;
		align-items: flex-end;
		height: max-content;
		padding: 12pt;
	}

</style>
