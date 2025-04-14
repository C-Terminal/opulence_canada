<script>
	import { ChevronUp, ChevronDown, RefreshCw, ArrowLeftRight } from '@lucide/svelte';
	import CurrencyExchangeClientSide from '$lib/components/financial/exchange/CurrencyExchangeClientSide.svelte';

	// Placeholder for data loading
	let exchangeRates = $state({
		// Use $state for reactive data
		'USD/CAD': { rate: 1.35, change: 0.002, up: true },
		'EUR/USD': { rate: 1.08, change: -0.003, up: false },
		'GBP/USD': { rate: 1.25, change: 0.001, up: true }
	});

	let lastUpdated = $state(new Date());
	let isLoading = $state(false);

	// Simple converter state
	let fromCurrency = $state('USD');
	let toCurrency = $state('CAD');
	let amount = $state(1000);
	let convertedAmount = $state(1350);

	const currencies = ['USD', 'CAD', 'EUR', 'GBP', 'JPY', 'AUD'];

	function updateRates() {
		isLoading = true;
		// Simulate API call delay
		setTimeout(() => {
			// In real implementation, call your API here
			lastUpdated = new Date();
			isLoading = false;
		}, 1000);
	}

	function swapCurrencies() {
		[fromCurrency, toCurrency] = [toCurrency, fromCurrency];
		calculateConversion();
	}

	function calculateConversion() {
		// Simple mock conversion - would be replaced with actual conversion logic
		if (fromCurrency === 'USD' && toCurrency === 'CAD') {
			convertedAmount = amount * 1.35;
		} else if (fromCurrency === 'CAD' && toCurrency === 'USD') {
			convertedAmount = amount / 1.35;
		} else {
			convertedAmount = amount * 1.1; // Default mock conversion
		}
	}

	$effect(() => {
		calculateConversion();
	});
</script>

<svelte:head>
	<title>Foreign Exchange | Opulent Canada</title>
	<meta name="description" content="Real-time foreign exchange rates and dealing services." />
</svelte:head>

<div class="container mx-auto px-4 py-8">
	<!-- Header with updated timestamp -->
	<div class="mb-6">
		<h1 class="text-primary dark:text-primary-light mb-2 text-3xl font-bold">Foreign Exchange</h1>
		<p class="text-base text-gray-600 dark:text-gray-300">
			Access competitive exchange rates for international currency needs.
		</p>
		<div class="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
			<span>Updated: {lastUpdated.toLocaleTimeString()}</span>
			<button
				class="ml-2 rounded-full p-1 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
				on:click={updateRates}
			>
				<RefreshCw size={16} class={isLoading ? 'animate-spin' : ''} />
			</button>
		</div>
	</div>

	<!-- Quick Converter -->
	<div class="mb-6 rounded-xl bg-white p-4 shadow-md dark:bg-gray-800">
		<h2 class="text-primary dark:text-primary-light mb-3 text-lg font-semibold">Quick Converter</h2>
		<div class="space-y-4">
			<div class="flex flex-col">
				<label class="mb-1 text-sm text-gray-500 dark:text-gray-400">Amount</label>
				<input
					type="number"
					bind:value={amount}
					class="rounded-lg border border-gray-300 bg-gray-50 p-2 dark:border-gray-600 dark:bg-gray-700"
				/>
			</div>

			<div class="flex items-center">
				<div class="flex-1">
					<label class="mb-1 text-sm text-gray-500 dark:text-gray-400">From</label>
					<select
						bind:value={fromCurrency}
						class="w-full rounded-lg border border-gray-300 bg-gray-50 p-2 dark:border-gray-600 dark:bg-gray-700"
					>
						{#each currencies as currency}
							<option value={currency}>{currency}</option>
						{/each}
					</select>
				</div>

				<button
					class="mx-2 rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
					on:click={swapCurrencies}
				>
					<ArrowLeftRight size={20} />
				</button>

				<div class="flex-1">
					<label class="mb-1 text-sm text-gray-500 dark:text-gray-400">To</label>
					<select
						bind:value={toCurrency}
						class="w-full rounded-lg border border-gray-300 bg-gray-50 p-2 dark:border-gray-600 dark:bg-gray-700"
					>
						{#each currencies as currency}
							<option value={currency}>{currency}</option>
						{/each}
					</select>
				</div>
			</div>

			<div class="rounded-lg bg-gray-50 p-3 dark:bg-gray-700">
				<div class="text-sm text-gray-500 dark:text-gray-400">Converted Amount</div>
				<div class="text-xl font-bold">
					{convertedAmount.toFixed(2)}
					{toCurrency}
				</div>
			</div>
		</div>
	</div>

	<!-- Popular Exchange Rates - Card Style -->
	<h2 class="mb-3 text-xl font-semibold text-gray-800 dark:text-gray-200">Popular Rates</h2>
	<div class="grid grid-cols-1 gap-4">
		{#each Object.entries(exchangeRates) as [pair, data]}
			<div
				class="rounded-xl border border-gray-100 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800"
			>
				<div class="flex items-center justify-between">
					<div>
						<h3 class="text-primary dark:text-primary-light text-lg font-semibold">{pair}</h3>
						<p class="text-xs text-gray-500 dark:text-gray-400">Live Market Rate</p>
					</div>
					<div class="text-right">
						<p class="text-2xl font-bold">{data.rate.toFixed(4)}</p>
						<p
							class={`flex items-center justify-end text-xs ${data.up ? 'text-green-500' : 'text-red-500'}`}
						>
							{#if data.up}
								<ChevronUp size={16} />
							{:else}
								<ChevronDown size={16} />
							{/if}
							{Math.abs(data.change).toFixed(4)}
						</p>
					</div>
				</div>
				<button
					class="bg-primary hover:bg-primary-dark mt-3 w-full rounded-lg px-4 py-3 font-medium text-white transition-colors"
				>
					Trade Now
				</button>
			</div>
		{/each}
	</div>

	<!-- Hidden on mobile, will show on larger screens -->
	<div class="mt-8 hidden md:block">
		<CurrencyExchangeClientSide />
	</div>

	<!-- Call to Action -->
	 <!-- TODO: Change purple color (accessibility) -->
	<div class="bg-primary/10 dark:bg-primary/5 mt-8 rounded-xl p-6 text-center">
		<h2 class="text-primary dark:text-primary-light mb-2 text-xl font-semibold">
			Ready to Start Trading?
		</h2>
		<p class="mb-4 text-gray-600 dark:text-gray-300">
			Open an account today and access competitive foreign exchange rates.
		</p>
		<button
			class="bg-primary hover:bg-primary-dark rounded-lg px-6 py-2 font-medium text-white transition-colors"
		>
			Create Account
		</button>
	</div>
</div>
