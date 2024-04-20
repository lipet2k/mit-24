<script lang="ts">
	import type { Property } from './types';
	import { ethers } from 'ethers';
	// import { useState } from './hooks.js';
	export let property: Property;

	function toast_alert(message: string) {
		const toast = toasts.add({
			title: 'Error',
			description: message,
			type: 'error',
			duration: 5000,
			placement: 'top-right',
			theme: 'dark'
		});
	}
	import Modal from './modal.svelte';

	let isOpen = false;

	function toast_info(message: string) {
		const toast = toasts.add({
			title: 'Info',
			description: message,
			type: 'info',
			duration: 5000,
			placement: 'top-right',
			theme: 'dark'
		});
	}

	async function give_vote_permissions() {
		if (window.ethereum === undefined) {
			toast_alert('Please install MetaMask to use this feature');
			return;
		} else {
			toast_info(`Interested in buying ${property.name}?`);
			const alchemyProvider = new ethers.AlchemyProvider(
				'sepolia',
				'sTiCW6iWtoi5oky1Ee0M6STCtaAlWnA_'
			);
			let provider = new ethers.BrowserProvider(window.ethereum, 'sepolia');

			const signer = await provider.getSigner();

			const right_to_vote_abi = [
				{
					inputs: [],
					stateMutability: 'nonpayable',
					type: 'constructor'
				},
				{
					inputs: [],
					name: 'chairperson',
					outputs: [
						{
							internalType: 'address',
							name: '',
							type: 'address'
						}
					],
					stateMutability: 'view',
					type: 'function'
				},
				{
					inputs: [
						{
							internalType: 'uint256',
							name: 'proposal',
							type: 'uint256'
						}
					],
					name: 'createProposal',
					outputs: [],
					stateMutability: 'nonpayable',
					type: 'function'
				},
				{
					inputs: [
						{
							internalType: 'address',
							name: 'voter',
							type: 'address'
						},
						{
							internalType: 'uint256',
							name: 'weight',
							type: 'uint256'
						}
					],
					name: 'giveRightToVote',
					outputs: [],
					stateMutability: 'nonpayable',
					type: 'function'
				},
				{
					inputs: [
						{
							internalType: 'uint256',
							name: '',
							type: 'uint256'
						}
					],
					name: 'proposals',
					outputs: [
						{
							internalType: 'uint256',
							name: 'name',
							type: 'uint256'
						},
						{
							internalType: 'uint256',
							name: 'voteFor',
							type: 'uint256'
						},
						{
							internalType: 'uint256',
							name: 'voteAgainst',
							type: 'uint256'
						}
					],
					stateMutability: 'view',
					type: 'function'
				},
				{
					inputs: [
						{
							internalType: 'uint256',
							name: 'proposal',
							type: 'uint256'
						},
						{
							internalType: 'bool',
							name: 'value',
							type: 'bool'
						}
					],
					name: 'vote',
					outputs: [],
					stateMutability: 'nonpayable',
					type: 'function'
				},
				{
					inputs: [
						{
							internalType: 'address',
							name: '',
							type: 'address'
						}
					],
					name: 'voters',
					outputs: [
						{
							internalType: 'uint256',
							name: 'weight',
							type: 'uint256'
						},
						{
							internalType: 'bool',
							name: 'voted',
							type: 'bool'
						},
						{
							internalType: 'uint256',
							name: 'vote',
							type: 'uint256'
						}
					],
					stateMutability: 'view',
					type: 'function'
				}
			];

			const RightToVote = new ethers.Contract(
				'0xDaC396b0B5E4c56169B4b492606CC2dDd7D6d42a',
				right_to_vote_abi,
				signer
			);

			// const address = await signer.getAddress();

			try {
				const tx = await RightToVote.giveRightToVote(signer.address, 1);
			} catch (error) {
				toast_alert('Not enough funds');
			}
		}
	}
</script>

<div class="property-card">
	<div class="property-image">
		<img src={property.image} alt={property.name} />
	</div>
	<div class="property-details">
		<h2 class="property-name">{property.name}</h2>
		<p class="property-description">{property.description}</p>
		<div class="property-price-info">
			<p><strong>Price:</strong> {property.totalprice} BTC</p>
			<p><strong>Share price:</strong> {property.shareprice} BTC</p>
			<p><strong>Percentage owned:</strong> ${property.percentage}%</p>
		</div>
		<button
			class="btn-buy"
			type="button"
			on:click={() => {
				give_vote_permissions();
				isOpen=true;
			}}>Buy Now</button
		>
	</div>
</div>

{#if isOpen}
<Modal {property} />
<button class="mbtn" on:click={()=>{isOpen = false}}>x</button>
{/if}

<style>
	.mbtn {
		position: fixed;
		top: 37%;
		right:10%;
		
		
		background-color: #ff0000;
		color: #ffffff;
		width: 25px;
		height: 25px;
		z-index: 9999999;
	}
	.property-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		border: 4px solid black;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		padding: 20px;
		margin-bottom: 20px;
		width: 100%;
		max-width: 450px;
		background-color: #ffffff;
	}
	.property-image img {
		width: 100%;
		height: auto;
		border: 4px solid black;
	}
	.property-details {
		text-align: center;
		padding: 15px;
	}
	.property-name {
		color: black;
		margin-bottom: 15px;
		font-weight: bold;
	}
	.property-description {
		color: #666;
		font-size: 14px;
	}
	.property-price-info p {
		color: #444;
		font-size: 14px;
		margin: 5px 0;
	}
	.btn-buy {
		background-color: #white;
		color: black;
		border: 2px solid black;
		cursor: pointer;
		font-size: 16px;
		padding: 10px 20px;
		margin-top: 15px;
		transition: background-color 0.3s;
		font-weight: bold;
	}
	.btn-buy:hover {
		background-color: black;
		color: white;
	}
</style>
