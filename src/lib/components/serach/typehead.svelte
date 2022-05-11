<script lang="ts">
    export let hits: Array<any>;
</script>

{#if hits}
    <div class="hit-list">
        {#each hits as hit}
            <div class="hit-list-item">
                

            </div>
        {/each}
    </div>
{/if}