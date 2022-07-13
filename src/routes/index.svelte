<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import { dataAPI, getTitleStr } from '$lib/client';
	import type { PageListResult, PageMeta, TabItem } from '$lib/types';

	export const load: Load = async ({ fetch }) => {
		let apiUrl = dataAPI.getPostList(1);
		let response = await fetch(apiUrl);
		const { pageList, maxPage, pageNum }: PageListResult = await response.json();
		// intialize all postlist page.
		if (maxPage > 1) {
			for (let i = 2; i <= maxPage; i++) {
				apiUrl = dataAPI.getPostList(i);
				await fetch(apiUrl);
			}
		}

		return {
			props: {
				pageList,
				maxPage,
				pageNum,
			}
		};
	};
</script>

<script lang="ts">
	import { siteConfig } from '$lib/store';
	
	import { goto } from '$app/navigation';
	import PostList from '$lib/components/article/postlist.svelte';
	import TabGroup from '$lib/components/tabs/tabgroup.svelte';

	export let pageList: Array<PageMeta>;
	export let pageNum: number;
	export let maxPage: number;

	const fetchMorePost = async () => {
		pageNum += 1;
		const response = await fetch(dataAPI.getPostList(pageNum));
		const data: PageListResult = await response.json();
		pageList = [...pageList, ...data.pageList];
	};

	const textlang = $siteConfig.textlang.home;

	// Define TabGroup
	let tabGroup: Array<TabItem> = [ 
		{ id: "posts", label: textlang.posts, link: '/'}, 
		{ id: "tags", label: textlang.tags, link: '/tags'}
	];
	const clickTab = (item: TabItem) => { const link = item.link as string; goto(link) };	
</script>

<svelte:head>
	<title>{getTitleStr($siteConfig)}</title>
	<meta property="og:url" content="{$siteConfig.url}"/>
	<meta property="og:locale" content="zh_TW" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="{getTitleStr($siteConfig)}" />
	<meta property="description" content="" />
</svelte:head>

<div class="index-page">
	
	<div class="mt-8 lg:mt-10 list-wrapper">
		<TabGroup group={tabGroup}></TabGroup>
		<div class="post-list">
			<PostList {pageNum} {maxPage} posts={pageList} callback={() => fetchMorePost()} />
		</div>
	</div>
</div>
