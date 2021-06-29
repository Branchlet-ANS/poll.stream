
<script lang="ts">
	import { main } from "$lib/main";
	import { fade } from 'svelte/transition';
	import BasicButton from "$lib/BasicButton.svelte";
	import { onAuthStateChanged, GoogleAuthProvider, signInWithRedirect } from "@firebase/auth";
	
	let showSignOut: boolean = false;
	let imgSrc: string;

	onAuthStateChanged(main.auth, (user) => {
		if (user) {
			imgSrc = user.photoURL;
		} else {
			imgSrc = null;
		}
	});

	async function signIn() {
		var provider = new GoogleAuthProvider();
		await signInWithRedirect(main.auth, provider);
	}

	async function signOut() {
		await main.auth.signOut();
		showSignOut = false;
	}

	function onProfileClick() {
		showSignOut = true;
		setTimeout(() => showSignOut = false, 2000);
	}
</script>

{#if showSignOut}
	<div in:fade>
		<BasicButton onclick={signOut} style="background-color:var(--c_yellow); color:var(--c_dark);">
			Sign out
		</BasicButton>
	</div>
{:else}
	{#if imgSrc}
		<div>
			<img src={imgSrc}
				alt="Google Profile"
				style="border-radius: 50%; width: 36pt; cursor:pointer;"
				on:click={onProfileClick}
				in:fade>
		</div>
	{:else if imgSrc === null}
		<div in:fade on:click={signIn}>
			<BasicButton>
				Sign in
			</BasicButton>
		</div>
	{/if}
{/if}
