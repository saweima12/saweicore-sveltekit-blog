<script lang="ts">
	import { isNavMenuShow, isSearBoxShow, isMaskShow } from '$lib/store';
	import { beforeNavigate } from '$app/navigation';

	let isVisible = false;
	isMaskShow.subscribe((value) => (isVisible = value));

	const closeMaskHandle = () => {
		isNavMenuShow.set(false);
		isSearBoxShow.set(false);
		setTimeout(() => isMaskShow.set(false), 300);
	};

	beforeNavigate(() => closeMaskHandle());
</script>

<div
	class="fixed top-0 z-10 w-screen h-screen screenmask"
	class:hidden={!isVisible}
	on:click={closeMaskHandle}
/>
