<script lang="ts">
	import { siteConfig } from '$lib/store';
	import Hamburger from '$lib/components/nav/hamburger.svelte';
	import NavSearchBtn from './navsearchbtn.svelte';

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

	<div class="flex md:p-1 items-center navbar-container">
		<div class="md:hidden w-30 px-2">
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
	
		<div class="grow spacer" />
	
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
	font-size: 1.4rem;
	color: var(--text);
	font-weight: 600;
}


@media screen and (min-width: 640px) {
}
</style>
