<script lang="ts">
	import { fade } from "svelte/transition";
	import Column from '$lib/Column.svelte';

	export let style: string = "";
	export let onclick = () => undefined;
	export let visible: boolean = true;
</script>

<div class="box" style={visible ? style : "border:none; text-align:center; box-shadow:none; cursor:inherit;" + style} on:click={onclick} in:fade>
	<Column>
		<slot></slot>
	</Column>	
</div>

<style>
	.box {
		padding: 10pt;
		margin-top: 5pt;
		margin-bottom: 5pt;
		margin-left: 0pt;
		margin-right: 0pt;

		border-style: solid;
		border-color: var(--c_light);
		border-width: 2pt;
		border-radius: 10pt;

		cursor: pointer;

		flex: 1;
	}

	.box:hover {
		box-shadow: 0px 4px 10px var(--c_light);
	}
</style>