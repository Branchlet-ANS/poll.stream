
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
		} else {
			// User is signed out
			// ...
			loggedIn = false;
		}
	});

	// Source: https://firebase.google.com/docs/auth/web/google-signin
	function signIn() {
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

	function signOut() {
		firebase.auth().signOut();
	}
</script>

{#if !loggedIn}
	<button on:click={signIn}>
		Login with Google
	</button>
{:else}
	<p>Signed in as {name}</p>
	<button on:click={signOut}>Sign out</button>
{/if}
