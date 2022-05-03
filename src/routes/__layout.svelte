<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import { siteConfig } from '$lib/store';
	import { dataAPI } from '$lib/client';

	export const load: Load = async ({fetch}) => {
		const apiUrl = dataAPI.getConfig();
		const response = await fetch(apiUrl);
		const data = await response.json();
		siteConfig.set(data);
		return {}
	};
</script>

<script lang="ts">
	import '../app.css';
	import '../theme.css';
	import ScreenMask from '$lib/components/screenmask.svelte';
	import Navbar from '$lib/components/nav/navbar.svelte';
	import Navmenu from '$lib/components/nav/navmenu.svelte';
	import SideNav from '$lib/components/nav/sidenav.svelte';
	import Footer from '$lib/components/footer.svelte';

	import { isNavMenuShow } from '$lib/store';
	let isMenuOpen = false;
	isNavMenuShow.subscribe(value => isMenuOpen = value);
</script>

<div class="transition-all duration-200 min-h-screen main-wrapper relative" 
	 class:-translate-x-60={isMenuOpen}
	 class:md:-translate-x-80={isMenuOpen}
	>
	<Navbar />
	<SideNav />
	
	<div class="pt-14 min-h-screen wrapper">
		<slot />
	</div>
	<Footer />
</div>
<ScreenMask />

<Navmenu />