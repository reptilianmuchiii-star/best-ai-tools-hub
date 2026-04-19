import type { MetadataRoute } from 'next';
import { getAllArticles } from '@/lib/articles';
import { getSiteConfig } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const site = getSiteConfig();
  const base = site.url;
  const now = new Date().toISOString();
  const articles = getAllArticles();
  const articleEntries: MetadataRoute.Sitemap = articles.map((a) => ({
    url: base + '/articles/' + a.slug,
    lastModified: a.published_at || now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));
  return [
    { url: base, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: base + '/articles', lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: base + '/about', lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    ...articleEntries,
  ];
}
