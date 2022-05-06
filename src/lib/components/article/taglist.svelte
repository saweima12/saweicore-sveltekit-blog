<script lang="ts">
	import type { TagItem } from '$lib/types';
	export let tags: Array<TagItem>;
</script>

{#each tags as tag}
	{tag.name}
{/each}
