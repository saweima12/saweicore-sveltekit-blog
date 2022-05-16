<script>
    import { fly } from 'svelte/transition';
    
    export let refresh = "";
</script>

{#key refresh} 
    <div     
        in:fly="{{ x: -50, duration: 150, delay: 100 }}"
    >
        <slot />
    </div>
{/key}