<script>
	import { page } from '$app/stores';

	let { href = '' } = $props();
	let active = $derived.by(() => $page.url.pathname === href); // Check if current path matches link href
</script>

<a
	{href}
	class="hover:text-primary dark:hover:text-primary-light text-sm font-medium transition-colors"
	class:text-primary={active}
	class:dark:text-primary-light={active}
	class:text-text-light={!active}
	class:dark:text-text-dark={!active}
	aria-current={$page.url.pathname === href ? 'page' : undefined}
>
	<slot />
</a>