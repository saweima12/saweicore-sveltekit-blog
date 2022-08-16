import type { PageLoad } from './$types';
import type { TagPageResult } from '$lib/types';
import { dataAPI } from '$lib/client';

export const load: PageLoad = async ({ params, fetch }) => {
	const { slug } = params;
	let apiUrl = dataAPI.getTagPageList(slug, 1);
	const response = await fetch(apiUrl);
	const { name, pageList, pageNum, maxPage }: TagPageResult = await response.json();
	// initialize all tagList page data.
	if (maxPage > 1) {
		for (let i = 2; i <= maxPage; i++) {
			apiUrl = dataAPI.getTagPageList(slug, i);
			await fetch(apiUrl);
		}
	}

	return {
		tagName: name,
		pageList: pageList,
		pageNum: pageNum,
		maxPage: maxPage
	};
};
