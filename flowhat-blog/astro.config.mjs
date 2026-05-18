// @ts-check

import fs from 'node:fs';
import path from 'node:path';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

const siteUrl = 'https://flowhat-blog.pages.dev';
const blogContentDir = path.resolve('./src/content/blog');

function readBlogSitemapMetadata() {
	const byUrl = new Map();
	const byBaseSlug = new Map();
	if (!fs.existsSync(blogContentDir)) return { byUrl, byBaseSlug };

	for (const fileName of fs.readdirSync(blogContentDir)) {
		if (!fileName.endsWith('.md') && !fileName.endsWith('.mdx')) continue;
		const source = fs.readFileSync(path.join(blogContentDir, fileName), 'utf8');
		const frontmatter = source.match(/^---\n([\s\S]*?)\n---/);
		if (!frontmatter) continue;
		const get = (key) => frontmatter[1].match(new RegExp(`^${key}:\\s*['\"]?([^'\"\\n]+)['\"]?`, 'm'))?.[1]?.trim();
		const lang = get('lang') ?? 'en';
		const baseSlug = get('baseSlug');
		const updatedDate = get('updatedDate') ?? get('pubDate');
		if (!baseSlug) continue;

		const suffix = lang === 'en' ? '' : `${lang}/`;
		const url = `${siteUrl}/blog/${baseSlug}/${suffix}`;
		const entry = { lang, url, updatedDate };
		byUrl.set(url, entry);
		if (!byBaseSlug.has(baseSlug)) byBaseSlug.set(baseSlug, []);
		byBaseSlug.get(baseSlug).push(entry);
	}

	return { byUrl, byBaseSlug };
}

function serializeSitemapItem(item) {
	const { byUrl, byBaseSlug } = readBlogSitemapMetadata();
	const blogEntry = byUrl.get(item.url);
	if (blogEntry?.updatedDate) {
		item.lastmod = new Date(`${blogEntry.updatedDate}T00:00:00.000Z`);
	}

	const baseSlug = item.url.match(/\/blog\/([^/]+)\/(?:ko\/|zh\/)?$/)?.[1];
	if (baseSlug && byBaseSlug.has(baseSlug)) {
		const siblings = byBaseSlug.get(baseSlug).sort((a, b) => a.lang.localeCompare(b.lang));
		item.links = siblings.map((sibling) => ({ lang: sibling.lang, url: sibling.url }));
		const english = siblings.find((sibling) => sibling.lang === 'en');
		if (english) item.links.push({ lang: 'x-default', url: english.url });
	}

	return item;
}

// https://astro.build/config
export default defineConfig({
	site: siteUrl,
	integrations: [mdx(), sitemap({ serialize: serializeSitemapItem })],
	fonts: [
		{
			provider: fontProviders.local(),
			name: 'Atkinson',
			cssVariable: '--font-atkinson',
			fallbacks: ['sans-serif'],
			options: {
				variants: [
					{
						src: ['./src/assets/fonts/atkinson-regular.woff'],
						weight: 400,
						style: 'normal',
						display: 'swap',
					},
					{
						src: ['./src/assets/fonts/atkinson-bold.woff'],
						weight: 700,
						style: 'normal',
						display: 'swap',
					},
				],
			},
		},
	],
});
