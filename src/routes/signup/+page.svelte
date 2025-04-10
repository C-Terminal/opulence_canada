<!-- <script lang="ts">
  import type { ActionData, PageData } from './$types';
  import type { Provider } from '@auth/core/providers';
  
    export let data: PageData; // From load function (providers)
    export let form: ActionData; // From form action (contains errors on failure)
  
    let name = form?.name ?? ''; // Pre-fill from form data on error
    let email = form?.email ?? ''; // Pre-fill from form data on error
    let password = '';
  
    // Filter for OAuth providers for alternative sign-in links
    $: oauthProviders = data.providers.filter(p => p.type === 'oauth') as Provider[];
  
  </script>
  
  <h1>Register</h1>
  
  {#if form?.error}
      <p style="color: red;">{form.error}</p>
  {/if}
  
  <form method="POST" action="?/register">
      <div>
          <label for="name">Name:</label>
          <input type="text" id="name" name="name" required bind:value={name} />
          {#if form?.errors?.name}
              <p style="color: red;">{form.errors.name[0]}</p>
          {/if}
      </div>
      <div>
          <label for="email">Email:</label>
          <input type="email" id="email" name="email" required bind:value={email} />
           {#if form?.errors?.email}
              <p style="color: red;">{form.errors.email[0]}</p>
          {/if}
      </div>
      <div>
          <label for="password">Password:</label>
          <input type="password" id="password" name="password" required bind:value={password} minlength="8"/>
           {#if form?.errors?.password}
              <p style="color: red;">{form.errors.password[0]}</p>
          {/if}
      </div>
      <button type="submit">Register</button>
  </form>
  
  <hr />
  
  {#if oauthProviders.length > 0}
    <p>Already have an account or prefer using:</p>
     {#each oauthProviders as provider (provider.id)}
      <div style="margin-bottom: 10px;">
        <a href="/auth/signin/{provider.id}" role="button">
            Sign in with {provider.name}
        </a>
      </div>
    {/each}
  {/if}
  
   <p>
      Already registered? <a href="/login">Sign in here</a>
  </p>
  
   <style>
      /* Add your styles - same as login page or customize */
      div { margin-bottom: 1rem; }
      label { display: block; margin-bottom: 0.25rem; }
      input { width: 100%; max-width: 300px; padding: 0.5rem; }
      button, a[role="button"] {
          padding: 0.75rem 1.5rem;
          cursor: pointer;
          text-decoration: none;
          color: white;
          background-color: #28a745; /* Green for register */
          border: none;
          border-radius: 4px;
          display: inline-block;
          text-align: center;
       }
        a[role="button"] {
            background-color: #007bff; /* Blue for sign-in links */
        }
       a[role="button"]:hover, button:hover {
          opacity: 0.9;
       }
       p[style*="color: red"] { /* Style for error messages */
           margin-top: -0.75rem;
           margin-bottom: 1rem;
           font-size: 0.875em;
       }
  </style> -->