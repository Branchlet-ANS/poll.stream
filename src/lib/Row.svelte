<script lang="ts">
	export let style: string = "";
</script>

<div class="row" style={style}>
	<slot></slot>
</div>

<style>
	.row {
		display: flex;
		flex-flow: row;
		justify-content: space-between;
		align-items: flex-start;
		align-content: center;

		width: 100%;
		height: 100%;
	}
</style>