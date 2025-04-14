<script lang="ts">
	import { onMount } from 'svelte'; // Import onMount if needed for triggering
	import { LampEffectHomepage } from '$lib/components/ui/LampEffect';

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

	// --- Example Trigger ---
	// If you want to open it on mount (for testing, maybe?)
	// import { BROWSER } from '$app/environment'; // Ensure code runs only in browser
	// onMount(() => {
	//     if (BROWSER) {
	//       // Example: Open after a short delay to ensure everything is ready
	//       setTimeout(openModal, 100);
	//     }
	// });

	// Or more commonly, trigger with a button:
	// <button on:click={openModal} class="btn">Open Modal</button>
</script>

<div class="relative min-h-screen overflow-hidden bg-black text-white">
	<!-- Star background effect -->
	<div class="absolute inset-0 z-0">
		<div class="stars"></div>
	</div>

	<!-- Floating 3D elements -->
	<!-- <div class="absolute right-24 top-24 md:right-32 md:top-24 z-10 animate-float-slow">
    <img src="/images/astronaut.png" alt="Floating astronaut" class="w-24 md:w-32" />
  </div>
  
  <div class="absolute left-16 bottom-24 z-10 animate-float">
    <img src="/images/cube.png" alt="Floating cube" class="w-16 md:w-24" />
  </div> -->

	<!-- Main Content -->
	<div class="relative z-20 container mx-auto px-4 py-6">
		<div
			class="mx-auto mb-20 flex max-w-xl flex-col items-center justify-center space-y-1 rounded-full bg-zinc-900 px-6 py-4 md:flex-row md:space-y-0 md:space-x-2"
		>
			<span class="text-sm text-gray-400">Regional access TBA soon</span>
			<span class="mx-2 hidden text-gray-500 md:block">•</span>

			<span class="hidden text-sm text-gray-400 md:block">Canada</span>
			<span class="mx-2 hidden text-gray-500 md:block">•</span>
			<span class="cursor-pointer text-sm text-gray-400 underline">Get the app</span>
			<span class="ml-1 text-sm">→</span>
		</div>

		<LampEffectHomepage />

		<dialog id="modal" class="modal modal-bottom sm:modal-middle" bind:this={modal}>
			<div class="modal-box">
				<h3 class="text-lg font-bold">Coming soon!</h3>
				<p class="py-4">Stay tuned</p>
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
		<!-- TODO: Consider reusing the navigation bar component -->
		<!-- Navigation Bar -->
		<!-- <nav class="mb-12 flex items-center justify-between">
			<div class="flex items-center">
				<div class="flex items-center">
					<div
						class="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-black"
					>
						<span class="font-bold">O</span>
					</div>
					<span class="text-lg font-bold">Canada</span>
				</div>

				<div class="ml-8 hidden md:flex">
					<a href="#" class="mx-3 text-sm text-gray-400 hover:text-white">FAQs</a>
					<a href="#" class="mx-3 text-sm text-gray-400 hover:text-white">Community</a>
				</div>
			</div>

			<div class="flex items-center">
				<button class="rounded-full bg-zinc-800 px-4 py-2 text-sm text-white hover:bg-zinc-700">
					Request early access
				</button>
				{#if isLoggedIn}
					<div class="ml-4 h-8 w-8 rounded-full bg-gray-300"></div>
				{:else}
					<div class="ml-4 h-8 w-8 rounded-full bg-gray-300"></div>
				{/if}
			</div>
		</nav> -->

		<!-- Hero Content -->
		<div class="mx-auto mt-6 mb-12 max-w-4xl text-center">
			<p class="mx-auto mb-8 max-w-2xl text-gray-400">
				Opulent Canada offers global professionals a way to get paid faster from the Canada, save
				their money in dollars and spend with an international Mastercard.
			</p>

			<!-- Use bind:this directly instead of document.getElementById -->
			<button
				class="btn rounded-full bg-yellow-400 px-6 py-3 font-medium text-black hover:bg-yellow-500"
				on:click={openModal}>Request Early Access</button
			>
		</div>
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
