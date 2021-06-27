
<script lang="ts">
	import { main } from "$lib/main";
	import { onAuthStateChanged, GoogleAuthProvider, signInWithRedirect } from "@firebase/auth";
	let loggedIn = false;
	let name = "";

	onAuthStateChanged(main.auth, (user) => {
		if (user) {
			name = user.displayName;
			loggedIn = true;
		} else {
			loggedIn = false;
		}
	});

	function signIn() {
		var provider = new GoogleAuthProvider();
		signInWithRedirect(main.auth, provider);
	}

	function signOut() {
		main.auth.signOut();
	}
</script>
<div class = "dumb-container">
	<button class = b-google class:loggedIn on:click={loggedIn ? signOut : signIn}>
		<span class="b-google-text">{loggedIn ? ("Signed in as " + name) : "Sign in with Google" }</span>
	</button>
	<span class="cross">&#10006</span>
</div>

<style>
	.dumb-container{
		position: relative;
	    z-index: 10;
	}
	.b-google {
		position: relative;
		display:block;
		margin: 10px 0 0 0;
		font-size: large;
		font-weight: 500;
		width: 270px;
		min-height: 70px;
		padding: 10px 30px;
		white-space: nowrap;
		opacity: 1;
		transition: width 0.2s, opacity .5s;

		background-color: var(--c_blue);
		color: var(--c_white);
		border-radius: 50px;
		border: none;
		text-align: center;
		box-shadow: 0px 4px 10px var(--c_light);

		cursor: pointer;
		z-index: 0;
	}
	.b-google.loggedIn{
		width: 400px;
	}
	.b-google.loggedIn:hover{
		opacity: 0.4;
	}
	.b-google-text{
		margin-left: -100%;
	    margin-right: -100%;
	    text-align: center;
	}
	.cross{
	    text-align: center;
		position: absolute;
		color: var(--c_blue);
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
  		line-height: 2.9;
		font-size: 2em;
		vertical-align: middle;
		opacity: 1;
		z-index: -9;
	}

</style>
