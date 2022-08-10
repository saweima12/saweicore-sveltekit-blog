<script lang="ts">
    import { isExternal } from '$lib/client/helper';
    export let link: string;
    
</script>

{#if isExternal(link) }
    <a href={link} alt="" class="w-full h-full">
        <slot />
    </a>
{:else}
    <a sveltekit:prefetch href={link} alt="" class="w-full h-full">
        <slot />
    </a>
{/if}
