import type { PageLoad } from './$types';
import type { PageResult } from '$lib/types';
import { dataAPI } from '$lib/client';


export const load: PageLoad = async ({ params, fetch }) => {
	const { year, month, slug } = params;
	const apiUrl = dataAPI.getPostData(year, month, slug);
	const response = await fetch(apiUrl);
	const { metadata, content, headings }: PageResult = await response.json();

	const pageMeta = { metadata: metadata, slugKey: slug };

	return {
    metadata: metadata,
    content: content,
    pageMeta: pageMeta,
    headings: headings
	};
};
