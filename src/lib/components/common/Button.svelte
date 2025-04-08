<script>
	const { variant = 'outline', size = 'md', color = 'primary', disabled = false, onclick = () => {}, href = '' } = $props();
</script>

<button
	class={`btn btn-${variant} btn-${color} btn-${size}`}
	disabled={disabled}
	onclick={onclick()}
>
	<slot />
</button>
