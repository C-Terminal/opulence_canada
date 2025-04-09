<script lang="ts">
    import { onMount } from 'svelte';
    import { transactionHistory } from '$lib/stores/dashboardStore';
    
    let canvas: HTMLCanvasElement;
    
    onMount(() => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      const data = $transactionHistory;
      const width = canvas.width;
      const height = canvas.height;
      const padding = 20;
      
      const maxValue = Math.max(...data.map(d => d.amount));
      const minValue = Math.min(...data.map(d => d.amount));
      
      const xStep = (width - padding * 2) / (data.length - 1);
      const yScale = (height - padding * 2) / (maxValue - minValue);
      
      // Draw baseline
      ctx.beginPath();
      ctx.strokeStyle = '#cccccc';
      ctx.setLineDash([5, 5]);
      ctx.moveTo(padding, height / 2);
      ctx.lineTo(width - padding, height / 2);
      ctx.stroke();
      ctx.setLineDash([]);
      
      // Draw chart line
      ctx.beginPath();
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      
      data.forEach((point, i) => {
        const x = padding + i * xStep;
        const y = height - padding - (point.amount - minValue) * yScale;
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      
      ctx.stroke();
      
      // Add marker for latest point
      const lastPoint = data[data.length - 1];
      const lastX = padding + (data.length - 1) * xStep;
      const lastY = height - padding - (lastPoint.amount - minValue) * yScale;
      
      ctx.beginPath();
      ctx.fillStyle = '#000000';
      ctx.arc(lastX, lastY, 4, 0, Math.PI * 2);
      ctx.fill();
      
      // Add date marker
      ctx.fillStyle = '#000000';
      ctx.fillRect(width * 0.75, 10, 50, 20);
      ctx.fillStyle = '#ffffff';
      ctx.font = '10px sans-serif';
      ctx.fillText('Mar 12', width * 0.75 + 8, 24);
    });
  </script>
  
  <canvas bind:this={canvas} width="500" height="150"></canvas>
  