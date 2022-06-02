<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { lightBoxView } from '$lib/store';

    let picUrl: string = "";
    let isVisible: boolean = false;

    onMount(()=> {
        lightBoxView.subscribe((value) => {
            picUrl = value.content;
            isVisible = picUrl.length > 1 ? true : false;
        })
    });  

    const closeHandle = () => $lightBoxView.content = "";
</script>

<div class="lightbox-wrapper" 
class:translate-x-full={!isVisible} 
class:opacity-0={!isVisible}
on:click={closeHandle}>

<div class="flex items-center h-full  lightbox-container">
    {#if isVisible}
        <img src="{picUrl}" alt="lightbox-pic" class="lightbox-pic" loading="lazy">
    {/if}
    </div>
</div>


<style>
    .lightbox-wrapper {
        position: fixed;
        z-index: 30;
        height: 100vh;
        width: 100vw;
        top: 0;
        transition: all .5s;
    }

    .lightbox-container {
        background-color: var(--mask-bg);
    }

    .lightbox-pic {
        margin: 0 auto;
        max-height: 100vh;
    }

</style>