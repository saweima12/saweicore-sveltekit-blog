<script lang="ts">
	import { page } from "$app/stores";
	import type { NavItem } from '$lib/types';
	import { isExternal } from '$lib/client/helper';
	import { themeMode, siteConfig, viewStack, viewId } from '$lib/store';
	import textstr from '$lib/textstr';
	import NavIcon from '$lib/components/nav/navicon.svelte';
	import ExternalIcon from '$lib/icons/external.svelte';
	import NavLinkItem from "./navlinkitem.svelte";

	const textlang = textstr.common;
	const author: Record<string, any> = $siteConfig.author;
	const navList: Array<NavItem> = $siteConfig.nav;

	export const uniqueId: string = viewId.navMenu;
	$: isVisible = $viewStack.includes(uniqueId);

	const escapeHandle = (e: KeyboardEvent) => {
		if (isVisible && e.key == "Escape") {
			viewStack.remove(uniqueId);
		}
	}
</script>

<svelte:window on:keydown={(e) => escapeHandle(e)} />

<div
	class="fixed z-30 top-0 left-0 bottom-0 w-60 md:w-80 h-screen transition-all duration-200 navmenu"
	class:-translate-x-full={!isVisible}
>
	<div class="flex flex-col h-full navmenu-container">
		<div class="py-4 mb-2 header">

			<div class="flex items-center mb-4 pl-8 nav-item">
				<button
				   class="flex text-xl letter-content-font" 
				   on:click={() => themeMode.set($themeMode == "light" ? "dark" : "light")}
				>
					<div class="title">
						{$siteConfig.title}
					</div>

					<div class="icon-base w-6">
						<NavIcon key="theme" />
					</div>
				</button>
			</div>

			<div class="flex flex-row mx-6 author-block">
				<img src={author.avatar} alt="saweima" loading="lazy"/>
				<div class="flex flex-col word-font items-center justify-center ml-4 avatar-info">
					<div class="font-bold text-lg">{author.name}</div>
					<div>{author.summary}</div>
				</div>
			</div>

		</div>
		<ul class="nav-list">
			{#each navList as navItem}
			{@const reg = new RegExp(`^${navItem.link}`)}
			<li class="flex nav-item" class:active={reg.test($page.url.pathname)}>
				<NavLinkItem link={navItem.link}>
				<div class="flex items-center pl-8 mt-1 mb-4 nav-item-content">
					<div class="icon-base w-6">
						<NavIcon key={navItem.id} />
					</div>
					<a sveltekit:prefetch href={navItem.link} class="pl-4 text-xl letter-content-font">
						{navItem.name}
					</a>
					{#if isExternal(navItem.link)}
						<ExternalIcon />
					{/if}
				</div>
				</NavLinkItem>
			</li>
			{/each}
		</ul>
		<div class="grow spacer"></div>	
	</div>
</div>

<style>

/* navmenu */
.navmenu {
	color: var(--text);
	background-color: var(--bg-color);
}

.title {
	font-weight: 600;
	margin-right: 1rem;

}

.author-block {
	padding: 1rem 0;
	border-top: 1px solid var(--border);
	border-bottom: 1px solid var(--border);
}

.author-block img {
	width: 5rem;
	border-radius: 1rem;
}

.nav-item {
	font-weight: 500;
}

.nav-item:not(.active):hover {
	color: var(--navitem-hover);
}

.nav-item.active {
	color: var(--navitem-active);
	font-weight: 600;
}


</style>