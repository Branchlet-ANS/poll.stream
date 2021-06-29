
<script lang="ts">
	import Row from '$lib/Row.svelte';
	export let style: string = "";
</script>

<div class="float" {style}>
	<Row style={"justify-content: center;"}>
			<slot></slot>
	</Row>
</div>

<style>
	.float {
		position: fixed;
		bottom: 0px;
		left: 0px;
		width: 100vw;
	}
</style>