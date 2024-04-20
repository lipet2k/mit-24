<script lang="ts">
	import QrCode from '$components/QrCode/QrCode.svelte';
	import Button from '$components/Button/Button.svelte';
	import Input from '$components/Input/Input.svelte';
	import Card from '$components/Card/Card.svelte';
</script>

<div class="mx-2 my-2">
<Card>
    <center>
    <h2 class="mb-8">Replace floors with high quality oak?</h2>
    <div>
        <Button type="submit">
        Yes
        </Button>
        <Button type="submit">
        No
        </Button>

    </div>
    </center>
</Card>
</div>

<style lang="postcss">
	h2 {
		@apply text-2xl font-bold;
	}
</style>