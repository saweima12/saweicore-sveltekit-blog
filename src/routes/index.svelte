<script lang="ts" context="module">
    import type { Load } from '@sveltejs/kit';
    import { dataAPI } from '$lib/client';
    import type { PageListResult } from '$lib/types';

    export const load: Load = async ({fetch, stuff}) => {
        let apiUrl = dataAPI.getPostList(1);
        const response = await fetch(apiUrl);
        const { list, maxPage, pageNum }: PageListResult = await response.json();
        // intialize all postlist page.
        if (maxPage > 1) {
            for (let i = 2; i <= maxPage; i++) {
                apiUrl = dataAPI.getPostList(i);
                await fetch(apiUrl);
            }
        }

        return {
            props: {
                list,
                maxPage,
                pageNum
            },
        }
    };
</script>
<script lang="ts">
    import { siteConfig } from '$lib/store';
    import type { SourcePage } from 'markedpage';
    import PostList from '$lib/components/article/postlist.svelte';
    import InfiniteScroll from '$lib/components/article/infinitescroll.svelte';

    export let list: Array<SourcePage>;
    export let maxPage: number;
    export let pageNum: number;
    
    const fetchPost = async () => {
        pageNum += 1;
        const response = await fetch(dataAPI.getPostList(pageNum));
        const data: PageListResult = await response.json();
        list = [...list, ...data.list];
    }

</script>

<svelte:head>
    <title>{$siteConfig.title} - {$siteConfig.description}</title>
</svelte:head>

<div class="index-page wrapper">
    <div class="pt-8 index-container">
        <div class="pb-5 post-list">
            <PostList posts={list} />
        </div>
        
        {#if pageNum < maxPage}
            <InfiniteScroll handler={() => fetchPost()} />
        {/if}
    </div>
</div>