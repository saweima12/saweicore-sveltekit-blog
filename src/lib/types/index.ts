export type {
	PageResult,
	PageListResult,
	JournalResult,
	TagPageResult,
	GroupListPair,
	PageMeta
} from './response';

export interface NavItem {
	name: string;
	link: string;
	id: string;
}

export interface TabItem {
	label: string;
	component: any;
}

export interface TagItem {
	name: string;
	count: number;
}
