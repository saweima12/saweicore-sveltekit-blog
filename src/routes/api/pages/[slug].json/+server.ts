import { json } from '@sveltejs/kit';
import siteConfig from '$lib/site';
import type { RequestHandler } from '@sveltejs/kit';
import type { DirectoryClassifierResult } from 'markedpage';
import type { PageMeta } from '$lib/types';

import { classifiedSet } from 'markedpage';

export const GET: RequestHandler = async ({ params }) => {
	// get url params
	const { slug } = params;
	const pageNum = Number(slug);
	// get config params.
	const maxPerPage = siteConfig.pagination.maxPerPage;
	// get all page list.
	const postSet: DirectoryClassifierResult = await classifiedSet('post');
	const rawList: Array<PageMeta> = postSet.pages
		.slice()
		.map((page) => ({ metadata: page.frontMatter, slugKey: page.slugKey }))
		.sort((a, b) => {
			return new Date(b.metadata.created).getTime() - new Date(a.metadata.created).getTime();
		});

	let postList: Array<PageMeta> = [];
	const maxPage = Math.ceil(rawList.length / maxPerPage);
	if (pageNum <= maxPage) {
		let startIndex = (pageNum - 1) * maxPerPage;
		let endIndex = pageNum * maxPerPage;
		postList = rawList.slice(startIndex, endIndex);
	}

	return json({
		pageList: postList,
		maxPage: maxPage,
		pageNum: pageNum
	});
};
