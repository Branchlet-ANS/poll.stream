<script>
	let answer_count = 3;
	alert("dumb ass");

	function handleClick() {
		answer_count += 1;
	}
</script>


<div class="content">
	<div class="title">New poll</div>
	<div class="divider"></div>
	<button class="poll-edit" on:click={handleClick}> counting {answer_count}</button>
	<nav class="buttonbar">
		<div class="button">
			<a href="#/poll">
				<div class="dot">
					<img src="/images/poll.png" alt="poll" style="width:2em;height:2em;margin:auto;">
				</div>
			</a>
		</div>
		<div class="button">
			<div class="dot">
				<img src="/images/calendar.png" alt="calendar" style="width:2em;height:2em;margin:auto;">
			</div>
		</div>
	</nav>

</div>

<style>
	.title{
        font-family: Tahoma, sans-serif;
		color: rgb(255, 255, 255);
		text-align: center;
        font-size: 2em;
	}
	.content{
		width: 50%;
        margin: auto;
	}
	.divider{
        margin: 0.5em 0 0 0;
		width: 100%;
		height: 0.15em;
		background-color: rgb(255, 255, 255);
	}
	.poll-edit{
		width: 4em;
		height: 4em;
	}

</style>
