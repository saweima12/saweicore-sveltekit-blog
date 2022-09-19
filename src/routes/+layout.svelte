<script lang="ts">
	import '../app.css';
	import '../theme.css';
	// Layout Components
	import Navbar from '$lib/components/nav/navbar.svelte';
	import Navmenu from '$lib/components/nav/navmenu.svelte';
	import Drawer from '$lib/components/drawer/drawer.svelte';
	
	// GlobalComponents
	import PageTransition from '$lib/components/common/pagetransition.svelte';
	import ScreenMask from '$lib/components/common/screenmask.svelte';
	import SearchView from '$lib/components/serach/searchview.svelte';
	import ImageLightBox from '$lib/components/lightbox/imagelightbox.svelte';

	// @ts-ignore
	import GoogleAnalytics from '$lib/components/common/googleanalytics.svelte';

	import { dev } from '$app/environment';
	import { page, navigating } from '$app/stores';
	import { themeMode, viewStack, viewId } from '$lib/store';
	$: isMenuOpen = $viewStack.includes(viewId.navMenu);
	
	import NProgress from 'nprogress';
	
	// Full list: https://github.com/rstacruz/nprogress#configuration
	NProgress.configure({minimum: 0.16});
	$: $navigating ? NProgress.start() : NProgress.done();

	// Stores
	import siteConfig  from '$lib/site';

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
		<div class="fixed top-0 w-screen wrapper z-50">
			<Navbar />
		</div>

		<div class="flex flex-col justify-between main-container">
			<div class="w-full content-wrapper">
				<main class="mx-auto min-h-screen content-container" data-sveltekit-prefetch>
					<PageTransition refresh={$page.url.pathname}>
						<slot />
					</PageTransition>
				</main>
				<footer class="w-full pt-20 pb-5 site-footer">
					<div class="flex justify-center items-center px-10 h-full footer-container">
						<div class="copyright">Copyright © 2020 - {new Date().getFullYear()} {siteConfig.title} All Rights Reserved.</div>
					</div>
				</footer>
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

{#if siteConfig.ga && !dev}
	<GoogleAnalytics id={siteConfig.ga} />
{/if}


<style>
.main-container {
	max-width: var(--max-width);
	margin: 0 auto;
	padding-top: 3.5rem;
}

.site-footer {
	color: var(--text);
}

@media screen and (min-width: 1024px) {
	.main-container {
		display: flex;
		flex-direction: row;
	}
}

</style>