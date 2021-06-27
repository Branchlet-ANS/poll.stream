
<div class="container">
	<slot></slot>
</div>

<style>
	.container {
		width: 400px;
		flex-grow: 1;
		display: flex;
  		flex-flow: row;
		justify-content: center;
		align-items: center;
		position: fixed;
		bottom: 40px;
	}
</style>
