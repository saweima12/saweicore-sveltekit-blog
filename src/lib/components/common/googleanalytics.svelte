<script lang="ts">
import { page } from '$app/stores'

export let id: string = "";

$: {
    if (typeof window !== 'undefined') {
        let _window: any = window
        // get gtag.
        let gtag = _window.gtag 
        if (typeof gtag !== "undefined" ) {
            gtag('js', new Date());
            gtag('config', id);
            gtag('config', id, {
                page_title: document.title,
                page_path: $page.url.pathname,
            })
        }
    }
}
</script>

<svelte:head>
<script
    async
    src="{`https://www.googletagmanager.com/gtag/js?id=${id}`}">
</script>

<script>
    window.dataLayer = window.dataLayer || []
    function gtag() {
        dataLayer.push(arguments)
    }
</script>
</svelte:head>