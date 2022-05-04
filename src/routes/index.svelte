<script lang="ts" context="module">
    import type { Load } from '@sveltejs/kit';
    import { dataAPI } from '$lib/client';
    import type { PageListResult } from '$lib/types';

    export const load: Load = async ({fetch, stuff}) => {
        const apiUrl = dataAPI.getPostList(1);
        const response = await fetch(apiUrl);
        const { list }: PageListResult = await response.json();
        
        return {
            props: {
                list,
            },
        }
    };
</script>
<script lang="ts">
    import { siteConfig } from '$lib/store';
    import type { SourcePage } from 'markedpage';
    import PostList from '$lib/components/article/postlist.svelte';

    export let list: Array<SourcePage>;
</script>

<svelte:head>
    <title>{$siteConfig.title} - {$siteConfig.description}</title>
</svelte:head>

<main class="index-page wrapper">
    <div class="pt-8 index-container">
        <PostList posts={list} />

    </div>
</main>