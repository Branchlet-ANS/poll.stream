
<script>
	export let onclick = () => undefined;
</script>

<button class="float" on:click={onclick}>
	Create Poll Stream
</button>

<style>
	.float {
		position: fixed;
		width: 130px;
		height: 60px;
		bottom: 40px;
		right: 50% - 30px;

		background-color: var(--c_blue);
		color: var(--c_white);
		border-radius: 50px;
		border: none;
		text-align: center;
		box-shadow: 0px 4px 10px var(--c_light);

		cursor: pointer;
	}

	.float:active {
		box-shadow: none;
		bottom: 38px;
	}
</style>
