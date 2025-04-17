<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	// Form data
	let recipientData = $state({
		fullName: '',
		email: '',
		accountNumber: '',
		routingNumber: '',
		accountType: 'checking',
		address: {
			line1: '',
			line2: '',
			city: '',
			state: '',
			postalCode: '',
			country: 'US'
		},
		description: ''
	});

	interface Errors {
		accountType?: string;
		city?: string;
		state?: string;
		postalCode?: string;
		fullName?: string;
		email?: string;
		accountNumber?: string;
		routingNumber?: string;
		addressLine1?: string;
	}

	// Validation state
	let errors: Errors = $state({});
	let formSubmitted = $state(false);
	let formValid = $state(false);

	// Country options
	const countries = [
		{ code: 'US', name: 'United States' },
		{ code: 'CA', name: 'Canada' },
		{ code: 'GB', name: 'United Kingdom' },
		{ code: 'DE', name: 'Germany' },
		{ code: 'FR', name: 'France' },
		{ code: 'JP', name: 'Japan' },
		{ code: 'AU', name: 'Australia' }
	];

	// Account type options
	const accountTypes = [
		{ value: 'checking', label: 'Checking Account' },
		{ value: 'savings', label: 'Savings Account' },
		{ value: 'business', label: 'Business Account' }
	];

	// Validate form
	function validateForm() {
		errors = {};

		if (!recipientData.fullName.trim()) {
			errors.fullName = 'Full name is required';
		} else if (recipientData.fullName.trim().length < 2) {
			errors.fullName = 'Name must be at least 2 characters';
		}

		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!recipientData.email.trim()) {
			errors.email = 'Email is required';
		} else if (!emailPattern.test(recipientData.email)) {
			errors.email = 'Please enter a valid email address';
		}

		if (!recipientData.accountNumber.trim()) {
			errors.accountNumber = 'Account number is required';
		} else if (!/^\d+$/.test(recipientData.accountNumber)) {
			errors.accountNumber = 'Account number must contain only digits';
		} else if (recipientData.accountNumber.length < 8 || recipientData.accountNumber.length > 17) {
			errors.accountNumber = 'Account number must be between 8-17 digits';
		}

		if (recipientData.address.country === 'US') {
			if (!recipientData.routingNumber.trim()) {
				errors.routingNumber = 'Routing number is required';
			} else if (!/^\d{9}$/.test(recipientData.routingNumber)) {
				errors.routingNumber = 'US routing numbers must be 9 digits';
			}
		}

		if (!recipientData.address.line1.trim()) {
			errors.addressLine1 = 'Address line 1 is required';
		}

		if (!recipientData.address.city.trim()) {
			errors.city = 'City is required';
		}

		if (!recipientData.address.postalCode.trim()) {
			errors.postalCode = 'Postal code is required';
		} else if (
			recipientData.address.country === 'US' &&
			!/^\d{5}(-\d{4})?$/.test(recipientData.address.postalCode)
		) {
			errors.postalCode = 'Invalid US postal code format';
		}

		if (!recipientData.address.state.trim()) {
			errors.state = 'State/Province is required';
		}

		formValid = Object.keys(errors).length === 0;
		return formValid;
	}

	function handleSubmit() {
		formSubmitted = true;
		if (validateForm()) {
			alert('Form is valid! Ready to submit payment recipient details.');
			console.log('Recipient data:', recipientData);
		}
	}

	$effect(() => {
		formSubmitted ? validateForm(): null;
	});


</script>

<div
	class="bg-fintech-white dark:bg-fintech-dark flex min-h-screen items-center justify-center p-4"
	in:fade={{ duration: 400 }}
>
	<div
		class="bg-fintech-white dark:bg-fintech-dark border-fintech-light-gray dark:border-fintech-muted w-full max-w-xl rounded-xl border shadow-xl"
	>
		<div class="p-6">
			<h2
				class="text-fintech-accent dark:text-fintech-accent mb-6 text-center text-2xl font-bold tracking-tight"
			>
				Payment Recipient Details
			</h2>

			<form on:submit|preventDefault={handleSubmit} class="space-y-6">
				<!-- Personal Information Section -->
				<div class="border-fintech-light-gray dark:border-fintech-muted my-6 border-t"></div>
				<h3
					class="text-fintech-accent dark:text-fintech-accent text-sm font-semibold tracking-wider uppercase"
				>
					Personal Information
				</h3>

				<!-- Full Name -->
				<div class="form-control">
					<label
						for="fullName"
						class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-400"
					>
						Full Name
					</label>
					<input
						type="text"
						id="fullName"
						bind:value={recipientData.fullName}
						class="border-fintech-light-gray dark:border-fintech-muted bg-fintech-white dark:bg-fintech-dark-muted w-full rounded-lg border p-3 text-gray-900 dark:text-white {errors.fullName
							? 'border-fintech-warn'
							: ''} focus:border-fintech-accent focus:ring-fintech-accent transition-colors focus:ring-2"
						placeholder="Enter recipient's full name"
					/>
					{#if errors.fullName}
						<span class="text-fintech-warn mt-1 text-sm">{errors.fullName}</span>
					{/if}
				</div>

				<!-- Email -->
				<div class="form-control">
					<label
						for="email"
						class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-400"
					>
						Email Address
					</label>
					<input
						type="email"
						id="email"
						bind:value={recipientData.email}
						class="border-fintech-light-gray dark:border-fintech-muted bg-fintech-white dark:bg-fintech-dark-muted w-full rounded-lg border p-3 text-gray-900 dark:text-white {errors.email
							? 'border-fintech-warn'
							: ''} focus:border-fintech-accent focus:ring-fintech-accent transition-colors focus:ring-2"
						placeholder="recipient@example.com"
					/>
					{#if errors.email}
						<span class="text-fintech-warn mt-1 text-sm">{errors.email}</span>
					{/if}
				</div>

				<!-- Bank Account Section -->
				<div class="border-fintech-light-gray dark:border-fintech-muted my-6 border-t"></div>
				<h3
					class="text-fintech-accent dark:text-fintech-accent text-sm font-semibold tracking-wider uppercase"
				>
					Bank Account Information
				</h3>

				<!-- Account Type -->
				<div class="form-control">
					<label
						for="accountType"
						class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-400"
					>
						Account Type
					</label>
					<select
						id="accountType"
						bind:value={recipientData.accountType}
						class="border-fintech-light-gray dark:border-fintech-muted bg-fintech-white dark:bg-fintech-dark-muted focus:border-fintech-accent focus:ring-fintech-accent w-full rounded-lg border p-3 text-gray-900 transition-colors focus:ring-2 dark:text-white"
					>
						{#each accountTypes as type}
							<option value={type.value}>{type.label}</option>
						{/each}
					</select>
				</div>

				<!-- Account Number -->
				<div class="form-control">
					<label
						for="accountNumber"
						class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-400"
					>
						Account Number
					</label>
					<input
						type="text"
						id="accountNumber"
						bind:value={recipientData.accountNumber}
						class="border-fintech-light-gray dark:border-fintech-muted bg-fintech-white dark:bg-fintech-dark-muted w-full rounded-lg border p-3 text-gray-900 dark:text-white {errors.accountNumber
							? 'border-fintech-warn'
							: ''} focus:border-fintech-accent focus:ring-fintech-accent transition-colors focus:ring-2"
						placeholder="Enter account number"
					/>
					{#if errors.accountNumber}
						<span class="text-fintech-warn mt-1 text-sm">{errors.accountNumber}</span>
					{/if}
				</div>

				<!-- Routing Number -->
				<div class="form-control">
					<label
						for="routingNumber"
						class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-400"
					>
						Routing Number {recipientData.address.country !== 'US' ? '(Optional for non-US)' : ''}
					</label>
					<input
						type="text"
						id="routingNumber"
						bind:value={recipientData.routingNumber}
						class="border-fintech-light-gray dark:border-fintech-muted bg-fintech-white dark:bg-fintech-dark-muted w-full rounded-lg border p-3 text-gray-900 dark:text-white {errors.routingNumber
							? 'border-fintech-warn'
							: ''} focus:border-fintech-accent focus:ring-fintech-accent transition-colors focus:ring-2"
						placeholder="Enter routing number"
					/>
					{#if errors.routingNumber}
						<span class="text-fintech-warn mt-1 text-sm">{errors.routingNumber}</span>
					{/if}
				</div>

				<!-- Address Section -->
				<div class="border-fintech-light-gray dark:border-fintech-muted my-6 border-t"></div>
				<h3
					class="text-fintech-accent dark:text-fintech-accent text-sm font-semibold tracking-wider uppercase"
				>
					Address
				</h3>

				<!-- Country -->
				<div class="form-control">
					<label
						for="country"
						class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-400"
					>
						Country
					</label>
					<select
						id="country"
						bind:value={recipientData.address.country}
						class="border-fintech-light-gray dark:border-fintech-muted bg-fintech-white dark:bg-fintech-dark-muted focus:border-fintech-accent focus:ring-fintech-accent w-full rounded-lg border p-3 text-gray-900 transition-colors focus:ring-2 dark:text-white"
					>
						{#each countries as country}
							<option value={country.code}>{country.name}</option>
						{/each}
					</select>
				</div>

				<!-- Address Line 1 -->
				<div class="form-control">
					<label
						for="addressLine1"
						class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-400"
					>
						Address Line 1
					</label>
					<input
						type="text"
						id="addressLine1"
						bind:value={recipientData.address.line1}
						class="border-fintech-light-gray dark:border-fintech-muted bg-fintech-white dark:bg-fintech-dark-muted w-full rounded-lg border p-3 text-gray-900 dark:text-white {errors.addressLine1
							? 'border-fintech-warn'
							: ''} focus:border-fintech-accent focus:ring-fintech-accent transition-colors focus:ring-2"
						placeholder="Street address, P.O. box, etc."
					/>
					{#if errors.addressLine1}
						<span class="text-fintech-warn mt-1 text-sm">{errors.addressLine1}</span>
					{/if}
				</div>

				<!-- Address Line 2 -->
				<div class="form-control">
					<label
						for="addressLine2"
						class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-400"
					>
						Address Line 2 (Optional)
					</label>
					<input
						type="text"
						id="addressLine2"
						bind:value={recipientData.address.line2}
						class="border-fintech-light-gray dark:border-fintech-muted bg-fintech-white dark:bg-fintech-dark-muted focus:border-fintech-accent focus:ring-fintech-accent w-full rounded-lg border p-3 text-gray-900 transition-colors focus:ring-2 dark:text-white"
						placeholder="Apartment, suite, unit, building, floor, etc."
					/>
				</div>

				<!-- City, State, Postal Code -->
				<div class="grid gap-6 md:grid-cols-3">
					<div class="form-control">
						<label
							for="city"
							class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-400"
						>
							City
						</label>
						<input
							type="text"
							id="city"
							bind:value={recipientData.address.city}
							class="border-fintech-light-gray dark:border-fintech-muted bg-fintech-white dark:bg-fintech-dark-muted w-full rounded-lg border p-3 text-gray-900 dark:text-white {errors.city
								? 'border-fintech-warn'
								: ''} focus:border-fintech-accent focus:ring-fintech-accent transition-colors focus:ring-2"
							placeholder="City"
						/>
						{#if errors.city}
							<span class="text-fintech-warn mt-1 text-sm">{errors.city}</span>
						{/if}
					</div>

					<div class="form-control">
						<label
							for="state"
							class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-400"
						>
							State/Province
						</label>
						<input
							type="text"
							id="state"
							bind:value={recipientData.address.state}
							class="border-fintech-light-gray dark:border-fintech-muted bg-fintech-white dark:bg-fintech-dark-muted w-full rounded-lg border p-3 text-gray-900 dark:text-white {errors.state
								? 'border-fintech-warn'
								: ''} focus:border-fintech-accent focus:ring-fintech-accent transition-colors focus:ring-2"
							placeholder="State/Province"
						/>
						{#if errors.state}
							<span class="text-fintech-warn mt-1 text-sm">{errors.state}</span>
						{/if}
					</div>

					<div class="form-control">
						<label
							for="postalCode"
							class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-400"
						>
							Postal Code
						</label>
						<input
							type="text"
							id="postalCode"
							bind:value={recipientData.address.postalCode}
							class="border-fintech-light-gray dark:border-fintech-muted bg-fintech-white dark:bg-fintech-dark-muted w-full rounded-lg border p-3 text-gray-900 dark:text-white {errors.postalCode
								? 'border-fintech-warn'
								: ''} focus:border-fintech-accent focus:ring-fintech-accent transition-colors focus:ring-2"
							placeholder="Postal code"
						/>
						{#if errors.postalCode}
							<span class="text-fintech-warn mt-1 text-sm">{errors.postalCode}</span>
						{/if}
					</div>
				</div>

				<!-- Payment Details -->
				<div class="border-fintech-light-gray dark:border-fintech-muted my-6 border-t"></div>
				<h3
					class="text-fintech-accent dark:text-fintech-accent text-sm font-semibold tracking-wider uppercase"
				>
					Payment Details
				</h3>

				<!-- Description -->
				<div class="form-control">
					<label
						for="description"
						class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-400"
					>
						Payment Description (Optional)
					</label>
					<textarea
						id="description"
						bind:value={recipientData.description}
						class="border-fintech-light-gray dark:border-fintech-muted bg-fintech-white dark:bg-fintech-dark-muted focus:border-fintech-accent focus:ring-fintech-accent h-24 w-full rounded-lg border p-3 text-gray-900 transition-colors focus:ring-2 dark:text-white"
						placeholder="Enter payment purpose or description"
					></textarea>
				</div>

				<!-- Submit Button -->
				<div class="form-control mt-8">
					<button
						type="submit"
						class="bg-fintech-accent text-fintech-dark hover:bg-fintech-accent-muted hover:shadow-fintech-accent/50 focus:ring-fintech-accent dark:focus:ring-offset-fintech-dark w-full rounded-lg px-6 py-3 font-medium shadow-lg transition-colors focus:ring-2 focus:ring-offset-2"
					>
						Save Recipient
					</button>
				</div>
			</form>

			<!-- Form Status Messages -->
			{#if formSubmitted && !formValid}
				<div
					class="bg-fintech-warn/10 mt-6 flex items-center space-x-3 rounded-lg p-4"
					in:fade={{ duration: 300 }}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="text-fintech-warn h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<span class="text-fintech-warn text-sm">Please correct the errors in the form.</span>
				</div>
			{/if}
		</div>
	</div>
</div>
