<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import { dataAPI, getTitleStr } from '$lib/client';
	import type { PageListResult, PageMeta, TabItem, TagItem } from '$lib/types';

	export const load: Load = async ({ fetch, stuff }) => {
		// cache taglist.
		const apiUrl = dataAPI.getTagList();
		const response = await fetch(apiUrl);
		const { tagList } = await response.json();

		return {
			props: {
				tagList
			}
		};
	};
</script>

<script lang="ts">
	import textstr from '$lib/textstr';
	import { siteConfig } from '$lib/store';
	import Taglist from '$lib/components/article/taglist.svelte';
	import TabGroup from '$lib/components/tabs/tabgroup.svelte';

	const textlang = textstr.home;
    export let tagList: Array<TagItem>;

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
