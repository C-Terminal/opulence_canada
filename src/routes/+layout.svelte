<script lang="ts">
	import type { LayoutData } from './$types';
  
	export let data: LayoutData;
  
	$: session = data.session; // Session data is reactive
  </script>
  
  <nav>
	{#if session?.user}
	  <span>Welcome, {session.user.name ?? session.user.email}!</span>
	  <img src={session.user.image ?? '/default-avatar.png'} alt="User avatar" width="32" height="32" style="border-radius: 50%; margin-left: 10px;">
	  <form action="/auth/signout" method="POST">
		<button type="submit">Sign Out</button>
	  </form>
	{:else}
	  <span>You are not signed in.</span>
	  <a href="/auth/signin">Sign In</a>
	  {/if}
  </nav>
  
  <hr />
  
  <main>
	<slot /> </main>
  
  <style>
	nav {
	  display: flex;
	  align-items: center;
	  gap: 1rem;
	  padding: 1rem;
	  border-bottom: 1px solid #ccc;
	}
	button, a {
	  padding: 0.5rem 1rem;
	  cursor: pointer;
	}
  </style>