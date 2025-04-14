<script>
	import { Motion } from 'svelte-motion';
	import { LampEffect } from '.';
</script>

<LampEffect>
	<Motion
		let:motion
		initial={{ opacity: 0.5, y: 100 }}
		animate={{ opacity: 1, y: 0, scaleY: 1 }}
		transition={{
			delay: 0.3,
			duration: 1.2,
			ease: 'easeInOut'
		}}
	>
		<h2
			use:motion
			class="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text py-4 text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
		>
			Canadian Banking for global digital professionals
		</h2>
		<Motion
			let:motion
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{
				delay: 1.6,
				duration: 1.0,
				ease: 'easeInOut'
			}}
		>
			<div use:motion class="fade-in-content w-1/2 flex items-center justify-center mt-10">
				<img alt="Logo" src="/images/logo/opulent_canada.png" class="center" />
			</div>
		</Motion>
	</Motion>
</LampEffect>
