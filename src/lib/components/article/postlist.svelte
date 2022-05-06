<script lang="ts">
	import type { SourcePage } from 'markedpage';
	import type { PageMeta } from '$lib/types';
	import InfiniteScroll from '$lib/components/infinitescroll.svelte';
	import PostListItem from '$lib/components/article/postlistitem.svelte';

	export let pageNum: number;
	export let maxPage: number;
	export let callback: Function;
	export let posts: Array<PageMeta>;
</script>

{#each posts as post}
	{@const tags = post.metadata.tags}
	<PostListItem {post} {tags} metadata={post.metadata} />
{/each}

{#if pageNum <= maxPage}
	<InfiniteScroll handler={callback} />
{/if}
