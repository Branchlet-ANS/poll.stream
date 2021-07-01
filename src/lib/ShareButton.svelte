<script lang="ts">
	import ConfirmationButton from '$lib/ConfirmationButton.svelte'
	
	export let pollStreamId: string;

	function share() {
		navigator.clipboard.writeText("https://poll.stream/poll/" + pollStreamId);
	}
</script>

<ConfirmationButton onfirstclick={share} secondText={"Copied url to clipboard."}>Share</ConfirmationButton>
