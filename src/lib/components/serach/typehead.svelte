<script lang="ts">
    export let hits: Array<any>;
</script>

{#if hits}
    <div class="hit-list">
        {#each hits as hit}
            <div class="hit-list-item">
                <div class="page-title">
                    {hit.title}
                </div>
                <div class="page-description">
     
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