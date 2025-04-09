<script lang="ts">
    import { onMount } from 'svelte';
    import { fetchTransactions, fetchBills, fetchWallets } from '$lib/stores/dashboardStore';
    import TransactionList from '$lib/components/TransactionList.svelte';
    import BalanceCard from '$lib/components/BalanceCard.svelte';
    import BillsList from '$lib/components/BillsList.svelte';
    import WalletCard from '$lib/components/WalletCard.svelte';
    
    onMount(async () => {
      await Promise.all([
        fetchTransactions(),
        fetchBills(),
        fetchWallets()
      ]);
    });
  </script>
  
  <div class="p-4">
    <div class="flex justify-between items-center mb-4">
      <div class="flex items-center">
        <div class="w-10 h-10 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21 21-6-6m6 6v-4.8m0 4.8h-4.8"></path><path d="M3 16.2V21m0-4.8H7.8"></path><path d="M21 7.8V3m0 4.8h-4.8"></path><path d="M7.8 3H3v4.8"></path></svg>
        </div>
        <input type="text" placeholder="Search by account, merchant, date, category, or amount" class="ml-2 p-2 w-96 rounded-lg border-gray-300 focus:ring-black focus:border-black" />
      </div>
      
      <div class="flex items-center">
        <button class="bg-black text-white px-4 py-2 rounded-lg font-medium flex items-center">
          Send money
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2"><path d="M12 20v-6m0 0V4m0 10h6m-6 0H6"></path></svg>
        </button>
        <div class="ml-4 w-8 h-8 bg-gray-200 rounded-full"></div>
      </div>
    </div>
    
    <div class="grid grid-cols-2 gap-4">
      <div class="bg-white rounded-xl shadow-sm">
        <div class="p-6">
          <h2 class="text-2xl font-bold mb-1">
            Dinobros Co.
          </h2>
          <h1 class="text-4xl font-bold mb-6 flex items-center">
            Hey Jordan
            <span class="ml-2">👋</span>
          </h1>
          
          <TransactionList limit={3} />
        </div>
      </div>
      
      <div class="bg-white rounded-xl shadow-sm">
        <BalanceCard />
      </div>
    </div>
    
    <div class="grid grid-cols-2 gap-4 mt-4">
      <div class="bg-white rounded-xl shadow-sm">
        <BillsList />
      </div>
      
      <div class="bg-white rounded-xl shadow-sm">
        <WalletCard />
      </div>
    </div>
  </div>