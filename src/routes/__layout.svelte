
<script>
	import GoogleButton from '$lib/GoogleButton.svelte';
</script>

<body>
	<h1 class="logo"><a href="/">Poll.stream</a></h1>

	<GoogleButton></GoogleButton>

    <slot></slot>
</body>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

	:root {
		--c_blue: #0086E5;
		--c_yellow: #FFBB33;
		--c_white: #FFFFFF;
		--c_dark: #244B69;
		--c_light: #B4C5D3;
	}

	.logo a {
		text-align: center;
		font-family: 'Fredoka One', cursive;
		color: #0086E5;
		text-decoration: none;
	}

    body {
		display: flex;
  		flex-flow: column;
		justify-content: center;
		align-items: center;

		font-family: 'Roboto', sans-serif;

        padding: 0;
        width: 100%;
        height: 100%;
		background-color: var(--c_white);
	}
</style>
