<script lang="ts">
    import { siteConfig } from '$lib/store';
</script>

<nav class="hidden lg:block fixed h-full side-navbar">
    <div class="p-4 flex flex-col sidenav-container">
        <div class="mt-4 logo">
            <img class="rounded-full" src="/logo.png" alt={$siteConfig.title}>
        </div>
        
        <div class="grow"></div>
        <div class="mt-4 logo">
            <img class="rounded-full" src="/logo.png" alt={$siteConfig.title}>
        </div>
    </div>
</nav>
