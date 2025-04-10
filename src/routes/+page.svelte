<!-- src/routes/+page.svelte -->
<script>
  import { onMount } from 'svelte';
  
  let isLoggedIn = false;
  
  onMount(() => {
    // Any initialization code can go here
  });
</script>

<div class="min-h-screen bg-black text-white relative overflow-hidden">
  <!-- Star background effect -->
  <div class="absolute inset-0 z-0">
    <div class="stars"></div>
  </div>

  <!-- Floating 3D elements -->
  <div class="absolute right-24 top-24 md:right-32 md:top-24 z-10 animate-float-slow">
    <img src="/images/astronaut.png" alt="Floating astronaut" class="w-24 md:w-32" />
  </div>
  
  <div class="absolute left-16 bottom-24 z-10 animate-float">
    <img src="/images/cube.png" alt="Floating cube" class="w-16 md:w-24" />
  </div>

  <!-- Main Content -->
  <div class="container mx-auto px-4 py-6 relative z-20">
    <!-- Navigation Bar -->
    <nav class="flex items-center justify-between mb-12">
      <div class="flex items-center">
        <div class="flex items-center">
          <div class="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center mr-2">
            <span class="font-bold">S</span>
          </div>
          <span class="font-bold text-lg">Sammy.</span>
        </div>
        
        <div class="hidden md:flex ml-8">
          <a href="#" class="mx-3 text-sm text-gray-400 hover:text-white">FAQs</a>
          <a href="#" class="mx-3 text-sm text-gray-400 hover:text-white">Community</a>
        </div>
      </div>
      
      <div class="flex items-center">
        <button class="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-full text-sm">
          Request early access
        </button>
        {#if isLoggedIn}
          <div class="ml-4 bg-gray-300 rounded-full w-8 h-8"></div>
        {:else}
          <div class="ml-4 bg-gray-300 rounded-full w-8 h-8"></div>
        {/if}
      </div>
    </nav>

    <!-- Availability Banner -->
    <div class="bg-zinc-900 rounded-full py-2 px-4 flex items-center justify-center mb-20 max-w-xl mx-auto">
      <span class="text-sm text-gray-400">Available for Mexico</span>
      <span class="mx-2 text-gray-500">•</span>
      <span class="text-sm text-gray-400">Brazil</span>
      <span class="mx-2 text-gray-500">•</span>
      <span class="text-sm text-gray-400 mr-1">and</span>
      <span class="text-sm text-gray-400 underline cursor-pointer">Get the app</span>
      <span class="ml-1 text-sm">→</span>
    </div>

    <!-- Hero Content -->
    <div class="max-w-4xl mx-auto text-center mb-12">
      <h1 class="text-4xl md:text-6xl font-bold mb-6 leading-tight">
        U.S. Banking for global digital professionals
      </h1>
      
      <p class="text-gray-400 max-w-2xl mx-auto mb-8">
        Sammy offers global professionals a way to get paid faster from the United States, save their money in dollars and spend with an international Mastercard
      </p>
      
      <button class="bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-6 py-3 rounded-full">
        Request early access
      </button>
    </div>
  </div>
</div>

<style>
  /* Floating animations */
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-15px); }
    100% { transform: translateY(0px); }
  }
  
  @keyframes float-slow {
    0% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-10px) rotate(5deg); }
    100% { transform: translateY(0px) rotate(0deg); }
  }
  
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  
  .animate-float-slow {
    animation: float-slow 8s ease-in-out infinite;
  }
  
  /* Star background */
  .stars {
    background-image: radial-gradient(2px 2px at 20px 30px, #ffffff, rgba(0, 0, 0, 0)), 
                      radial-gradient(2px 2px at 40px 70px, #ffffff, rgba(0, 0, 0, 0)), 
                      radial-gradient(2px 2px at 50px 160px, #ffffff, rgba(0, 0, 0, 0)),
                      radial-gradient(2px 2px at 90px 40px, #ffffff, rgba(0, 0, 0, 0)),
                      radial-gradient(2px 2px at 130px 80px, #ffffff, rgba(0, 0, 0, 0)),
                      radial-gradient(2px 2px at 160px 120px, #ffffff, rgba(0, 0, 0, 0));
    background-repeat: repeat;
    background-size: 200px 200px;
    height: 100%;
    width: 100%;
    opacity: 0.3;
  }
</style>