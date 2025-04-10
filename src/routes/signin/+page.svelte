<!-- <script lang="ts">
  import type { PageData } from './$types';
  import type { Provider } from '@auth/core/providers'; // Correct type for provider
  
    export let data: PageData;
  
    let email = '';
    let password = '';
  
    // Filter out credentials provider for the buttons section
    $: oauthProviders = data.providers.filter(p => p.type === 'oauth') as Provider[]; // Type assertion for clarity
    $: credentialsProvider = data.providers.find(p => p.type === 'credentials');
  
    // Extract potential error from URL query param (Auth.js redirects here on error)
    $: url = new URL(window.location.href);
    $: error = url.searchParams.get('error');
  
    // Basic error messages (you might want more sophisticated handling)
    const errorMessages: Record<string, string> = {
        CredentialsSignin: 'Invalid email or password. Please try again.',
        OAuthSignin: 'Error signing in with OAuth provider.',
        OAuthCallback: 'Error during OAuth callback.',
        OAuthCreateAccount: 'Could not create account using OAuth provider.',
        EmailCreateAccount: 'Could not create account using email.',
        Callback: 'Error in callback handler.',
        OAuthAccountNotLinked: 'This email is already associated with another provider. Try signing in with that provider.',
        EmailSignin: 'Check your email for a sign-in link.',
        AccessDenied: 'Access Denied. You do not have permission to sign in.',
        Verification: 'The sign-in link is no longer valid. It may have expired or already been used.',
        default: 'An unknown error occurred during sign in.'
    };
  
    $: displayError = error ? (errorMessages[error] ?? errorMessages.default) : null;
  
  </script>
  
  <h1>Sign In</h1>
  
  {#if displayError}
    <p style="color: red;">Error: {displayError}</p>
  {/if}
  
  {#if oauthProviders.length > 0}
    <h2>Sign in with:</h2>
    {#each oauthProviders as provider (provider.id)}
      <div style="margin-bottom: 10px;">
        <a href="/auth/signin/{provider.id}" role="button">
            Sign in with {provider.name}
        </a>
      </div>
    {/each}
    <hr />
  {/if}
  
  {#if credentialsProvider}
    <h2>Or sign in with your email</h2>
    <form action="/auth/signin/credentials" method="POST">
        <input type="hidden" name="csrfToken" value={data.csrfToken} />
  
        <div>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required bind:value={email} />
        </div>
        <div>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required bind:value={password} />
        </div>
        <button type="submit">Sign In with Email</button>
    </form>
  {/if}
  
  <hr />
  
  <p>
      Don't have an account? <a href="/register">Register here</a>
  </p>
  
  <style>
      /* Add your styles */
      div { margin-bottom: 1rem; }
      label { display: block; margin-bottom: 0.25rem; }
      input { width: 100%; max-width: 300px; padding: 0.5rem; }
      button, a[role="button"] {
          padding: 0.75rem 1.5rem;
          cursor: pointer;
          text-decoration: none;
          color: white;
          background-color: #007bff;
          border: none;
          border-radius: 4px;
          display: inline-block;
          text-align: center;
       }
       a[role="button"]:hover, button:hover {
          background-color: #0056b3;
       }
  </style> -->