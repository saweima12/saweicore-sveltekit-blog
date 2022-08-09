<script lang="ts">
    import SearchIcon from '$lib/icons/search.svelte';
    import { viewStack, viewId } from '$lib/store';
    
    const clickHandle = () => {
        viewStack.push(viewId.searchView);
    }
</script>

<div class="nav-search mr-2" on:click="{clickHandle}">
    <div class="flex self-center justify-center w-6 label-icon">
        <SearchIcon />
    </div>
</div>

<style>
    .nav-search {
        color: var(--text);
        padding: 5px;
        cursor: pointer;
    }
</style>