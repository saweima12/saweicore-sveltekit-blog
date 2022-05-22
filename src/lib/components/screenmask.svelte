<script lang="ts">
	import { onMount } from 'svelte';
	import { beforeNavigate } from '$app/navigation';
	import { isNavMenuShow, isSearBoxShow, isMaskShow, lightBoxContent } from '$lib/store';

	let isVisible = false;

	onMount(() => {
		isMaskShow.subscribe((value) => {
			isVisible = value
		});
	});

	const closeMaskHandle = () => {
		isNavMenuShow.set(false);
		isSearBoxShow.set(false);
		lightBoxContent.set("");
		setTimeout(() => isMaskShow.set(false), 300);
	};

	beforeNavigate(() => closeMaskHandle());
</script>

<div
	class="fixed top-0 z-10 w-screen h-screen screenmask"
	class:hidden={!isVisible}
	on:click={closeMaskHandle}
/>
