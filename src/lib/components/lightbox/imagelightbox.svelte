<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { lightBoxContent } from '$lib/store';

    let picUrl: string = "";
    let isVisible: boolean = false;

    onMount(()=> {
        lightBoxContent.subscribe((value) => {
            picUrl = value;
            isVisible = (value && value.length > 0) ? true : false;
        })
    });  

    const closeHandle = () => lightBoxContent.set("");

</script>

    <div class="lightbox-wrapper" 
        class:translate-x-full={!isVisible} 
        class:opacity-0={!isVisible}
        on:click={closeHandle}>
        <div class="flex items-center h-full  lightbox-container">
            <img src={picUrl} alt="lightbox-pic" class="lightbox-pic">
    
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