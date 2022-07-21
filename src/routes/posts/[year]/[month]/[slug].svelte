<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import type { PageResult } from '$lib/types';
	import { dataAPI } from '$lib/client';

	export const load: Load = async ({ params, fetch }) => {
		const { year, month, slug } = params;
		const apiUrl = dataAPI.getPostData(year, month, slug);
		const response = await fetch(apiUrl);
		const { metadata, content, headings }: PageResult = await response.json();

		const pageMeta = { metadata: metadata, slugKey: slug };
		return {
			props: {
				metadata: metadata,
				content: content,
				pageMeta: pageMeta
			},
			stuff: {
				headings: headings
			}
		};
	};
</script>

<script lang="ts">
	// import prismjs
	import PrismJs from 'prismjs';
	import 'prism-themes/themes/prism-dracula.css';
	import 'prismjs/components/prism-python.min.js';

	import { onMount } from 'svelte';
	import { siteConfig } from '$lib/store';
	import { afterNavigate } from '$app/navigation';
	import { getYYYYMMDD, getTitleStr, pageRoute } from '$lib/client';
	import type { PageMeta } from '$lib/types';
	
	import CalenderIcon from '$lib/icons/calender.svelte';
	import LightBoxListener from '$lib/components/lightbox/lightboxlistener.svelte';
	export let metadata: Record<string, any>;
	export let content: string;
	export let pageMeta: PageMeta;

	let routePath: string = new URL(pageRoute.getPostPath(pageMeta), $siteConfig.url).href;
	let tags: Array<string> = metadata.tags || [];

	import { page } from '$app/stores';

	// Fix: navigation/goto can't support id.
	afterNavigate(() => {
		if ($page.url.hash.length > 0) {
			location.href = location.href;
		}
	});

	onMount(async () => {
		await PrismJs.highlightAll();
	});
	
	// support HMR
	import { invalidate } from '$app/navigation';
	import { onContentUpdate } from 'markedpage';
	onContentUpdate((payload: Record<string, any>) => {
		const { year, month, slug} = $page.params;
		invalidate(dataAPI.getPostData(year, month,slug))
	})
</script>

<svelte:head>
	<title>{metadata.title} - {getTitleStr($siteConfig)}</title>

	<!-- OpenGraph -->
	<meta property="og:url" content="{routePath}"/>
	<meta property="og:locale" content="zh_TW" />
	<meta property="og:type" content="article" />
	<meta property="og:title" content="{metadata.title}" />
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
				{#each tags as tag}
					<div class="post-tag-item">
						<a href="{pageRoute.getTagPath(tag)}">{tag}</a>
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