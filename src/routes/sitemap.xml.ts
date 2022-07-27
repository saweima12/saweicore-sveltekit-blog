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
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>${ config.url }</loc>
      <changefreq>weekly</changefreq>
      <priority>0.5</priority>
    </url>`;

  const tail = `</urlset>`

  const content = pageXML(postSet.pages, config.url);


  return {
    headers: headers,
    body: head + content + tail
  }
}

// generate client page route.
const pageXML = (pages: Array<SourcePage>, siteUrl: string) => {
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

    result = `
      <url>
          <loc>${siteUrl}${postPath}</loc>
          <lastmod>${lastmod}</lastmod>
          <priority>${priority}</priority>
      </url>
    `});

  return result;
}
