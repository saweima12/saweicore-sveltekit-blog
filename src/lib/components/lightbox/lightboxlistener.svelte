<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { lightBoxContent } from '$lib/store';
    let elements : Array<Element>;

    const listenerHandle = (e: Event) => {
        const src: string = (e.target as Element).getAttribute("src") as string;
        lightBoxContent.set(src);
    }

    onMount(() => {
        elements = Object.values(document.getElementsByClassName("lightbox"));
        elements.map(element => {
            element.addEventListener('click', listenerHandle);
        })
    });
    onDestroy(() => {
        if (elements) {
            elements.map(element => {
                element.removeEventListener('click', listenerHandle);
            })
        }
    });

    let isVisible = false;
</script>