<script lang="ts">
	import type { Property } from './types';
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
	export let property: Property;

	let invoice = '';
	let address = '';
	let info: GetInfoResponse;

	const createInvoice = async (amount: number, memo: string) => {
		invoice = (await lndCreateInvoice(amount, memo)).payment_request;
	};

	const getInfo = async () => {
		info = await lndGetInfo();
	};

	onMount(async () => {
		await getInfo().then(async () => {
			await createInvoice(Math.ceil(Number(property.shareprice)), property.name);
	});
		
	});

</script>


	<div class="modal">
		<div class="modal-content">
			
			<h2>{property.name}</h2>
			<p>{property.description}</p>
			<p><strong>Price:</strong> {property.totalprice} SATS</p>
			<p><strong>Share price:</strong> {property.shareprice} SATS</p>
			<p><strong>Percentage owned:</strong> {property.percentage}%</p>
			{#if address || invoice}
			<QrCode image='https://voltage.imgix.net/Team.png?fm=webp&w=160' {address} {invoice} />
			{/if}
		</div>
	</div>


<style>
	.modal {
		position: fixed;
		z-index: 1;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		overflow: auto;
		background-color: rgba(0, 0, 0, 0.4);
	}
	.modal-content {
		background-color: #fefefe;
		position: fixed; 
		top: 50%; 
		left: 50%; 
		transform: translate(-50%, -50%); 
		padding: 20px;
		border: 1px solid #888;
		width: 80%;
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
		animation-name: animatetop;
		animation-duration: 0.4s;
	}
	.close {
		color: #aaa;
		float: right;
		font-size: 28px;
		font-weight: bold;
	}
	.close:hover,
	.close:focus {
		color: black;
		text-decoration: none;
		cursor: pointer;
	}
	@keyframes animatetop {
		from {
			top: -300px;
			opacity: 0;
		}
		to {
			top: 0;
			opacity: 1;
		}
	}
</style>
