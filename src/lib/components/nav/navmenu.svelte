<script lang="ts">
	import { isExternal } from '$lib/client/helper';
	import type { NavItem } from '$lib/types';
	import { isNavMenuShow, siteConfig } from '$lib/store';
	import NavIcon from '$lib/components/nav/navicon.svelte';
	import ExternalIcon from '$lib/icons/external.svelte';

	const textlang = $siteConfig.textlang.common;
	const author: Record<string, any> = $siteConfig.author;
	const navList: Array<NavItem> = $siteConfig.nav;
	let isVisible = false;
	isNavMenuShow.subscribe((value) => (isVisible = value));
</script>

<div
	class="fixed z-30 top-0 right-0 bottom-0 w-60 md:w-80 transition-all duration-200 navmenu"
	class:translate-x-full={!isVisible}
>
	<div class="flex flex-col navmenu-container">
		<div class="mx-6 py-4 mb-6 author">
			<div class="flex flex-row avatar-block">
				<img src={author.avatar} alt="saweima" />
				<div class="flex flex-col items-center justify-center ml-4 avatar-info">
					<div class="word-font font-bold text-lg">{author.name}</div>
					<div class="word-font">{author.description}</div>
				</div>
			</div>
		</div>
		<ul class="nav-list">
			<li class="flex items-center mt-4 pl-8 nav-item">
				<div class="icon-base w-6">
					<NavIcon key="home" />
				</div>
				<a href="/" class="pl-4 text-xl letter-content-font">
					{textlang.home}
				</a>
				<div class="icon-base w-3" />
			</li>
			{#each navList as navItem}
				<li class="flex items-center mt-4 pl-8 nav-item">
					<div class="icon-base w-6">
						<NavIcon key={navItem.id} />
					</div>
					<a href={navItem.link} class="pl-4 text-xl letter-content-font">
						{navItem.name}
					</a>
					{#if isExternal(navItem.link)}
						<ExternalIcon />
					{/if}
				</li>
			{/each}
		</ul>
	</div>
</div>

<style>

/* navmenu */
.navmenu {
	background-color: #fff;
}

.navmenu .author {
	border-bottom: 1px solid #bbb;
}

.navmenu .author img {
	width: 5rem;
	border-radius: 1rem;
}

.navmenu .nav-item {
	color: #111;
	font-weight: 500;
}
</style>