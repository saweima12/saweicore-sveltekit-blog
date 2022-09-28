export interface GroupListPair<Locals = Record<string, any>> {
	name: string;
	pageList: Array<Locals>;
}

export interface PageMeta extends Record<string, any> {
	metadata: Record<string, any>;
	slugKey: string;
}

export interface HeadingItem extends Record<string, any> {
	depth: string;
	text: string;
	id: string;
}

export interface JournalResult {
	groups: Array<GroupListPair<PageMeta>>;
}

export interface PageResult {
	metadata: Record<string, any>;
	content: string;
	headings?: Array<HeadingItem>;
}

export interface PageListResult {
	pageList: Array<PageMeta>;
	maxPage: number;
	pageNum: number;
}

export interface TagPageResult {
	name: string;
	pageList: Array<PageMeta>;
	maxPage: number;
	pageNum: number;
}
