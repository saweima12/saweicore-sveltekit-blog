import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { DirectoryClassifierResult, SourcePage } from 'markedpage';

import { classifiedSet } from 'markedpage';

export const GET: RequestHandler = async () => {
	// get all page list.
	const postSet: DirectoryClassifierResult = await classifiedSet('post');
	const rawList: Array<SourcePage> = postSet.pages.slice().sort((a, b) => {
		return new Date(b.frontMatter.created).getTime() - new Date(a.frontMatter.created).getTime();
	});

	return json({
		list: rawList
	});
};
