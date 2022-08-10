<script lang="ts">
	import textlang from '$lib/textstr';
	import type { NavItem } from '$lib/types';
	import { siteConfig } from '$lib/store';
	import { isExternal } from '$lib/client/helper';
	import Hamburger from '$lib/components/nav/hamburger.svelte';
	import NavSearchBtn from './navsearchbtn.svelte';
	import ExternalIcon from '$lib/icons/external.svelte';
	import NavIcon from '$lib/components/nav/navicon.svelte';

	import { themeMode } from '$lib/store';

	const navList: Array<NavItem> = $siteConfig.nav;

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

<nav class="py-2 px-2 top-navbar"
	class:hide={isHide}>

	<div class="flex pl-1 items-center navbar-container">
		<div class="lg:hidden w-30 px-2">
			<Hamburger />
		</div>

		<a sveltekit:prefetch class="flex raleway-font site-title" href="/">
			<div class="logo">
				<img width="36" height="36" src="/logo.png" alt={$siteConfig.title} />
			</div>
			
			<div class="hidden md:flex px-2 letter-title-font title">
				{$siteConfig.title}
			</div>
		</a>
	
		<div class="grow spacer"></div>

		<div class="hidden lg:flex items-center">
			<ul class="h-full flex flex-row nav-list">
				{#each navList as navItem}
				<li class="nav-item mr-5 px-2">
					<a class="flex flex-row items-center" href={navItem.link} alt={navItem.name}>
						<div class="item-name">{navItem.name}</div>
						{#if isExternal(navItem.link)}
							<ExternalIcon />
						{/if}
					</a>
				</li>
				{/each}
			</ul>
			<button
			   class="flex text-xl letter-content-font theme-switch" 
			   on:click={() => themeMode.set($themeMode == "light" ? "dark" : "light")}
			>
				<div class="icon-base w-6">
					<NavIcon key="theme" />
				</div>
			</button>
			<div class="icon-base w-4">

			</div>

		</div>

		<div class="lg:hidden search-icon">
			<NavSearchBtn/>
		</div>	
	</div>


</nav>

<style>
.top-navbar {
	color: var(--text);
	translate: all .3s;
}

.top-navbar.hide {
	transform: translateY(-60px);
}

.top-navbar .logo {
	width: 35px;
	height: 35px;

}

.nav-list {
	font-weight: 600;
	box-sizing: content-box;
}

.nav-item:hover a{
	color: var(--navitem-hover);
}

.nav-item a{
	border-bottom: 2px solid transparent;
}

.nav-item:hover a{
	border-bottom: 2px solid #fff;
}

.theme-switch {
	padding: 5px;
}

.theme-switch:hover {
	border-radius: 10rem;
	background: var(--tagitem-hover);
}

.title {
	margin-top: .2rem;
	align-items: flex-end;
	font-size: 1.2rem;
	color: var(--text);
	font-weight: 600;
}

</style>
