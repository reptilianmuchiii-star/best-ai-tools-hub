import { getAllArticles } from '@/lib/articles';
import { getSiteConfig } from '@/lib/site';

export const revalidate = 3600;

function escapeXml(s: string) {
  return (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export async function GET() {
  const site = getSiteConfig();
  const articles = getAllArticles().slice(0, 50);
  const items = articles
    .map((a) => {
      const url = site.url + '/articles/' + a.slug;
      const pub = new Date(a.published_at || Date.now()).toUTCString();
      return [
        '<item>',
        '<title>' + escapeXml(a.seo_title) + '</title>',
        '<link>' + url + '</link>',
        '<guid isPermaLink="true">' + url + '</guid>',
        '<description>' + escapeXml(a.meta_description) + '</description>',
        '<category>' + escapeXml(a.category) + '</category>',
        '<pubDate>' + pub + '</pubDate>',
        '</item>',
      ].join('');
    })
    .join('');

  const xml =
    '<?xml version="1.0" encoding="UTF-8"?>' +
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">' +
    '<channel>' +
    '<title>' + escapeXml(site.name) + '</title>' +
    '<link>' + site.url + '</link>' +
    '<description>' + escapeXml(site.tagline) + '</description>' +
    '<language>en-us</language>' +
    '<atom:link href="' + site.url + '/feed.xml" rel="self" type="application/rss+xml" />' +
    items +
    '</channel></rss>';

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
