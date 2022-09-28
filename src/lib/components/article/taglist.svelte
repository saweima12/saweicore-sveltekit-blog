<script lang="ts">
	import textstr from '$lib/textstr';
	import { pageRoute, getYYYYMMDD } from '$lib/client';
	import type { TagItem } from '$lib/types';

	const textlang: Record<string, any> = textstr.home;
	export let tags: Array<TagItem>;
</script>

<div class="mt-5 mx-5">
	<ul class="w-full text-center tag-list">
		<li class="py-2 tag-list-head">
			<div class="flex flex-row justify-around">
				<div class="w-60 tag-name">{textlang.tagName}</div>
				<div class="flex-1 hidden lg:flex justify-center tag-updated">{textlang.lastUpdated}</div>
				<div class="flex-1 tag-count">{textlang.tagCount}</div>
			</div>
		</li>
		{#each tags as tag}
			<li class="py-3 tag-list-item">
				<a class="flex flex-row justify-around" href={pageRoute.getTagPath(tag.name)}>
					<div class="w-60 tag-name">{tag.name}</div>
					<div class="flex-1 hidden lg:flex justify-center tag-updated">
						{getYYYYMMDD(tag.updated)}
					</div>
					<div class="flex-1 tag-count">{tag.count}</div>
				</a>
			</li>
		{/each}
	</ul>
</div>
