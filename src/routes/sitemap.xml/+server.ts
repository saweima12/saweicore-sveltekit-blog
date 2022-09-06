import type { RequestHandler } from './$types';
import type { SourcePage, DirectoryClassifierResult } from 'markedpage';
import type { XMLBuilder } from 'xmlbuilder2/lib/interfaces';

import { create } from 'xmlbuilder2';
import { siteConfig, classifiedSet, type FrontMatterClassifierResult} from 'markedpage';

import { pageRoute } from '$lib/client/route';

// This can be false if you're using a fallback (i.e. SPA mode)
export const prerender = true;


export const GET: RequestHandler = async () => {
  // get config & pages.
  const config = await siteConfig();
  const tagSet: FrontMatterClassifierResult = await classifiedSet("tag");
  const postSet: DirectoryClassifierResult = await classifiedSet("post");


  // declare headers
  const headers = {
    'Cache-Control': 'max-age=0, s-maxage=3600',
    'Content-Type': 'application/xml',
  }

  const builder = create({ version: '1.0', encoding: "UTF-8"})
    .ele("urlset", { xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9"})
      .ele("url")
        .ele("loc").txt(config.url).up()
        .ele("lastmod").txt(new Date().toISOString()).up()
      .up()

  // generate tag & post url.
  const tags = Object.keys(tagSet);
  const posts = postSet.pages.slice();

  generateTagUrl(tags, config.url, builder);
  generatePostUrl(posts, config.url, builder);

  // generate xml.
  const xml = builder.end({ prettyPrint: true});

  return new Response(xml, {
    headers:headers
  });
}

const generateTagUrl = (tags: Array<string>, siteUrl:string, builder: XMLBuilder) => {
  tags.map(term => {
    const tagUrl = `${siteUrl}${pageRoute.getTagPath(term)}`;
    builder.ele("url")
      .ele("loc").txt(tagUrl).up()
      .ele("priority").txt("0.4").up()
  });
}

// generate client page route.
const generatePostUrl = (pages: Array<SourcePage>, siteUrl: string, builder: XMLBuilder) => {
  let result = ``;

  pages.map((page, index) => {
    // deinfe pageMeta struct.
    const pageMeta = {
      metadata: page.frontMatter,
      slugKey: page.slugKey
    }
    // get post url.
    const postPath = pageRoute.getPostPath(pageMeta);
    const lastmod = new Date(page.frontMatter.created).toISOString();
    const priority = index < 10 ? 0.7 : 0.5;
    const postUrl = `${siteUrl}${postPath}`;

    builder.ele("url")
      .ele("loc").txt(postUrl).up()
      .ele("lastmod").txt(lastmod).up()
      .ele("priority").txt(priority.toString()).up()
  });
}
