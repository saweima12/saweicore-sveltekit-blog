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

export interface SerarchItem {
  title: string;
  tags?: Array<string>;
  excerpt?: string;
  permalink?: string;
  objectID: string;
  headings?: Array<Record<string, any>>;
  _highlightResult?: Record<string, any> | any;
}


export interface MatchItem<Locals = Record<string, any>> extends Record<string, any> {
  field?: string;
  attach?: Locals | Record<string,any> | any;
  value?: any;
  link?: string;
}
