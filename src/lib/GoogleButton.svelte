
<script>
	import firebase from "firebase/app";
	import "firebase/auth";

	let loggedIn = false;
	let name;
	let uid;

	// Source: https://firebase.google.com/docs/auth/web/manage-users
	firebase.auth().onAuthStateChanged((user) => {
		if (user) {
			// User is signed in, see docs for a list of available properties
			// https://firebase.google.com/docs/reference/js/firebase.User
			uid = user.uid;
			// ...
			name = user.displayName;
			loggedIn = true;
			classList.add('signed-in');
		} else {
			// User is signed out
			// ...
			loggedIn = false;
		}
	});

	// Source: https://firebase.google.com/docs/auth/web/google-signin
	function signin() {
		var provider = new firebase.auth.GoogleAuthProvider();

		firebase.auth()
			.signInWithPopup(provider)
			.then((result) => {
				/** @type {firebase.auth.OAuthCredential} */
				var credential = result.credential;

				// This gives you a Google Access Token. You can use it to access the Google API.
				var token = credential.accessToken;
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
	function signout() {
		alert("no")
	}
</script>

{#if !loggedIn}
	<button class = b-signin on:click={signin}>
		Login with Google
	</button>
{:else}
	<button class = b-signout on:click={signout} style="padding:0 0">
		<p>Signed in as {name}</p>
	</button>
{/if}

<style>
	.b-signin {
		margin: 10px 0 0 0;
		font-size: large;
		font-weight: 500;
		min-width: 150px;
		min-height: 70px;
		padding: 0 30px;

		background-color: var(--c_blue);
		color: var(--c_white);
		border-radius: 50px;
		border: none;
		text-align: center;
		box-shadow: 0px 4px 10px var(--c_light);

		cursor: pointer;
	}
	.b-signout {
		font-style: italic;
		margin: 10px 0 0 0;
		font-size: large;
		font-weight: 500;
		min-width: 150px;
		min-height: 70px;
		padding: 0px 30px;
		transition: padding 0.3s;

		background-color: var(--c_blue);
		color: var(--c_white);
		border-radius: 50px;
		border: none;
		text-align: center;
		box-shadow: 0px 4px 10px var(--c_light);

		cursor: pointer;
	}
	.b-signout:signed-in{
		padding: 10px 30px;
	}

	button:hover {
		/* box-shadow: 0px 4px 10px var(--c_dark); */
		bottom: 42px;
	}

	button:active {
		box-shadow: none;
		bottom: 38px;
	}

</style>
