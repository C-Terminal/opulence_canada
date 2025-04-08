<script>
    // Placeholder for data loading
    let exchangeRates = $state({ // Use $state for reactive data
        'USD/CAD': 1.35,
        'EUR/USD': 1.08,
        'GBP/USD': 1.25,
    });

    // Simulate fetching data later
    $effect(() => {
        // Replace with actual API call using fetch()
        // console.log("Fetching Forex data...");
        // fetch('/api/forex-rates').then(res => res.json()).then(data => exchangeRates = data);
        return () => {
            // Cleanup function if needed
        }
    });

</script>

<svelte:head>
	<title>Foreign Exchange | FinFuture</title>
	<meta name="description" content="Real-time foreign exchange rates and dealing services." />
</svelte:head>

<div class="space-y-8">
	<h1 class="text-3xl font-bold tracking-tight text-primary dark:text-primary-light sm:text-4xl">Foreign Exchange (Forex)</h1>
	<p class="text-lg text-text-light dark:text-text-dark-muted">
		Access competitive exchange rates and manage your international currency needs seamlessly.
	</p>

	<section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {#each Object.entries(exchangeRates) as [pair, rate]}
            <div class="p-6 rounded-lg bg-white dark:bg-background-dark-secondary shadow-lg border border-transparent dark:border-gray-700/50 transition-all hover:scale-[1.02] hover:shadow-primary/20 dark:hover:shadow-primary-light/10">
                <h3 class="text-lg font-semibold text-primary dark:text-secondary">{pair}</h3>
                <p class="text-2xl font-bold mt-2">{rate.toFixed(4)}</p>
                <p class="text-sm text-gray-500 dark:text-text-dark-muted mt-1">Live Market Rate</p>
                <button class="mt-4 w-full px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background-dark-secondary">
                    Trade Now
                </button>
            </div>
         {/each}
	</section>

    <section>
        <h2 class="text-2xl font-semibold mb-4">Start Trading</h2>
        <div class="p-6 rounded-lg bg-white dark:bg-background-dark-secondary shadow">
            <p class="text-text-light dark:text-text-dark-muted">Forex trading interface coming soon...</p>
        </div>
    </section>
</div>