<script lang="ts">
    import Keydown from 'svelte-keydown';

</script>

<div class="py-5 search-widget">
    <div class="search-container">
        <div class="w-full search-box cursor-pointer" on:click="{() => console.log("yeee")}"> 
            <div class="flex flex-row h-full justify-center items-center  box-label">
                <div class="label-text mr-2">Search</div>
                <div class="flex label-container items-center label-keys">
                    <div class="label-key">Ctrl</div>
                    <div class="label-key">K</div>
                </div>
            </div>
        </div>
    </div>
</div>
<Keydown on:combo={ ({detail}) => { console.log(detail == "Control-k") } } />

<style>
.search-box {
    border: 1px solid #bbb;
    border-radius: 1.6rem;
    height: 2.5rem;
}

.label-key {
    background: #c8c8c8;
    border-radius: .2rem;

    padding: 0.1rem 0.5rem;
    margin-right: 0.5rem;
}

</style>