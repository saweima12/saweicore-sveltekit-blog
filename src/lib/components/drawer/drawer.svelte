<script lang="ts">
    import AuthorWidget from "$lib/components/widgets/authorwidget.svelte";
    import SearchWidget from '$lib/components/widgets/searchwidget.svelte';
    import OutlineWidget from "$lib/components/widgets/outlinewidget.svelte";

    import { page } from '$app/stores';
    import type { HeadingItem } from "$lib/types/response";


    let headingList: Array<HeadingItem> = [];
    $: {
        const { headings } : any = $page.data;
        headingList = headings || [];
    }
</script>

<div class="flex flex-col h-full widget-list">
    <div class="widget-list-item my-3">
        <SearchWidget />
    </div>

    <div class="widget-list-item">
        <AuthorWidget />
    </div>
    
    {#if headingList.length > 0 }
        <div class="widget-list-item sticky top-14">
            <OutlineWidget headings={headingList} headingClassName="heading-item" />
        </div>
    {/if}


</div>


<style>
.widget-list-item {
    padding: 1rem
}

</style>