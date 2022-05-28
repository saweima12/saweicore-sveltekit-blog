<script lang="ts">
	import { beforeNavigate } from '$app/navigation';
	import { viewStack } from '$lib/store';

	let isVisible = false;

	viewStack.subscribe(arr => {
		if (!isVisible && arr.length > 0)
			isVisible = true;

		if (isVisible && arr.length < 1) {
			isVisible = false;
		}
	});


	const closeHandle = () => {
		if(isVisible) {
			viewStack.reset();
			setTimeout(() => (isVisible = false), 200);
		}
	};

	beforeNavigate(() => closeHandle());
</script>

<div
	class="fixed top-0 z-10 w-screen h-screen screenmask"
	class:hidden={!isVisible}
	on:click={closeHandle}
/>
