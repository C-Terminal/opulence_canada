<script lang="ts">
    import { onMount } from 'svelte';
    import { fetchWallets, walletsStore } from '$lib/stores/dashboardStore';
    import { formatCurrency } from '$lib/utils';
    
    onMount(async () => {
      await fetchWallets();
    });
  </script>
  
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Accounts</h1>
      
      <div class="flex items-center">
        <button class="bg-black text-white px-4 py-2 rounded-lg font-medium mr-2">
          Add account
        </button>
        <button class="border border-gray-300 px-4 py-2 rounded-lg font-medium">
          Manage
        </button>
      </div>
    </div>
    
    <div class="grid grid-cols-2 gap-4">
      {#each $walletsStore as wallet}
        <div class="bg-white rounded-xl shadow-sm p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-medium">{wallet.name}</h2>
            <span class="text-sm text-gray-500 uppercase">{wallet.type}</span>
          </div>
          <div class="text-3xl font-bold">{formatCurrency(wallet.balance)}</div>
          <div class="mt-6 flex justify-end">
            <button class="text-sm text-gray-600 font-medium">View details</button>
          </div>
        </div>
      {/each}
    </div>
  </div>