<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import type { PageResult } from '$lib/types';
	import { dataAPI } from '$lib/client';

	export const load: Load = async ({ fetch }) => {
		const api = dataAPI.getAboutData();
		const response = await fetch(api);
		const { metadata, content }: PageResult = await response.json();

		return {
			props: {
				metadata,
				content
			}
		};
	};
</script>

<script lang="ts">
import { siteConfig } from '$lib/store';
import { getTitleStr } from '$lib/client';

export let content: string;
export let metadata: Record<string,any>;
</script>

<svelte:head>
	<title>{metadata.title} | {getTitleStr($siteConfig)}</title>
</svelte:head>

<div class="my-10 about-page wrapper">
	<header class="mb-4 mx-6">
		<h1 class="font-bold letter-title-font post-title">
			{metadata.title}
		</h1>
	</header>
	<div class="content">
		{@html content}
	</div>
</div>

<style>
	.post-title {
		font-size: 32px;
	}

</style>