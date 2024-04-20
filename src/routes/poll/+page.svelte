<script lang="ts">
	import QrCode from '$components/QrCode/QrCode.svelte';
	import Button from '$components/Button/Button.svelte';
	import Input from '$components/Input/Input.svelte';
	import Card from '$components/Card/Card.svelte';

    async function vote(proposal: number, vote_val: boolean) {
		if (window.ethereum === undefined) {
			alert('Please install MetaMask to use this feature');
			return;
		} else {
			alert(`Interested in buying ${property.name}?`);
			const provider = new ethers.BrowserProvider(window.ethereum);
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

			const tx = await RightToVote.vote(proposal, vote_val);
		}
	}
</script>

<div class="mx-2 my-2">
<Card>
    <center>
    <h2 class="mb-8">Replace floors with high quality oak?</h2>
    <div>
        <Button type="submit" onClick={() => vote(0, true)}>
        Yes
        </Button>
        <Button type="submit" onClick={() => vote(0, false)}>
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