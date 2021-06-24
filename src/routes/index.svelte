
<div class="content">
	<div class="title">Welcome</div>
	<div class="divider"></div>
	<nav class="buttonbar">
		<div class="button">
			<a href="/poll_page">
				<svg class="figure" width="100" height="100" viewBox="-3 -3 106 106">
					<g id="figure-svg">
						<rect class = figure-outline
						stroke="white"
						stroke-width="4"
						fill="transparent"
						width="100"
						height="100"
						rx="40"/>
					</g>
				</svg>
				<img src="/images/poll.png" alt="poll" style="width:2em;height:2em;margin:auto;">
			</a>
		</div>
		<div class="button">
			<svg class="figure" width="100" height="100" viewBox="-3 -3 106 106">
				<g id="figure-svg">
					<rect class = figure-outline
					stroke="white"
					stroke-width="4"
					fill="transparent"
					width="100"
					height="100"
					rx="40"/>
				</g>
			</svg>
			<img src="/images/calendar.png" alt="calendar" style="width:2em;height:2em;margin:auto;">
		</div>
	</nav>

</div>






<style>
	*{
		margin: 0;
		padding: 0;
	}
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
	.buttonbar{
		margin: 0;
		width: 50%;
		margin: auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.button{
		margin: 1em 1em;
		position: relative;
	}
	img{
		position: absolute;
		min-width: 100%;
		min-height: 100%;
		left: 0;
		top: 0;
		pointer-events: none;
	}
	svg{
		display: block;
        margin: auto;
	}
	.figure{
        height: 8em;
		width: 8em;
		display: block;
		margin: auto;
	}
	.figure-outline{
		stroke-dasharray: 10 20;
		transition: 0.3s;
	}
	.figure-outline:hover{
		stroke-dasharray: 29 0;
	}
</style>