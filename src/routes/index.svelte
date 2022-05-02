<script lang="ts" context="module">
    import type { Load } from '@sveltejs/kit';
    import { dataAPI } from '$lib/client';

    export const load: Load = async ({fetch, stuff}) => {
        const apiUrl = dataAPI.getPostList(1);
        const response = await fetch(apiUrl);
        const { list } = await response.json();
        
        return {
            props: {
                postList: list,
            },
        }
    };
</script>
<script lang="ts">
    import { siteConfig } from '$lib/store';
    import type { SourcePage } from 'markedpage';
    import PostList from '$lib/components/article/postlist.svelte';

    export let postList: Array<SourcePage>;
    // export let tagList: Array<Record<string, number>>;
</script>

<svelte:head>
    <title>{$siteConfig.title} - {$siteConfig.description}</title>
</svelte:head>

<main class="context">
    <PostList posts={postList} />

</main>