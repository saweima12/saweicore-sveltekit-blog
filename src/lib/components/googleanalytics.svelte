<!-- Global site tag (gtag.js) - Google Analytics -->
<script lang="ts">
    export let id: string;
    $: {
        if (typeof window !== 'undefined' ) {
            let _window: any = window;
            _window.dataLayer = _window.dataLayer || [];

            _window.gtag = () => { _window.dataLayer.push(arguments) }
            _window.gtag('js', new Date());
            _window.gtag('config', id);
        }
    }
</script>

<svelte:head>
    <script async src="https://www.googletagmanager.com/gtag/js?id={id}"></script>
</svelte:head>