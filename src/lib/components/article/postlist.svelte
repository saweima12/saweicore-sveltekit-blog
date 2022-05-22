<script lang="ts">
	import type { PageMeta } from '$lib/types';
	import InfiniteScroll from '$lib/components/infinitescroll.svelte';
	import PostListItem from '$lib/components/article/postlistitem.svelte';

	export let pageNum: number;
	export let maxPage: number;
	export let callback: Function;
	export let posts: Array<PageMeta>;
</script>

<div>
	{#each posts as post}
		{@const tags = post.metadata.tags}
		<PostListItem {post} {tags} metadata={post.metadata} />
	{/each}
</div>
		
{#if pageNum < maxPage}
	<div class="mt-14 more-btn">
		<InfiniteScroll handler={callback} />
	</div>
{/if}
