import { json } from '@sveltejs/kit';
import { classifiedSet } from 'markedpage';
import type { SourcePage, FrontMatterClassifierResult } from 'markedpage';

import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	// GET: tag list.
	const tagSet: FrontMatterClassifierResult = await classifiedSet('tag');
	// GET: page list count.
	let tagList: Array<Record<string, any>>;

	tagList = Object.entries(tagSet)
		.map(([tagName, postList]) => {
      // Get lastUpdate post data.
      let lastUpdated = postList.reduce((prev: number | Date, current: SourcePage) => {
        let prevDate: Date = new Date(prev);
        let currentDate: Date = new Date(current.frontMatter.created);
        return (prevDate.getTime() > currentDate.getTime()) ? prev : currentDate;
      }, 0);

        return {name: tagName, count: postList.length, updated: lastUpdated};
    }).sort((a, b) => {
        const dateOffset = new Date(b.updated).getTime() - new Date(a.updated).getTime();
        return  dateOffset ? dateOffset : b.count - a.count;
    })

	return json({
		tagList: tagList
	});
};
