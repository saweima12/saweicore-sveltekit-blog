<script lang="ts">
import { onMount } from 'svelte';
import { siteConfig } from '$lib/store';
import { isSearBoxShow, isMaskShow } from '$lib/store';
import type { SearchClient } from 'algoliasearch';
import algoliasearch from 'algoliasearch';

import SearchIcon from '$lib/icons/search.svelte';
import Typehead from '$lib/components/serach/typehead.svelte';

const appKey = atob($siteConfig.search.appKey);
const apiKey = atob($siteConfig.search.apiKey);
const appIndex = $siteConfig.search.index;

let client: SearchClient;
let searchText: string;
let searchObj: HTMLElement;
let isVisible = false;
let hits: Array<any> = [];

onMount(() => {
    isSearBoxShow.subscribe(value => {
        isVisible = value;
        $isMaskShow = value;

        if(isVisible) {
            searchText = "";
            hits = [];
            setTimeout(() => searchObj?.focus(), 100);
        }
    });

    client = algoliasearch(appKey, apiKey);
})

const comboHandle = (e: KeyboardEvent) => {
    const _navigator : any = navigator;
    const platform = _navigator?.userAgentData?.platform || navigator?.platform; 
    if (e.key === '/' && (platform == 'MacIntel' ? e.metaKey : e.ctrlKey)) {
        e.preventDefault();
        $isSearBoxShow = !isVisible;
    }
    if (e.key === 'Escape' && isVisible) {
        $isSearBoxShow = false;
    }
}  

const searchHandle = async (e: Event) => {
    if (searchText.length < 2 ) 
        return;
    
    // const index = client.initIndex(appIndex);
    // let response = await index.search(searchText)
    // test data
    const response = await fetch("/api/test/search.json");
    let data = await response.json();
    hits = data.hits;
}
</script>

<svelte:window on:keydown={(e) => comboHandle(e)} />

<div class="search-box" class:hidden={!isVisible}>
    <div class="search-bar">
        <form class="flex items-center p-5 h-full" role="search">
            <div class="icon-base w-8 mr-4"><SearchIcon /></div>
            <input id="search-input" 
                type="text" 
                class="h-full w-full" 
                bind:this={searchObj}
                bind:value={searchText}
                on:input={searchHandle}
            >
        </form>
    </div>
    <div class="typehead-wrapper">
        <div class="typehead-container">
            <Typehead {hits}/>
        </div>
    </div>
</div>


<style>
.search-box {
    position: absolute;
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