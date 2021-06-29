<script lang="ts">
	import BasicButton from "$lib/BasicButton.svelte";
	export let onclick = () => undefined;
	export let time: number = 2000;
	export let style: string = "";

	let showConfirm: boolean = false;
	let timer;

	function firstClick() {
		clearTimeout(timer);
		showConfirm = true;
		timer = setTimeout(() => showConfirm = false, time)
	}

	function mouseOut() {
		clearTimeout(timer);
		showConfirm = false;		
	}

	function onClick() {
		mouseOut()
		onclick();
	}
</script>

{#if !showConfirm}
	<BasicButton onclick={firstClick} {style}>
		<slot></slot>
	</BasicButton>
{:else}
	<!-- <div on:mouseout={mouseOut}> -->
		<BasicButton
			onclick={onClick}
			style="background-color:var(--c_yellow); color:var(--c_dark);"
			>
			Confirm
		</BasicButton>
	<!-- </div> -->
{/if}
