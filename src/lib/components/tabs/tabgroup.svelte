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

<style>
.tab-btn-list {
    color: #757575;
	font-size: 14px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15)
}

.tab-btn-list .tab-btn-item:hover {
	color: #333;
	border-bottom: 2px solid #aaa;
}

.tab-btn-list .active, 
.tab-btn-list .active:hover {
	color: #000;
	border-bottom: 2px solid #000;
}
</style>