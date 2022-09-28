<script lang="ts">
	import type { PageData } from './$types';
	import siteConfig from '$lib/site';
	import { getTitleStr } from '$lib/client';
	import Comment from '$lib/components/common/comment.svelte';

	export let data: PageData;
	$: ({ content, metadata } = data);
</script>

<svelte:head>
	<title>{metadata.title} - {getTitleStr(siteConfig)}</title>
	<meta property="og:title" content={metadata.title} />
	<meta property="og:site_name" content={getTitleStr(siteConfig)} />
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
	<div class="px-4 comment">
		<Comment />
	</div>
</div>

<style>
	.post-title {
		font-size: 32px;
	}
</style>
