<script lang="ts">

	let {
		label = '',
		id = 'input-' + Math.random().toString(36).substring(2, 9), // Generate semi-unique ID
		type = 'text',
		placeholder = '',
		required = false,
		disabled = false,
		value = $bindable(), // Use `bind:value` where you use the component
		wrapperClass = '',
		labelClass = 'block text-sm font-medium mb-1',
		inputClass = 'w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-secondary dark:placeholder-gray-500',
		errorMessage = '' // Optional error message display
	} = $props();

	// Needs explicit binding in the parent: <Input bind:value={variable} ... />
	let internalValue = $state(value); // Manage internal state if needed, or just rely on bind:value

	$effect(() => {
		// Sync prop changes to internal state if necessary
		internalValue = value;
	});

	// Function to update the bound value in the parent

	function updateValue(event: Event) {
		const target = event.target as HTMLInputElement;
		value = target.value; // Update the bound prop 'value'
		internalValue = value;
	}
</script>

<div class={wrapperClass}>
	{#if label}
		<label for={id} class={labelClass}>{label}</label>
	{/if}
	<input
		{type}
		{id}
		name={id}
		class="{inputClass} {errorMessage ? 'dark:border-accent border-red-500' : ''} {disabled
			? 'cursor-not-allowed opacity-50'
			: ''}"
		{placeholder}
		{required}
		{disabled}
		value={internalValue}
		oninput={updateValue}
		aria-invalid={errorMessage ? 'true' : undefined}
		aria-describedby={errorMessage ? `${id}-error` : undefined}
	/>
	{#if errorMessage}
		<p id="{id}-error" class="dark:text-accent mt-1 text-xs text-red-600">{errorMessage}</p>
	{/if}
</div>
