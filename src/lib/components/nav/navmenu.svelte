<script lang="ts">
    import type { NavItem } from '$lib/types';
    import { isNavMenuShow, siteConfig } from '$lib/store';

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
                    <a href={navItem.link} class="pl-3 text-xl letter-content-font">{navItem.name}</a>
                </li>
            </ul>
        {/each}
    </div>
</div>