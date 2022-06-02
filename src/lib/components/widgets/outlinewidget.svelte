<script lang="ts">
import { afterNavigate } from "$app/navigation";

import type { HeadingItem } from "$lib/types/response";

export let headings: Array<HeadingItem>;
export let headingClassName: string;

let maxScrollY = 0;
let windowInnerHeight: number = 0;
let scrollY:number = 0;
let activeIndex: number = 0;
let offsetArr: Array<number> = [];
let detailsArr: Array<HTMLDetailsElement> = [];

const detailsToggleHandle = (e: Event) => {
    refreshOffsetArr();
}

const unRegisterDetailsToggle = () => {
    detailsArr?.map(item => item.removeEventListener('toggle', detailsToggleHandle));
}

const refreshOffsetArr = () => {
    let collection = document.getElementsByClassName(headingClassName);
    offsetArr = Object.values(collection).map((item) => {
        const element = item as HTMLElement;
        return element.offsetTop + (element.clientHeight / 2);
    });

    // calculate maxScrollY
    maxScrollY = Math.max(document.body.scrollHeight, document.body.offsetHeight) - window.innerHeight; 
    console.log(maxScrollY);
    refreshActiveIndex();
}

const refreshActiveIndex = () => {
    const currentScrollY = document.documentElement.scrollTop || document.body.scrollTop;

    const _index = offsetArr.findIndex(item => item > currentScrollY + (windowInnerHeight / 2));
    activeIndex = _index < 0 ? offsetArr.length - 1 
                : _index > 0 ? _index - 1: _index;
    // process threshold
    activeIndex = maxScrollY - currentScrollY <= 100 ? (offsetArr.length - 1) : activeIndex;
}

afterNavigate(() => {
    // Register new details elements
    detailsArr = Object.values(document.getElementsByTagName("details"));
    detailsArr.map(item => item.addEventListener("toggle", detailsToggleHandle))
    // refresh scrollList
    refreshOffsetArr();
    refreshActiveIndex();
});

// On headings update.
$: {
    if (typeof document !== 'undefined' 
        && headings.length > 0) {
        // Unregister old detials element
        unRegisterDetailsToggle();
        // update OffsetArr
        refreshOffsetArr();
        refreshActiveIndex();
    }
}

// On ScrollUpdate
$: {
    if (typeof window !== 'undefined' && offsetArr.length > 0 && scrollY) {
        refreshActiveIndex();
    }
}

</script>

<svelte:window bind:scrollY={scrollY} bind:innerHeight={windowInnerHeight}/>

<div class="outline-widget">
    {#each headings as heading, i}
        <div class="{`level-${heading.depth}`} mb-2 outline-item" class:active={activeIndex == i}>
            <a href="#{heading.id}">{heading.text}</a>
        </div>
    {/each}
</div>

<style>
.outline-widget {
    color: var(--text);
}

.outline-widget .level-3 {
    padding-left: 2rem;
}

.outline-item {
    padding-left: 1rem;
    transition: all .2s;
}

.outline-item a {
    color: var(--navitem);
}

.outline-item.active {
    border-left: 5px solid var(--progress-bg);
    font-weight: 600;
}

.outline-item.active a {
    color: var(--navitem-active);
}
</style>