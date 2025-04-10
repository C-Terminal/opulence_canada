<script lang="ts">
    import { onMount } from "svelte";
    import { authProviders, loadProviders } from "$lib/auth/providers";
    
    export let variant: "buttons" | "icons" = "buttons";
    export let buttonText: string = "Continue with";
    
    onMount(() => {
      loadProviders();
    });
  </script>
  
  {#if variant === "buttons"}
    <div class="provider-buttons">
      {#if $authProviders.length === 0}
        <p>Loading authentication options...</p>
      {:else}
        {#each $authProviders as provider}
          <button 
            class="provider-button"
            on:click={() => window.location.href = `/auth/signin/${provider.id}`}
          >
            <img src={provider.iconUrl} alt={provider.name} class="provider-icon" />
            <span>{buttonText} {provider.name}</span>
          </button>
        {/each}
      {/if}
    </div>
  {:else}
    <div class="provider-icons">
      {#if $authProviders.length === 0}
        <p>Loading options...</p>
      {:else}
        {#each $authProviders as provider}
          <a href={`/auth/signin/${provider.id}`} class="icon-button" title={`${buttonText} ${provider.name}`}>
            <img src={provider.iconUrl} alt={provider.name} />
          </a>
        {/each}
      {/if}
    </div>
  {/if}
  
  <style>
    .provider-buttons {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .provider-button {
      display: flex;
      align-items: center;
      padding: 0.75rem 1rem;
      border: 1px solid #ccc;
      border-radius: 0.5rem;
      background: white;
      cursor: pointer;
      font-size: 1rem;
      transition: background-color 0.2s;
    }
    
    .provider-button:hover {
      background-color: #f9f9f9;
    }
    
    .provider-icon {
      width: 24px;
      height: 24px;
      margin-right: 1rem;
    }
    
    .provider-icons {
      display: flex;
      gap: 1rem;
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