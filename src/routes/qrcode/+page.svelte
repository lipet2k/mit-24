<script lang="ts">
	import {
		lndGetWalletBalance,
		lndGetInfo,
		lndListChannels,
		lndListInvoices,
		lndCreateInvoice,
		lndNewAddress,
		type GetInfoResponse
	} from '$lib/lnd';
	import { onMount } from 'svelte';
	import QrCode from '$components/QrCode/QrCode.svelte';
	import Button from '$components/Button/Button.svelte';
	import Input from '$components/Input/Input.svelte';
	import NetworkCapsule from '../../features/NetworkCapsule/NetworkCapsule.svelte';
	import Card from '$components/Card/Card.svelte';

	let amount = 50;
	let memo = 'Purchase Share of House';
	let invoice = '';
	let address = '';
	let info: GetInfoResponse;

	const getNewAddress = async () => {
		address = (await lndNewAddress()).address;
	};

	const createInvoice = async () => {
		invoice = (await lndCreateInvoice(amount, memo)).payment_request;
	};

	const getInfo = async () => {
		info = await lndGetInfo();
	};

	onMount(async () => {
		await getInfo();
        getNewAddress();
        createInvoice();
	});
</script>

{#if address || invoice}
    <!-- TODO: check if payment succeeded -->
    <QrCode image='https://voltage.imgix.net/Team.png?fm=webp&w=160' {address} {invoice} />
{/if}

<style lang="postcss">
	h2 {
		@apply text-2xl font-bold;
	}
</style>
