<script lang="ts">
    import { page } from '$app/stores'
    import { onMount } from 'svelte';

    export let id: string = "";
    let gtag: any

    $: {
        if (typeof window !== 'undefined') {
            let _window: any = window
            // get gtag.
            gtag = _window.gtag 
            if (typeof gtag !== "undefined" ) {


                gtag('config', id, {
                    page_title: document.title,
                    page_path: $page.url.pathname,
                })
            }
        }
    }

    onMount(() => {
        if (typeof gtag !== undefined) {
            gtag('js', new Date());
            gtag('config', id);
        }
    })
</script>

<svelte:head>
<script
    defer
    src="{`https://www.googletagmanager.com/gtag/js?id=${id}`}">
</script>

<script>
    window.dataLayer = window.dataLayer || []
    function gtag() {
        dataLayer.push(arguments)
    }
</script>
</svelte:head>