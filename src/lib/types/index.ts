import type { SourcePage } from "markedpage";

export interface GroupListPair<Locals = Record<string, any>> {
  name: string,
  list: Array<Locals>
}

export interface JournalResult {
  groups: Array<GroupListPair<SourcePage>>,
};

export interface PageResult {
  metadata: Record<string, any>,
  content: string
};

export interface PageListResult {
  list: Array<SourcePage>
}

export interface TagPageResult {
  name: string,
  list: Array<SourcePage>
}
