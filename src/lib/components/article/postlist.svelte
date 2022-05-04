<script lang="ts">
    import type { SourcePage } from 'markedpage';
    import PostListItem from '$lib/components/article/postlistitem.svelte';

    export let posts: Array<SourcePage>;
</script>

<div class="post-list-container">
    {#each posts as post}
        {@const tags = post.frontMatter.tags }
        <PostListItem post={post} tags={tags} />
    {/each}
</div>

