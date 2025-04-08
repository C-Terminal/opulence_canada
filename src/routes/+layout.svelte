<script>
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte'; 
	import '../app.css'; // Import global styles if you have them

	// Later: Add logic to check auth state, potentially from a store or server load function
	let loggedIn = $state(false); // Example: Simple reactive state for logged-in status

	function handleLogin() {
		// Placeholder: In reality, this would trigger auth flow
		loggedIn = true;
		console.log('Simulating login');
	}

	function handleLogout() {
		loggedIn = false;
		console.log('Simulating logout');
	}

</script>

<div class="flex min-h-screen flex-col bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark transition-colors duration-300">
	<Header {loggedIn}  />

	<main class="flex-grow container mx-auto px-4 py-8 md:py-12">
		<slot />
	</main>

	<Footer />
</div>

<style lang="postcss">
	/* Add any layout-specific global styles here if needed */
	:global(body) {
		@apply antialiased; /* Smoother fonts */
	}
</style>