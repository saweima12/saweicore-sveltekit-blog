<script lang="ts">
    import { page } from '$app/stores';
    import type { TabItem } from "$lib/types";
    export let group: Array<TabItem>;
</script>

<div class="mt-14 mx-5 tab-btn-list">
    {#each group as item}
        <a class="py-3 px-5 mr-1 inline-block tab-btn-item" 
            class:active={$page.url.pathname == item.link} 
            href={item.link}
        >
            {item.label}
        </a>
    {/each}
</div>


<slot />