<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import type { PageMeta, TagPageResult } from '$lib/types';
	import { dataAPI } from '$lib/client';

	export const load: Load = async ({ params, fetch }) => {
		const { slug } = params;
		let apiUrl = dataAPI.getTagPageList(slug, 1);
		const response = await fetch(apiUrl);
		const { name, pageList, pageNum, maxPage }: TagPageResult = await response.json();
		// initialize all tagList page data.
		if (maxPage > 1) {
			for (let i = 2; i <= maxPage; i++) {
				apiUrl = dataAPI.getTagPageList(slug, i);
				await fetch(apiUrl);
			}
		}

		return {
			props: {
				tagName: name,
				pageList: pageList,
				pageNum: pageNum,
				maxPage: maxPage
			}
		};
	};
</script>

<script lang="ts">
	import { siteConfig } from '$lib/store';
	import { getTitleStr } from '$lib/client';

	import Postlist from '$lib/components/article/postlist.svelte';
	import TagIcon from '$lib/icons/tag.svelte';

	export let tagName: string;
	export let pageList: Array<PageMeta>;
	export let pageNum: number;
	export let maxPage: number;

	const fetchMorePost = async () => {
		pageNum += 1;
		const response = await fetch(dataAPI.getTagPageList(tagName, pageNum));
		const data: TagPageResult = await response.json();
		pageList = [...pageList, ...data.pageList];
	};
</script>

<svelte:head>
	<title>{tagName} | {getTitleStr($siteConfig)}</title>
</svelte:head>

<div class="tag-page wrapper">
	<header class="mt-10 mx-6 mb-8 tag-header">
		<div class="flex items-center">
			<div class="w-5 h-5 mr-2 icon-base"><TagIcon /></div>
			<h1 class="flex self-center text-2xl font-bold letter-title-font tag-title">
				{tagName}
			</h1>
		</div>
	</header>

	<div class="post-list">
		<Postlist {pageNum} {maxPage} posts={pageList} callback={() => fetchMorePost()} />
	</div>
</div>

<style>
	.tag-page {
		color: var(--text);
	}
</style>