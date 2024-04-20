<script lang="ts">
	import type { Property } from './types';

	export let property: Property;
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
		<button class="btn-buy" on:click={() => window.alert(`Interested in buying ${property.name}?`)}
			>Buy Now</button
		>
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
