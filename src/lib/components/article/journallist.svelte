<script lang="ts">
	import type { GroupListPair, PageMeta } from '$lib/types';
	import { getMMDD, pageRoute } from '$lib/client';

	export let groups: Array<GroupListPair<PageMeta>>;
</script>

<ol class="flex flex-col journel-list">
{#each groups as group}
	<li class="mb-8 group">
		<h1 class="text-2xl letter-title-font group-name">{group.name}</h1>
		<ul class="flex flex-col mt-2 page-list">
			{#each group.pageList as page}
				<li class="my-2 page-item">
					<a class="flex flex-row" href={pageRoute.getPostPath(page)}>
						<time class="flex text-lg self-center page-date">
							{getMMDD(page.metadata.created)}
						</time>
						<div class="ml-4 text-lg word-font post-title">
							{page.metadata.title}							
						</div>
					</a>
				</li>
			{/each}
		</ul>
	</li>
{/each}
</ol>

<style>
	.journel-list {
		margin: 0 1rem;
		color: var(--text);
	}

	.journel-list .page-list {
		margin-left: 0.5rem;
		margin-right: 0.5rem;
	}

	.journel-list .page-item {
		padding: .5rem 1rem;
		border-radius: .2rem;
	}

	.journel-list .page-item a:hover {
		padding-left: 1rem;
		color: var(--navitem-active);
		transition: all .2s;
	}

</style>

