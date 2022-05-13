<script lang="ts">
    import { findMatchFull } from '$lib/client/search';

    export let list: Array<any>;
    // parameter
    let selectIndex: number = -1;
    
    const keyMap: Record<string, Function> = {
        "Enter": (e: KeyboardEvent) => select(),
        "ArrowDown": (e: KeyboardEvent) => { e.preventDefault(); movePointer(1) },
        "ArrowUp": (e: KeyboardEvent) => {e.preventDefault(); movePointer(-1)},
        "Escape": (e: KeyboardEvent) => {e.preventDefault(); }
    };


    const movePointer = (pointer: number) => {
        console.log(selectIndex);
        if (selectIndex == 0 && pointer < 0) {
            selectIndex = list.length - 1; 
            return;
        }

        if (selectIndex == list.length && pointer > 0) {
            selectIndex = 0; 
            return
        }
        
        selectIndex += pointer;;
    };

    const select = () => {
    };

    const onKeydown = (e: KeyboardEvent) => {
        if (list.length === 0) return; 

        if (keyMap.hasOwnProperty(e.key)){
            console.log(e.key);
            keyMap[e.key](e);
        }
    }


</script>

<svelte:window on:keydown={onKeydown} />
{#if list}
    <ul class="hit-list">
        {#each list as item, i}
        {@const match = findMatchFull(item._highlightResult)}
            <li 
                role="option"
                class="hit-list-item"
                class:selected={selectIndex == i}
                aria-selected={selectIndex == i}
                on:click={() => { selectIndex = i; select(); }}
            >
                <div class="page-title">
                    {item.title}
                </div>
                <div class="page-description">
                    {@html match.value }
                </div>
            </li>
        {/each}
        </ul>
{/if}


<style>
    .hit-list-item {
        width: 100%;
        background-color: #fafafa;
    }

</style>