<script lang="ts">
	import type { GroupListPair, PageMeta } from '$lib/types';
	import { getMMDD, pageRoute } from '$lib/client';

	export let groups: Array<GroupListPair<PageMeta>>;
</script>

{#each groups as group}
	<li class="mb-8 group">
		<h1 class="text-2xl letter-title-font group-name">{group.name}</h1>
		<ul class="flex flex-col mt-2 page-list">
			{#each group.pageList as page}
				<li class="flex flex-row my-2 page-item">
					<time class="flex self-center page-date">
						{getMMDD(page.metadata.created)}
					</time>

					<a class="ml-4 text-lg post-title" href={pageRoute.getPostPath(page)}>
						{page.metadata.title}
					</a>
				</li>
			{/each}
		</ul>
	</li>
{/each}
