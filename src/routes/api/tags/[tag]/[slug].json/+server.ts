import { json } from '@sveltejs/kit';
import { classifiedSet } from 'markedpage';
import siteConfig from '$lib/site';
import type { SourcePage, FrontMatterClassifierResult } from 'markedpage';

import type { PageMeta } from '$lib/types';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params }) => {
	//  get params
	let { tag, slug } = params;

	if (!tag || !slug) {
		return json({});
	}

	const pageNum = Number(slug);
	// load config.
	const maxPerPage = siteConfig.pagination.maxPerPage;
	// GET: tag list.
	const tagSetMap: FrontMatterClassifierResult = await classifiedSet('tag');
	const tagSet = tagSetMap[tag] || [];

	// rearrange sourcePage to PageMeta.
	let sortList: Array<PageMeta> = tagSet
		.slice()
		.map((page) => ({ metadata: page.frontMatter, slugKey: page.slugKey }))
		.sort((a, b) => {
			return new Date(b.metadata.created).getTime() - new Date(a.metadata.created).getTime();
		});

	const maxPage = Math.ceil(sortList.length / maxPerPage);
	let list: Array<PageMeta> = [];
	if (pageNum <= maxPage) {
		let startIndex = (pageNum - 1) * maxPerPage;
		let endIndex = pageNum * maxPerPage;
		list = sortList.slice(startIndex, endIndex);
	}

	return json({
		name: params.tag,
		pageList: list,
		maxPage: maxPage,
		pageNum: pageNum
	});
};
