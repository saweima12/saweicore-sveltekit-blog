<script lang="ts">
    import { siteConfig } from '$lib/store';
</script>

<nav class="flex fixed h-screen side-navbar">
    <div class="flex flex-col h-full px-5 sidenav-container">
        <div class="mt-8 logo">
                <a href="/">
                    <img class="rounded-full" src="/logo.png" alt={$siteConfig.title}>
                </a>
            </div>    

        

    </div>
</nav>
