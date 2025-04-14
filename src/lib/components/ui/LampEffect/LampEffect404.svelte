<script>
	import { Motion } from 'svelte-motion';
	import { LampEffect } from '.';
</script>

<LampEffect>
	<Motion
		let:motion
		initial={{ opacity: 0.5, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
		transition={{
			delay: 0.3,
			duration: 0.8,
			ease: 'easeInOut'
		}}
	>
		<h2
			use:motion
			class="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text py-4 text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
		>
			Build lamps <br /> the right way
		</h2>
	</Motion>
</LampEffect>