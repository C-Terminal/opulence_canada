<script>
    import { enhance } from '$app/forms';
    
    export let form;
  </script>
  
  <h1>Login</h1>
  
  <form method="POST" use:enhance>
    <div>
      <label for="email">Email</label>
      <input name="email" id="email" type="email" required />
    </div>
    <div>
      <label for="password">Password</label>
      <input name="password" id="password" type="password" required />
    </div>
    
    {#if form?.error}
      <p class="error">{form.error}</p>
    {/if}
    
    <button type="submit">Login</button>
  </form>
  
  <p>Don't have an account? <a href="/register">Register</a></p>
  
  <style>
    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      max-width: 400px;
    }
    
    .error {
      color: red;
    }
  </style>