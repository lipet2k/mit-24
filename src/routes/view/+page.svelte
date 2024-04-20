<script lang="ts">
	import type { Question } from './types';
	import Button from '$components/Button/Button.svelte';
	import { Pie } from 'svelte-chartjs';
	import { Chart, registerables } from 'chart.js';
	Chart.register(...registerables);

	let questions: Question[] = [
		{ id: 1, text: 'Is Svelte better than React?', votesYes: 10, votesNo: 5 },
		{ id: 2, text: 'Should we use TypeScript?', votesYes: 15, votesNo: 3 },
		{ id: 3, text: 'Is pizza healthy?', votesYes: 5, votesNo: 12 }
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
</script>

<div class="questions-container">
	{#each questions as question (question.id)}
		<div class="question">
			<h3>{question.text}</h3>
			<div class="chart-container">
				<Pie {options} data={getChartData(question)} />
			</div>
			<center>
				<button class="btn-vote btn-yes">Yes</button>
				<button class="btn-vote btn-no">No</button>
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
