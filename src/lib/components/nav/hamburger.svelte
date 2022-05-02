<script lang="ts">
    import { isNavMenuShow, isMaskShow } from "$lib/store";
    
    let toggle: boolean = false;
    isNavMenuShow.subscribe(value => toggle = value);

    const toggleMenuHandle = () => {
        toggle = !toggle;
        $isNavMenuShow = toggle;
        $isMaskShow = toggle;
    }
</script>

<div class="menu-button-wrapper" class:toggle={toggle} on:click={toggleMenuHandle}>
    <div class="menu-button-container">
        <div class="menu-button"></div>
    </div>
</div>
