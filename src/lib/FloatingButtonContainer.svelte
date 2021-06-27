
<div class="container">
	<slot></slot>
</div>

<style>
	.container {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		position: fixed;
		justify-content: space-between;
		bottom: 40px;
		width: 400px;
		max-width: 90vw;
	}
</style>