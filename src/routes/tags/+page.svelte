<script lang="ts">
	import { dataAPI, getTitleStr } from '$lib/client';
	import type { PageListResult, PageMeta, TabItem, TagItem } from '$lib/types';
	import Postlist from '$lib/components/article/postlist.svelte';

	import textstr from '$lib/textstr';
	import { siteConfig } from '$lib/store';
	import Taglist from '$lib/components/article/taglist.svelte';
	import TabGroup from '$lib/components/tabs/tabgroup.svelte';
	
	import type { PageData } from './$types';

	// loading page data.
	export let data: PageData;
	$: ({ tagList } = data);
	
	
	const textlang = textstr.home;
	let tabGroup: Array<TabItem> = [ 
		{ id: "posts", label: textlang.posts, link: '/'}, 
		{ id: "tags", label: textlang.tags, link: '/tags'}
	];
</script>

<svelte:head>
	<title>{getTitleStr($siteConfig)}</title>
</svelte:head>

<div class="tag-page">
	<div class="mt-10 list-wrapper">
		<TabGroup group={tabGroup} /> 
        <div class="tag-list-wrapper">
            <Taglist tags={tagList} />
        </div>
	</div>
</div>
