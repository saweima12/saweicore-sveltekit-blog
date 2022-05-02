<script lang="ts">
    import { isNavMenuShow } from '$lib/store';

    let isVisible = false;
    isNavMenuShow.subscribe(value => isVisible = value);
</script>

<div class="fixed z-30 top-0 right-0 bottom-0 w-60 md:w-80 transition-all duration-200 navmenu" 
     class:translate-x-full={!isVisible}>
    <div class="navmenu-container">
        
    </div>
</div>