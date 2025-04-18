<script>
	import { ChevronUp, ChevronDown, RefreshCw, ArrowLeftRight } from '@lucide/svelte';
  
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
  <title>Foreign Exchange | Cybernetic Currency Hub</title>
  <meta name="description" content="Real-time foreign exchange rates and dealing services in a cyber environment." />
</svelte:head>
  
<div class="container mx-auto px-4 py-8 max-w-5xl bg-cyber-midnight">
  <!-- Header with updated timestamp -->
  <div class="mb-6">
    <h1 class="text-3xl font-bold tracking-tight text-cyber-neon cyber-glow">
      Foreign Exchange
    </h1>
    <p class="mt-2 text-base text-cyber-silver">
      Access competitive exchange rates for international currency needs.
    </p>
    <div class="mt-2 flex items-center text-sm text-cyber-silver">
      <span>Updated: {lastUpdated.toLocaleTimeString()}</span>
      <button
        class="ml-2 rounded-full p-1 text-cyber-silver hover:bg-cyber-charcoal transition-colors"
        on:click={updateRates}
      >
        <RefreshCw size={16} class={isLoading ? 'animate-spin' : ''} />
      </button>
    </div>
  </div>
  
  <!-- Quick Converter -->
  <div class="mb-6 rounded-xl p-4 shadow-xl cyber-panel">
    <h2 class="text-lg font-semibold text-cyber-electric mb-3">
      Quick Converter
    </h2>
    <div class="space-y-4">
      <div class="flex flex-col">
        <label class="mb-1 text-sm text-cyber-silver">Amount</label>
        <input
          type="number"
          bind:value={amount}
          class="input input-bordered"
        />
      </div>
  
      <div class="flex items-center">
        <div class="flex-1">
          <label class="mb-1 text-sm text-cyber-silver">From</label>
          <select
            bind:value={fromCurrency}
            class="select select-bordered w-full"
          >
            {#each currencies as currency}
              <option value={currency}>{currency}</option>
            {/each}
          </select>
        </div>
  
        <button
          class="mx-2 rounded-full p-2 text-cyber-silver hover:bg-cyber-charcoal transition-colors"
          on:click={swapCurrencies}
        >
          <ArrowLeftRight size={20} />
        </button>
  
        <div class="flex-1">
          <label class="mb-1 text-sm text-cyber-silver">To</label>
          <select
            bind:value={toCurrency}
            class="select select-bordered w-full"
          >
            {#each currencies as currency}
              <option value={currency}>{currency}</option>
            {/each}
          </select>
        </div>
      </div>
  
      <div class="rounded-lg bg-cyber-black/50 p-3">
        <div class="text-sm text-cyber-silver">Converted Amount</div>
        <div class="text-xl font-bold text-cyber-neon">
          {convertedAmount.toFixed(2)} {toCurrency}
        </div>
      </div>
    </div>
  </div>
  
  <!-- Popular Exchange Rates - Card Style -->
  <h2 class="mb-3 text-xl font-semibold text-cyber-white">
    Popular Rates
  </h2>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
    {#each Object.entries(exchangeRates) as [pair, data]}
      <div class="cyber-box hover:cyber-border transition-shadow duration-300">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-semibold text-cyber-electric">
              {pair}
            </h3>
            <p class="text-xs text-cyber-silver">Live Market Rate</p>
          </div>
          <div class="text-right">
            <p class="text-2xl font-bold text-cyber-white">
              {data.rate.toFixed(4)}
            </p>
            <p
              class={`flex items-center justify-end text-xs ${
                data.up ? 'text-cyber-verify' : 'text-cyber-alert'
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
          class="mt-3 w-full rounded-lg px-4 py-3 btn-primary btn-glow"
        >
          Trade Now
        </button>
      </div>
    {/each}
  </div>
  
  <!-- Call to Action -->
  <div class="mt-8 rounded-xl p-6 text-center bg-cyber-charcoal">
    <h2 class="text-xl font-semibold text-cyber-neon mb-2 cyber-glow">
      Ready to Start Trading?
    </h2>
    <p class="mb-4 text-cyber-silver">
      Open an account today and access competitive foreign exchange rates.
    </p>
    <button
      class="rounded-lg px-6 py-2 bg-cyber-blue text-cyber-white font-medium hover:bg-cyber-electric transition-colors shadow-lg hover:shadow-cyber-blue/50 btn-glow"
    >
      Create Account
    </button>
  </div>
</div>