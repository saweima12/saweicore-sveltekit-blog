<script lang="ts">
    import { page } from '$app/stores';
    import type { TabItem } from "$lib/types";
    export let group: Array<TabItem>;
</script>

<div class="mx-5 tab-btn-list">
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

<style>
.tab-btn-list {
    color: var(--navitem);
	font-size: 14px;
    border-bottom: 1px solid var(--border);
}

.tab-btn-list .tab-btn-item:hover {
	color: var(--navitem-hover);
	border-bottom: 2px solid #aaa;
}

.tab-btn-list .active, 
.tab-btn-list .active:hover {
	color: var(--navitem-active);
	border-bottom: 2px solid var(--navitem-active);
}
</style>