<script lang="ts">
<<<<<<< HEAD
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

	let amount = 0;
	let memo = '';
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
	});
</script>

<div class="mx-8 flex flex-col items-center">
	<div class="flex items-center gap-2">
		<img src="/assets/voltage-name.svg" alt="Voltage" class="w-[400px]" />
		{#if info?.chains?.length}
			<NetworkCapsule network={info.chains[0].network} />
		{/if}
	</div>
	<!-- TODO: voltage documentation -->
	{#if address || invoice}
		<!-- TODO: check if payment succeeded -->
		<QrCode image='https://voltage.imgix.net/Team.png?fm=webp&w=160' {address} {invoice} />
	{/if}
	<div class="flex flex-col gap-8 lg:flex-row">
		<div class="flex flex-1 flex-col gap-4">
			<Card>
				<div class="flex flex-col gap-8">
					<div class="flex flex-col gap-4">
						<h2>Create Invoice</h2>
						<!-- Make a simple form to call the lndCreateInvoices function with the amount and memo -->
						<form class="flex flex-col gap-2" on:submit|preventDefault={createInvoice}>
							<Input id="amount" bind:value={amount} label="Amount" />
							<Input id="memo" bind:value={memo} label="Memo" />
							<Button type="submit">Create Invoice</Button>
						</form>
					</div>
				</div>
			</Card>
			<Card>
				<div class="flex flex-col gap-4">
					<h2>Get New Address</h2>
					<Button type="submit" on:click={getNewAddress}>Get New Address</Button>
				</div>
			</Card>
		</div>
		<div class="max-w-1/2 flex flex-1 flex-col gap-4">
			<Card>
				<h2>Node Balance</h2>
				{#await lndGetWalletBalance()}
					<p>loading...</p>
				{:then result}
					<ul>
						<li>Total Balance: {result.total_balance}</li>
						<li>Confirmed Balance: {result.confirmed_balance}</li>
						<li>Unconfirmed Balance: {result.unconfirmed_balance}</li>
					</ul>
				{:catch error}
					<p>error: {error.message}</p>
				{/await}
			</Card>
			<Card>
				<h2>Node Info</h2>
				{#await lndGetInfo()}
					<p>loading...</p>
				{:then result}
					<ul>
						<li>Node Alias: {result.alias}</li>
						<li>Pubkey: {result.identity_pubkey}</li>
						<li>Peers: {result.num_peers}</li>
						<li>Synced to Chain: {result.synced_to_chain}</li>
					</ul>
				{:catch error}
					<p>error: {error.message}</p>
				{/await}
			</Card>
			<Card>
				<h2>Channel Info</h2>
				{#await lndListChannels()}
					<p>loading...</p>
				{:then result}
					<ul>
						<li>Number of channels: {result.channels.length}</li>
					</ul>
				{:catch error}
					<p>error: {error.message}</p>
				{/await}
			</Card>

			<Card>
				<h2>Invoices</h2>
				{#await lndListInvoices()}
					<p>loading...</p>
				{:then result}
					<ul class=" max-h-80 max-w-full overflow-y-scroll break-all">
						<!-- catch a dispatched created invoice -->
						{#each result.invoices as invoice}
							<li>{invoice.add_index} - {invoice.state} {invoice.payment_request}</li>
						{/each}
					</ul>
				{/await}
			</Card>
		</div>
	</div>
</div>

<style lang="postcss">
	h2 {
		@apply text-2xl font-bold;
=======
	import Property from './Property.svelte';
	import type { Property as PropertyType } from './types';

	let properties: PropertyType[] = [
		{
			id: 1,
			name: 'Beachfront Villa',
			description: 'Beautiful scenery with a beachfront view.',
			totalprice: '1,500,000',
			image:
				'https://static.dezeen.com/uploads/2021/06/all-together-now-co-living-co-working-book-feature_dezeen_1704_col_0.jpg',
			shareprice: '150,000',
			percentage: 80
		},
		{
			id: 2,
			name: 'Penthouse in Chicago',
			description: 'Experience the heart of Chicago in a luxury penthouse.',
			totalprice: '4,000,000',
			image:
				'https://co-living.imgix.net/uploads/listings/18858/photos/nUHwGeGizV.jpg?auto=compress,enhance,format&fit=crop&crop=faces,center&w=720&h=480',
			shareprice: '1,000,000',
			percentage: 25
		},
		{
			id: 3,
			name: 'Modern Loft',
			description: 'Sleek, spacious loft with industrial design in the heart of the city.',
			totalprice: '850,000',
			image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688',
			shareprice: '85,000',
			percentage: 10
		},
		{
			id: 4,
			name: 'Country Cottage',
			description: 'Charming cottage with beautiful gardens and a tranquil setting.',
			totalprice: '780,000',
			image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6',
			shareprice: '78,000',
			percentage: 15
		},
		{
			id: 5,
			name: 'Lake House',
			description: 'Serene lakefront property with stunning sunset views.',
			totalprice: '1,200,000',
			image: 'https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62',
			shareprice: '120,000',
			percentage: 20
		},
		{
			id: 6,
			name: 'Downtown Studio',
			description: 'Compact and convenient studio located in the bustling downtown area.',
			totalprice: '500,000',
			image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb',
			shareprice: '50,000',
			percentage: 30
		}
	];
</script>

<div class="properties-container">
	{#each properties as property}
		<Property {property} />
	{/each}
</div>

<style>
	.properties-container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 20px;
		padding: 20px;
		justify-content: center;
		align-items: flex-start;
>>>>>>> refs/remotes/origin/main
	}
</style>
