<script lang="ts">
    import { isExternal } from '$lib/client/helper';
    import type { NavItem } from '$lib/types';
    import { isNavMenuShow, siteConfig } from '$lib/store';
    import ExternalIcon from '$lib/icons/external.svelte';

    let navList : Array<NavItem> = $siteConfig.nav;
    let isVisible = false;
    isNavMenuShow.subscribe(value => isVisible = value);
</script>

<div class="fixed z-30 top-0 right-0 bottom-0 w-60 md:w-80 transition-all duration-200 navmenu" 
     class:translate-x-full={!isVisible}>
    <div class="navmenu-container">
        {#each navList as navItem } 
            <ul>
                <li class="flex items-center mt-2 ">
                    <div class="icon-base w-6">
                    </div>
                    <a href={navItem.link} class="pl-3 text-xl letter-content-font">
                        {navItem.name}
                    </a>
                    {#if isExternal(navItem.link) }
                        <ExternalIcon />
                    {/if}
                    <div class="icon-base w-3"></div>
                </li>
            </ul>
        {/each}
    </div>
</div>