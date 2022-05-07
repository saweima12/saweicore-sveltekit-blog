<script lang="ts">
    export let id: string;
    export let label: string;
    export let registerFunc: Function;
    export let pointer: string;

    // Register TabItem on mount.
    registerFunc({id, label});
</script>

<div class:hidden={pointer != id}>
    <slot/>
</div>