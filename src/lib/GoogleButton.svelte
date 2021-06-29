
<script context="module" lang="ts">
	import { main } from "$lib/main";
	import { onAuthStateChanged, GoogleAuthProvider, signInWithRedirect, signInAnonymously } from "@firebase/auth";
	import { setPersistence, browserLocalPersistence } from '@firebase/auth';
</script>

<script lang="ts">
	import { fade } from 'svelte/transition';
	import BasicButton from "$lib/BasicButton.svelte";
	

	let showSignOut: boolean = false;
	let imgSrc: string;

	// setPersistence(main.auth, browserLocalPersistence);

	onAuthStateChanged(main.auth, async (user) => {
		if (user) {
			imgSrc = user.photoURL;
		} else {
			imgSrc = null;
			await signInAnonymously(main.auth);
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
