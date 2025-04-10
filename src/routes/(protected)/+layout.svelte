<script lang="ts">
    import '$lib/../app.css';
    import Sidebar from '$lib/components/Sidebar.svelte';
  </script>
  
  <div class="h-screen flex overflow-hidden bg-gray-50">
    <div class="w-64 flex-shrink-0">
      <Sidebar />
    </div>
    
    <div class="flex-1 overflow-auto">
      <main>
        <slot />
      </main>
    </div>
  </div>