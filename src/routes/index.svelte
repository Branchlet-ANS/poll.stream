<script>
    import {base} from '$app/paths'
</script>

<div class="content">
	<div class="title">Welcome</div>
	<div class="divider"></div>
	<nav class="buttonbar">
		<div class="button">
			<a href="{base}/poll_page">
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
				<img src="poll.png" alt="poll">
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
			<img src="calendar.png" alt="calendar">
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
		height: 50%;
		width: 50%;
		margin-top: 25%;
		margin-left: 25%;
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