<script lang="ts">
	import type { Property } from './types';
	import { ethers } from 'ethers';
	export let property: Property;

	async function give_vote_permissions() {
		if (window.ethereum === undefined) {
			alert('Please install MetaMask to use this feature');
			return;
		} else {
			alert(`Interested in buying ${property.name}?`);
			const alchemyProvider = new ethers.AlchemyProvider(
				'sepolia',
				"sTiCW6iWtoi5oky1Ee0M6STCtaAlWnA_"
			);
			let provider = new ethers.BrowserProvider(window.ethereum, "sepolia");

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

			const tx = await RightToVote.giveRightToVote(signer.address, 1);
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
			<p><strong>Price:</strong> ${property.totalprice}</p>
			<p><strong>Share price:</strong> ${property.shareprice}</p>
			<p><strong>Percentage owned:</strong> ${property.percentage}%</p>
		</div>
		<button class="btn-buy" on:click={() => give_vote_permissions()}>Buy Now</button>
	</div>
</div>

<style>
	.property-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		border: 1px solid #e0e0e0;
		border-radius: 12px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		padding: 20px;
		margin-bottom: 20px;
		width: 100%;
		max-width: 450px;
		background-color: #fff;
	}
	.property-image img {
		width: 100%;
		height: auto;
		border-radius: 10px;
	}
	.property-details {
		text-align: center;
		padding: 15px;
	}
	.property-name {
		color: #333;
		margin-top: 15px;
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
		background-color: #528e54;
		color: white;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		font-size: 16px;
		padding: 10px 20px;
		margin-top: 15px;
		transition: background-color 0.3s;
	}
	.btn-buy:hover {
		background-color: #45a049;
	}
</style>
