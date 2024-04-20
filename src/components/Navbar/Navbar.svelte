<script>
	import logo from '$lib/images/logo.svg';
	import menu_image from '$lib/images/menu.svg';

	let menu = false;

	const toggleMenu = () => {
		menu = !menu;
	};
</script>

<div class="flex h-[4rem] items-center justify-between p-6 text-orange-500">
	<div class="flex space-x-4">
		<a href="/buy" class="flex items-center space-x-2">
			<img alt="logo" src={logo} width={100} height={50} />
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
				<ul class="flex list-disc flex-col space-y-4">
					<li><a href="/poll" class="text-xl hover:underline" on:click={toggleMenu}>Poll</a></li>
                    <li><a href="/buy" class="text-xl hover:underline" on:click={toggleMenu}>Buy</a></li>
                    <li><a href="/view" class="text-xl hover:underline" on:click={toggleMenu}>View</a></li>
				</ul>
			</div>
		</div>
	{/if}
    {#if !menu}
        <div class="lg:flex space-x-4 lg:space-x-6 text-md lg:text-xl flex items-center hidden lg:block">
            <a href="/poll" class="hover:underline">Poll</a>
            <a href="/buy" class="hover:underline">Buy</a>
            <a href="/view" class="hover:underline">View</a>
        </div>
    {/if}
</div>
