<script>
const navigation = [
    { name: 'Home', icon: 'home', href: '/' },
    { name: 'Transactions', icon: 'credit-card', href: '/admin/transactions' },
    { name: 'Payments', icon: 'wallet', href: '/admin/payments' },
    { name: 'Accounts', icon: 'briefcase', href: '/admin/accounts' }
  ];
</script>

<div class="h-full flex flex-col bg-white border-r">
  <div class="p-4 flex items-center">
    <button class="p-2">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-700"><path d="M12 5v14M5 12h14"></path></svg>
    </button>
    <span class="ml-2 font-medium text-lg">universe</span>
  </div>
  
  <div class="pt-5">
    {#each navigation as item}
      <a href={item.href} class="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100">
        {#if item.icon === 'home'}
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-3"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
        {:else if item.icon === 'credit-card'}
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-3"><rect width="20" height="14" x="2" y="5" rx="2"></rect><line x1="2" x2="22" y1="10" y2="10"></line></svg>
        {:else if item.icon === 'wallet'}
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-3"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path></svg>
        {:else if item.icon === 'briefcase'}
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-3"><rect width="20" height="14" x="2" y="7" rx="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
        {/if}
        <span>{item.name}</span>
      </a>
    {/each}
  </div>
  
  <div class="mt-auto p-4">
    <div class="bg-gray-100 rounded-xl p-4 flex flex-col items-center text-center">
      <div class="w-24 h-24 mb-3">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="40" stroke="#e5e5e5" stroke-width="5" fill="none" />
          <path d="M50 10 A40 40 0 0 1 90 50" stroke="#10b981" stroke-width="5" stroke-linecap="round" />
        </svg>
      </div>
      <h3 class="font-bold mb-1">Reach money goals faster</h3>
      <button class="mt-3 bg-black text-white px-6 py-2 rounded-md text-sm font-medium">Start</button>
    </div>
    <div class="mt-6 text-xs text-gray-400">© universe Ltd 2022</div>
  </div>
</div>
