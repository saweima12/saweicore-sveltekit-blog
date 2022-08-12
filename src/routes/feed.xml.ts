import type { DirectoryClassifierResult, SourcePage } from 'markedpage';
import type { RequestHandler } from '@sveltejs/kit';

import { siteConfig, classifiedSet } from 'markedpage';
import { create } from 'xmlbuilder2';
import type { XMLBuilder } from 'xmlbuilder2/lib/interfaces';
import { pageRoute } from '$lib/client';


export const GET: RequestHandler = async () => {
  // get data source.
  const config = await siteConfig();
  const postSet: DirectoryClassifierResult = await classifiedSet("post");

  // declare headers
  const headers = {
    'Cache-Control': 'max-age=0, s-maxage=3600',
    'Content-Type': 'application/xml',
  }

  // define xml struct.
  const builder = create({version:"1.0", encoding: "UTF-8"})
    .ele("rss", {"version": "2.0", "xmlns:atom": "http://www.w3.org/2005/Atom" })
    .ele("channel")
      .ele("title").txt(config.title).up()
      .ele("link").txt(config.url).up()
      .ele("description").txt(config.description).up()
      .ele("lastBuildDate").txt(new Date().toUTCString()).up()

  // generate post feed.
  await generateItems(postSet.pages, config, builder)

  // add atom:xml self
  builder.ele("atom:link", { rel: "self", href: `${config.url}/feed.xml`, type: "application/rss+xml"}).up()

  const xml = builder.end({ prettyPrint: true })
  return {
    headers: headers,
    body: xml
  }
}


const generateItems = (pages: Array<SourcePage>, config: Record<string, any>, builder: XMLBuilder) => {
  pages.slice().sort((a, b) => new Date(b.frontMatter.created).getTime() - new Date(a.frontMatter.created).getTime())
  .map((page: SourcePage) => {
    const pageMeta = {
      metadata: page.frontMatter,
      slugKey: page.slugKey
    };
    const postPath = pageRoute.getPostPath(pageMeta);
    const postUrl = `${config.url}${postPath}`;
    const pubDate = new Date(page.frontMatter.created).toUTCString();
    const tags: Array<string> = page.frontMatter.tags || [];


    const item = builder.ele("item")
      .ele("title").txt(page.frontMatter.title).up()
      .ele("link").txt(postUrl).up()
      .ele("pubDate").txt(pubDate).up()
      .ele("description").txt(page.frontMatter.excerpt).up()
      .ele("guid").txt(postUrl).up()
      .ele("author").txt(`${config.author.email}( ${config.author.name} )`).up()

    tags.map(tagName => {
      const tagPath = pageRoute.getTagPath(tagName);
      const tagUrl = `${config.url}${tagPath}`
      item.ele("category", {"domain": tagUrl}).txt(tagName).up();
    });
  })
}
