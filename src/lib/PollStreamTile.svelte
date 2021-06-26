<script>
	export let remove;
	let appeardelay = false;
	setTimeout(function() {
	  appeardelay = true
  }, 1);
</script>

<div class="container" class:appeardelay>
	<h3>Poll Stream Name</h3>
	<span><slot></slot></span>
	<p>Poll Stream Details</p>
	<button on:click={remove}>Delete</button>
</div>


<style>
	.container {
		position: relative;
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

		filter: blur(10px);
		transition: filter 0.3s;
	}
	.container.appeardelay
	{
		filter: blur(0px);
	}

	.container:hover {
		box-shadow: 0px 4px 10px var(--c_light);
	}

</style>
