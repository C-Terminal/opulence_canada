<script>
	import NavLink from './NavLink.svelte';
	import Button from '$lib/components/common/Button.svelte';
	import logo from '$lib/assets/logo.svg'; // Assuming you have a logo

	let { loggedIn = false } = $props();
	function logout() {
		// Your auth logic here
		console.log('User logged out');
		// Maybe clear state, call a backend endpoint, etc.
	} // For dispatching logout event
</script>

<header
	class="bg-background-light/80 dark:bg-background-dark/80 dark:shadow-primary-dark/10 sticky top-0 z-50 shadow-sm backdrop-blur-md dark:shadow-md"
>
	<nav class="container mx-auto flex items-center justify-between px-4 py-3">
		<a href="/" class="flex items-center space-x-2" aria-label="Homepage">
			<img src={logo} alt="FinServ Logo" class="h-8 w-auto" />
			<span class="text-primary dark:text-primary-light hidden text-xl font-bold sm:inline"
				>FinFuture</span
			>
		</a>

		<div class="hidden items-center space-x-4 md:flex lg:space-x-6">
			<NavLink href="/forex">Foreign Exchange</NavLink>
			<NavLink href="/remittance">Remittance</NavLink>
			<NavLink href="/money-orders">Money Orders</NavLink>
			<NavLink href="/crypto">Virtual Currency</NavLink>
		</div>

		<div class="flex items-center space-x-3">
			{#if loggedIn}
				<Button variant="secondary" size="sm" href="/admin">Admin Portal</Button>
				<Button variant="outline" size="sm" onclick={() => logout()}>Logout</Button>
			{:else}
				<Button variant="primary" size="sm" href="/login">Login</Button>
			{/if}
			<button
				onclick={() => document.documentElement.classList.toggle('dark')}
				class="dark:hover:bg-background-dark-secondary rounded-md p-2 transition-colors hover:bg-gray-200"
				aria-label="Toggle dark mode"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="block h-5 w-5 dark:hidden"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
					/>
				</svg>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="hidden h-5 w-5 dark:block"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-6.364-.386 1.591-1.591M3 12h2.25m.386-6.364 1.591 1.591M12 6A6 6 0 1 0 12 18a6 6 0 0 0 0-12Z"
					/>
				</svg>
			</button>
		</div>
	</nav>
</header>
