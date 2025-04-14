<script lang="ts">
	import { onMount } from 'svelte';

	// Form data
	let recipientData = {
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
	};

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
		// Add other potential error properties here
	}

	// Validation state
	let errors : Errors = {};
	let formSubmitted = false;
	let formValid = false;

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

		// Validate name
		if (!recipientData.fullName.trim()) {
			errors.fullName = 'Full name is required';
		} else if (recipientData.fullName.trim().length < 2) {
			errors.fullName = 'Name must be at least 2 characters';
		}

		// Validate email
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!recipientData.email.trim()) {
			errors.email = 'Email is required';
		} else if (!emailPattern.test(recipientData.email)) {
			errors.email = 'Please enter a valid email address';
		}

		// Validate account number
		if (!recipientData.accountNumber.trim()) {
			errors.accountNumber = 'Account number is required';
		} else if (!/^\d+$/.test(recipientData.accountNumber)) {
			errors.accountNumber = 'Account number must contain only digits';
		} else if (recipientData.accountNumber.length < 8 || recipientData.accountNumber.length > 17) {
			errors.accountNumber = 'Account number must be between 8-17 digits';
		}

		// Validate routing number for US accounts
		if (recipientData.address.country === 'US') {
			if (!recipientData.routingNumber.trim()) {
				errors.routingNumber = 'Routing number is required';
			} else if (!/^\d{9}$/.test(recipientData.routingNumber)) {
				errors.routingNumber = 'US routing numbers must be 9 digits';
			}
		}

		// Validate address
		if (!recipientData.address.line1.trim()) {
			errors.addressLine1 = 'Address line 1 is required';
		}

		if (!recipientData.address.city.trim()) {
			errors.city = 'City is required';
		}

		if (!recipientData.address.postalCode.trim()) {
			errors.postalCode = 'Postal code is required';
		} else {
			// Different postal code formats for different countries
			if (
				recipientData.address.country === 'US' &&
				!/^\d{5}(-\d{4})?$/.test(recipientData.address.postalCode)
			) {
				errors.postalCode = 'Invalid US postal code format';
			}
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
			// Here you would typically send the data to your backend
		}
	}

	// Validate as user types after first submission attempt
	$: if (formSubmitted) validateForm();
</script>

<div class="bg-base-200 flex min-h-screen items-center justify-center p-4">
	<div class="card bg-base-100 w-full max-w-xl shadow-xl">
		<div class="card-body">
			<h2 class="card-title mb-6 text-center text-2xl font-bold">Payment Recipient Details</h2>

			<form on:submit|preventDefault={handleSubmit} class="space-y-4">
				<!-- Personal Information Section -->
				<div class="divider">Personal Information</div>

				<!-- Full Name -->
				<div class="form-control">
					<label for="fullName" class="label">
						<span class="label-text">Full Name</span>
					</label>
					<input
						type="text"
						id="fullName"
						bind:value={recipientData.fullName}
						class="input input-bordered {errors.fullName ? 'input-error' : ''}"
						placeholder="Enter recipient's full name"
					/>
					{#if errors.fullName}
						<label class="label">
							<span class="label-text-alt text-error">{errors.fullName}</span>
						</label>
					{/if}
				</div>

				<!-- Email -->
				<div class="form-control">
					<label for="email" class="label">
						<span class="label-text">Email Address</span>
					</label>
					<input
						type="email"
						id="email"
						bind:value={recipientData.email}
						class="input input-bordered {errors.email ? 'input-error' : ''}"
						placeholder="recipient@example.com"
					/>
					{#if errors.email}
						<label class="label">
							<span class="label-text-alt text-error">{errors.email}</span>
						</label>
					{/if}
				</div>

				<!-- Bank Account Section -->
				<div class="divider">Bank Account Information</div>

				<!-- Account Type -->
				<div class="form-control">
					<label for="accountType" class="label">
						<span class="label-text">Account Type</span>
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
				<div class="form-control">
					<label for="accountNumber" class="label">
						<span class="label-text">Account Number</span>
					</label>
					<input
						type="text"
						id="accountNumber"
						bind:value={recipientData.accountNumber}
						class="input input-bordered {errors.accountNumber ? 'input-error' : ''}"
						placeholder="Enter account number"
					/>
					{#if errors.accountNumber}
						<label class="label">
							<span class="label-text-alt text-error">{errors.accountNumber}</span>
						</label>
					{/if}
				</div>

				<!-- Routing Number -->
				<div class="form-control">
					<label for="routingNumber" class="label">
						<span class="label-text"
							>Routing Number {recipientData.address.country !== 'US'
								? '(Optional for non-US)'
								: ''}</span
						>
					</label>
					<input
						type="text"
						id="routingNumber"
						bind:value={recipientData.routingNumber}
						class="input input-bordered {errors.routingNumber ? 'input-error' : ''}"
						placeholder="Enter routing number"
					/>
					{#if errors.routingNumber}
						<label class="label">
							<span class="label-text-alt text-error">{errors.routingNumber}</span>
						</label>
					{/if}
				</div>

				<!-- Address Section -->
				<div class="divider">Address</div>

				<!-- Country -->
				<div class="form-control">
					<label for="country" class="label">
						<span class="label-text">Country</span>
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
				<div class="form-control">
					<label for="addressLine1" class="label">
						<span class="label-text">Address Line 1</span>
					</label>
					<input
						type="text"
						id="addressLine1"
						bind:value={recipientData.address.line1}
						class="input input-bordered {errors.addressLine1 ? 'input-error' : ''}"
						placeholder="Street address, P.O. box, etc."
					/>
					{#if errors.addressLine1}
						<label class="label">
							<span class="label-text-alt text-error">{errors.addressLine1}</span>
						</label>
					{/if}
				</div>

				<!-- Address Line 2 -->
				<div class="form-control">
					<label for="addressLine2" class="label">
						<span class="label-text">Address Line 2 (Optional)</span>
					</label>
					<input
						type="text"
						id="addressLine2"
						bind:value={recipientData.address.line2}
						class="input input-bordered"
						placeholder="Apartment, suite, unit, building, floor, etc."
					/>
				</div>

				<!-- City, State, Postal Code in a grid for larger screens -->
				<div class="grid gap-3 md:grid-cols-3">
					<div class="form-control">
						<label for="city" class="label">
							<span class="label-text">City</span>
						</label>
						<input
							type="text"
							id="city"
							bind:value={recipientData.address.city}
							class="input input-bordered {errors.city ? 'input-error' : ''}"
							placeholder="City"
						/>
						{#if errors.city}
							<label class="label">
								<span class="label-text-alt text-error">{errors.city}</span>
							</label>
						{/if}
					</div>

					<div class="form-control">
						<label for="state" class="label">
							<span class="label-text">State/Province</span>
						</label>
						<input
							type="text"
							id="state"
							bind:value={recipientData.address.state}
							class="input input-bordered {errors.state ? 'input-error' : ''}"
							placeholder="State/Province"
						/>
						{#if errors.state}
							<label class="label">
								<span class="label-text-alt text-error">{errors.state}</span>
							</label>
						{/if}
					</div>

					<div class="form-control">
						<label for="postalCode" class="label">
							<span class="label-text">Postal Code</span>
						</label>
						<input
							type="text"
							id="postalCode"
							bind:value={recipientData.address.postalCode}
							class="input input-bordered {errors.postalCode ? 'input-error' : ''}"
							placeholder="Postal code"
						/>
						{#if errors.postalCode}
							<label class="label">
								<span class="label-text-alt text-error">{errors.postalCode}</span>
							</label>
						{/if}
					</div>
				</div>

				<!-- Payment Details -->
				<div class="divider">Payment Details</div>

				<!-- Description -->
				<div class="form-control">
					<label for="description" class="label">
						<span class="label-text">Payment Description (Optional)</span>
					</label>
					<textarea
						id="description"
						bind:value={recipientData.description}
						class="textarea textarea-bordered h-24"
						placeholder="Enter payment purpose or description"
					></textarea>
				</div>

				<!-- Submit Button -->
				<div class="form-control mt-6">
					<button type="submit" class="btn btn-primary">Save Recipient</button>
				</div>
			</form>

			<!-- Form Status Messages -->
			{#if formSubmitted && !formValid}
				<div class="alert alert-error mt-4">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6 shrink-0 stroke-current"
						fill="none"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<span>Please correct the errors in the form.</span>
				</div>
			{/if}
		</div>
	</div>
</div>
