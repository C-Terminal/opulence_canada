<script lang="ts">
    import { billsStore, upcomingBillsTotal } from '$lib/stores/dashboardStore';
    import { formatCurrency, formatDateShort } from '$lib/utils';
    
    // Calculate date range
    const today = new Date();
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const dateRange = `12 — ${endOfMonth.getDate()} Apr`;
  </script>
  
  <div class="p-4">
    <h2 class="text-xl font-bold mb-2">Upcoming bills</h2>
    
    <div class="flex justify-between items-center mb-4">
      <span class="text-4xl font-bold">{formatCurrency($upcomingBillsTotal)}</span>
      <div class="text-sm border rounded-lg px-3 py-1 flex items-center">
        {dateRange}
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-1"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line></svg>
      </div>
    </div>
    
    <div class="grid grid-cols-3 gap-3">
      {#each $billsStore as bill}
        <div class="rounded-xl p-4" style="background-color: {bill.category === 'utilities' ? '#e2f9ed' : bill.category === 'rent' ? '#f0f0f0' : '#000'}; color: {bill.category === 'utilities' || bill.category === 'rent' ? '#000' : '#fff'}">
          <div class="text-xl font-bold mb-4">{formatCurrency(bill.amount)}</div>
          <div class="flex items-center mb-4">
            <div class="w-8 h-8 flex items-center justify-center bg-white bg-opacity-20 rounded-full">
              {#if bill.category === 'internet'}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12.5a10 10 0 0 0-10-10v10Z"></path><path d="M15.06 12.04 5.92 15.15a10 10 0 0 0 9.14-3.11Z"></path><path d="M10.05 1.81A10 10 0 0 0 2 12.5h8.06V1.81Z"></path></svg>
              {:else if bill.category === 'rent'}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h1"></path><path d="M17 3h1a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-1"></path><path d="M3 12h3v8H3z"></path><path d="M8 4h8v16H8z"></path><path d="M18 4h3v8h-3z"></path></svg>
              {:else if bill.category === 'utilities'}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 3v14"></path><path d="M14 7v10"></path><path d="M10 5v12"></path><path d="M6 9v8"></path></svg>
              {/if}
            </div>
          </div>
          <div class="flex justify-between items-center">
            <div class="font-medium">{bill.name}</div>
            <div class="text-sm opacity-75">{formatDateShort(bill.dueDate)} Apr</div>
          </div>
        </div>
      {/each}
    </div>
  </div>
  