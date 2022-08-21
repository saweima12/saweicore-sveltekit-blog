<script lang="ts">
	import { dataAPI, getTitleStr } from '$lib/client';
	import type { PageListResult, TabItem } from '$lib/types';

	import textstr from '$lib/textstr';
	import { siteConfig } from '$lib/store';
	
	import { goto } from '$app/navigation';
	import PostList from '$lib/components/article/postlist.svelte';
	import TabGroup from '$lib/components/tabs/tabgroup.svelte';

	import { onContentUpdate } from 'markedpage/helper';
	import type { PageData } from './$types';

	// loading page data.
	export let data: PageData;
	$: ({ pageList, pageNum, maxPage } = data)

	const fetchMorePost = async () => {
		pageNum += 1;
		const response = await fetch(dataAPI.getPostList(pageNum));
		const data: PageListResult = await response.json();
		pageList = [...pageList, ...data.pageList];
	};

	const textlang = textstr.home;

	// Define TabGroup
	let tabGroup: Array<TabItem> = [ 
		{ id: "posts", label: textlang.posts, link: '/'}, 
		{ id: "tags", label: textlang.tags, link: '/tags'}
	];
	const clickTab = (item: TabItem) => { const link = item.link as string; goto(link) };	
	// support HMR
	import { invalidate } from '$app/navigation';

	onContentUpdate(() => {
		invalidate(dataAPI.getPostList(1));
	})
</script>

<svelte:head>
	<title>{getTitleStr($siteConfig)}</title>
	<!-- Twitter Card -->	
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:site" content="@saweima12" />
	<meta name="twitter:title" content={$siteConfig.title} />
	<meta name="twitter:description" content={$siteConfig.description} />
	<meta name="twitter:url" content={$siteConfig.url} />
	<!-- Facebook OpenGraph -->
	<meta property="og:url" content="{$siteConfig.url}"/>
	<meta property="og:locale" content="zh_TW" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="{getTitleStr($siteConfig)}" />
	<meta name="description" content="{$siteConfig.description}" />
</svelte:head>

<div class="index-page">
	
	<div class="mt-8 lg:mt-10 list-wrapper">
		<TabGroup group={tabGroup}></TabGroup>
		<div class="post-list">
			<PostList {pageNum} {maxPage} posts={pageList} callback={() => fetchMorePost()} />
		</div>
	</div>
</div>
