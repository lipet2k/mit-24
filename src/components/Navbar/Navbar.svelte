<script>
	import logo from '$lib/images/logo.svg';
	import menu_image from '$lib/images/menu.svg';

	let menu = false;

	const toggleMenu = () => {
		menu = !menu;
	};
</script>

<div class="mb-4 mt-12 flex h-[4rem] items-center justify-between p-6 text-black">
	<div class="flex space-x-4">
		<a href="/buy" class="flex items-center space-x-2">
			<img alt="logo" src={logo} width={300} />
		</a>
	</div>
	<div class="lg:hidden">
		<button on:click={toggleMenu}>
			<img alt="menu" src={menu_image} width={24} height={24} />
		</button>
	</div>
	{#if menu}
		<div class="fixed inset-0 z-50 flex flex-col items-center justify-center lg:hidden">
			<div class="p-4">
				<ul class="flex list-disc flex-col space-y-8">
					<li><a href="/poll" class="text-xl hover:underline" on:click={toggleMenu}>Poll</a></li>
					<li><a href="/buy" class="text-xl hover:underline" on:click={toggleMenu}>Buy</a></li>
					<li><a href="/view" class="text-xl hover:underline" on:click={toggleMenu}>View</a></li>
				</ul>
			</div>
		</div>
	{/if}
	{#if !menu}
		<div
			class="font-helvetica mb-8 mt-4 flex hidden items-center space-x-4 text-lg font-bold lg:block lg:flex lg:space-x-6 lg:text-2xl"
		>
			<a
				href="/poll"
				class="hover: border-2 border-black bg-[#33ff66] px-4 py-2 text-black transition duration-200 hover:bg-[black] hover:text-white"
				>Poll</a
			>
			<a
				href="/buy"
				class="hover: border-2 border-black bg-[#33ff66] px-4 py-2 text-black transition duration-200 hover:bg-[black] hover:text-white"
				>Buy</a
			>
			<a
				href="/view"
				class="hover: border-2 border-black bg-[#33ff66] px-4 py-2 text-black transition duration-200 hover:bg-[black] hover:text-white"
				>View</a
			>
		</div>
	{/if}
</div>
