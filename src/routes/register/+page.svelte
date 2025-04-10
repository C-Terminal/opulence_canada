<script lang="ts">
    import { onMount } from "svelte";
    import { authProviders, loadProviders } from "$lib/auth/providers";
    
    onMount(() => {
      loadProviders();
    });
  </script>
  
  <div class="register-container">
    <h1>Create a new account</h1>
    
    <div class="auth-options">
      <h2>Sign up with</h2>
      
      <div class="provider-icons">
        {#if $authProviders.length === 0}
          <p>Loading options...</p>
        {:else}
          {#each $authProviders as provider}
            <a href={`/auth/signin/${provider.id}`} class="icon-button" title={`Sign up with ${provider.name}`}>
              <img src={provider.iconUrl} alt={provider.name} />
            </a>
          {/each}
        {/if}
      </div>
    </div>
  </div>
  
  <style>
    .register-container {
      max-width: 500px;
      margin: 0 auto;
      padding: 2rem;
    }
    
    .auth-options {
      margin-top: 2rem;
    }
    
    .provider-icons {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
    }
    
    .icon-button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      border: 1px solid #eee;
      padding: 0.5rem;
      transition: background-color 0.2s;
    }
    
    .icon-button:hover {
      background-color: #f9f9f9;
    }
    
    .icon-button img {
      width: 24px;
      height: 24px;
    }
  </style>