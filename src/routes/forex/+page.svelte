<script>
	import { ChevronUp, ChevronDown, RefreshCw, ArrowLeftRight } from '@lucide/svelte';
	import CurrencyExchangeClientSide from '$lib/components/financial/exchange/CurrencyExchangeClientSide.svelte';
  
	// Placeholder for data loading
	let exchangeRates = $state({
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
	  setTimeout(() => {
		lastUpdated = new Date();
		isLoading = false;
	  }, 1000);
	}
  
	function swapCurrencies() {
	  [fromCurrency, toCurrency] = [toCurrency, fromCurrency];
	  calculateConversion();
	}
  
	function calculateConversion() {
	  if (fromCurrency === 'USD' && toCurrency === 'CAD') {
		convertedAmount = amount * 1.35;
	  } else if (fromCurrency === 'CAD' && toCurrency === 'USD') {
		convertedAmount = amount / 1.35;
	  } else {
		convertedAmount = amount * 1.1;
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
	  <h1 class="text-3xl font-bold tracking-tight text-fintech-accent dark:text-fintech-accent">
		Foreign Exchange
	  </h1>
	  <p class="mt-2 text-base text-gray-600 dark:text-gray-400">
		Access competitive exchange rates for international currency needs.
	  </p>
	  <div class="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
		<span>Updated: {lastUpdated.toLocaleTimeString()}</span>
		<button
		  class="ml-2 rounded-full p-1 text-gray-500 dark:text-gray-400 hover:bg-fintech-muted dark:hover:bg-fintech-muted transition-colors"
		  on:click={updateRates}
		>
		  <RefreshCw size={16} class={isLoading ? 'animate-spin' : ''} />
		</button>
	  </div>
	</div>
  
	<!-- Quick Converter -->
	<div
	  class="mb-6 rounded-xl p-4 shadow-xl bg-fintech-white dark:bg-fintech-dark border border-fintech-light-gray dark:border-fintech-muted"
	>
	  <h2 class="text-lg font-semibold text-fintech-accent dark:text-fintech-accent mb-3">
		Quick Converter
	  </h2>
	  <div class="space-y-4">
		<div class="flex flex-col">
		  <label class="mb-1 text-sm text-gray-500 dark:text-gray-400">Amount</label>
		  <input
			type="number"
			bind:value={amount}
			class="rounded-lg border border-fintech-light-gray dark:border-fintech-muted bg-fintech-white dark:bg-fintech-dark-muted p-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-fintech-accent focus:border-fintech-accent transition-colors"
		  />
		</div>
  
		<div class="flex items-center">
		  <div class="flex-1">
			<label class="mb-1 text-sm text-gray-500 dark:text-gray-400">From</label>
			<select
			  bind:value={fromCurrency}
			  class="w-full rounded-lg border border-fintech-light-gray dark:border-fintech-muted bg-fintech-white dark:bg-fintech-dark-muted p-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-fintech-accent focus:border-fintech-accent transition-colors"
			>
			  {#each currencies as currency}
				<option value={currency}>{currency}</option>
			  {/each}
			</select>
		  </div>
  
		  <button
			class="mx-2 rounded-full p-2 text-gray-500 dark:text-gray-400 hover:bg-fintech-muted dark:hover:bg-fintech-muted transition-colors"
			on:click={swapCurrencies}
		  >
			<ArrowLeftRight size={20} />
		  </button>
  
		  <div class="flex-1">
			<label class="mb-1 text-sm text-gray-500 dark:text-gray-400">To</label>
			<select
			  bind:value={toCurrency}
			  class="w-full rounded-lg border border-fintech-light-gray dark:border-fintech-muted bg-fintech-white dark:bg-fintech-dark-muted p-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-fintech-accent focus:border-fintech-accent transition-colors"
			>
			  {#each currencies as currency}
				<option value={currency}>{currency}</option>
			  {/each}
			</select>
		  </div>
		</div>
  
		<div class="rounded-lg bg-fintech-light-gray dark:bg-fintech-muted p-3">
		  <div class="text-sm text-gray-500 dark:text-gray-400">Converted Amount</div>
		  <div class="text-xl font-bold text-gray-900 dark:text-white">
			{convertedAmount.toFixed(2)} {toCurrency}
		  </div>
		</div>
	  </div>
	</div>
  
	<!-- Popular Exchange Rates - Card Style -->
	<h2 class="mb-3 text-xl font-semibold text-gray-800 dark:text-white">
	  Popular Rates
	</h2>
	<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
	  {#each Object.entries(exchangeRates) as [pair, data]}
		<div
		  class="rounded-xl p-4 bg-fintech-white dark:bg-fintech-dark border border-fintech-light-gray dark:border-fintech-muted shadow-lg hover:shadow-fintech-accent/50 transition-shadow duration-300"
		>
		  <div class="flex items-center justify-between">
			<div>
			  <h3 class="text-lg font-semibold text-fintech-accent dark:text-fintech-accent">
				{pair}
			  </h3>
			  <p class="text-xs text-gray-500 dark:text-gray-400">Live Market Rate</p>
			</div>
			<div class="text-right">
			  <p class="text-2xl font-bold text-gray-900 dark:text-white">
				{data.rate.toFixed(4)}
			  </p>
			  <p
				class={`flex items-center justify-end text-xs ${
				  data.up ? 'text-green-500' : 'text-red-500'
				}`}
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
			class="mt-3 w-full rounded-lg px-4 py-3 text-fintech-dark font-medium bg-fintech-accent hover:bg-fintech-accent-muted transition-colors shadow-lg hover:shadow-fintech-accent/50"
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
	<div
	  class="mt-8 rounded-xl p-6 text-center bg-fintech-light-gray dark:bg-fintech-muted"
	>
	  <h2 class="text-xl font-semibold text-fintech-accent dark:text-fintech-accent mb-2">
		Ready to Start Trading?
	  </h2>
	  <p class="mb-4 text-gray-600 dark:text-gray-400">
		Open an account today and access competitive foreign exchange rates.
	  </p>
	  <button
		class="rounded-lg px-6 py-2 bg-fintech-accent text-fintech-dark font-medium hover:bg-fintech-accent-muted transition-colors shadow-lg hover:shadow-fintech-accent/50"
	  >
		Create Account
	  </button>
	</div>
  </div>