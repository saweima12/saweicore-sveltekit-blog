<script lang="ts">
	import type { PageData } from './$types';
	import textstr from '$lib/textstr';
	import siteConfig  from '$lib/site';
	import { getTitleStr } from '$lib/client';
	// import components.
	import JournalList from '$lib/components/article/journallist.svelte';

	export let data: PageData;
	const textlang: Record<string, any> = textstr.journal;

	$: ( { groups } = data);
</script>

<svelte:head>
	<title>{textlang.title} - {getTitleStr(siteConfig)}</title>
</svelte:head>

<div class="mt-8 wrapper journal-page">
	<div class="journel-container pt-2">
		
			<JournalList {groups} />
	</div>
</div>
