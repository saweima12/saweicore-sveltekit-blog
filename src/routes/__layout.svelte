<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import { siteConfig } from '$lib/store';
	import { dataAPI } from '$lib/client';

	export const load: Load = async ({ fetch }) => {
		let apiUrl = dataAPI.getConfig();
		let response = await fetch(apiUrl);
		const config = await response.json();
		siteConfig.set(config);
		return {};
	};
</script>

<script lang="ts">
	import '../app.css';
	import '../theme.css';
	import ScreenMask from '$lib/components/screenmask.svelte';
	import SearchBox from '$lib/components/serach/searchbox.svelte';
	import Navbar from '$lib/components/nav/navbar.svelte';
	import Navmenu from '$lib/components/nav/navmenu.svelte';
	import SideNav from '$lib/components/nav/sidenav.svelte';
	import Footer from '$lib/components/footer.svelte';
	import Drawer from '$lib/components/drawer/drawer.svelte';

	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { isNavMenuShow, themeMode } from '$lib/store';
	let isMenuOpen = false;	
	isNavMenuShow.subscribe((value) => (isMenuOpen = value));
	
	onMount(() => {
		if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			// themeMode.set("dark")
		}
		themeMode.subscribe(value => document.body.className = value);
	})
</script>

<div
	class="transition-all duration-200 min-h-screen main-wrapper relative"
	class:-translate-x-60={isMenuOpen}
	class:md:-translate-x-80={isMenuOpen}
>
	<div class="fixed top-0 w-screen lg:hidden wrapper">
		<Navbar />
	</div>

	<div class="lg:flex lg:flex-row justify-between main-container">
		<div class="hidden lg:block nav-wrapper">
			<SideNav />
		</div>

		<div class="pt-14 lg:pt-0 flex flex-col content-wrapper">
			<main class="mx-auto min-h-screen content-container">
				<slot />
			</main>
			<Footer />
		</div>

		<div class="hidden lg:block drawer-wrapper">
			<div class="w-full min-h-screen fixed drawer-container">
				<Drawer />
			</div>
		</div>
	</div>
</div>
<ScreenMask />

<Navmenu />
<SearchBox />

<style>
.main-wrapper {
	max-width: 1504px;
	margin: 0 auto;
}

.nav-wrapper {
	min-width: 80px;
}

</style>