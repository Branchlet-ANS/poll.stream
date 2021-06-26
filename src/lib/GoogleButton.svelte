
<script>
	import { main } from "$lib/main";
	import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
	let loggedIn = false;
	let name;

	// Source: https://firebase.google.com/docs/auth/web/manage-users
	onAuthStateChanged(main.auth, (user) => {
		if (user) {
			// User is signed in, see docs for a list of available properties
			// https://firebase.google.com/docs/reference/js/firebase.User
			var uid = user.uid;
			// ...
			name = user.displayName;
			loggedIn = true;
		} else {
			// User is signed out
			// ...
			loggedIn = false;
		}
	});

	// Source: https://firebase.google.com/docs/auth/web/google-signin
	function signIn() {
		var provider = new GoogleAuthProvider();
		signInWithPopup(main.auth, provider)
			.then((result) => {
				// This gives you a Google Access Token. You can use it to access the Google API.
				// The signed-in user info.
				var user = result.user;
				// ...

			}).catch((error) => {
				// Handle Errors here.
				var errorCode = error.code;
				var errorMessage = error.message;
				// The email of the user's account used.
				var email = error.email;
				// The firebase.auth.AuthCredential type that was used.
				var credential = error.credential;
				// ...
				console.log(errorCode, errorMessage, email, credential);
			});
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
