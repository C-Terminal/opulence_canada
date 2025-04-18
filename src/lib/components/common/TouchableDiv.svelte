<script>
	let isTouched = false;

	function handleTouchStart() {
		isTouched = true;
        // if (handleTouchEnd() == false) return;
		setTimeout(() => {
			isTouched = false;
		}, 300); // Match the transition duration
	}

	function handleTouchEnd() {
		return false;
	}
</script>

<div
	class:shadow-fintech-accent={isTouched}
	class:transition-shadow={isTouched}
	class:duration-300={isTouched}
	on:touchstart={handleTouchStart}
	on:touchend={handleTouchEnd}
	class="card card-highlight"
>
	<slot />
</div>
