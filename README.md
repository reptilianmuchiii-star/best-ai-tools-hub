# Best AI Tools Hub

Honest, in-depth comparisons of AI tools

This Next.js 14 site is auto-published by a Twin agent. Article content lives in `/content/<slug>.json`.

## Tech stack

- Next.js 14 App Router
- Tailwind CSS
- TypeScript
- Deployed on Vercel

## Content

Each article is a JSON file under `/content` with this shape:

```
{
  "slug": "best-ai-writing-tool-for-lawyers",
  "keyword": "best ai writing tool for lawyers",
  "seo_title": "...",
  "meta_description": "...",
  "body_html": "...",
  "category": "Legal",
  "published_at": "2026-04-19T12:00:00Z",
  "internal_links": [ { "title": "...", "slug": "..." } ],
  "tools_featured": [...]
}
```

## Environment variables

- `NEXT_PUBLIC_SITE_URL` — canonical base URL (e.g. https://best-ai-tools-hub.vercel.app)
- `AMAZON_ASSOCIATES_TAG` — optional, enables Amazon affiliate link substitution
- `ADSENSE_PUBLISHER_ID` — optional (ca-pub-XXXX...), enables AdSense script

## Indexing

- `/sitemap.xml` — auto-generated from content
- `/feed.xml` — RSS feed
- `/1d139c74384994a92f51e434d788573b.txt` — IndexNow verification key
