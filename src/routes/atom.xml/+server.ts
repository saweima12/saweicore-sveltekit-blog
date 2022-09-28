import type { RequestHandler } from '@sveltejs/kit';
import type { XMLBuilder } from 'xmlbuilder2/lib/interfaces';
import type { SourcePage, DirectoryClassifierResult } from 'markedpage';

import { minify } from 'html-minifier';
import { create } from 'xmlbuilder2';
import siteConfig from '$lib/site';
import { classifiedSet, type FrontMatterClassifierResult } from 'markedpage';

import { pageRoute } from '$lib/client/route';

// This can be false if you're using a fallback (i.e. SPA mode)
export const prerender = true;

export const GET: RequestHandler = async () => {
	// get config & pages.
	const postSet: DirectoryClassifierResult = await classifiedSet('post');
	const tagSet: FrontMatterClassifierResult = await classifiedSet('tag');

	// declare headers
	const headers = {
		'Cache-Control': 'max-age=0, s-maxage=3600',
		'Content-Type': 'application/xml'
	};

	const builder = create({ version: '1.0', encoding: 'UTF-8' })
		.ele('feed', { xmlns: 'http://www.w3.org/2005/Atom', 'xml:lang': 'zh' })
		.ele('title')
		.ele({ $: siteConfig.title })
		.up()
		.ele('subtitle')
		.ele({ $: siteConfig.summary })
		.up()
		.ele('id')
		.txt(siteConfig.url)
		.up()
		.ele('link', { href: siteConfig.url })
		.up()
		.ele('link', { href: `${siteConfig.url}/atom.xml`, rel: 'self', type: 'application/atom+xml' })
		.up()
		.ele('author')
		.ele('name')
		.txt(`${siteConfig.author.name}`)
		.up()
		.ele('email')
		.txt(`${siteConfig.author.email}`)
		.up()
		.ele('url')
		.txt(siteConfig.url)
		.up()
		.up()
		.ele('updated')
		.txt(new Date().toISOString())
		.up();

	// generate category & entry
	const tags = Object.keys(tagSet);
	await generateCategory(tags, siteConfig, builder);
	await generateEntry(postSet.pages.slice(), siteConfig, builder);

	const xml = builder.end({ prettyPrint: true });

	return new Response(xml, {
		headers: headers
	});
};

const generateCategory = async (
	tags: Array<string>,
	config: Record<string, any>,
	builder: XMLBuilder
) => {
	await Promise.all(
		tags.map(async (term: string) => {
			const tagUrl = `${config.url}${pageRoute.getTagPath(term)}`;
			builder.ele('category', { term: term, scheme: tagUrl });
		})
	);
};

// generate client page route entry.
const generateEntry = async (
	pages: Array<SourcePage>,
	config: Record<string, any>,
	builder: XMLBuilder
) => {
	await Promise.all(
		pages
			.slice()
			.sort(
				(a, b) =>
					new Date(b.frontMatter.created).getTime() - new Date(a.frontMatter.created).getTime()
			)
			.slice(0, 500)
			.map(async (page, index) => {
				// deinfe pageMeta struct.
				const pageMeta = {
					metadata: page.frontMatter,
					slugKey: page.slugKey
				};
				// get post url.
				const postPath = pageRoute.getPostPath(pageMeta);
				const lastmod = new Date(page.frontMatter.created).toISOString();
				const postUrl = `${config.url}${postPath}`;
				const content = await page.render();
				const tags = page.frontMatter.tags;

				// generate struct.
				let entry = builder
					.ele('entry')
					.ele('title')
					.ele({ $: page.frontMatter.title })
					.up()
					.ele('id')
					.txt(postUrl)
					.up()
					.ele('link', { href: postUrl })
					.up()
					.ele('published')
					.txt(lastmod)
					.up()
					.ele('updated')
					.txt(lastmod)
					.up()
					.ele('summary', { type: 'text' })
					.ele({ $: page.frontMatter.excerpt })
					.up()
					.ele('content', { type: 'html' })
					.ele({ $: minify(content, { trimCustomFragments: true, collapseWhitespace: true }) })
					.up();

				// generate category
				tags.map((term: string) => {
					const tagUrl = `${config.url}${pageRoute.getTagPath(term)}`;
					entry.ele('category', { term: term, scheme: tagUrl }).up();
				});
			})
	);

	return builder;
};
