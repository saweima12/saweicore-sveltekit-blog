<script lang="ts">
import { afterNavigate, beforeNavigate } from "$app/navigation";

import type { HeadingItem } from "$lib/types/response";

export let headings: Array<HeadingItem>;
export let headingClassName: string;

let maxScrollY = 0;
let windowInnerHeight: number = 0;
let scrollY:number = 0;
let activeIndexList: Set<number> = new Set();
let offsetArr: Array<number> = [];
let detailsArr: Array<HTMLDetailsElement> = [];

const detailsToggleHandle = (e: Event) => {
    refreshOffsetArr();
}

const deRegisterDetailsToggle = () => {
    detailsArr?.map(item => item.removeEventListener('toggle', detailsToggleHandle));
}

const refreshOffsetArr = async() => {
    let collection = document.getElementsByClassName(headingClassName);

    offsetArr = Object.values(collection).map((item) => {
        const element = item as HTMLElement;
        return element.offsetTop + (element.clientHeight / 2);
    });
    refreshActiveIndex();
}

const refreshActiveIndex = () => {
    const currentScrollY = document.documentElement.scrollTop || document.body.scrollTop;
    const currentWindowBottomY = currentScrollY + windowInnerHeight

    const result: Set<number> = new Set()

    for (let index = 0; index < offsetArr.length; index++) {
        let value = offsetArr[index];
        if ((value > currentScrollY && value < currentWindowBottomY) )
            result.add(index);
    }

    if (result.size < 1) {
        // calculate baseIndex
        let _baseIndex = offsetArr.findIndex(item => item > currentScrollY);
        _baseIndex = _baseIndex < 0 ? offsetArr.length - 1 
                : _baseIndex > 0 ? _baseIndex - 1: _baseIndex;
        result.add(_baseIndex);
    } 
    activeIndexList = result;
}

beforeNavigate(() => deRegisterDetailsToggle())

afterNavigate(async () => {
    // Register new details elements
    detailsArr = Object.values(document.getElementsByTagName("details"));
    detailsArr.map(item => item.addEventListener("toggle", detailsToggleHandle))

    // register scroll event.
    document.addEventListener("scroll", () => {
        if (offsetArr.length > 0) 
            refreshActiveIndex();
    })

    // when all picture loaded, refresh offset array.
    await Promise.all(
        Object.values<HTMLImageElement>(document.querySelectorAll("main img")).map(async (img) => {
            if (img.complete) return Promise.resolve(true);
            return new Promise(resolve => {
                img.addEventListener('load', () => resolve(true));
                img.addEventListener('error', () => resolve(false));
            })
        })
    ).then(async (results) => {
        await refreshOffsetArr();
    });
});

</script>

<svelte:window bind:scrollY={scrollY} bind:innerHeight={windowInnerHeight}/>

<div class="outline-widget">
    <ul class="overflow-y-auto outline-list">
        {#each headings as heading, i}
            <div class="{`level-${heading.depth}`} py-0.5 outline-item" 
                class:active={activeIndexList.has(i)}
            >
                <a href="#{heading.id}">{heading.text}</a>
            </div>
        {/each}
    </ul>
</div>

<style>
.outline-widget {
    color: var(--text);
}

.outline-widget .level-3 {
    padding-left: 2rem;
}

.outline-list {
    max-height: calc(100vh - 12rem);
}

.outline-list::-webkit-scrollbar {
    width: 3px;
}

.outline-list::-webkit-scrollbar-thumb {
    background-color: #7e7e7e;
}

.outline-item {
    padding-left: 1rem;
    transition: all .2s;
}

.outline-item a {
    color: var(--navitem);
    font-size: 1.05rem;
}

.outline-item.active {
    border-left: 5px solid var(--progress-bg);
    font-weight: 600;
}

.outline-item.active a {
    color: var(--navitem-active);
}
</style>