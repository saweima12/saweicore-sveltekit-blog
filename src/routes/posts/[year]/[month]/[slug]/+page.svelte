<script lang="ts">
	import type { PageData } from './$types';
	// import prismjs
	import PrismJs from 'prismjs';
	import 'prismjs/components/prism-python.js'
	import 'prism-themes/themes/prism-dracula.css';

	import { siteConfig } from '$lib/store';
	import { getYYYYMMDD, getTitleStr, pageRoute } from '$lib/client';
	import { dataAPI } from '$lib/client';
	
	import CalenderIcon from '$lib/icons/calender.svelte';
	import LightBoxListener from '$lib/components/lightbox/lightboxlistener.svelte';
	
	export let data: PageData;
	let { metadata, content, pageMeta } = data;

	// support auto reload
	$: ({ metadata, content, pageMeta} = data);	

	let routePath: string = new URL(pageRoute.getPostPath(pageMeta), $siteConfig.url).href;
 
	import { page } from '$app/stores';

	// support HMR
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	
	onMount(async () => {
		PrismJs.highlightAll();
	})

	if (import.meta.hot) {
		import.meta.hot.on("markedpage:content-update", () => {
			const { year, month, slug} = $page.params;
			invalidate(dataAPI.getPostData(year, month,slug));
			setTimeout(() => PrismJs.highlightAll(), 200);
		});
	}
</script>

<svelte:head>
	<title>{metadata.title} - {getTitleStr($siteConfig)}</title>
	<!-- Twitter Card -->	
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:site" content="@saweima12" />
	<meta name="twitter:title" content="{metadata.title} - {getTitleStr($siteConfig)}" />
	<meta name="twitter:description" content={metadata.description} />
	<meta name="twitter:url" content={routePath} />
	<!-- Facebook OpenGraph -->
	<meta property="og:url" content="{routePath}"/>
	<meta property="og:locale" content="zh_TW" />
	<meta property="og:type" content="article" />
	<meta property="og:title" content="{metadata.title}" />
	<meta property="og:site_name" content="{getTitleStr($siteConfig)}" />
	{#if metadata.excerpt}
		<meta property="og:description" content="{metadata.excerpt}"/>
		<meta name="description" content="{metadata.excerpt}"/>
	{/if}
	{#if metadata.thumbnail}
		<meta property="og:image" content="{metadata.thumbnail}" />
		<meta property="og:image" content="image/jpg" />
	{/if}
</svelte:head>

<div class="my-10 post-page wrapper">
	<div class="post-container">
		<header class="mx-6 mb-4">
			<h1 class="font-bold letter-title-font post-title">
				{metadata.title}
			</h1>

			<div class="flex flex-row items-center mt-2 created-date">
				<div class="icon-base w-5"><CalenderIcon /></div>
				<time class="flex self-center ml-2">{getYYYYMMDD(metadata.created)}</time>
			</div>

			<div class="mt-4 flex flex-row post-tag-list">
				{#each metadata.tags as tag}
					<div class="post-tag-item">
						<a sveltekit:prefetch href="{pageRoute.getTagPath(tag)}">{tag}</a>
					</div>
				{/each}
			</div>
		</header>

		<article class="content">
			{@html content}
		</article>
	</div>
</div>

<LightBoxListener />