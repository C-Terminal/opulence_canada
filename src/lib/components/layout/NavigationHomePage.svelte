<script>
	import { slide, fade } from 'svelte/transition';
	import { onMount } from 'svelte';

	// Reactive state for menu toggle
	let isMenuOpen = $state(false);

	// Navigation links
	const navLinks = [
		{ name: 'Homepage', href: '/' },
		{ name: 'Foreign Exchange', href: '/forex' },
		{ name: 'Remittances', href: '/remittance' },
		{ name: 'Money Transfer', href: '/transfer' }
	];

	// Toggle menu
	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	// Close menu on link click (mobile)
	function closeMenu() {
		isMenuOpen = false;
	}

	// Ensure menu closes on resize to desktop
	onMount(() => {
		const handleResize = () => {
			if (window.innerWidth >= 768) {
				isMenuOpen = false;
			}
		};
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	});
</script>

<nav
	class="bg-fintech-white dark:bg-fintech-dark border-fintech-light-gray dark:border-fintech-muted border-b shadow-sm"
	aria-label="Main navigation"
	role="navigation"
>
	<div class="container mx-auto flex items-center justify-between px-4 py-4">
		<!-- Branding -->
		<div class="flex-shrink-0">
			<a
				href="/"
				class="text-fintech-red-canadian dark:text-fintech-red-canadian text-xl font-bold"
				aria-label="Opulent Canada Homepage"
			>
			<span class="text-fintech-dark dark:text-fintech-white">Opulent</span>
			<span>Canada</span>
			</a>
		</div>

		<!-- Desktop Navigation (md: and up) -->
		<div class="hidden md:flex md:items-center md:space-x-6 font-serif">
			{#each navLinks as link, index}
				<a
					href={link.href}
					class="hover:text-fintech-accent dark:hover:text-fintech-red-canadian focus:ring-fintech-accent dark:focus:ring-offset-fintech-dark text-gray-600 transition-colors duration-200 focus:ring-2 focus:ring-offset-2 focus:outline-none dark:text-gray-200"
					in:fade={{ duration: 300, delay: index * 100 }}
				>
					{link.name}
				</a>
			{/each}
		</div>

		<!-- Mobile Hamburger Button and Search -->
		<div class="flex items-center space-x-2">
			<!-- Search Button (visible on all screens) -->
			<button
				class="hover:text-fintech-accent dark:hover:text-fintech-red-canadian focus:ring-fintech-accent dark:focus:ring-offset-fintech-dark rounded-full p-2 text-gray-500 transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none dark:text-gray-200"
				aria-label="Search"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					aria-hidden="true"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					/>
				</svg>
			</button>

			<!-- Hamburger Button (mobile only) -->
			<button
				type="button"
				class="hover:text-fintech-accent dark:hover:text-fintech-red-canadian p-2 text-gray-500 transition-transform duration-200 md:hidden dark:text-gray-200 {isMenuOpen
					? 'rotate-90'
					: ''}"
				aria-label="Toggle navigation menu"
				aria-haspopup="true"
				aria-controls="mobile-menu"
				aria-expanded={isMenuOpen}
				on:click={toggleMenu}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					aria-hidden="true"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h16M4 18h7"
					/>
				</svg>
			</button>
		</div>
	</div>

	<!-- Mobile Menu (visible when toggled on mobile) -->
	{#if isMenuOpen}
		<div
			class="bg-fintech-white dark:bg-fintech-dark border-fintech-light-gray dark:border-fintech-muted border-t md:hidden font-montserrat"
			id="mobile-menu"
			role="menu"
			in:slide={{ duration: 300 }}
			out:slide={{ duration: 300 }}
		>
			<ul class="space-y-3 px-4 py-4">
				{#each navLinks as link}
					<li>
						<a
							href={link.href}
							class="hover:text-fintech-accent dark:hover:text-fintech-red-canadian focus:ring-fintech-accent dark:focus:ring-offset-fintech-dark block text-gray-600 transition-colors duration-200 focus:ring-2 focus:ring-offset-2 focus:outline-none dark:text-gray-200"
							role="menuitem"
							on:click={closeMenu}
						>
							{link.name}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</nav>
<!-- {#if session?.user}
		<span>Welcome, {session.user.name ?? session.user.email}!</span>
		<img
			src={session.user.image ?? '/default-avatar.png'}
			alt="User avatar"
			width="32"
			height="32"
			style="border-radius: 50%; margin-left: 10px;"
		/>
		<form action="/auth/signout" method="POST">
			<button type="submit">Sign Out</button>
		</form>
	{:else}
		<span>You are not signed in.</span>
		<a href="/auth/signin">Sign In</a>
	{/if} -->
