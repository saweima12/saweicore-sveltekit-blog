<script lang="ts" context="module">
    import type { Load } from '@sveltejs/kit';
    import { dataAPI } from '$lib/client';
    import type { PageListResult, PageMeta } from '$lib/types';

    export const load: Load = async ({fetch, stuff}) => {
        let apiUrl = dataAPI.getPostList(1);
        let response = await fetch(apiUrl);
        const { pageList, maxPage, pageNum }: PageListResult = await response.json();
        // intialize all postlist page.
        if (maxPage > 1) {
            for (let i = 2; i <= maxPage; i++) {
                apiUrl = dataAPI.getPostList(i);
                await fetch(apiUrl);
            }
        }
        // cache taglist.
        apiUrl = dataAPI.getTagData();
        

        return {
            props: {
                pageList,
                maxPage,
                pageNum
            },
        }
    };
</script>
<script lang="ts">
    import { siteConfig } from '$lib/store';
    import PostList from '$lib/components/article/postlist.svelte';
    import InfiniteScroll from '$lib/components/infinitescroll.svelte';

    export let pageList: Array<PageMeta>;
    export let maxPage: number;
    export let pageNum: number;
    
    const fetchPost = async () => {

        pageNum += 1;
        const response = await fetch(dataAPI.getPostList(pageNum));
        const data: PageListResult = await response.json();
        pageList = [...pageList, ...data.pageList];
    }

</script>

<svelte:head>
    <title>{$siteConfig.title} - {$siteConfig.description}</title>
</svelte:head>

<div class="pt-8 index-page wrapper">

    <div class="pb-5 post-list">
        <PostList posts={pageList} />
    </div>
    
    {#if pageNum <= maxPage}
        <InfiniteScroll handler={() => fetchPost()} />
    {/if}

</div>