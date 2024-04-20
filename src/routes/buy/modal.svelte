<script lang="ts">
	import type { Property } from './types';
	export let isOpen = false;
	export let property: Property;
	export function close() {
		isOpen = false;
	}
</script>

{#if isOpen}
	<div class="modal">
		<div class="modal-content">
			<span class="close" on:click={close}>&times;</span>
			<h2>{property.name}</h2>
			<p>{property.description}</p>
			<p><strong>Price:</strong> ${property.totalprice}</p>
			<p><strong>Share price:</strong> ${property.shareprice}</p>
			<p><strong>Percentage owned:</strong> {property.percentage}%</p>
		</div>
	</div>
{/if}

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
		margin: 15% auto;
		padding: 20px;
		border: 1px solid #888;
		width: 80%; /* Adjust width as necessary */
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
