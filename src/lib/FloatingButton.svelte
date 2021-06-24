
<script>
	export let onclick = () => undefined;
</script>

<button class="float" on:click={onclick}>
	+ Add
</button>

<style>
	.float {
		font-size: large;
		font-weight: 500;
		
		position: fixed;
		width: 120px;
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

	.float:hover {
		/* box-shadow: 0px 4px 10px var(--c_dark); */
		bottom: 42px;
	}

	.float:active {
		box-shadow: none;
		bottom: 38px;
	}

</style>
