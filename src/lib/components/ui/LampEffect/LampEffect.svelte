<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Motion } from 'svelte-motion';
	export let className: string | undefined = undefined;
</script>
<div
	class={cn(
		'relative z-0 flex min-h-screen w-full flex-col items-center justify-center overflow-hidden rounded-md bg-slate-950',
		className
	)}
>
	<div class="relative isolate z-0 flex w-full flex-1 scale-y-125 items-center justify-center">
		<Motion
			let:motion
			initial={{ opacity: 0.5, width: '40%' }}
			animate={{ opacity: 1, width: '80%' }}
			transition={{
				delay: 0.3,
				duration: 0.8,
				ease: 'easeInOut'
			}}
			style={{
				backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`
			}}
		>
			<div
				use:motion
				class="bg-gradient-conic absolute inset-auto right-1/2 h-56 max-w-full overflow-visible from-cyan-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
			>
				<div
					class="absolute bottom-0 left-0 z-20 h-40 w-full bg-slate-950 [mask-image:linear-gradient(to_top,white,transparent)]"
				/>
				<div
					class="absolute bottom-0 left-0 z-20 h-full w-40 bg-slate-950 [mask-image:linear-gradient(to_right,white,transparent)]"
				/>
			</div>
		</Motion>
		<Motion
			let:motion
			initial={{ opacity: 0.5, width: '40%' }}
			animate={{ opacity: 1, width: '80%' }}
			transition={{
				delay: 0.3,
				duration: 0.8,
				ease: 'easeInOut'
			}}
			style={{
				backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`
			}}
		>
			<div
				use:motion
				style="background-image: conic-gradient(var(--conic-position), var(--tw-gradient-stops));"
				class="bg-gradient-conic absolute inset-auto left-1/2 h-56 max-w-full from-transparent via-transparent to-cyan-500 text-white [--conic-position:from_290deg_at_center_top]"
			>
				<div
					class="absolute bottom-0 right-0 z-20 h-full w-40 bg-slate-950 [mask-image:linear-gradient(to_left,white,transparent)]"
				/>
				<div
					class="absolute bottom-0 right-0 z-20 h-40 w-full bg-slate-950 [mask-image:linear-gradient(to_top,white,transparent)]"
				/>
			</div>
		</Motion>
		<div
			class="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-slate-950 blur-2xl"
		></div>
		<div class="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
		<div
			class="absolute inset-auto z-50 h-36 w-4/5 max-w-lg -translate-y-1/2 rounded-full bg-cyan-500 opacity-50 blur-3xl"
		></div>
		<Motion
			let:motion
			initial={{ width: '25%' }}
			animate={{ width: '50%' }}
			transition={{
				delay: 0.3,
				duration: 0.8,
				ease: 'easeInOut'
			}}
		>
			<div
				use:motion
				class="absolute inset-auto z-30 h-36 max-w-md -translate-y-24 rounded-full bg-cyan-400 blur-2xl"
			></div>
		</Motion>
		<Motion
			let:motion
			initial={{ width: '40%' }}
			animate={{ width: '80%' }}
			transition={{
				delay: 0.3,
				duration: 0.8,
				ease: 'easeInOut'
			}}
		>
			<div
				use:motion
				class="absolute inset-auto z-50 h-0.5 max-w-xl -translate-y-28 bg-cyan-400"
			></div>
		</Motion>
		<div class="absolute inset-auto z-40 h-44 w-full -translate-y-48 bg-slate-950"></div>
	</div>
	<div class="relative z-50 flex w-full -translate-y-64 md:-translate-y-80 flex-col items-center px-5">
		<slot />
	</div>
</div>