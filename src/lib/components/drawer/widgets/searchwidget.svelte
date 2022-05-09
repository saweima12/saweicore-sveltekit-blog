<script lang="ts">
    import Keydown from 'svelte-keydown';
</script>

<div class="search-widget">
    <div class="w-full search-container relative">
        <input type="text" id="search" class="border border-slate-600 rounded-2xl search-box"/>
    </div>
</div>
<Keydown on:combo={ ({detail}) => { console.log(detail == "Control-k") } } />

<style>

</style>