import type { PageLoad } from './$types';
import { dataAPI } from '$lib/client';
import type { PageListResult } from '$lib/types';

export const load: PageLoad = async ({ fetch }) => {
	let apiUrl = dataAPI.getPostList(1);
	let response = await fetch(apiUrl);
	const { pageList, maxPage, pageNum }: PageListResult = await response.json();
	// intialize all postlist page.
	if (maxPage > 1) {
		for (let i = 2; i <= maxPage; i++) {
			apiUrl = dataAPI.getPostList(i);
			await fetch(apiUrl);
		}
	}

	return {
		pageList,
		maxPage,
		pageNum,
	};
};
