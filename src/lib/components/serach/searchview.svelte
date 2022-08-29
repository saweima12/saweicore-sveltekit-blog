<script lang="ts">
import { onMount } from 'svelte';
import siteConfig from '$lib/site'
import { viewId, viewStack } from '$lib/store';
import type { SearchClient } from 'algoliasearch';
import algoliasearch from 'algoliasearch';

import SearchIcon from '$lib/icons/search.svelte';
import Typehead from '$lib/components/serach/typehead.svelte';

const appKey = siteConfig.search.appKey;
const apiKey = siteConfig.search.apiKey;
const appIndex = siteConfig.search.index;

let client: SearchClient;
let preSearchText: string;
let searchText: string;
let searchObj: HTMLElement;
let hits: Array<any> = [];

const uniqueId = viewId.searchView;

let isVisible: boolean = false;

viewStack.subscribe(arr => {
    if(!isVisible && arr.includes(uniqueId))
        openHandle();    
    // sync state.
    isVisible = arr.includes(uniqueId);
});

onMount(() => {
    client = algoliasearch(appKey, apiKey);
})

const comboHandle = (e: KeyboardEvent) => {
    const _navigator : any = navigator;
    const platform = _navigator?.userAgentData?.platform || navigator?.platform; 
    if (e.key === '/' && (platform == 'MacIntel' ? e.metaKey : e.ctrlKey)) {
        e.preventDefault();
        $viewStack.includes(uniqueId) ? viewStack.remove(uniqueId) : viewStack.push(uniqueId);
    }
    if (e.key === 'Escape' && isVisible) {
        viewStack.remove(uniqueId);
    }
}  

const openHandle = () => {
    isVisible = true;
    if($viewStack.length) {
        searchText = "";
        hits = [];
        setTimeout(() => {
            searchObj?.click();
            searchObj?.focus();
        }, 200);
    }
}

const searchHandle = async (e: Record<string, any> | any) => {
    if (searchText.length < 2 ) 
        return;

    if (preSearchText == searchText)
        return;

    const index = client.initIndex(appIndex);
    let response = await index.search(searchText)
    let data = response;

    preSearchText = searchText;
    hits = data.hits;
}
</script>

<svelte:window on:keydown={(e) => comboHandle(e)} />

<div class="search-box" class:hidden={!isVisible}>
    <div class="search-bar">
        <form class="flex items-center p-5 h-full" autocomplete="off" role="search">
            <div class="icon-base w-8 mr-4"><SearchIcon /></div>
            <input id="search-input" 
                type="text" 
                autocomplete="off" 
                class="h-full w-full" 
                bind:this={searchObj}
                bind:value={searchText}
                on:input={searchHandle}
            >
        </form>
    </div>
    <div class="typehead-wrapper">
        <div class="typehead-container">
            <Typehead list={hits}/>
        </div>
    </div>
</div>


<style>
.search-box {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 100%;
    z-index:40;
}    

.search-box .search-bar {
    background-color: #FAFAFA;
    height: 72px;
	box-shadow: 0 8px 22px 0 rgba(37,44,97,.15),0 4px 6px 0 rgba(209, 214, 243, 0.2)
}

input[type="text"] {
    background-color: transparent;
    outline: none;
    font-size:24px;
}

@media screen and (min-width: 1024px) {
    .search-box {
        max-width: 1024px;
    }
}
</style>