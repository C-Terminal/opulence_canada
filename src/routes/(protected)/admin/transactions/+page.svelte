<script lang="ts">
    import { onMount } from 'svelte';
    import { fetchTransactions } from '$lib/stores/dashboardStore';
    import TransactionList from '$lib/components/TransactionList.svelte';
    
    onMount(async () => {
      await fetchTransactions();
    });
  </script>
  
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Transactions</h1>
      
      <div class="flex items-center">
        <button class="bg-black text-white px-4 py-2 rounded-lg font-medium mr-2">
          Export
        </button>
        <button class="border border-gray-300 px-4 py-2 rounded-lg font-medium">
          Filter
        </button>
      </div>
    </div>
    
    <div class="bg-white rounded-xl shadow-sm p-6">
      <TransactionList showViewAll={false} />
    </div>
  </div>