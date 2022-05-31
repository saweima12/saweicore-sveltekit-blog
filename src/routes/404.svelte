<script lang="ts">
import { getTitleStr } from "$lib/client";

    import FzfIcon from "$lib/icons/fzf.svelte";
    import { siteConfig } from "$lib/store";
</script>

<svelte:head>
    <title>{getTitleStr($siteConfig)}</title>
</svelte:head>

<div class="fzf-page">

    <h1 class="mt-8 letter-title-font fzf-msg">
        404 Not Found
    </h1>

    <div class="p-20 fzf-icon">
        <FzfIcon />
    </div>
</div>


<style>
    .fzf-msg {
        font-size: 2rem;
        color: var(--text);
    }

    .fzf-icon {
        color: var(--text);
    }

</style>