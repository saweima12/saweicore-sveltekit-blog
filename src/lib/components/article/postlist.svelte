<script lang="ts">
    import type { SourcePage } from 'markedpage';
    import PostListItem from '$lib/components/article/postlistitem.svelte';

    import { page } from '$app/stores';

    export let posts: Array<SourcePage>;
</script>

<div class="pt-4 post-list">
    {#each posts as post}
        {@const tags = post.frontMatter.tags }
        <PostListItem post={post} tags={tags} />
    {/each}
</div>
