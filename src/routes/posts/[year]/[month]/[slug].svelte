<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import type { PageResult } from '$lib/types';
	import { dataAPI } from '$lib/client';

	export const load: Load = async ({ params, fetch }) => {
		const { year, month, slug } = params;
		const apiUrl = dataAPI.getPostData(year, month, slug);
		const response = await fetch(apiUrl);
		const { metadata, content }: PageResult = await response.json();
		return {
			props: {
				metadata: metadata,
				content: content
			}
		};
	};
</script>

<script lang="ts">
	import { siteConfig } from '$lib/store';
	import { getYYYYMMDD, getTitleStr } from '$lib/client';
	import CalenderIcon from '$lib/icons/calender.svelte';

	export let metadata: Record<string, any>;
	export let content: string;
</script>

<svelte:head>
	<title>{metadata.title} | {getTitleStr($siteConfig)}</title>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.28.0/prism.min.js"/>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.28.0/themes/prism-coy.min.css">
</svelte:head>

<div class="my-10 post-page wrapper">
	<div class="post-container">
		<header class="mx-6 mb-4">
			<h1 class="font-bold letter-title-font post-title">
				{metadata.title}
			</h1>
			<div class="flex flex-row items-center mt-2 created-date">
				<div class="icon-base w-5"><CalenderIcon /></div>
				<time class="flex self-center ml-2">{getYYYYMMDD(metadata.created)}</time>
			</div>
		</header>

		<article class="content">
			{@html content}
		</article>
	</div>
</div>
