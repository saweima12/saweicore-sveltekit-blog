<script lang="ts">
	import { siteConfig } from '$lib/store';
	import Hamburger from '$lib/components/nav/hamburger.svelte';
	import SearchWidget from '$lib/components/widgets/searchwidget.svelte';

	let prevScrollY: number = 0;
	let newScrollY: number = 0;
	let isHide: boolean = false;
	$: { 
		if (Math.abs(newScrollY - prevScrollY) > 50) {
			isHide = newScrollY - prevScrollY > 0 
			prevScrollY = newScrollY;
		}
	};
</script>

<svelte:window bind:scrollY={newScrollY}/>

<nav class="flex items-center h-14 p-2 top-navbar"
	class:hide={isHide}>
	<a class="flex ml-2 raleway-font site-title" href="/">
		<div class="logo">
			<img width="36" height="36" src="/logo.png" alt={$siteConfig.title} />
		</div>
	</a>

	<div class="grow spacer" />

	<div class="w-40 search-box">
		<SearchWidget />
	</div>
	
	<div class="grow spacer" />
	<Hamburger />
</nav>

<style>

.top-navbar {
	translate: all .3s;
}

.top-navbar.hide {
	transform: translateY(-60px);
}

.top-navbar .logo {
	width: 35px;
	height: 35px;

}



.top-navbar .search-box{
	width: 10rem;
}

@media screen and (min-width: 640px) {
	.top-navbar .search-box{
		width: 14rem;
	}

}
</style>
