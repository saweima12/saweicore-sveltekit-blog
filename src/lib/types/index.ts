import type { SourcePage } from "markedpage";

export interface GroupListPair<Locals = Record<string, any>> {
  name: string,
  list: Array<Locals>
}

export interface NavItem {
  name: string,
  link: string,
  icon: string
}

export interface JournalResult {
  groups: Array<GroupListPair<SourcePage>>,
};

export interface PageResult {
  metadata: Record<string, any>,
  content: string
};

export interface PageListResult {
  list: Array<SourcePage>,
  maxPage: number,
  pageNum: number
}

export interface TagPageResult {
  name: string,
  list: Array<SourcePage>
}
