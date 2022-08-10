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
	// Components
	import PageTransition from '$lib/components/pagetransition.svelte';
	import Navbar from '$lib/components/nav/navbar.svelte';
	import Navmenu from '$lib/components/nav/navmenu.svelte';
	import Footer from '$lib/components/footer.svelte';
	import Drawer from '$lib/components/drawer/drawer.svelte';
	// 
	import ScreenMask from '$lib/components/screenmask.svelte';
	import SearchView from '$lib/components/serach/searchview.svelte';
	import ImageLightBox from '$lib/components/lightbox/imagelightbox.svelte';
	import { GoogleAnalytics } from '@beyonk/svelte-google-analytics'

	import { dev } from '$app/env';
	import { page, navigating } from '$app/stores';
	import { themeMode, viewStack, viewId } from '$lib/store';
	$: isMenuOpen = $viewStack.includes(viewId.navMenu);
	
	import NProgress from 'nprogress';
	
	// Full list: https://github.com/rstacruz/nprogress#configuration
	NProgress.configure({minimum: 0.16});
	$: $navigating ? NProgress.start() : NProgress.done();

	$: {
		if (typeof window !== "undefined") {
			let _themeMode = localStorage.getItem("mode");
			themeMode.subscribe(value => {
				localStorage.setItem("mode", value);
				document.body.className = value;
			});
	
			if (_themeMode) { $themeMode = _themeMode}
	
			if (!_themeMode && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
				themeMode.set("dark")
			}
		}
	}
</script>

<div 
	class="wrapper-container"
	class:overflow-hidden={isMenuOpen}
>
	<div
		class="transition-all duration-200 min-h-screen main-wrapper"
		class:translate-x-60={isMenuOpen}
		class:md:translate-x-80={isMenuOpen}
	>
		<div class="fixed top-0 w-screen wrapper">
			<Navbar />
		</div>

		<div class="flex flex-col justify-between main-container">
			<div class="w-full content-wrapper">
				<main class="mx-auto min-h-screen content-container">
					<PageTransition refresh={$page.url.pathname}>
						<slot />
					</PageTransition>
				</main>
				<Footer />
			</div>

			<div class="hidden lg:block drawer-wrapper mr-0.5">
				<div class="w-full min-h-screen h-full drawer-container">
					<Drawer />
				</div>
			</div>
		</div>
	</div>
</div>

<ScreenMask />
<Navmenu />
<SearchView />
<ImageLightBox />

{#if $siteConfig.ga && !dev}
	<GoogleAnalytics properties={[ $siteConfig.ga ]} />
{/if}


<style>
.main-container {
	max-width: var(--max-width);
	margin: 0 auto;
	padding-top: 3.5rem;
}


@media screen and (min-width: 1024px) {
	.main-container {
		display: flex;
		flex-direction: row;
	}

}
</style>