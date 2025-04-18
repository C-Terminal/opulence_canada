<script>
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
  
	// Component state
	let activeTab = 'remittance';
	let isSubmitting = false;
	let showConfirmation = false;
  
	// Form data
	let remittanceData = {
	  senderName: '',
	  recipientName: '',
	  recipientCountry: '',
	  amount: '',
	  currency: 'CAD',
	  paymentMethod: 'bank'
	};
  
	let moneyOrderData = {
	  purchaserName: '',
	  recipientName: '',
	  amount: '',
	  currency: 'CAD',
	  deliveryMethod: 'pickup'
	};
  
	// Available options
	const currencies = ['CAD', 'USD', 'EUR', 'GBP', 'INR', 'PHP', 'MXN', 'CNY'];
	const countries = [
	  'India',
	  'Philippines',
	  'Mexico',
	  'China',
	  'Nigeria',
	  'Pakistan',
	  'Vietnam',
	  'United States',
	  'United Kingdom'
	];
  
	// Fee calculation
	$: remittanceFee = remittanceData.amount
	  ? Math.min(Math.max(parseFloat(remittanceData.amount) * 0.03, 5), 25)
	  : 0;
	$: moneyOrderFee = moneyOrderData.amount
	  ? Math.min(Math.max(parseFloat(moneyOrderData.amount) * 0.02, 3), 15)
	  : 0;
  
	// Processing functions
	async function processRemittance() {
	  if (!validateRemittanceForm()) return;
	  isSubmitting = true;
	  try {
		await new Promise((resolve) => setTimeout(resolve, 1500));
		showConfirmation = true;
	  } catch (error) {
		console.error('Error processing remittance:', error);
	  } finally {
		isSubmitting = false;
	  }
	}
  
	async function processMoneyOrder() {
	  if (!validateMoneyOrderForm()) return;
	  isSubmitting = true;
	  try {
		await new Promise((resolve) => setTimeout(resolve, 1500));
		showConfirmation = true;
	  } catch (error) {
		console.error('Error processing money order:', error);
	  } finally {
		isSubmitting = false;
	  }
	}
  
	function validateRemittanceForm() {
	  return (
		remittanceData.senderName &&
		remittanceData.recipientName &&
		remittanceData.recipientCountry &&
		Number(remittanceData.amount) > 0
	  );
	}
  
	function validateMoneyOrderForm() {
	  return (
		moneyOrderData.purchaserName &&
		moneyOrderData.recipientName &&
		Number(moneyOrderData.amount) > 0
	  );
	}
  
	function resetForms() {
	  showConfirmation = false;
	  remittanceData = {
		senderName: '',
		recipientName: '',
		recipientCountry: '',
		amount: '',
		currency: 'CAD',
		paymentMethod: 'bank'
	  };
	  moneyOrderData = {
		purchaserName: '',
		recipientName: '',
		amount: '',
		currency: 'CAD',
		deliveryMethod: 'pickup'
	  };
	}
  </script>
  
  <div
	class="font-serif mx-auto max-w-4xl p-6 rounded-xl bg-fintech-white dark:bg-fintech-dark border border-fintech-light-gray dark:border-fintech-muted shadow-xl"
  >
	<!-- Service Selection Tabs -->
	<div class="mb-8 flex rounded-lg bg-fintech-light-gray dark:bg-fintech-muted p-1">
	  <button
		class="flex-1 rounded-lg px-6 py-3 text-center font-medium transition-all duration-200 {activeTab === 'remittance'
		  ? 'bg-fintech-accent dark:text-fintech-dark text-fintech-white shadow-md'
		  : 'text-gray-600 dark:text-gray-200 hover:bg-fintech-gray dark:hover:bg-fintech-dark-gray'}"
		on:click={() => (activeTab = 'remittance')}
	  >
		International Remittances
	  </button>
	  <button
		class="flex-1 rounded-lg px-6 py-3 text-center font-medium transition-all duration-200 {activeTab === 'moneyOrder'
		  ? 'bg-fintech-accent dark:text-fintech-dark text-fintech-white shadow-md'
		  : 'text-gray-600 dark:text-gray-200 hover:bg-fintech-gray dark:hover:bg-fintech-dark-gray'}"
		on:click={() => (activeTab = 'moneyOrder')}
	  >
		Money Orders
	  </button>
	</div>
  
	{#if !showConfirmation}
	  <!-- Remittance Form -->
	  {#if activeTab === 'remittance'}
		<div in:fade={{ duration: 400 }}>
		  <h2 class="mb-6 text-2xl font-bold tracking-tight text-fintech-accent dark:text-fintech-yellow">
			Send Money Home
		  </h2>
		  <p class="mb-8 text-gray-600 dark:text-gray-200">
			Support your loved ones by sending money back home quickly and securely with competitive
			rates.
		  </p>
  
		  <form on:submit|preventDefault={processRemittance} class="space-y-6">
			<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
			  <div>
				<label
				  for="senderName"
				  class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200"
				>
				  Your Name
				</label>
				<input
				  type="text"
				  id="senderName"
				  bind:value={remittanceData.senderName}
				  class="w-full rounded-lg border border-fintech-light-gray dark:border-fintech-muted p-3 bg-fintech-white dark:bg-fintech-dark-muted text-gray-900 dark:text-white focus:border-fintech-accent focus:ring-2 focus:ring-fintech-accent transition-colors"
				  placeholder="Your full name"
				  required
				/>
			  </div>
			  <div>
				<label
				  for="recipientName"
				  class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200"
				>
				  Recipient Name
				</label>
				<input
				  type="text"
				  id="recipientName"
				  bind:value={remittanceData.recipientName}
				  class="w-full rounded-lg border border-fintech-light-gray dark:border-fintech-muted p-3 bg-fintech-white dark:bg-fintech-dark-muted text-gray-900 dark:text-white focus:border-fintech-accent focus:ring-2 focus:ring-fintech-accent transition-colors"
				  placeholder="Recipient's full name"
				  required
				/>
			  </div>
			</div>
  
			<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
			  <div>
				<label
				  for="country"
				  class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200"
				>
				  Recipient Country
				</label>
				<select
				  id="country"
				  bind:value={remittanceData.recipientCountry}
				  class="w-full rounded-lg border border-fintech-light-gray dark:border-fintech-muted p-3 bg-fintech-white dark:bg-fintech-dark-muted text-gray-900 dark:text-white focus:border-fintech-accent focus:ring-2 focus:ring-fintech-accent transition-colors"
				  required
				>
				  <option value="" disabled selected>Select a country</option>
				  {#each countries as country}
					<option value={country}>{country}</option>
				  {/each}
				</select>
			  </div>
  
			  <div class="grid grid-cols-2 gap-3">
				<div>
				  <label
					for="amount"
					class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200"
				  >
					Amount
				  </label>
				  <input
					type="number"
					id="amount"
					bind:value={remittanceData.amount}
					min="1"
					step="0.01"
					class="w-full rounded-lg border border-fintech-light-gray dark:border-fintech-muted p-3 bg-fintech-white dark:bg-fintech-dark-muted text-gray-900 dark:text-white focus:border-fintech-accent focus:ring-2 focus:ring-fintech-accent transition-colors"
					placeholder="0.00"
					required
				  />
				</div>
				<div>
				  <label
					for="currency"
					class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200"
				  >
					Currency
				  </label>
				  <select
					id="currency"
					bind:value={remittanceData.currency}
					class="w-full rounded-lg border border-fintech-light-gray dark:border-fintech-muted p-3 bg-fintech-white dark:bg-fintech-dark-muted text-gray-900 dark:text-white focus:border-fintech-accent focus:ring-2 focus:ring-fintech-accent transition-colors"
				  >
					{#each currencies as currency}
					  <option value={currency}>{currency}</option>
					{/each}
				  </select>
				</div>
			  </div>
			</div>
  
			<div>
			  <label
				for="paymentMethod"
				class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200"
			  >
				Payment Method
			  </label>
			  <div class="grid grid-cols-1 gap-3 md:grid-cols-3">
				<label
				  class="relative flex cursor-pointer items-center rounded-lg border border-fintech-light-gray dark:border-fintech-muted p-3 bg-fintech-white dark:bg-fintech-dark-muted hover:bg-fintech-light-gray/50 dark:hover:bg-fintech-gray"
				>
				  <input
					id="paymentMethod"
					type="radio"
					name="paymentMethod"
					value="bank"
					bind:group={remittanceData.paymentMethod}
					class="h-4 w-4 text-fintech-accent focus:ring-fintech-accent"
				  />
				  <span class="ml-3 text-gray-900 dark:text-white">Bank Transfer</span>
				</label>
				<label
				  class="relative flex cursor-pointer items-center rounded-lg border border-fintech-light-gray dark:border-fintech-muted p-3 bg-fintech-white dark:bg-fintech-dark-muted hover:bg-fintech-light-gray/50 dark:hover:bg-fintech-gray"
				>
				  <input
					type="radio"
					name="paymentMethod"
					value="card"
					bind:group={remittanceData.paymentMethod}
					class="h-4 w-4 text-fintech-accent focus:ring-fintech-accent"
				  />
				  <span class="ml-3 text-gray-900 dark:text-white">Debit/Credit</span>
				</label>
				<label
				  class="relative flex cursor-pointer items-center rounded-lg border border-fintech-light-gray dark:border-fintech-muted p-3 bg-fintech-white dark:bg-fintech-dark-muted hover:bg-fintech-light-gray/50 dark:hover:bg-fintech-gray"
				>
				  <input
					type="radio"
					name="paymentMethod"
					value="cash"
					bind:group={remittanceData.paymentMethod}
					class="h-4 w-4 text-fintech-accent focus:ring-fintech-accent"
				  />
				  <span class="ml-3 text-gray-900 dark:text-white">Cash Deposit</span>
				</label>
			  </div>
			</div>
  
			{#if remittanceData.amount}
			  <div
				class="rounded-lg border border-fintech-light-gray dark:border-fintech-muted bg-fintech-white dark:bg-fintech-muted p-4"
			  >
				<div class="mb-2 flex items-center justify-between">
				  <span class="text-gray-600 dark:text-gray-200">Amount</span>
				  <span class="font-medium text-gray-900 dark:text-white"
					>{parseFloat(remittanceData.amount).toFixed(2)} {remittanceData.currency}</span
				  >
				</div>
				<div class="mb-2 flex items-center justify-between">
				  <span class="text-gray-600 dark:text-gray-200">Transfer Fee</span>
				  <span class="font-medium text-gray-900 dark:text-white"
					>{remittanceFee.toFixed(2)} {remittanceData.currency}</span
				  >
				</div>
				<div class="my-2 border-t border-fintech-light-gray dark:border-fintech-gray"></div>
				<div class="flex items-center justify-between font-bold">
				  <span class="text-gray-900 dark:text-white">Total</span>
				  <span class="text-gray-900 dark:text-white"
					>{(Number(remittanceData.amount || 0) + remittanceFee).toFixed(2)}
					{remittanceData.currency}</span
				  >
				</div>
			  </div>
			{/if}
  
			<button
			  type="submit"
			  class="w-full rounded-lg bg-fintech-accent text-fintech-white px-6 py-4 font-medium  transition-colors shadow-lg hover:shadow-fintech-accent/50 focus:ring-2 focus:ring-fintech-accent focus:ring-offset-2 focus:outline-none disabled:bg-fintech-gray disabled:text-gray-200"
			  disabled={isSubmitting}
			>
			  {isSubmitting ? 'Processing...' : 'Send Remittance'}
			</button>
		  </form>
		</div>
	  {/if}
  
	  <!-- Money Order Form -->
	  {#if activeTab === 'moneyOrder'}
		<div in:fade={{ duration: 400 }}>
		  <h2 class="mb-6 text-2xl font-bold tracking-tight text-fintech-accent dark:text-fintech-accent">
			Purchase Money Orders
		  </h2>
		  <p class="mb-8 text-gray-600 dark:text-gray-200">
			Secure alternative to cash or personal checks for convenient and trackable payments.
		  </p>
  
		  <form on:submit|preventDefault={processMoneyOrder} class="space-y-6">
			<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
			  <div>
				<label
				  for="purchaserName"
				  class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200"
				>
				  Purchaser Name
				</label>
				<input
				  type="text"
				  id="purchaserName"
				  bind:value={moneyOrderData.purchaserName}
				  class="w-full rounded-lg border border-fintech-light-gray dark:border-fintech-muted p-3 bg-fintech-white dark:bg-fintech-dark-muted text-gray-900 dark:text-white focus:border-fintech-accent focus:ring-2 focus:ring-fintech-accent transition-colors"
				  placeholder="Your full name"
				  required
				/>
			  </div>
			  <div>
				<label
				  for="moRecipientName"
				  class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200"
				>
				  Payable To
				</label>
				<input
				  type="text"
				  id="moRecipientName"
				  bind:value={moneyOrderData.recipientName}
				  class="w-full rounded-lg border border-fintech-light-gray dark:border-fintech-muted p-3 bg-fintech-white dark:bg-fintech-dark-muted text-gray-900 dark:text-white focus:border-fintech-accent focus:ring-2 focus:ring-fintech-accent transition-colors"
				  placeholder="Recipient's name or business"
				  required
				/>
			  </div>
			</div>
  
			<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
			  <div class="grid grid-cols-2 gap-3">
				<div>
				  <label
					for="moAmount"
					class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200"
				  >
					Amount
				  </label>
				  <input
					type="number"
					id="moAmount"
					bind:value={moneyOrderData.amount}
					min="1"
					max="1000"
					step="0.01"
					class="w-full rounded-lg border border-fintech-light-gray dark:border-fintech-muted p-3 bg-fintech-white dark:bg-fintech-dark-muted text-gray-900 dark:text-white focus:border-fintech-accent focus:ring-2 focus:ring-fintech-accent transition-colors"
					placeholder="0.00"
					required
				  />
				</div>
				<div>
				  <label
					for="moCurrency"
					class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200"
				  >
					Currency
				  </label>
				  <select
					id="moCurrency"
					bind:value={moneyOrderData.currency}
					class="w-full rounded-lg border border-fintech-light-gray dark:border-fintech-muted p-3 bg-fintech-white dark:bg-fintech-dark-muted text-gray-900 dark:text-white focus:border-fintech-accent focus:ring-2 focus:ring-fintech-accent transition-colors"
				  >
					{#each currencies.slice(0, 3) as currency}
					  <option value={currency}>{currency}</option>
					{/each}
				  </select>
				</div>
			  </div>
  
			  <div>
				<fieldset>
				  <legend
					class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200"
				  >
					Delivery Method
				  </legend>
				  <div class="grid grid-cols-2 gap-3">
					<label
					  class="relative flex cursor-pointer items-center rounded-lg border border-fintech-light-gray dark:border-fintech-muted p-3 bg-fintech-white dark:bg-fintech-dark-muted hover:bg-fintech-light-gray/50 dark:hover:bg-fintech-gray"
					>
					  <input
						type="radio"
						name="deliveryMethod"
						value="pickup"
						bind:group={moneyOrderData.deliveryMethod}
						class="h-4 w-4 text-fintech-accent focus:ring-fintech-accent"
					  />
					  <span class="ml-3 text-gray-900 dark:text-white">In-store Pickup</span>
					</label>
					<label
					  class="relative flex cursor-pointer items-center rounded-lg border border-fintech-light-gray dark:border-fintech-muted p-3 bg-fintech-white dark:bg-fintech-dark-muted hover:bg-fintech-light-gray/50 dark:hover:bg-fintech-gray"
					>
					  <input
						type="radio"
						name="deliveryMethod"
						value="mail"
						bind:group={moneyOrderData.deliveryMethod}
						class="h-4 w-4 text-fintech-accent focus:ring-fintech-accent"
					  />
					  <span class="ml-3 text-gray-900 dark:text-white">Mail Delivery</span>
					</label>
				  </div>
				</fieldset>
			  </div>
			</div>
  
			{#if moneyOrderData.amount}
			  <div
				class="rounded-lg border border-fintech-light-gray dark:border-fintech-muted bg-fintech-white dark:bg-fintech-muted p-4"
			  >
				<div class="mb-2 flex items-center justify-between">
				  <span class="text-gray-600 dark:text-gray-200">Money Order Amount</span>
				  <span class="font-medium text-gray-900 dark:text-white"
					>{parseFloat(moneyOrderData.amount).toFixed(2)} {moneyOrderData.currency}</span
				  >
				</div>
				<div class="mb-2 flex items-center justify-between">
				  <span class="text-gray-600 dark:text-gray-200">Service Fee</span>
				  <span class="font-medium text-gray-900 dark:text-white"
					>{moneyOrderFee.toFixed(2)} {moneyOrderData.currency}</span
				  >
				</div>
				{#if moneyOrderData.deliveryMethod === 'mail'}
				  <div class="mb-2 flex items-center justify-between">
					<span class="text-gray-600 dark:text-gray-200">Shipping</span>
					<span class="font-medium text-gray-900 dark:text-white"
					  >5.00 {moneyOrderData.currency}</span
					>
				  </div>
				{/if}
				<div class="my-2 border-t border-fintech-light-gray dark:border-fintech-gray"></div>
				<div class="flex items-center justify-between font-bold">
				  <span class="text-gray-900 dark:text-white">Total</span>
				  <span class="text-gray-900 dark:text-white"
					>{(Number(moneyOrderData.amount || 0) + moneyOrderFee + (moneyOrderData.deliveryMethod === 'mail' ? 5 : 0)).toFixed(2)} {moneyOrderData.currency}</span
				  >
				</div>
			  </div>
			{/if}
  
			<button
			  type="submit"
			  class="w-full rounded-lg bg-fintech-accent text-fintech-white px-6 py-4 font-medium  transition-colors shadow-lg hover:shadow-fintech-accent/50 focus:ring-2 focus:ring-fintech-accent focus:ring-offset-2 focus:outline-none disabled:bg-fintech-gray disabled:text-gray-200"
			  disabled={isSubmitting}
			>
			  {isSubmitting ? 'Processing...' : 'Purchase Money Order'}
			</button>
		  </form>
		</div>
	  {/if}
	{:else}
	  <!-- Confirmation Screen -->
	  <div in:fly={{ y: 20, duration: 600 }} class="py-6 text-center">
		<div
		  class="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-fintech-green/10 dark:bg-fintech-green/20"
		>
		  <svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-8 w-8 text-fintech-green"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		  >
			<path
			  stroke-linecap="round"
			  stroke-linejoin="round"
			  stroke-width="2"
			  d="M5 13l4 4L19 7"
			/>
		  </svg>
		</div>
  
		<h2
		  class="mb-2 text-2xl font-bold tracking-tight text-fintech-accent dark:text-fintech-accent"
		>
		  {activeTab === 'remittance' ? 'Remittance Sent!' : 'Money Order Purchased!'}
		</h2>
  
		<p class="mb-6 text-gray-600 dark:text-gray-200">
		  {#if activeTab === 'remittance'}
			Your money is on its way to {remittanceData.recipientName} in {remittanceData.recipientCountry}.
		  {:else}
			Your money order has been processed and will be {moneyOrderData.deliveryMethod === 'mail'
			  ? 'mailed to you'
			  : 'available for pickup'}.
		  {/if}
		</p>
  
		<div
		  class="mx-auto mb-8 max-w-sm rounded-lg border border-fintech-light-gray dark:border-fintech-muted bg-fintech-white dark:bg-fintech-muted p-4"
		>
		  <div class="mb-2 flex items-center justify-between">
			<span class="text-gray-600 dark:text-gray-200">Reference ID</span>
			<span class="font-medium text-gray-900 dark:text-white"
			  >{Math.random().toString(36).substring(2, 10).toUpperCase()}</span
			>
		  </div>
		  <div class="mb-2 flex items-center justify-between">
			<span class="text-gray-600 dark:text-gray-200">Date</span>
			<span class="font-medium text-gray-900 dark:text-white"
			  >{new Date().toLocaleDateString()}</span
			>
		  </div>
		  <div class="flex items-center justify-between">
			<span class="text-gray-600 dark:text-gray-200">Status</span>
			<span
			  class="inline-flex items-center rounded-full bg-fintech-green/10 dark:bg-fintech-green/20 px-2.5 py-0.5 text-xs font-medium text-fintech-green"
			>
			  Completed
			</span>
		  </div>
		</div>
  
		<button
		  on:click={resetForms}
		  class="inline-flex items-center rounded-lg bg-fintech-accent text-fintech-dark px-6 py-3 font-medium shadow-lg hover:bg-fintech-accent-muted hover:shadow-fintech-accent/50 focus:ring-2 focus:ring-fintech-accent focus:ring-offset-2 focus:outline-none"
		>
		  Return to Form
		</button>
	  </div>
	{/if}
  </div>