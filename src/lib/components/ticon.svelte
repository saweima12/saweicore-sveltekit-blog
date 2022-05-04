<script lang="ts">
    import { iconMap } from '$lib/store';

    export let key: string;
    export let hex: string = "";
</script>

<span style:color={hex || '#000'}>
    {@html $iconMap[key]}
</span>