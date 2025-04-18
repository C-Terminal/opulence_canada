<script lang="ts">
	import { onMount } from 'svelte'; // Import onMount if needed for triggering
	import TouchableDiv from '$lib/components/common/TouchableDiv.svelte';
	import { fade } from 'svelte/transition';

	let isLoggedIn = false; // Currently unused, keep or remove as needed

	// Define the modal element reference - Svelte will populate this
	let modal: HTMLDialogElement | null = null; // Initialize as null

	// Function to open modal using the bound reference
	function openModal() {
		// Check if the element has been bound by Svelte
		if (modal) {
			modal.showModal(); // Use the native method on the bound element
		} else {
			console.error('Modal element is not yet available.');
			// Or handle the case where the modal isn't ready
		}
	}
</script>

<div class="relative min-h-screen overflow-hidden bg-black text-white">
	<!-- Hero Section -->
	<section
		class="bg-fintech-dark relative flex min-h-screen items-center justify-center overflow-hidden"
	>
		<!-- Background Gradient -->
		<div class="from-fintech-muted/20 absolute inset-0 bg-gradient-to-br to-transparent"></div>

		<div class="z-10 container mx-auto px-6 text-center" in:fade={{ duration: 1000 }}>
			<h1
				class="from-fintech-accent mb-6 bg-gradient-to-r to-white bg-clip-text text-5xl font-bold tracking-tight text-transparent md:text-7xl"
			>
				Empower Your Wealth
			</h1>
			<p class="mx-auto mb-8 max-w-2xl text-xl text-gray-400 md:text-2xl">
				Unleash the future of finance with cutting-edge tools designed for the bold.
			</p>
			<div class="mx-auto mt-6 mb-12 max-w-4xl text-center">
				<!-- Use bind:this directly instead of document.getElementById -->
				<button
					class="btn-ghost rounded-full bg-yellow-400 px-6 py-3 font-medium text-black hover:bg-yellow-500"
					on:click={openModal}>Request Early Access</button
				>
			</div>
		</div>
	</section>

	<!-- Features Section -->
	<section class="bg-fintech-muted py-20">
		<div class="container mx-auto px-6">
			<h2 class="mb-12 text-center text-4xl font-bold">Why Choose Us?</h2>
			<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
				<!-- Feature 1 -->
				<TouchableDiv>
					<h3 class="mb-4 text-2xl font-semibold">Seamless Transactions</h3>
					<p class="text-gray-400">
						Execute trades and transfers with unparalleled speed and security.
					</p>
				</TouchableDiv>
				<!-- Feature 2 -->
				<TouchableDiv>
					<h3 class="mb-4 text-2xl font-semibold">Advanced Analytics</h3>
					<p class="text-gray-400">
						Gain insights with real-time data and predictive market trends.
					</p>
				</TouchableDiv>
				<!-- Feature 3 -->
				<TouchableDiv>
					<h3 class="mb-4 text-2xl font-semibold">Ironclad Security</h3>
					<p class="text-gray-400">Your assets are protected by state-of-the-art encryption.</p>
				</TouchableDiv>
			</div>
		</div>
	</section>

	<!-- Main Content -->
	<div class="relative z-20 container mx-auto px-4 pt-20">
		<div
			class="mx-auto mb-20 flex max-w-xl flex-col items-center justify-evenly space-y-1  rounded-full bg-zinc-900 px-6 py-4 md:flex-row md:space-y-0 md:space-x-2"
		>
			<span class="hidden text-sm text-gray-200 md:block">Regional access TBA soon</span>

			<button class="btn btn-md rounded-2xl " on:click={openModal}>Get the app</button>
		</div>

		<dialog id="modal" class="modal modal-bottom sm:modal-middle" bind:this={modal}>
			<div class="modal-box">
				<h3 class="text-fintech-dark-gray dark:text-fintech-light-gray text-lg font-bold">
					Coming soon!
				</h3>
				<p class="text-fintech-dark-gray dark:text-fintech-light-gray py-4">Stay tuned</p>
				<div class="modal-action">
					<form method="dialog">
						<button class="btn">Close</button>
					</form>
				</div>
			</div>
			<form method="dialog" class="modal-backdrop">
				<button>close</button>
			</form>
		</dialog>
	</div>
</div>

<style>
	/* Floating animations */
	@keyframes float {
		0% {
			transform: translateY(0px);
		}
		50% {
			transform: translateY(-15px);
		}
		100% {
			transform: translateY(0px);
		}
	}

	@keyframes float-slow {
		0% {
			transform: translateY(0px) rotate(0deg);
		}
		50% {
			transform: translateY(-10px) rotate(5deg);
		}
		100% {
			transform: translateY(0px) rotate(0deg);
		}
	}

	/* Add a subtle animation for the button hover */
	a:hover {
		@apply scale-105 transform;
	}

	.animate-float {
		animation: float 6s ease-in-out infinite;
	}

	.animate-float-slow {
		animation: float-slow 8s ease-in-out infinite;
	}

	/* Star background */
	.stars {
		background-image:
			radial-gradient(2px 2px at 20px 30px, #ffffff, rgba(0, 0, 0, 0)),
			radial-gradient(2px 2px at 40px 70px, #ffffff, rgba(0, 0, 0, 0)),
			radial-gradient(2px 2px at 50px 160px, #ffffff, rgba(0, 0, 0, 0)),
			radial-gradient(2px 2px at 90px 40px, #ffffff, rgba(0, 0, 0, 0)),
			radial-gradient(2px 2px at 130px 80px, #ffffff, rgba(0, 0, 0, 0)),
			radial-gradient(2px 2px at 160px 120px, #ffffff, rgba(0, 0, 0, 0));
		background-repeat: repeat;
		background-size: 200px 200px;
		height: 100%;
		width: 100%;
		opacity: 0.3;
	}

	/* Optional: Ensure backdrop works correctly if needed */
	.modal-backdrop {
		background-color: transparent; /* Or your desired backdrop style */
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: -1; /* Ensure it's behind the modal box */
	}
</style>
