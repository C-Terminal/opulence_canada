<script lang="ts">
  import { onMount } from "svelte";
  import { authProviders, loadProviders } from "$lib/auth/providers";
  import { goto } from "$app/navigation";
  
  // Form state
  let email = "";
  let password = "";
  let errorMessage = "";
  let isLoading = false;
  
  onMount(() => {
    loadProviders();
  });
  
  async function handleCredentialsSubmit() {
    if (!email || !password) {
      errorMessage = "Please enter both email and password";
      return;
    }
    
    isLoading = true;
    errorMessage = "";
    
    try {
      // Using Auth.js's signIn function
      const result = await fetch("/auth/signin/credentials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email, 
          password,
          callbackUrl: "/" // Where to redirect after successful login
        })
      });
      
      const data = await result.json();
      
      if (data.error) {
        errorMessage = "Invalid email or password";
      } else if (data.url) {
        // Successful login, redirect
        goto(data.url);
      }
    } catch (error) {
      console.error("Login error:", error);
      errorMessage = "An error occurred during login";
    } finally {
      isLoading = false;
    }
  }
</script>

<div class="login-container">
  <h1>Sign in to your account</h1>
  
  <!-- Social Login Providers -->
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
  
  <!-- Divider -->
  <div class="divider">
    <span>Or</span>
  </div>
  
  <!-- Credentials Login Form -->
  <form class="credentials-form" on:submit|preventDefault={handleCredentialsSubmit}>
    {#if errorMessage}
      <div class="error-message">{errorMessage}</div>
    {/if}
    
    <div class="form-group">
      <label for="email">Email</label>
      <input 
        id="email"
        type="email" 
        bind:value={email} 
        placeholder="user@example.com"
        required
      />
    </div>
    
    <div class="form-group">
      <label for="password">Password</label>
      <input 
        id="password"
        type="password" 
        bind:value={password}
        required
      />
    </div>
    
    <button type="submit" class="submit-button" disabled={isLoading}>
      {isLoading ? 'Signing in...' : 'Sign in with Email'}
    </button>
    
    <div class="form-footer">
      <a href="/forgot-password">Forgot password?</a>
      <span class="separator">•</span>
      <a href="/register">Create account</a>
    </div>
  </form>
</div>

<style>
  .login-container {
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
  
  .divider {
    display: flex;
    align-items: center;
    margin: 2rem 0;
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
  
  .credentials-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .error-message {
    background-color: #fff5f5;
    color: #e53e3e;
    padding: 0.75rem;
    border-radius: 0.375rem;
    border: 1px solid #fed7d7;
    margin-bottom: 1rem;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .form-group label {
    font-weight: 500;
    font-size: 0.875rem;
  }
  
  .form-group input {
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 0.375rem;
    font-size: 1rem;
  }
  
  .submit-button {
    background-color: #4f46e5;
    color: white;
    padding: 0.75rem;
    border: none;
    border-radius: 0.375rem;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .submit-button:hover {
    background-color: #4338ca;
  }
  
  .submit-button:disabled {
    background-color: #818cf8;
    cursor: not-allowed;
  }
  
  .form-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 1rem;
    font-size: 0.875rem;
  }
  
  .form-footer a {
    color: #4f46e5;
    text-decoration: none;
  }
  
  .form-footer a:hover {
    text-decoration: underline;
  }
  
  .separator {
    color: #ccc;
  }
</style>