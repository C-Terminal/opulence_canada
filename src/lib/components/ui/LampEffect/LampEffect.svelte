<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Motion } from 'svelte-motion';

	// Existing prop
	let { className = '', triggerInView = $bindable(false) } = $props();

	// New optional prop to control animation trigger
	// Default is false (original behavior: animate on load)
	

	// Define the target animation state once
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


</script>

<div
	class={cn(
		'bg-fintech-dark relative z-0 flex min-h-screen w-full flex-col items-center justify-center overflow-hidden rounded-md',
		className
	)}
>
	<div class="relative isolate z-0 flex w-full flex-1 scale-y-125 items-center justify-center">
		<Motion
			let:motion
			initial={initialConicState}
			animate={triggerInView ? targetAnimationState : undefined}
			transition={commonTransition}
			style={{
				backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`
			}}
		>
			<div
				use:motion
				class="bg-gradient-conic from-fintech-accent absolute inset-auto right-1/2 h-56 max-w-full via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
			>
				<div
					class="bg-fintech-dark absolute bottom-0 left-0 z-20 h-40 w-full [mask-image:linear-gradient(to_top,white,transparent)]"
				/>
				<div
					class="bg-fintech-dark absolute bottom-0 left-0 z-20 h-full w-40 [mask-image:linear-gradient(to_right,white,transparent)]"
				/>
			</div>
		</Motion>

		<Motion
			let:motion
			initial={initialConicState}
			animate={triggerInView ? targetAnimationState : undefined}
			transition={commonTransition}
			style={{
				backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`
			}}
		>
			<div
				use:motion
				class="bg-gradient-conic to-fintech-accent absolute inset-auto left-1/2 h-56 max-w-full from-transparent via-transparent text-white [--conic-position:from_290deg_at_center_top]"
			>
			
				<div
					class="bg-fintech-dark absolute right-0 bottom-0 z-20 h-full w-40 [mask-image:linear-gradient(to_left,white,transparent)]"
				/>
				<div
					class="bg-fintech-dark absolute right-0 bottom-0 z-20 h-40 w-full [mask-image:linear-gradient(to_top,white,transparent)]"
				/>
			</div>
		</Motion>

		<div
			class="bg-fintech-dark absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 blur-2xl"
		></div>
		<div class="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>

		<Motion
			let:motion
			initial={initialGlowState}
			animate={triggerInView ? targetWidthAnimationState : undefined}
			transition={commonTransition}
		>
			<div
				use:motion
				class="bg-fintech-accent absolute inset-auto z-30 h-36 max-w-md -translate-y-24 rounded-full opacity-30 blur-2xl"
			></div>
		</Motion>

		<Motion
			let:motion
			initial={initialLineState}
			animate={triggerInView ? targetLineWidthAnimationState : undefined}
			transition={commonTransition}
		>
			<div
				use:motion
				class="bg-fintech-accent absolute inset-auto z-50 h-0.5 max-w-xl -translate-y-28 opacity-50"
			></div>
		</Motion>

		<div class="bg-fintech-dark absolute inset-auto z-40 h-44 w-full -translate-y-48"></div>
	</div>

	<div
		class="relative z-50 flex w-full -translate-y-64 flex-col items-center px-5 md:-translate-y-80"
	>
		<slot />
	</div>
</div>
