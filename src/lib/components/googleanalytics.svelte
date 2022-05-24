<!-- Global site tag (gtag.js) - Google Analytics -->
<script lang="ts">
    import { dev } from '$app/env';

    export let id: string;
    $: {
        if (typeof window !== 'undefined' ) {
            console.log(window);
            let _window: any = window;
            let dataLayer = _window.dataLayer || [];
            _window.gtag = () => { dataLayer.push(arguments) }
            _window.gtag('js', new Date());
            _window.gtag('config', id);
        }
    }
</script>

<svelte:head>
    <script async src="https://www.googletagmanager.com/gtag/js?id={id}"></script>
</svelte:head>