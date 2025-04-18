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
	class="bg-cyber-midnight flex min-h-screen items-center justify-center p-4 cyberpunk-grid"
	in:fade={{ duration: 400 }}
>
	<div
		class="cyber-panel w-full max-w-xl rounded-xl font-space-grotesk shadow-lg"
	>
		<div class="p-6">
			<h1
				class="text-cyber-neon mb-6 text-center text-2xl font-bold tracking-tight cyber-glow"
			>
				Payment Recipient Details
			</h1>

			<form on:submit|preventDefault={handleSubmit} class="space-y-6">
				<!-- Personal Information Section -->
				<div class="cyber-line"></div>
				<h3
					class="text-cyber-electric text-sm font-semibold tracking-wider uppercase"
				>
					Personal Information
				</h3>

				<!-- Full Name -->
				<div class="form-group">
					<label
						for="fullName"
						class="form-label"
					>
						Full Name
					</label>
					<input
						type="text"
						id="fullName"
						bind:value={recipientData.fullName}
						class="input {errors.fullName ? 'border-cyber-alert' : 'input-bordered'}"
						placeholder="Enter recipient's full name"
					/>
					{#if errors.fullName}
						<span class="text-cyber-alert mt-1 text-sm">{errors.fullName}</span>
					{/if}
				</div>

				<!-- Email -->
				<div class="form-group">
					<label
						for="email"
						class="form-label"
					>
						Email Address
					</label>
					<input
						type="email"
						id="email"
						bind:value={recipientData.email}
						class="input {errors.email ? 'border-cyber-alert' : 'input-bordered'}"
						placeholder="recipient@example.com"
					/>
					{#if errors.email}
						<span class="text-cyber-alert mt-1 text-sm">{errors.email}</span>
					{/if}
				</div>

				<!-- Bank Account Section -->
				<div class="cyber-line"></div>
				<h3
					class="text-cyber-electric text-sm font-semibold tracking-wider uppercase"
				>
					Bank Account Information
				</h3>

				<!-- Account Type -->
				<div class="form-group">
					<label
						for="accountType"
						class="form-label"
					>
						Account Type
					</label>
					<select
						id="accountType"
						bind:value={recipientData.accountType}
						class="select select-bordered w-full"
					>
						{#each accountTypes as type}
							<option value={type.value}>{type.label}</option>
						{/each}
					</select>
				</div>

				<!-- Account Number -->
				<div class="form-group">
					<label
						for="accountNumber"
						class="form-label"
					>
						Account Number
					</label>
					<input
						type="text"
						id="accountNumber"
						bind:value={recipientData.accountNumber}
						class="input {errors.accountNumber ? 'border-cyber-alert' : 'input-bordered'}"
						placeholder="Enter account number"
					/>
					{#if errors.accountNumber}
						<span class="text-cyber-alert mt-1 text-sm">{errors.accountNumber}</span>
					{/if}
				</div>

				<!-- Routing Number -->
				<div class="form-group">
					<label
						for="routingNumber"
						class="form-label"
					>
						Routing Number {recipientData.address.country !== 'US' ? '(Optional for non-US)' : ''}
					</label>
					<input
						type="text"
						id="routingNumber"
						bind:value={recipientData.routingNumber}
						class="input {errors.routingNumber ? 'border-cyber-alert' : 'input-bordered'}"
						placeholder="Enter routing number"
					/>
					{#if errors.routingNumber}
						<span class="text-cyber-alert mt-1 text-sm">{errors.routingNumber}</span>
					{/if}
				</div>

				<!-- Address Section -->
				<div class="cyber-line"></div>
				<h3
					class="text-cyber-electric text-sm font-semibold tracking-wider uppercase"
				>
					Address
				</h3>

				<!-- Country -->
				<div class="form-group">
					<label
						for="country"
						class="form-label"
					>
						Country
					</label>
					<select
						id="country"
						bind:value={recipientData.address.country}
						class="select select-bordered w-full"
					>
						{#each countries as country}
							<option value={country.code}>{country.name}</option>
						{/each}
					</select>
				</div>

				<!-- Address Line 1 -->
				<div class="form-group">
					<label
						for="addressLine1"
						class="form-label"
					>
						Address Line 1
					</label>
					<input
						type="text"
						id="addressLine1"
						bind:value={recipientData.address.line1}
						class="input {errors.addressLine1 ? 'border-cyber-alert' : 'input-bordered'}"
						placeholder="Street address, P.O. box, etc."
					/>
					{#if errors.addressLine1}
						<span class="text-cyber-alert mt-1 text-sm">{errors.addressLine1}</span>
					{/if}
				</div>

				<!-- Address Line 2 -->
				<div class="form-group">
					<label
						for="addressLine2"
						class="form-label"
					>
						Address Line 2 (Optional)
					</label>
					<input
						type="text"
						id="addressLine2"
						bind:value={recipientData.address.line2}
						class="input input-bordered"
						placeholder="Apartment, suite, unit, building, floor, etc."
					/>
				</div>

				<!-- City, State, Postal Code -->
				<div class="grid gap-6 md:grid-cols-3">
					<div class="form-group">
						<label
							for="city"
							class="form-label"
						>
							City
						</label>
						<input
							type="text"
							id="city"
							bind:value={recipientData.address.city}
							class="input {errors.city ? 'border-cyber-alert' : 'input-bordered'}"
							placeholder="City"
						/>
						{#if errors.city}
							<span class="text-cyber-alert mt-1 text-sm">{errors.city}</span>
						{/if}
					</div>

					<div class="form-group">
						<label
							for="state"
							class="form-label"
						>
							State/Province
						</label>
						<input
							type="text"
							id="state"
							bind:value={recipientData.address.state}
							class="input {errors.state ? 'border-cyber-alert' : 'input-bordered'}"
							placeholder="State/Province"
						/>
						{#if errors.state}
							<span class="text-cyber-alert mt-1 text-sm">{errors.state}</span>
						{/if}
					</div>

					<div class="form-group">
						<label
							for="postalCode"
							class="form-label"
						>
							Postal Code
						</label>
						<input
							type="text"
							id="postalCode"
							bind:value={recipientData.address.postalCode}
							class="input {errors.postalCode ? 'border-cyber-alert' : 'input-bordered'}"
							placeholder="Postal code"
						/>
						{#if errors.postalCode}
							<span class="text-cyber-alert mt-1 text-sm">{errors.postalCode}</span>
						{/if}
					</div>
				</div>

				<!-- Payment Details -->
				<div class="cyber-line"></div>
				<h3
					class="text-cyber-electric text-sm font-semibold tracking-wider uppercase"
				>
					Payment Details
				</h3>

				<!-- Description -->
				<div class="form-group">
					<label
						for="description"
						class="form-label"
					>
						Payment Description (Optional)
					</label>
					<textarea
						id="description"
						bind:value={recipientData.description}
						class="input input-bordered h-24 w-full"
						placeholder="Enter payment purpose or description"
					></textarea>
				</div>

				<!-- Submit Button -->
				<div class="form-group mt-8">
					<button
						type="submit"
						class="btn-primary btn-glow w-full rounded-lg px-6 py-3 font-medium shadow-lg"
					>
						Save Recipient
					</button>
				</div>
			</form>

			<!-- Form Status Messages -->
			{#if formSubmitted && !formValid}
				<div
					class="bg-cyber-alert/10 mt-6 flex items-center space-x-3 rounded-lg p-4 border border-cyber-alert/30"
					in:fade={{ duration: 300 }}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="text-cyber-alert h-6 w-6"
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
					<span class="text-cyber-alert text-sm">Please correct the errors in the form.</span>
				</div>
			{/if}
		</div>
	</div>
</div>