<script lang="ts">
	export let style: string = "";
</script>

<div class="column" style={style}>
	<slot></slot>
</div>

<style>
	.column {
		display: flex;
		flex-flow: column;
		justify-content: space-around;
		align-items: stretch;
		align-content: center;

		width: 100%;
		height: 100%;
	}
</style>
