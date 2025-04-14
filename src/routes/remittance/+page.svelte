<script lang="ts">
	import Remittances from '$lib/components/financial/remittance/Remittances.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div class="container mx-auto space-y-8 px-4 py-12"><Remittances /></div>
