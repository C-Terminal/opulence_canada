<script>
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	// Component state
	let activeTab = 'remittance'; // 'remittance' or 'moneyOrder'
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

	// Fee calculation (simplified)
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
			// Simulate API call
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
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1500));
			showConfirmation = true;
		} catch (error) {
			console.error('Error processing money order:', error);
		} finally {
			isSubmitting = false;
		}
	}

	function validateRemittanceForm() {
		// Basic validation - would be more robust in production
		return (
			remittanceData.senderName &&
			remittanceData.recipientName &&
			remittanceData.recipientCountry &&
			Number(remittanceData.amount) > 0
		);
	}

	function validateMoneyOrderForm() {
		// Basic validation - would be more robust in production
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

<div class="mx-auto max-w-4xl rounded-xl bg-white p-6 shadow-xl">
	<!-- Service Selection Tabs -->
	<div class="mb-8 flex rounded-lg bg-gray-100 p-1">
		<button
			class="flex-1 rounded-lg px-6 py-3 text-center font-medium transition-all duration-200 {activeTab ===
			'remittance'
				? 'bg-blue-600 text-white shadow-md'
				: 'text-gray-600 hover:bg-gray-200'}"
			on:click={() => (activeTab = 'remittance')}
		>
			International Remittances
		</button>
		<button
			class="flex-1 rounded-lg px-6 py-3 text-center font-medium transition-all duration-200 {activeTab ===
			'moneyOrder'
				? 'bg-blue-600 text-white shadow-md'
				: 'text-gray-600 hover:bg-gray-200'}"
			on:click={() => (activeTab = 'moneyOrder')}
		>
			Money Orders
		</button>
	</div>

	{#if !showConfirmation}
		<!-- Remittance Form -->
		{#if activeTab === 'remittance'}
			<div in:fade={{ duration: 300 }}>
				<h2 class="mb-6 text-2xl font-bold text-gray-800">Send Money Home</h2>
				<p class="mb-8 text-gray-600">
					Support your loved ones by sending money back home quickly and securely with competitive
					rates.
				</p>

				<form on:submit|preventDefault={processRemittance} class="space-y-6">
					<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
						<div>
							<label for="senderName" class="mb-1 block text-sm font-medium text-gray-700"
								>Your Name</label
							>
							<input
								type="text"
								id="senderName"
								bind:value={remittanceData.senderName}
								class="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
								placeholder="Your full name"
								required
							/>
						</div>

						<div>
							<label for="recipientName" class="mb-1 block text-sm font-medium text-gray-700"
								>Recipient Name</label
							>
							<input
								type="text"
								id="recipientName"
								bind:value={remittanceData.recipientName}
								class="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
								placeholder="Recipient's full name"
								required
							/>
						</div>
					</div>

					<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
						<div>
							<label for="country" class="mb-1 block text-sm font-medium text-gray-700"
								>Recipient Country</label
							>
							<select
								id="country"
								bind:value={remittanceData.recipientCountry}
								class="w-full rounded-lg border border-gray-300 bg-white p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
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
								<label for="amount" class="mb-1 block text-sm font-medium text-gray-700"
									>Amount</label
								>
								<input
									type="number"
									id="amount"
									bind:value={remittanceData.amount}
									min="1"
									step="0.01"
									class="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
									placeholder="0.00"
									required
								/>
							</div>

							<div>
								<label for="currency" class="mb-1 block text-sm font-medium text-gray-700"
									>Currency</label
								>
								<select
									id="currency"
									bind:value={remittanceData.currency}
									class="w-full rounded-lg border border-gray-300 bg-white p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
								>
									{#each currencies as currency}
										<option value={currency}>{currency}</option>
									{/each}
								</select>
							</div>
						</div>
					</div>

					<div>
						<label for="paymentMethod" class="mb-1 block text-sm font-medium text-gray-700"
							>Payment Method</label
						>
						<div class="grid grid-cols-1 gap-3 md:grid-cols-3">
							<label
								class="relative flex cursor-pointer items-center rounded-lg border border-gray-300 p-3 hover:bg-gray-50"
							>
								<input
									id="paymentMethod"
									type="radio"
									name="paymentMethod"
									value="bank"
									bind:group={remittanceData.paymentMethod}
									class="h-4 w-4 text-blue-600 focus:ring-blue-500"
								/>
								<span class="ml-3">Bank Transfer</span>
							</label>

							<label
								class="relative flex cursor-pointer items-center rounded-lg border border-gray-300 p-3 hover:bg-gray-50"
							>
								<input
									type="radio"
									name="paymentMethod"
									value="card"
									bind:group={remittanceData.paymentMethod}
									class="h-4 w-4 text-blue-600 focus:ring-blue-500"
								/>
								<span class="ml-3">Debit/Credit</span>
							</label>

							<label
								class="relative flex cursor-pointer items-center rounded-lg border border-gray-300 p-3 hover:bg-gray-50"
							>
								<input
									type="radio"
									name="paymentMethod"
									value="cash"
									bind:group={remittanceData.paymentMethod}
									class="h-4 w-4 text-blue-600 focus:ring-blue-500"
								/>
								<span class="ml-3">Cash Deposit</span>
							</label>
						</div>
					</div>

					{#if remittanceData.amount}
						<div class="rounded-lg border border-gray-200 bg-gray-50 p-4">
							<div class="mb-2 flex items-center justify-between">
								<span class="text-gray-600">Amount</span>
								<span class="font-medium"
									>{parseFloat(remittanceData.amount).toFixed(2)} {remittanceData.currency}</span
								>
							</div>
							<div class="mb-2 flex items-center justify-between">
								<span class="text-gray-600">Transfer Fee</span>
								<span class="font-medium">{remittanceFee.toFixed(2)} {remittanceData.currency}</span
								>
							</div>
							<div class="my-2 border-t border-gray-300"></div>
							<div class="flex items-center justify-between font-bold">
								<span>Total</span>
								<span
									>{(Number(remittanceData.amount || 0) + remittanceFee).toFixed(2)}
									{remittanceData.currency}</span
								>
							</div>
						</div>
					{/if}

					<button
						type="submit"
						class="w-full rounded-lg bg-blue-600 px-6 py-4 font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:bg-gray-400"
						disabled={isSubmitting}
					>
						{isSubmitting ? 'Processing...' : 'Send Remittance'}
					</button>
				</form>
			</div>
		{/if}

		<!-- Money Order Form -->
		{#if activeTab === 'moneyOrder'}
			<div in:fade={{ duration: 300 }}>
				<h2 class="mb-6 text-2xl font-bold text-gray-800">Purchase Money Orders</h2>
				<p class="mb-8 text-gray-600">
					Secure alternative to cash or personal checks for convenient and trackable payments.
				</p>

				<form on:submit|preventDefault={processMoneyOrder} class="space-y-6">
					<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
						<div>
							<label for="purchaserName" class="mb-1 block text-sm font-medium text-gray-700"
								>Purchaser Name</label
							>
							<input
								type="text"
								id="purchaserName"
								bind:value={moneyOrderData.purchaserName}
								class="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
								placeholder="Your full name"
								required
							/>
						</div>

						<div>
							<label for="moRecipientName" class="mb-1 block text-sm font-medium text-gray-700"
								>Payable To</label
							>
							<input
								type="text"
								id="moRecipientName"
								bind:value={moneyOrderData.recipientName}
								class="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
								placeholder="Recipient's name or business"
								required
							/>
						</div>
					</div>

					<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
						<div class="grid grid-cols-2 gap-3">
							<div>
								<label for="moAmount" class="mb-1 block text-sm font-medium text-gray-700"
									>Amount</label
								>
								<input
									type="number"
									id="moAmount"
									bind:value={moneyOrderData.amount}
									min="1"
									max="1000"
									step="0.01"
									class="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
									placeholder="0.00"
									required
								/>
							</div>

							<div>
								<label for="moCurrency" class="mb-1 block text-sm font-medium text-gray-700"
									>Currency</label
								>
								<select
									id="moCurrency"
									bind:value={moneyOrderData.currency}
									class="w-full rounded-lg border border-gray-300 bg-white p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
								>
									{#each currencies.slice(0, 3) as currency}
										<option value={currency}>{currency}</option>
									{/each}
								</select>
							</div>
						</div>

						<div>
							<fieldset>
								<legend class="mb-1 block text-sm font-medium text-gray-700">Delivery Method</legend
								>
								<div class="grid grid-cols-2 gap-3">
									<label
										class="relative flex cursor-pointer items-center rounded-lg border border-gray-300 p-3 hover:bg-gray-50"
									>
										<input
											type="radio"
											name="deliveryMethod"
											value="pickup"
											bind:group={moneyOrderData.deliveryMethod}
											class="h-4 w-4 text-blue-600 focus:ring-blue-500"
										/>
										<span class="ml-3">In-store Pickup</span>
									</label>
									<label
										class="relative flex cursor-pointer items-center rounded-lg border border-gray-300 p-3 hover:bg-gray-50"
									>
										<input
											type="radio"
											name="deliveryMethod"
											value="mail"
											bind:group={moneyOrderData.deliveryMethod}
											class="h-4 w-4 text-blue-600 focus:ring-blue-500"
										/>
										<span class="ml-3">Mail Delivery</span>
									</label>
								</div>
							</fieldset>
						</div>

						{#if moneyOrderData.amount}
							<div class="rounded-lg border border-gray-200 bg-gray-50 p-4">
								<div class="mb-2 flex items-center justify-between">
									<span class="text-gray-600">Money Order Amount</span>
									<span class="font-medium"
										>{parseFloat(moneyOrderData.amount).toFixed(2)} {moneyOrderData.currency}</span
									>
								</div>
								<div class="mb-2 flex items-center justify-between">
									<span class="text-gray-600">Service Fee</span>
									<span class="font-medium"
										>{moneyOrderFee.toFixed(2)} {moneyOrderData.currency}</span
									>
								</div>
								{#if moneyOrderData.deliveryMethod === 'mail'}
									<div class="mb-2 flex items-center justify-between">
										<span class="text-gray-600">Shipping</span>
										<span class="font-medium">5.00 {moneyOrderData.currency}</span>
									</div>
								{/if}
								<div class="my-2 border-t border-gray-300"></div>
								<div class="flex items-center justify-between font-bold">
									<span>Total</span>
									<span>
										{(
											Number(moneyOrderData.amount || 0) +
											moneyOrderFee +
											(moneyOrderData.deliveryMethod === 'mail' ? 5 : 0)
										).toFixed(2)}
										{moneyOrderData.currency}
									</span>
								</div>
							</div>
						{/if}

						<button
							type="submit"
							class="w-full rounded-lg bg-blue-600 px-6 py-4 font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:bg-gray-400"
							disabled={isSubmitting}
						>
							{isSubmitting ? 'Processing...' : 'Purchase Money Order'}
						</button>
					</div>
				</form>
			</div>
		{/if}
	{:else}
		<!-- Confirmation Screen -->
		<div in:fly={{ y: 20, duration: 500 }} class="py-6 text-center">
			<div class="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-8 w-8 text-green-600"
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

			<h2 class="mb-2 text-2xl font-bold text-gray-800">
				{activeTab === 'remittance' ? 'Remittance Sent!' : 'Money Order Purchased!'}
			</h2>

			<p class="mb-6 text-gray-600">
				{#if activeTab === 'remittance'}
					Your money is on its way to {remittanceData.recipientName} in {remittanceData.recipientCountry}.
				{:else}
					Your money order has been processed and will be {moneyOrderData.deliveryMethod === 'mail'
						? 'mailed to you'
						: 'available for pickup'}.
				{/if}
			</p>

			<div class="mx-auto mb-8 max-w-sm rounded-lg border border-gray-200 bg-gray-50 p-4">
				<div class="mb-2 flex items-center justify-between">
					<span class="text-gray-600">Reference ID</span>
					<span class="font-medium"
						>{Math.random().toString(36).substring(2, 10).toUpperCase()}</span
					>
				</div>
				<div class="mb-2 flex items-center justify-between">
					<span class="text-gray-600">Date</span>
					<span class="font-medium">{new Date().toLocaleDateString()}</span>
				</div>
				<div class="flex items-center justify-between">
					<span class="text-gray-600">Status</span>
					<span
						class="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800"
					>
						Completed
					</span>
				</div>
			</div>

			<button
				on:click={resetForms}
				class="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
			>
				Return to Form
			</button>
		</div>
	{/if}
</div>
