<script lang="ts">
	import textstr from '$lib/textstr';
	import { siteConfig } from '$lib/store';
	import { getTitleStr } from '$lib/client';
	import JournalList from '$lib/components/article/journallist.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const textlang: Record<string, any> = textstr.journal;

	$: ( { groups } = data);
</script>

<svelte:head>
	<title>{textlang.title} - {getTitleStr($siteConfig)}</title>
</svelte:head>

<div class="mt-8 wrapper journal-page">
	<div class="journel-container pt-2">
		
			<JournalList {groups} />
	</div>
</div>
