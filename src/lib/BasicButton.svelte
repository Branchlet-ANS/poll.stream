
<script>
	export let onclick = () => undefined;
</script>

<button on:click={onclick}>
	<slot></slot>
</button>

<style>
	button {
		position: relative;
		cursor: pointer;

		text-align: center;
		font-size: medium;
		font-weight: 500;
		
		padding: 16px 24px;
		margin: 0 auto;

		background-color: var(--c_blue);
		color: var(--c_white);
		
		border: none;
		border-radius: 50px;
		box-shadow: 0px 4px 10px var(--c_light);
	}

	button:hover {
		background-color: var(--c_blue_dark);
	}
</style>
