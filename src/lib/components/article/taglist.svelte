<script lang="ts">
	import { goto } from '$app/navigation';
	import { siteConfig } from '$lib/store';
	import { pageRoute, getYYYYMMDD } from '$lib/client';
	import type { TagItem } from '$lib/types';

	const textlang: Record<string, any> = $siteConfig.textlang.home;
	export let tags: Array<TagItem>;
</script>

<div class="mt-5 mx-5">
	<table class="w-full text-center tag-table border">
		<thead>
			<tr class="h-10 ">
				<th class="tag-name">{textlang.tagName}</th>
				<th class="hidden lg:table-cell tag-updated">{textlang.tagUpdated}</th>
				<th class="tag-count">{textlang.tagCount}</th>
			</tr>
		</thead>
		<tbody>
			{#each tags as tag}
			<tr class="h-10 cursor-pointer" on:click={() => goto(pageRoute.getTagPath(tag.name))}>
				<td class="tag-name">{tag.name} </td>
				<td class="hidden lg:table-cell tag-updated">{getYYYYMMDD(tag.updated)}</td>
				<td class="tag-count">{tag.count}</td>
			</tr>
			{/each}
		</tbody>

	</table>
</div>
