
<script lang="ts">
	export let onclick = () => undefined;
	export let style: string = "";
</script>


<button on:click={onclick} {style}>
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
		margin: 0;

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
