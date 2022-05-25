<script lang="ts">
    import AuthorWidget from "$lib/components/widgets/authorwidget.svelte";
    import SearchWidget from '$lib/components/widgets/searchwidget.svelte';
</script>

<div class="widget-list-wrapper">
    <div class="flex flex-col widget-list">
        <div class="widget-list-item my-8">
            <SearchWidget />
        </div>
        <div class="widget-list-item">
            <AuthorWidget />
        </div>
    </div>
</div>


<style>
.widget-list-item {
    padding: 0 1rem;
}

</style>