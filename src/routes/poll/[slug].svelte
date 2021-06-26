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

<h1>This is the poll page of {p.params.slug}</h1>
<p>Page Info: {JSON.stringify(p)}</p>

