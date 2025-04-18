<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { createNoise3D } from 'simplex-noise';
	import { onMount } from 'svelte';

	export let className: string | undefined = undefined;
	export let containerClassName: string | undefined = undefined;
	export let colors: string[] | undefined = undefined;
	export let waveWidth: number | undefined = undefined;
	export let backgroundFill: string | undefined = undefined;
	export let blur: number | undefined = 10;
	export let speed: 'slow' | 'fast' | undefined = 'fast';
	export let waveOpacity: number | undefined = 0.5;

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D | null;
	let w: number;
	let h: number;
	let noise: (x: number, y: number, z: number) => number;
	let animationId: number;
	let nt = 0;
	
	// Initialize noise function
	onMount(() => {
		// Create noise function here to ensure it's only created in the browser environment
		noise = createNoise3D();
		
		// Setup canvas after the component is mounted
		if (canvas) {
			ctx = canvas.getContext('2d');
			
			if (ctx) {
				// Set initial dimensions
				w = canvas.width = window.innerWidth;
				h = canvas.height = window.innerHeight;
				ctx.filter = `blur(${blur}px)`;
				
				// Handle resizing
				const handleResize = () => {
					w = canvas.width = window.innerWidth;
					h = canvas.height = window.innerHeight;
					if (ctx) ctx.filter = `blur(${blur}px)`;
				};
				
				window.addEventListener('resize', handleResize);
				
				// Start animation
				startAnimation();
				
				// Cleanup
				return () => {
					window.removeEventListener('resize', handleResize);
					if (animationId) cancelAnimationFrame(animationId);
				};
			}
		}
	});
	
	const waveColors = colors ?? ['#38bdf8', '#818cf8', '#c084fc', '#e879f9', '#22d3ee'];
	
	const getSpeed = () => {
		switch (speed) {
			case 'slow':
				return 0.0005;
			case 'fast':
				return 0.015;
			default:
				return 0.001;
		}
	};
	
	const drawWave = () => {
		if (!ctx || !noise) return;
		
		// Clear or apply background
		ctx.fillStyle = backgroundFill || 'var(--color-cyber-white)';
		ctx.globalAlpha = waveOpacity || 0.5;
		ctx.fillRect(0, 0, w, h);
		
		// Increment time parameter
		nt += getSpeed();
		
		// Draw each wave
		for (let i = 0; i < 5; i++) {
			ctx.beginPath();
			ctx.lineWidth = waveWidth || 50;
			ctx.strokeStyle = waveColors[i % waveColors.length];
			
			for (let x = 0; x < w; x += 5) {
				// Use noise function to determine y position
				const y = noise(x / 800, 0.3 * i, nt) * 100;
				ctx.lineTo(x, y + h * 0.5);
			}
			
			ctx.stroke();
			ctx.closePath();
		}
	};
	
	const startAnimation = () => {
		// Define the animation loop
		const animate = () => {
			drawWave();
			animationId = requestAnimationFrame(animate);
		};
		
		// Start the loop
		animate();
	};
</script>

<div class={cn('flex h-screen flex-col items-center justify-center', containerClassName)}>
	<canvas 
		class="absolute inset-0 z-0" 
		bind:this={canvas}
	></canvas>
	<div class={cn('relative z-10', className)}>
		<slot />
	</div>
</div>