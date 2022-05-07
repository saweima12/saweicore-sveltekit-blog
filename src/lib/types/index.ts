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

export interface TabItem extends Record<string, any> {
  id: string;
	label: string;
  link: string
}

export interface TagItem {
	name: string;
  updated: string | Date;
	count: number;
}
