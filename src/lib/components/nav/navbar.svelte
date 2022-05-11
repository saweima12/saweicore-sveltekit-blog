<script>
	import { siteConfig } from '$lib/store';
	import Hamburger from '$lib/components/nav/hamburger.svelte';
	import SearchWidget from '$lib/components/widgets/searchwidget.svelte';

</script>

<nav class="flex items-center h-14 p-2 top-navbar">
	<a class="flex ml-2 raleway-font site-title" href="/">
		<div class="logo">
			<img src="/logo.png" alt={$siteConfig.title} />
		</div>
	</a>

	<div class="grow spacer" />

	<div class="w-40 search-box">
		<SearchWidget />
	</div>
	
	<div class="grow spacer" />



	<Hamburger />
</nav>

<style>

.top-navbar .logo {
	width: 35px;
	height: 35px;
}

.top-navbar .search-box{
	width: 10rem;
}

@media screen and (min-width: 640px) {
	.top-navbar .search-box{
		width: 14rem;
	}

}
</style>
