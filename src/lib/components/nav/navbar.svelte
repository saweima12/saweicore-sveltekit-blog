<script lang="ts">
	import type { NavItem } from '$lib/types';
	import { isExternal } from '$lib/client';
	import siteConfig from '$lib/site';
	import Hamburger from '$lib/components/nav/hamburger.svelte';
	import NavSearchBtn from './navsearchbtn.svelte';
	import ExternalIcon from '$lib/icons/external.svelte';
	import NavIcon from '$lib/components/nav/navicon.svelte';

	import { themeMode } from '$lib/store';
	import NavLinkItem from './navlinkitem.svelte';

	const navList: Array<NavItem> = siteConfig.nav;
</script>

<nav class="py-2 px-2 top-navbar">
	<div class="flex pl-1 items-center navbar-container">
		<div class="lg:hidden w-30 px-2">
			<Hamburger />
		</div>

		<a class="flex raleway-font site-title" href="/">
			<div class="logo">
				<img width="36" height="36" src="/logo.png" alt={siteConfig.title} />
			</div>

			<div class="hidden md:flex px-2 letter-title-font title">
				{siteConfig.title}
			</div>
		</a>

		<div class="grow spacer" />

		<div class="hidden lg:flex items-center">
			<ul class="h-full flex flex-row nav-list">
				{#each navList as navItem}
					<li class="nav-item mr-5 px-2">
						<NavLinkItem link={navItem.link}>
							<div class="flex items-center nav-item-block">
								<div class="item-name">{navItem.name}</div>
								{#if isExternal(navItem.link)}
									<ExternalIcon />
								{/if}
							</div>
						</NavLinkItem>
					</li>
				{/each}
			</ul>
			<button
				class="flex text-xl letter-content-font mr-1 theme-switch"
				on:click={() => themeMode.set($themeMode == 'light' ? 'dark' : 'light')}
			>
				<div class="icon-base w-6">
					<NavIcon key="theme" />
				</div>
			</button>
		</div>

		<div class="lg:hidden search-icon">
			<NavSearchBtn />
		</div>
	</div>
</nav>

<style>
	.top-navbar {
		color: var(--text);
		translate: all 0.3s;
	}

	.top-navbar .logo {
		width: 35px;
		height: 35px;
	}

	.navbar-container {
		max-width: var(--max-width);
		margin: 0 auto;
	}

	.nav-list {
		font-weight: 600;
		box-sizing: content-box;
	}

	.nav-item:hover .nav-item-block {
		color: var(--navitem-hover);
	}

	.nav-item .nav-item-block {
		border-bottom: 2px solid transparent;
	}

	.nav-item:hover .nav-item-block {
		border-bottom: 2px solid var(--border);
	}

	.theme-switch {
		padding: 5px;
	}

	.theme-switch:hover {
		border-radius: 10rem;
		background: var(--tagitem-hover);
	}

	.title {
		margin-top: 0.2rem;
		align-items: flex-end;
		font-size: 1.2rem;
		color: var(--text);
		font-weight: 600;
	}
</style>
