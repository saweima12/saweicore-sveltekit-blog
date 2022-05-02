import { getFormatedDate } from '$lib/helper';
import type { SourcePage } from 'markedpage';

// API PATH.
export const dataAPI = {
  getConfig: (): string => ("/api/config.json"),
  getPostList: (pageNum: number): string => (`/api/pages/${pageNum}.json`),
  getTagPageList: (tagName: string): string => (`/api/tags/${tagName}.json`),
  getPostData: (year:string, month:string, slugKey:string): string => {
    return `/api/posts/${year}/${month}/${slugKey}.json`
  }
}

export const pageRoute = {
  getHomePath: (): string => ("/"),
  getTagPath: (tagName: string): string => (`/tags/${tagName}`),
  getPostPath: (page: SourcePage) => {
    const dateObj = getFormatedDate(page.frontMatter.created);
    return `/posts/${dateObj.year}/${dateObj.month}/${page.slugKey}`;
  }
}

