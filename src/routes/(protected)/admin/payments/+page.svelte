<script lang="ts">
	import { onMount } from 'svelte';
	import { fetchBills } from '$lib/stores/dashboardStore';
	import BillsList from '$lib/components/BillsList.svelte';

	onMount(async () => {
		await fetchBills();
	});
</script>

<div class="p-6">
	<div class="mb-6 flex items-center justify-between">
		<h1 class="text-2xl font-bold">Payments</h1>

		<div class="flex items-center">
			<button class="mr-2 rounded-lg bg-black px-4 py-2 font-medium text-white">
				Schedule payment
			</button>
			<button class="rounded-lg border border-gray-300 px-4 py-2 font-medium"> History </button>
		</div>
	</div>

	<div class="rounded-xl bg-white shadow-sm">
		<BillsList />
	</div>
</div>
