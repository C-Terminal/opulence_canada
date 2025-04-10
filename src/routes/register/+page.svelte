
// src/routes/register/+page.svelte
<script lang="ts">
  import { onMount } from "svelte";
  import { authProviders, loadProviders } from "$lib/auth/providers";
  import { goto } from "$app/navigation";
  
  onMount(() => {
    loadProviders();
  });
</script>

<div class="register-container">
  <h1>Create a new account</h1>
  
  <div class="provider-list">
    {#if $authProviders.length === 0}
      <p>Loading authentication options...</p>
    {:else}
      {#each $authProviders.filter(p => p.type === "oauth") as provider}
        <button 
          class="provider-button"
          on:click={() => window.location.href = `/auth/signin/${provider.id}`}
        >
          <img src={provider.iconUrl} alt={provider.name} class="provider-icon" />
          <span>Continue with {provider.name}</span>
        </button>
      {/each}
    {/if}
  </div>
  
  <div class="divider">
    <span>Or</span>
  </div>
  
  <button 
    class="email-button"
    on:click={() => goto('/register/email')}
  >
    <img src="/images/auth/email.svg" alt="Email" class="provider-icon" />
    <span>Sign up with Email & Password</span>
  </button>
  
  <div class="login-link">
    Already have an account? <a href="/login">Sign in</a>
  </div>
</div>

<style>
  .register-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 2rem;
  }
  
  .provider-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 2rem;
  }
  
  .provider-button, .email-button {
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
  
  .provider-button:hover, .email-button:hover {
    background-color: #f9f9f9;
  }
  
  .email-button {
    margin-top: 1rem;
    background-color: #f9f9f9;
  }
  
  .provider-icon {
    width: 24px;
    height: 24px;
    margin-right: 1rem;
  }
  
  .divider {
    display: flex;
    align-items: center;
    margin: 2rem 0 1rem;
    color: #666;
  }
  
  .divider::before,
  .divider::after {
    content: "";
    flex: 1;
    border-bottom: 1px solid #ddd;
  }
  
  .divider span {
    padding: 0 1rem;
  }
  
  .login-link {
    margin-top: 2rem;
    text-align: center;
    font-size: 0.875rem;
  }
  
  .login-link a {
    color: #4f46e5;
    text-decoration: none;
  }
  
  .login-link a:hover {
    text-decoration: underline;
  }
</style>
