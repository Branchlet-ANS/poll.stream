

<div class="content">
	<div class="title">No activities planned</div>
	<div class="divider"></div>
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
	.dot{
        height: 8em;
		width: 8em;
		background-color: #bbb;
		border-radius: 40%;
	}
	.buttonbar{
		margin: 0;
		width: 40%;
		margin: auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.button{
		display: inline-block;
		margin: 1em 1em;
		position: relative;
	}

	.button::after{
		content: '';
		height: 5px;
		width: 0;
		background: var(--c_accent);
		position: absolute;
		left: 0;
		bottom: -10px;
		transition: 0.3s;
	}
	.button:hover::after{
		width: 100%;
	}
</style>