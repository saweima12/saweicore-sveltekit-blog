<script lang="ts">
    import { onDestroy } from 'svelte';
    
    let isListingScroll: Boolean = false;
    export let handler: Function;
    
    let component: HTMLElement;

    const onScroll = (e: Event) => {
        e.target as HTMLElement
    }


    const waypointHandler = () => (handler());

    const clickHandler = () => {
        isListingScroll = true;
        waypointHandler();
        // start to listen scroll;
    }
    onDestroy(() => {
        console.log("OnDestory");
    })

</script>

<svelte:window on:scroll={onScroll}/>

<div class="mx-5 more-btn">
    <button class="py-2 border-2 box-border w-full"
        on:click={clickHandler}
        bind:this={component}
    > More..</button>
</div>
