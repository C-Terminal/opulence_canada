<!-- <script>
	import Button from '../common/Button.svelte';

	let { logo = '' } = $props();
</script>

<nav class="navbar bg-base-300 justify-center">
	<a class="btn btn-ghost text-lg">
		<img alt="Logo" src={logo} class="w-4" />
		Store Name
	</a>
</nav>

<nav class="bg-base-200 flex justify-center">
	<ul class="menu menu-horizontal justify-center">
		<li>
			<a>
				<i class="fa-solid fa-shop text-secondary"></i>
				Shop
			</a>
		</li>
		<li>
			<a>
				<i class="fa-solid fa-book-open text-secondary"></i>
				Catalog
			</a>
		</li>
		<li>
			<a>
				<i class="fa-solid fa-newspaper text-secondary"></i>
				News
			</a>
		</li>
		<li>
			<a>
				<i class="fa-solid fa-rss text-secondary"></i>
				Blog
			</a>
		</li>
		<li>
			<a>
				<i class="fa-solid fa-users text-secondary"></i>
				Team
			</a>
		</li>
		<li>
			{#if loggedIn}
				<Button variant="secondary" size="sm" href="/admin">Admin Portal</Button>
				<Button variant="outline" size="sm" onclick={() => logout()}>Logout</Button>
			{:else}
				<Button variant="primary" size="sm" href="/login">Login</Button>
			{/if}
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
		</li>
	</ul>
</nav> -->
