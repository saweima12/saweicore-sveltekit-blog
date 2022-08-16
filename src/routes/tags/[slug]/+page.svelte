<script lang="ts">
	import type { PageData } from './$types';
	import type { TagPageResult } from '$lib/types';
	import { dataAPI } from '$lib/client';
	import { siteConfig } from '$lib/store';
	import { getTitleStr } from '$lib/client';

	import Postlist from '$lib/components/article/postlist.svelte';
	import TagIcon from '$lib/icons/tag.svelte';


	export let data: PageData;
	$: ({ tagName, pageList, pageNum, maxPage} = data )

	const fetchMorePost = async () => {
		pageNum += 1;
		const response = await fetch(dataAPI.getTagPageList(tagName, pageNum));
		const data: TagPageResult = await response.json();
		pageList = [...pageList, ...data.pageList];
	};
</script>

<svelte:head>
	<title>{tagName} - {getTitleStr($siteConfig)}</title>
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