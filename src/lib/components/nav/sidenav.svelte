<script lang="ts">
	import { page } from '$app/stores';
	import { themeMode } from '$lib/store';
	import siteConfig from '$lib/site'
	import type { NavItem } from '$lib/types';
	import NavIcon from '$lib/components/nav/navicon.svelte';

	const handleThemeChange = () => {
		$themeMode = $themeMode == "light" ? "dark" : "light";
	}

	const navList: Array<NavItem> = siteConfig.nav;
</script>

<nav class="flex fixed h-screen side-navbar">
	<div class="flex flex-col justify-between h-full px-5 sidenav-container">
		<div class="mt-8 logo">
			<a  href="/">
				<img width="36" height="36" class="rounded-full" src="/logo.png" alt={siteConfig.title} />
			</a>
		</div>

		<div class="nav-list h-100">
			{#each navList as navItem}
				<a  class="nav-item" class:active={navItem.link == $page.url.pathname} href={navItem.link}>
					<div class="py-8 flex justify-center">
						<div class="icon-base w-6"><NavIcon key={navItem.id} /></div>
					</div>
				</a>
			{/each}
		</div>

		<div class="nav-item pb-8"  on:click={() => handleThemeChange()}>
			<div class="w-6 icon-base" >
				<a href="#!">
					<NavIcon key="theme" />
				</a>
			</div>
		</div>
	</div>
</nav>

<style>
.side-navbar .logo {
	width: 36px;
}
</style>