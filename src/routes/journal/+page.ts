import type { PageLoad } from './$types';
import type { JournalResult } from '$lib/types';
import { dataAPI } from '$lib/client';

export const load: PageLoad = async ({ fetch }) => {
	const api = dataAPI.getJournalData();
	const response = await fetch(api);
	const { groups }: JournalResult = await response.json();

	return {
		groups
	};
};
