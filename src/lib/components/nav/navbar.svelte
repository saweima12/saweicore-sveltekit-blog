<script>
	import { siteConfig } from '$lib/store';
	import Hamburger from '$lib/components/nav/hamburger.svelte';
</script>

<nav class="flex items-center h-14 p-2 top-navbar">
	<a class="flex ml-2 raleway-font site-title" href="/">
		<div class="logo">
			<img src="/logo.png" alt={$siteConfig.title} />
		</div>

		<div class="flex self-center ml-2 name">
			{$siteConfig.title}
		</div>
	</a>
	<div class="grow spacer" />

	<Hamburger />
</nav>

<style>

.top-navbar .logo {
	width: 35px;
	height: 35px;
}

</style>
