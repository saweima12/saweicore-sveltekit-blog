<script lang="ts">
	import { siteConfig } from '$lib/store';
	import type { NavItem } from '$lib/types';
	import NavIcon from '$lib/components/nav/navicon.svelte';

	const navList: Array<NavItem> = $siteConfig.nav;
</script>

<nav class="flex fixed h-screen side-navbar">
	<div class="flex flex-col justify-between h-full px-5 sidenav-container">
		<div class="mt-8 logo">
			<a href="/">
				<img class="rounded-full" src="/logo.png" alt={$siteConfig.title} />
			</a>
		</div>

		<div class="nav-list h-96">
			{#each navList as navItem}
				<a href={navItem.link}>
					<div class="nav-item py-8 flex justify-center">
						<div class="icon-base w-6"><NavIcon key={navItem.id} /></div>
					</div>
				</a>
			{/each}
		</div>
		<div class="spacer" />
	</div>
</nav>
