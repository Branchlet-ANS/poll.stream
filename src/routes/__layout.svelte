
<script>
	import GoogleButton from '$lib/GoogleButton.svelte';
</script>

<body>
	<div class="container">
		<div class="rowcontainer">
			<h1 class="logo">	
				<a href="/">
					<img src="/poll-stream.svg" alt="Poll.stream Logo" style="display:inline; width:36pt;">
					Poll.stream
				</a>
			</h1>
			<GoogleButton></GoogleButton>
		</div>
		<slot></slot>
	</div>
</body>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

	:root {
		--c_blue: #0086E5;
		--c_blue_dark: #2152C2;
		--c_yellow: #FFBB33;
		--c_white: #FFFFFF;
		--c_dark: #122A3C;
		--c_light: #B4C5D3;
	}

	.container {
		display: flex;
  		flex-flow: column nowrap;
		align-items: center;
		width: 100%;
	}

	:global(.rowcontainer) {
		display: flex;
  		flex-flow: row nowrap;
		align-items: flex-start;
		justify-content: space-between;
		width: 90vw;
		max-width: 600px;
	}

	.logo a {
		text-align: center;
		font-family: 'Fredoka One', cursive;
		color: #0086E5;
		text-decoration: none;
	}

    body {
		font-family: 'Roboto', sans-serif;
        padding: 0;
		background-color: var(--c_white);
		color: var(--c_dark);
	}
</style>
