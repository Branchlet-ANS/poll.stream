<script>
	function print() {
		alert("Hello World!")
	}
</script>

<div class="container" on:click={print}>
	<h3>Poll Stream Name</h3>
	<span><slot></slot></span>
	<p>Poll Stream Details</p>
</div>


<style>
	.container {
		padding: 10pt;
		margin-top: 15pt;
        margin-bottom: 0pt;
		margin-left: 0pt;
		margin-right: 0pt;
		
		border-style: solid;
		border-width: 2pt;
		border-color: var(--c_light);
		border-radius: 10pt;

		cursor: pointer;
	}

	.container:hover {
		box-shadow: 0px 4px 10px var(--c_light);
	}
</style>
