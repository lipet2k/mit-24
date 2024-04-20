<script lang="ts">
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
	<div class="grid grid-cols-3 gap-x-4">
		{#each properties as property}
			<Property {property} />
		{/each}
	</div>
</div>

<style>
	.properties-container {
		/* display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 20px;
		padding: 25px;
		justify-content: center;
		align-items: flex-start; */

		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: flex-start;
		overflow-y: auto;
		padding: 20px;
		gap: 20px;
	}
</style>
