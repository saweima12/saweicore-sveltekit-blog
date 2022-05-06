import { classifiedSet } from 'markedpage';
import type { SourcePage, FrontMatterClassifierResult } from 'markedpage';

import type { RequestHandler } from '@sveltejs/kit';
import Postlist from '$lib/components/article/postlist.svelte';

export const get: RequestHandler = async () => {
	// Get: tag list.
	const tagSet: FrontMatterClassifierResult = await classifiedSet('tag');
	// Get: page list count.
	let tagCountList: Array<Record<string, any>>;

	tagCountList = Object.entries(tagSet)
		.map(([tagName, postList]) => ({ name: tagName, count: postList.length }))
		.sort((a, b) => b.count - a.count);

	return {
		body: {
			tagList: tagCountList
		}
	};
};
