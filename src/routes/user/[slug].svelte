<script context="module">
	
	let p;
	
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch, session, context }) {
		p = page;
		return { props: { } };
	}

</script>

<script>
	import { getApp } from "@firebase/app";
	import { getAuth } from "@firebase/auth";
	const firebaseApp = getApp();
	const auth = getAuth(firebaseApp);
</script>

{#if auth.currentUser != null && auth.currentUser.uid === p.params.slug}
	<h1>This is your user page, {auth.currentUser.displayName}</h1>
{:else}
	<h1>This is not your user page.</h1>
{/if}
<p>Page Info: {JSON.stringify(p)}</p>
