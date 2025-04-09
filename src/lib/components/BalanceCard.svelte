<script lang="ts">
	import { totalBalance } from '$lib/stores/dashboardStore';
	import { formatCurrency } from '$lib/utils';
	import Chart from './Chart.svelte';
</script>

<div class="p-6">
	<div class="mb-4 flex items-center justify-between">
		<h2 class="text-lg font-medium">Balance</h2>
		<div class="flex space-x-2">
			<button class="rounded-full border p-1">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle
						cx="5"
						cy="12"
						r="1"
					></circle></svg
				>
			</button>
		</div>
	</div>

	<div class="mb-4 text-5xl font-bold">{formatCurrency($totalBalance)}</div>
	<div class="mb-4 text-sm text-gray-500">Tuesday, 18 days ago</div>

	<div class="mb-6 flex space-x-2">
		<button class="rounded-md bg-black px-4 py-1 text-sm text-white">Analytics</button>
		<button class="rounded-md px-4 py-1 text-sm text-gray-700">Statements</button>
	</div>

	<div class="h-40">
		<Chart />
	</div>
</div>
