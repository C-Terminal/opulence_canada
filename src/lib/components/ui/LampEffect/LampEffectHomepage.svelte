<script lang="ts">
	import { Motion } from 'svelte-motion';
	import LampEffect from './LampEffect.svelte'; // Adjust path as needed

	// Set this to true if you want LampEffect's internal animations
	// to wait until it scrolls into view.
	let shouldTriggerLampInView = $state(false);

	let element = null;
	const targetAnimationState = { opacity: 0.8, width: '80%' };
	const targetWidthAnimationState = { width: '50%' };
	const targetLineWidthAnimationState = { width: '80%' };

	// Define common initial states
	const initialConicState = { opacity: 0.5, width: '40%' };
	const initialGlowState = { width: '25%' };
	const initialLineState = { width: '40%' };

	// Define common transition
	const commonTransition = {
		delay: 0.3,
		duration: 0.8,
		ease: 'easeInOut'
	};
	function isElementInMiddle(el: HTMLElement) {
		const rect = el.getBoundingClientRect();
		const viewportMiddle = window.innerHeight / 2;
		return rect.top < viewportMiddle && rect.bottom > viewportMiddle;
	}

	$effect(() => {
		if (!element) return;

		const observer = new IntersectionObserver(
			() => {
				shouldTriggerLampInView = isElementInMiddle(element);
			},
			{
				root: null,
				threshold: [0]
			}
		);

		observer.observe(element);

		const onScroll = () => {
			shouldTriggerLampInView = isElementInMiddle(element);
		};

		window.addEventListener('scroll', onScroll);
		window.addEventListener('resize', onScroll);

		return () => {
			observer.disconnect();
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onScroll);
		};
	});
</script>

<LampEffect>
	<Motion
		let:motion
		initial={{ opacity: 0.5, y: 100 }}
		animate={shouldTriggerLampInView ? targetAnimationState : undefined}
		transition={{
			delay: 1.0,
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
				delay: 1.6, // Note: delay is relative to load/mount time
				duration: 1.0,
				ease: 'easeInOut'
			}}
		>
			<div use:motion class="fade-in-content mt-10 flex w-full items-center justify-center">
				<img alt="Logo" src="/images/logo/opulent_canada.png" class="center w-1/2" />
			</div>
		</Motion>
	</Motion>
</LampEffect>
