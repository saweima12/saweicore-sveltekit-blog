<script lang="ts">
import { isSearBoxShow, isMaskShow } from '$lib/store';
import SearchIcon from '$lib/icons/search.svelte';
import TypeHead from '$lib/components/serach/typehead.svelte';

let isVisible = false;
isSearBoxShow.subscribe(value => {
    isVisible = value;
    $isMaskShow = value;
});

const closeHandle = () => {
    isVisible = false;
}

const comboHandle = (e: KeyboardEvent) => {
    const platform = navigator?.userAgentData?.platform || navigator?.platform; 
    if (e.key === '/' && (platform == 'MacIntel' ? e.metaKey : e.ctrlKey)) {
        e.preventDefault();
        $isSearBoxShow = !isVisible;
    }
}  
</script>

<svelte:window on:keydown={(e) => comboHandle(e)} />

<div class="search-box" class:hidden={!isVisible}>
    <div class="search-bar">
        <form class="flex items-center p-5 h-full" role="search">
            <div class="icon-base w-8 mr-4"><SearchIcon /></div>
            <input id="search-input" type="text"  class="h-full w-full">
        </form>
    </div>
    <div class="typehead-wrapper">
        <div class="test">

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
    border: none;
    outline: none;
    font-size:24px;
}

@media screen and (min-width: 1024px) {
    .search-box {
        max-width: 1024px;
    }
}
</style>