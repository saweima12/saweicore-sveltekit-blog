<script lang="ts">
    import AuthorWidget from "./widgets/authorwidget.svelte";
    import SearchWidget from './widgets/searchwidget.svelte';
</script>

<div class="widget-list-wrapper">
    <div class="flex flex-col widget-list">
        <div class="widget-list-item">
            <SearchWidget />
        </div>
        <div class="widget-list-item">
            <AuthorWidget />
        </div>
    </div>
</div>


<style>
.widget-list-item {
    padding: 0 0.5rem;
}

</style>