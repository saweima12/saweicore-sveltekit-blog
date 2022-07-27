import type { RequestHandler } from '@sveltejs/kit';
import { siteConfig, classifiedSet} from 'markedpage';
import type { SourcePage, DirectoryClassifierResult } from 'markedpage';

import { pageRoute } from '$lib/client/route';

export const GET: RequestHandler = async () => {
  // get config & pages.
  const config = await siteConfig();
  const postSet: DirectoryClassifierResult = await classifiedSet("post");

  // declare headers
  const headers = {
    'Cache-Control': 'max-age=0, s-maxage=3600',
    'Content-Type': 'application/xml',
  }

  // combine page xml data.
  const head = `<?xml version="1.0" encoding="UTF-8"?>
    <feed xmlns="http://www.w3.org/2005/Atom" xml:lang="zh">
      <title>${config.title}</title>
      <id>${config.url}</id>
      <link href="${config.url}"/>
      <description>${config.description}</description>
      <updated>${new Date().toISOString()}</updated>
  `
  const tail = `</feed>`

  const content = await pageXML(postSet.pages, config.url);

  return {
    headers: headers,
    body: head + content + tail
  }
}

// generate client page route.
const pageXML = async (pages: Array<SourcePage>, siteUrl: string) => {
  let result = ``;

  await Promise.all(pages
    .sort((a, b) => new Date(b.frontMatter.created).getTime() - new Date(a.frontMatter.created).getTime())
    .map(async (page, index) => {
    // deinfe pageMeta struct.
    const pageMeta = {
      metadata: page.frontMatter,
      slugKey: page.slugKey
    }
    // get post url.
    const postPath = pageRoute.getPostPath(pageMeta);
    const lastmod = new Date(page.frontMatter.created).toISOString();
    const postUrl = `${siteUrl}${postPath}`;

    const content = await page.render();

    result += `
      <entry>
          <title>${page.frontMatter.title}</title>
          <link href="${postUrl}" />
          <id>${postUrl}</id>
          <published>${lastmod}</published>
          <updated>${lastmod}</updated>
          <summary type="text">${page.frontMatter.excerpt}</summary>
      </entry>
    `}));

  return result;
}
