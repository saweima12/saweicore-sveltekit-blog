<script lang="ts">
    import { findMatchFull } from '$lib/client/search';

    export let hits: Array<any>;
</script>

{#if hits}
    <div class="hit-list">
        {#each hits as hit}
        {@const match = findMatchFull(hit._highlightResult)}
            <div class="hit-list-item">
                <div class="page-title">
                    {hit.title}
                </div>
                <div class="page-description">
                    { match }
                </div>
            </div>
        {/each}
    </div>
{/if}


<style>
    .hit-list-item {
        width: 100%;
        background-color: #fafafa;
    }

</style>