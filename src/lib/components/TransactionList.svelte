<script lang="ts"> 
	import { transactionsStore } from '$lib/stores/dashboardStore';
	import { formatCurrency, formatDate } from '$lib/utils';

	export let limit: number | null = null;
	export let showViewAll = true;

	$: transactions = limit ? $transactionsStore.slice(0, limit) : $transactionsStore;
</script>

<div>
	<h2 class="mb-4 text-2xl font-bold">Here are your recent transactions:</h2>

	<div class="space-y-4">
		{#each transactions as transaction}
			<div class="flex items-center justify-between">
				<div class="flex items-center">
					<div class="w-16 text-sm text-gray-500">
						{transaction.status === 'hold' ? 'Hold' : formatDate(transaction.date)}
					</div>
					<div class="flex h-8 w-8 items-center justify-center">
						<img src={transaction.logo} alt={transaction.merchant} class="h-6 w-6" />
					</div>
					<div class="ml-2 font-medium">{transaction.merchant}</div>
				</div>
				<div class="font-medium">{formatCurrency(transaction.amount)}</div>
			</div>
		{/each}
	</div>

	{#if showViewAll}
		<div class="mt-4 flex items-center justify-end text-xs font-medium text-gray-500">
			<a href="/transactions" class="flex items-center uppercase">
				View all
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="14"
					height="14"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="ml-1"><path d="m9 18 6-6-6-6"></path></svg
				>
			</a>
		</div>
	{/if}
</div>
