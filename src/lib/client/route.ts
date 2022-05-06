import { getFormatedDate } from '$lib/helper';
import type { PageMeta } from '$lib/types';
import type { SourcePage } from 'markedpage';

// API PATH.
export const dataAPI = {
	getConfig: (): string => '/api/config.json',
	getIcon: (): string => '/api/icon.json',
	getAboutData: (): string => '/api/about.json',
	getJournalData: (): string => '/api/journal.json',
	getTagList: (): string => '/api/tags.json',
	getPostList: (pageNum: number): string => `/api/pages/${pageNum}.json`,
	getTagPageList: (tagName: string, pageNum: number): string => {
		return `/api/tags/${tagName}/${pageNum}.json`;
	},
	getPostData: (year: string, month: string, slugKey: string): string => {
		return `/api/posts/${year}/${month}/${slugKey}.json`;
	}
};

export const pageRoute = {
	getHomePath: (): string => '/',
	getTagPath: (tagName: string): string => `/tags/${tagName}`,
	getPostPath: (page: PageMeta) => {
		const dateObj = getFormatedDate(page.metadata.created);
		return `/posts/${dateObj.year}/${dateObj.month}/${page.slugKey}`;
	}
};
