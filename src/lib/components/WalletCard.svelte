<script lang="ts">
    import { walletsStore } from '$lib/stores/dashboardStore';
    import { formatCurrency } from '$lib/utils';
    
    $: mainWallet = $walletsStore.find(w => w.type === 'savings') || $walletsStore[0];
  </script>
  
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">Your wallet</h2>
    
    <div class="bg-gray-100 rounded-xl p-6 relative overflow-hidden">
      <div class="grid grid-cols-4 gap-1 absolute inset-0 opacity-10">
        {#each Array(16) as _}
          <div class="border-t border-r border-black"></div>
        {/each}
      </div>
      
      <div class="relative">
        <div class="text-3xl font-bold mb-8">{formatCurrency(mainWallet?.balance || 0)}</div>
        
        <div class="flex justify-end">
          <div class="flex items-center">
            <div class="w-10 h-6">
              <div class="w-4 h-4 bg-gray-300 rounded-full"></div>
              <div class="w-4 h-4 bg-gray-300 rounded-full -mt-2 ml-2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>