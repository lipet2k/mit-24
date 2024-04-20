<script lang="ts">
	import type { Question } from './types';
	import Button from '$components/Button/Button.svelte';
	import { Pie } from 'svelte-chartjs';
	import { Chart, registerables } from 'chart.js';
	import { ethers } from 'ethers';
	Chart.register(...registerables);
	import { toasts } from 'svelte-toasts';
	import { ToastContainer, FlatToast } from 'svelte-toasts';
	import { onMount } from 'svelte';

	let questions: Question[] = [
		{ id: 0, text: 'Is Svelte better than React?', votesYes: 0, votesNo: 0 },
		{ id: 1, text: 'Should we use TypeScript?', votesYes: 0, votesNo: 0 },
		{ id: 2, text: 'Is pizza healthy?', votesYes: 0, votesNo: 0 }
	];

	let options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: 'bottom' as const,
				labels: {
					boxWidth: 20,
					padding: 15
				}
			}
		}
	};

	function getChartData(question: Question) {
		return {
			labels: ['Yes', 'No'],
			datasets: [
				{
					label: 'Votes',
					data: [question.votesYes, question.votesNo],
					backgroundColor: ['rgba(51, 255, 102, 1)', 'rgba(255, 0, 0, 1)'],
					borderColor: ['black', 'black'],
					borderWidth: 4
				}
			]
		};
	}

	function toast_alert(message: string) {
		const toast = toasts.add({
			title: "Error",
			description: message,
			type: 'error',
			duration: 5000,
			placement: 'top-right',
			theme: 'dark'
		});
	}

	function toast_info(message: string) {
		const toast = toasts.add({
			title: "Info",
			description: message,
			type: 'info',
			duration: 5000,
			placement: 'top-right',
			theme: 'dark'
		});
	}

	const abi = [
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

	async function vote(ballot_num: number, vote_val: boolean, ballot_string: string) {
		if (window.ethereum === undefined) {
			toast_alert('Please install MetaMask to use this feature');
			return;
		} else {
			toast_info(`Voting ${vote_val} on ballot: ${ballot_string}?`);
			const alchemyProvider = new ethers.AlchemyProvider(
				'sepolia',
				'sTiCW6iWtoi5oky1Ee0M6STCtaAlWnA_'
			);
			let provider = new ethers.BrowserProvider(window.ethereum, 'sepolia');

			const signer = await provider.getSigner();

			const ballot = new ethers.Contract('0xDaC396b0B5E4c56169B4b492606CC2dDd7D6d42a', abi, signer);

			try {
				const tx = await ballot.vote(ballot_num, vote_val);
			} catch (e) {
				toast_alert('You have no right to vote');
			}
		}
	}

	async function proposals(id: number) {
		if (window.ethereum === undefined) {
			toast_alert('Please install MetaMask to use this feature');
			return;
		} else {
			const alchemyProvider = new ethers.AlchemyProvider(
				'sepolia',
				'sTiCW6iWtoi5oky1Ee0M6STCtaAlWnA_'
			);
			let provider = new ethers.BrowserProvider(window.ethereum, 'sepolia');

			const signer = await provider.getSigner();

			const ballot = new ethers.Contract('0xb1a181d26de3c95c4ec1675160c42a61f4e9045f', abi, signer);

			try {
				const results = await ballot.proposals(id);
				questions[id].votesNo = Number(results[1]);
				questions[id].votesYes = Number(results[2]);
			} catch (e) {
				console.log(e)
				toast_alert('Cannot retreive proposals');
			}
		}
	
	}

	onMount(async () => {
		questions.forEach(async (item) => {
			await proposals(item.id);
		});
		
	});
</script>

<div class="questions-container">
		{#each questions as question (question.id)}
			<div class="question">
				<h3>{question.text}</h3>
				<div class="chart-container">
					<Pie {options} data={getChartData(question)} />
				</div>
				<center>
					<button
						class="btn-vote btn-yes"
						type="button"
						on:click={() => {
							vote(question.id, true, question.text);
						}}>Yes</button
					>
					<button
						class="btn-vote btn-no"
						type="button"
						on:click={() => {
							vote(question.id, true, question.text);
						}}>No</button
					>
				</center>
			</div>
		{/each}
	
</div>

<style>
	.questions-container {
		max-width: 800px;
		margin: auto;
		margin-top: 40px;
		padding: 20px;
		border-color: black;
		box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
		background: white;
		border: 4px solid black;
	}
	.question {
		margin-bottom: 2rem;
		padding: 20px;
		border-bottom: 1px solid #eee;
	}
	h3 {
		font-size: 1.2rem;
		color: black;
		font-weight: bold;
		text-align: center;
		margin-bottom: 1rem;
	}
	.chart-container {
		height: 300px;
	}
	.last {
		border-bottom: none;
	}
	.btn-vote {
		color: black;
		font-weight: bold;
		border: black solid 4px;
		cursor: pointer;
		font-size: 16px;
		padding: 10px 20px;
		margin-top: 15px;
		transition: background-color 0.3s;
	}
	.btn-yes {
		background-color: #33ff66;
	}
	.btn-yes:hover {
		background-color: black;
		color: white;
	}
	.btn-no {
		background-color: #ff0000;
	}
	.btn-no:hover {
		background-color: black;
		color: white;
	}
</style>
