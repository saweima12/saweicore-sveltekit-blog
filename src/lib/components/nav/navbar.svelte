<script>
import { siteConfig } from '$lib/store';
import Hamburger from '$lib/components/nav/hamburger.svelte';
</script>

<nav class="flex items-center h-14 p-2 top-navbar">
    <a class="flex site-title ml-2" href="/">
        <div class="logo">
            <img src="/logo.png" alt={$siteConfig.title}>
        </div>

        <div class="flex self-center ml-2 name">
            {$siteConfig.title}
        </div>
    </a>
    <div class="grow spacer"></div>
    
    <Hamburger />

</nav>

