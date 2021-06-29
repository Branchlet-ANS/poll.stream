
<script>
	import GoogleButton from '$lib/GoogleButton.svelte';
	import Row from '$lib/Row.svelte';
	import Column from '$lib/Column.svelte';
	import Box from '$lib/Box.svelte';
</script>

<body>
	<Column style="max-width: 100vw; align-items: center;">
		<Column style="max-width: 800px;">
			<Row>
				<h1 class="logo">	
					<a href="/">
						<img src="/poll-stream.svg" alt="Poll.stream Logo" style="display:inline; width:36pt;">
						Poll.stream
					</a>
				</h1>
				<GoogleButton></GoogleButton>
			</Row>

			<slot></slot>
			
			<Box visible={false}><div style="height:100px;"></div></Box>
		</Column>
	</Column>
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
		--c_red: #f64882;
		--c_green: #19b655;
	}
	
	.logo a {
		text-align: center;
		font-family: 'Fredoka One', cursive;
		color: var(--c_blue);
		text-decoration: none;
	}

	.logo a:hover {
		color: var(--c_blue_dark);
	}

    body {
		font-family: 'Roboto', sans-serif;
        padding: 0;
		background-color: var(--c_white);
		color: var(--c_dark);
	}

	:global(input) {
		margin: 0;
		padding-top: 10pt;
		font-size: 1em;
		max-width: 70%;
		flex: 1;
		border: none;
		border-bottom: 2px solid var(--c_dark);
	}

	:global(input:focus){
		outline: none;
	}

</style>
