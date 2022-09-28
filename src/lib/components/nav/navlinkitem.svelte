<script lang="ts">
	import { isExternal } from '$lib/client';
	export let link: string;
</script>

{#if isExternal(link)}
	<a href={link} alt="" class="w-full h-full">
		<slot />
	</a>
{:else}
	<a href={link} alt="" class="w-full h-full">
		<slot />
	</a>
{/if}
