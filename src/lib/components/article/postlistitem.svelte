<script lang="ts">
	import type { PageMeta } from '$lib/types';
	import { getYYYYMMDD, pageRoute } from '$lib/client';
	import CalenderIcon from '$lib/icons/calender.svelte';
	import MoreIcon from '$lib/icons/more.svelte';

	export let post: PageMeta;
	export let tags: Array<string>;
	export let metadata: Record<string, any>;
</script>

<section class="mx-6 mt-5 post-item">
	<a href={pageRoute.getPostPath(post)} alt={metadata.title}>
		<header class="mb-3 post-header">
			<div class="flex items-center">
				<div class="icon-base w-4 h-4"><CalenderIcon /></div>
				<time class="flex self-center text-sm ml-1 created-date"
					>{getYYYYMMDD(metadata.created)}</time
				>
			</div>
		</header>

		<main class="flex flex-row mb-2 post-content">
			<div class="flex-1 context">
				<div class="letter-title-font font-bold ">
					<h2 class="post-title">
						{metadata.title}
					</h2>
				</div>

				<div class="hidden sm:inline-block summary">
					{#if metadata.excerpt}
						<p class="letter-content-font">
							{metadata.excerpt.length > 100
								? metadata.excerpt.slice(0, 100) + '...'
								: metadata.excerpt}
						</p>
					{/if}
				</div>

				<footer class="flex items-center my-3">
					<div class="flex items-center">
						<div class="flex post-tag-list">
							{#if tags}
								<div class="flex self-center mr-2 post-tag-item">
									<a href={pageRoute.getTagPath(tags[0])}>{tags[0]}</a>
								</div>
								{#each tags.slice(1, 5) as tag}
									<div class="hidden sm:flex self-center post-tag-item">
										<a href={pageRoute.getTagPath(tag)}>{tag}</a>
									</div>
								{/each}
							{/if}
						</div>
					</div>
					<div class="grow spacer" />

					{#if !metadata.thumbnail}
						<div class="mr-2 flex self-center more">
							<div class="icon-base w-6 h-6">
								<MoreIcon />
							</div>
						</div>
					{/if}
				</footer>
			</div>
			{#if metadata.thumbnail}
				<div class="min-w-20 ml-3 align-center thumbnail">
					<img src={metadata.thumbnail} class="object-cover thumbnail-pic" alt={metadata.title} />
					<p class="hidden">{metadata.title}</p>
				</div>
			{/if}
		</main>
	</a>
</section>
