<script lang="ts">
    import type { SourcePage } from 'markedpage';
    import type { PageMeta } from '$lib/types';
    import PostListItem from '$lib/components/article/postlistitem.svelte';

    export let posts: Array<PageMeta>;
</script>

{#each posts as post}
    {@const tags = post.metadata.tags }
    <PostListItem post={post} tags={tags} metadata={post.metadata} />
{/each}


