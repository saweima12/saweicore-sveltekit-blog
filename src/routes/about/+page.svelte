<script lang="ts">
import { siteConfig } from '$lib/store';
import { getTitleStr } from '$lib/client';

import type { PageData } from './$types';

export let data: PageData;
console.log(data)
$: ({content, metadata} = data);

</script>

<svelte:head>
	<title>{metadata.title} - {getTitleStr($siteConfig)}</title>
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