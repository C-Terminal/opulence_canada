<!-- src/routes/transfer/+page.svelte -->
<script>
	import { writable } from 'svelte/store';
	import CreditCardPayment from '$lib/components/payment/CreditCardPayment.svelte';
	import PaymentForm from '$lib/components/payment/PaymentForm.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';

	// Form data store
	let transferData = writable({
		senderName: '',
		recipientName: '',
		amount: null,
		currency: 'CAD',
		transferType: 'international'
	});

	// Currencies list
	const currencies = ['CAD', 'USD', 'EUR', 'GBP', 'CNY', 'JPY', 'AUD', 'MXN'];

	function submitTransfer() {
		// Placeholder for API submission
		console.log('Transfer submitted:', $transferData);
		// In a real app, this would call an actual payment gateway/backend
		alert('Transfer initiated! (Mock submission)');
	}
</script>

<main class="min-h-screen bg-gray-100 py-12">
	<h1 class="mb-6 text-center text-3xl font-bold text-blue-800">Money Transfer</h1>
	<div class="container mx-auto max-w-2xl px-4">
		<!-- import CreditCardPayment form -->
		<CreditCardPayment />

	
	</div>

	<!-- import  -->
	<PaymentForm />
</main>
