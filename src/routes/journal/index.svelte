<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import type { JournalResult, GroupListPair, PageMeta } from '$lib/types';
	import { dataAPI } from '$lib/client';

	export const load: Load = async ({ fetch }) => {
		const api = dataAPI.getJournalData();
		const response = await fetch(api);
		const { groups }: JournalResult = await response.json();

		return {
			props: {
				groups
			}
		};
	};
</script>

<script lang="ts">
	import { siteConfig } from '$lib/store';
	import { getTitleStr } from '$lib/client';
	import JournalList from '$lib/components/article/journallist.svelte';

	const textlang: Record<string, any> = $siteConfig.textlang.journal;

	export let groups: Array<GroupListPair<PageMeta>>;
</script>

<svelte:head>
	<title>{textlang.title} - {getTitleStr($siteConfig)}</title>
</svelte:head>

<div class="mt-8 wrapper journal-page">
	<div class="journel-container pt-2">
		
			<JournalList {groups} />
	</div>
</div>
