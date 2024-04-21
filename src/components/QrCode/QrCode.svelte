<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { defineCustomElements } from 'bitcoin-qr/loader';

	export let parameters = '';
	export let address = '';
	export let invoice = '';
	export let image = './assets/voltage.svg';
	export let dotsColor = '#05b030';
	export let cornersDotColor = '#05b030';
	export let cornersSquareColor = '#0b7d28';
	export let isPolling = true;
	export let pollInterval = 3000; // Interval to poll in milliseconds
	
	let pollCount = 0;
	let paid = false;
	
	async function pollCallback() {
        pollCount += 1;
        if (pollCount >= 20) {
        	isPolling = false;
        	paid = true;
        	const qr = document.getElementById('qr');

			if (qr) {
				// @ts-ignore
				qr.setAttribute('is-polling', false);
		  	}
	    }
    }

	onMount(() => {
		defineCustomElements();
		const qr = document.getElementById('qr') as any;
		if (qr) {
			qr.addEventListener('codeRendered', () => {
				qr.callback = pollCallback;
				qr.animateQRCode('MaterializeIn');
			});
		}
	});

	onDestroy(() => {
		const qr = document.getElementById('qr') as any;
		if (qr) {
			qr.removeEventListener('codeRendered', () => {
				qr.callback = undefined;
			});
		}
	});
</script>

<bitcoin-qr
	id="qr"
	width="300"
	height="300"
	bitcoin={address}
	lightning={invoice}
	{parameters}
	{image}
	type="svg"
	is-polling={isPolling}
	poll-interval={pollInterval}
	dots-color={dotsColor}
	corners-dot-color={cornersDotColor}
	corners-square-color={cornersSquareColor}
	corners-square-type="extra-rounded"
	dots-type="classy-rounded"
/>


