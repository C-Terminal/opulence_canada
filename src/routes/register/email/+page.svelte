<script lang="ts">
    import { goto } from "$app/navigation";
    
    let email = "";
    let password = "";
    let confirmPassword = "";
    let name = "";
    let errorMessage = "";
    let isLoading = false;
    
    async function handleRegister() {
      // Basic validation
      if (!email || !password || !confirmPassword || !name) {
        errorMessage = "All fields are required";
        return;
      }
      
      if (password !== confirmPassword) {
        errorMessage = "Passwords do not match";
        return;
      }
      
      if (password.length < 8) {
        errorMessage = "Password must be at least 8 characters";
        return;
      }
      
      isLoading = true;
      errorMessage = "";
      
      try {
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, name })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          errorMessage = data.message || "Registration failed";
          return;
        }
        
        // Registration successful, redirect to login page
        goto("/login?registered=true");
      } catch (error) {
        console.error("Registration error:", error);
        errorMessage = "An error occurred during registration";
      } finally {
        isLoading = false;
      }
    }
  </script>
  
  <div class="register-container text-black">
    <h1>Create your account</h1>
    <p class="subtitle">Enter your information to sign up</p>
    
    <form class="register-form" on:submit|preventDefault={handleRegister}>
      {#if errorMessage}
        <div class="error-message">{errorMessage}</div>
      {/if}
      
      <div class="form-group ">
        <label for="name" class="text-white">Full Name</label>
        <input 
          id="name"
          type="text" 
          bind:value={name} 
          placeholder="Jane Doe"
          required
        />
      </div>
      
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
          placeholder="At least 8 characters"
          required
          minlength="8"
        />
      </div>
      
      <div class="form-group">
        <label for="confirmPassword">Confirm Password</label>
        <input 
          id="confirmPassword"
          type="password" 
          bind:value={confirmPassword}
          placeholder="Repeat your password"
          required
        />
      </div>
      
      <button type="submit" class="submit-button" disabled={isLoading}>
        {isLoading ? 'Creating account...' : 'Create account'}
      </button>
      
      <div class="form-footer">
        Already have an account? <a href="/login">Sign in</a>
      </div>
    </form>
  </div>
  
  <style>
    .register-container {
      max-width: 400px;
      margin: 0 auto;
      padding: 2rem;
    }
    
    h1 {
      margin-bottom: 0.5rem;
    }
    
    .subtitle {
      color: #666;
      margin-bottom: 2rem;
    }
    
    .register-form {
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
      margin-top: 0.5rem;
    }
    
    .submit-button:hover {
      background-color: #4338ca;
    }
    
    .submit-button:disabled {
      background-color: #818cf8;
      cursor: not-allowed;
    }
    
    .form-footer {
      text-align: center;
      margin-top: 1.5rem;
      font-size: 0.875rem;
    }
    
    .form-footer a {
      color: #4f46e5;
      text-decoration: none;
    }
    
    .form-footer a:hover {
      text-decoration: underline;
    }
  </style>
  