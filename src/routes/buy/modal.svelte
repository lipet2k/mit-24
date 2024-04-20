<script lang="ts">
	import type { Property } from './types';
	
	export let property: Property;

</script>


	<div class="modal">
		<div class="modal-content">
			
			<h2>{property.name}</h2>
			<p>{property.description}</p>
			<p><strong>Price:</strong> ${property.totalprice}</p>
			<p><strong>Share price:</strong> ${property.shareprice}</p>
			<p><strong>Percentage owned:</strong> {property.percentage}%</p>
		</div>
	</div>


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
		position: fixed; /* Fixes the div's position relative to the viewport */
		top: 50%; /* Position the top edge of the div at the middle of the viewport vertically */
		left: 50%; /* Position the left edge of the div at the middle of the viewport horizontally */
		transform: translate(-50%, -50%); /* Offset the div by half its width and height to center it */
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
