<script lang="ts">
	import Footer from '$lib/components/layout/Footer.svelte';
	import '../app.css'; // Tailwind CSS import
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	$: session = data.session; // Session data is reactive

	// This script ensures the correct theme is applied before the page renders
	// to prevent theme flickering
	if (typeof window !== 'undefined') {
		const script = document.createElement('script');
		script.textContent = `
      (function() {
        const theme = localStorage.getItem('theme') || 
          (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        document.documentElement.classList.toggle('dark', theme === 'dark');
      })();
    `;
		document.head.appendChild(script);
	}
</script>

<nav class="navbar bg-base-100 shadow-sm" aria-label="Main navigation">
	<div class="navbar-start">
		<div class="dropdown">
			<button
				type="button"
				class="btn btn-ghost btn-circle"
				aria-label="Toggle navigation menu"
				aria-haspopup="true"
				aria-controls="mobile-menu"
				tabindex="0"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					aria-hidden="true"
					focusable="false"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h16M4 18h7"
					/>
				</svg>
			</button>
			<ul
				id="mobile-menu"
				class="menu menu-md dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
				role="menu"
			>
				<li><a href="/" role="menuitem">Homepage</a></li>
				<li><a href="/forex" role="menuitem">Foreign Exchange</a></li>
				<li><a href="/remittance" role="menuitem">Remittances</a></li>
				<li><a href="/transfer" role="menuitem">Money Transfer</a></li>
			</ul>
		</div>
	</div>
	<div class="navbar-center">
		<a href="/" class="btn btn-ghost text-xl"> Opulent Canada </a>
	</div>
	<div class="navbar-end">
		<button class="btn btn-ghost btn-circle" aria-label="Search">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				aria-hidden="true"
				focusable="false"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
				/>
			</svg>
		</button>
	</div>
</nav>
<!-- {#if session?.user}
		<span>Welcome, {session.user.name ?? session.user.email}!</span>
		<img
			src={session.user.image ?? '/default-avatar.png'}
			alt="User avatar"
			width="32"
			height="32"
			style="border-radius: 50%; margin-left: 10px;"
		/>
		<form action="/auth/signout" method="POST">
			<button type="submit">Sign Out</button>
		</form>
	{:else}
		<span>You are not signed in.</span>
		<a href="/auth/signin">Sign In</a>
	{/if} -->

<!-- {#if session?.user}
				<li><Button variant="secondary" size="sm" href="/admin">Admin Portal</Button></li>
				<li>
					<form action="/auth/signout" method="POST">
						<button type="submit">Sign Out</button>
					</form>
				</li>
			{:else}
				<li><Button variant="primary" size="sm" href="/login">Login</Button></li>
			{/if}
		</li>
		<li>
			<button
				onclick={() => document.documentElement.classList.toggle('dark')}
				class="dark:hover:bg-background-dark-secondary rounded-md p-2 transition-colors hover:bg-gray-200"
				aria-label="Toggle dark mode"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="block h-5 w-5 dark:hidden"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
					/>
				</svg>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="hidden h-5 w-5 dark:block"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-6.364-.386 1.591-1.591M3 12h2.25m.386-6.364 1.591 1.591M12 6A6 6 0 1 0 12 18a6 6 0 0 0 0-12Z"
					/>
				</svg>
			</button>
		</li> -->
<!-- </li>
	</ul>
</nav> -->
<div class="flex min-h-screen flex-col">
	<main class="flex-grow">
		<slot />
	</main>

	<Footer />
</div>
