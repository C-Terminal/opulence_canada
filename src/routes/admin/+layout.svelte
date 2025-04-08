<script>
    import AdminSidebar from '$lib/components/layout/AdminSidebar.svelte';
	import { page } from '$app/stores'; // Needed for auth check simulation or real implementation

    // --- Placeholder for Auth Check ---
    // In a real app, this logic would likely live in +layout.server.js
    // to protect the route on the server before rendering.
    import { goto } from '$app/navigation';
    import { browser } from '$app/environment'; // Check if running in browser

	// Simple check - replace with robust auth state (e.g., from cookie/store)
	let isAuthenticated = $state(false); // Use a store or load function later

	$effect(() => {
		// Simulate checking auth state - replace with real check
		// This client-side check is NOT secure for protecting routes,
		// use +layout.server.js for that. It's just for UI demo.
		if (browser) { // Only run check in browser
            // Example: Check a hypothetical auth store or localStorage (not recommended for tokens)
            const fakeToken = localStorage.getItem('fake_auth_token'); // JUST FOR DEMO
            if (fakeToken === 'logged_in') {
                isAuthenticated = true;
            } else {
                isAuthenticated = false;
                console.log("Not authenticated, redirecting from admin layout...");
                 goto('/login?redirectTo=' + page.url.pathname);
            }
		}
	});

    // You might fetch admin-specific data here using load functions later

</script>

{#if isAuthenticated}
    <div class="flex h-screen bg-background-light dark:bg-background-dark">
        <AdminSidebar />
        <div class="flex-1 flex flex-col overflow-hidden">
             <header class="bg-white dark:bg-background-dark-secondary shadow-sm dark:shadow-md p-4">
                <h1 class="text-xl font-semibold">Admin Portal</h1>
                </header>
             <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-background-dark p-6">
                <slot />
             </main>
        </div>
    </div>
{:else}
    <div class="flex items-center justify-center h-screen">
        <p>Loading...</p>
     </div>
{/if}

<style>
    /* Ensure admin layout takes full screen if needed */
</style>