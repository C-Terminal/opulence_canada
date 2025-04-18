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

<main class="min-h-screen bg-cyber-white py-12 cyberpunk-grid ">
	<div class="container mx-auto max-w-2xl px-4">
		<h1 class="text-center text-3xl cyber-terminal">Money Transfer</h1>
		<!-- import CreditCardPayment form -->
		<CreditCardPayment />
	</div>

	<!-- import  -->
	<PaymentForm />
</main>
