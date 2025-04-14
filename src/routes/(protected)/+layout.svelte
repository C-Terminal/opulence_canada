<script lang="ts">
	import '$lib/../app.css';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { onMount } from 'svelte';

	let windowSize = $state({ width: 0, height: 0 });
	let isVisible = $state(true);

	function updateWindowSize() {
		windowSize.width = window.innerWidth;
		windowSize.height = window.innerHeight;
	}

	$effect(() => {
		// Safe to access window here — only runs in browser
		updateWindowSize();
		window.addEventListener('resize', updateWindowSize);

		return () => {
			window.removeEventListener('resize', updateWindowSize);
		};
	});

	$effect(() => {
		isVisible = windowSize.width > 600;
	});
</script>

<div class="flex h-screen overflow-hidden bg-gray-50">
  {#if isVisible}
	<div class="w-64 flex-shrink-0">
		<Sidebar />
	</div>
  {/if}

	<div class="flex-1 overflow-auto">
		<main>
			<slot />
		</main>
	</div>
</div>
