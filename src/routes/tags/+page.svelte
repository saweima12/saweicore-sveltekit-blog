<script lang="ts">
	import type { PageData } from './$types';
	import { getTitleStr } from '$lib/client';
	import type { TabItem } from '$lib/types';

	import textstr from '$lib/textstr';
	import siteConfig  from '$lib/site';
	import Taglist from '$lib/components/article/taglist.svelte';
	import TabGroup from '$lib/components/tabs/tabgroup.svelte';
	
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
	<title>{getTitleStr(siteConfig)}</title>
</svelte:head>

<div class="tag-page">
	<div class="mt-10 list-wrapper">
		<TabGroup group={tabGroup} /> 
        <div class="tag-list-wrapper">
            <Taglist tags={tagList} />
        </div>
	</div>
</div>
