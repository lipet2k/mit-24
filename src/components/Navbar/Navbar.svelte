<script>
	import logo from '$lib/images/logo.svg';
	import menu_image from '$lib/images/menu.svg';

	let menu = false;

	function toggleMenu() {
		menu = !menu;
	}
</script>

<div class="container">
	<div class="logo-link">
		<a href="/buy">
			<img alt="logo" src={logo} width={100} height={50} />
		</a>
	</div>
	<div class="menu-button" on:click={toggleMenu}>
		<img alt="menu" src={menu_image} width={24} height={24} />
	</div>
	{#if menu}
		<div class="mobile-menu active">
			<ul class="flex flex-col space-y-4">
				<li><a href="/buy" class="text-xl hover:underline" on:click={toggleMenu}>Buy</a></li>
				<li><a href="/view" class="text-xl hover:underline" on:click={toggleMenu}>View</a></li>
			</ul>
		</div>
	{/if}
	<div class="nav-links lg:block">
		<a href="/buy" class="hover:underline">Buy</a>
		<a href="/view" class="hover:underline">View</a>
	</div>
</div>

<style>
	.container {
		display: flex;
		height: 4rem;
		align-items: center;
		justify-content: space-between;
		padding: 6px;
		color: #f97316;
	}
	.logo-link,
	.nav-link {
		display: flex;
		align-items: center;
		gap: 8px;
	}
	.menu-button {
		display: none;
		cursor: pointer;
		z-index: 101;
	}
	.nav-links {
		display: flex;
		gap: 24px;
		font-size: 16px;
	}
	.nav-links a {
		text-decoration: none;
		color: inherit;
	}
	.nav-links a:hover {
		text-decoration: underline;
	}

	/* Mobile styles */
	@media (max-width: 500px) {
		.menu-button {
			display: block;
		}
		.nav-links {
			display: none;
		}
		.mobile-menu {
			position: fixed;
			top: 0;
			right: 0;
			width: 60%;
			height: 100%;
			background-color: white;
			box-shadow: 2px 0 5px rgba(0, 0, 0, 0.5);
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			z-index: 100;

			transition: transform 0.3s ease;
		}
		.mobile-menu.active {
			transform: translateX(0);
		}
	}
</style>
