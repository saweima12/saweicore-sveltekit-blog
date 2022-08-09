<script lang="ts">
	import type { NavItem } from '$lib/types';


	import { siteConfig } from '$lib/store';
	import { isExternal } from '$lib/client/helper';
	import Hamburger from '$lib/components/nav/hamburger.svelte';
	import NavSearchBtn from './navsearchbtn.svelte';
	import NavIcon from '$lib/components/nav/navicon.svelte';
	import ExternalIcon from '$lib/icons/external.svelte';

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

<nav class="h-14 p-2 top-navbar"
	class:hide={isHide}>

	<div class="flex px-1 py-0.5 items-center navbar-container">
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
		<div class="hidden lg:flex nav-list-container">
			<ul class="nav-list flex flex-row">
				{#each navList as navItem} 
				<li class="nav-item mr-5 px-2">
					<a class="flex flex-row items-center" href={navItem.link} alt={navItem.name}>
						{navItem.name}
						{#if isExternal(navItem.link)}
							<ExternalIcon />
						{/if}
					</a>
				</li>
				{/each}

			</ul>


		</div>
		
		<div class="lg:hidden search-box">
			<NavSearchBtn/>
		</div>	
	</div>


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

.navbar-container {
	max-width: var(--max-width);
	margin: 0 auto;
}


.title {
	margin-top: .2rem;
	align-items: flex-end;
	font-size: 1.2rem;
	color: var(--text);
	font-weight: 600;
}
</style>
