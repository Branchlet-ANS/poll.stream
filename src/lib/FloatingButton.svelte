
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
		bottom: 100px;
		padding: 20px 40px;
		transition: bottom 0.3s, padding 0.3s;
		margin: 0 auto;

		background-color: var(--c_blue);
		color: var(--c_white);
		border-radius: 50px;
		border: none;
		text-align: center;
		box-shadow: 0px 4px 10px var(--c_light);

		cursor: pointer;
	}

	.float:hover {
		bottom: 90px;
		padding: 30px 50px;
	}

</style>
