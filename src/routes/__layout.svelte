
<body>

    <slot></slot>
	
	<footer>
	    <div class="logo">Poll<br>stream</div>
	</footer>
</body>

<style>
	:root {
		--c_accent: #00A757;
		--c_background: #1A1923;
		--c_warning: #79093B;
		--c_warning_text: #EE005A;
	}
	.logo{
		margin: auto;
		color: rgb(255, 255, 255);
		text-align: left;
		font-family: 'Brush Script MT', cursive;
        font-size: 3em;
	}
	
    body {
        margin: 20vh 0 0 0;
        padding: 0;
        width: 100%;
        height: 100%;
		background-color: rgb(59, 59, 59);
	}

	footer {
		color: rgb(0, 0, 0);
		position: fixed;
		left: 10vw;
		top: 10vh;
	}
</style>