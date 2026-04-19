import fs from 'fs';
import path from 'path';

export type Article = {
  slug: string;
  keyword: string;
  seo_title: string;
  meta_description: string;
  body_html: string;
  tools_featured: any[];
  internal_links: Array<{ title: string; slug: string }>;
  category: string;
  published_at: string;
  word_count?: number;
};

const contentDir = path.join(process.cwd(), 'content');

export function getAllArticles(): Article[] {
  if (!fs.existsSync(contentDir)) return [];
  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith('.json'));
  const articles: Article[] = files.map((f) => {
    const raw = fs.readFileSync(path.join(contentDir, f), 'utf8');
    return JSON.parse(raw) as Article;
  });
  articles.sort((a, b) => (b.published_at || '').localeCompare(a.published_at || ''));
  return articles;
}

export function getArticleBySlug(slug: string): Article | null {
  const file = path.join(contentDir, slug + '.json');
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, 'utf8')) as Article;
}

export function getArticleSlugs(): string[] {
  if (!fs.existsSync(contentDir)) return [];
  return fs.readdirSync(contentDir).filter((f) => f.endsWith('.json')).map((f) => f.replace(/\.json$/, ''));
}

export function groupByCategory(articles: Article[]): Record<string, Article[]> {
  const out: Record<string, Article[]> = {};
  for (const a of articles) {
    const c = a.category || 'General';
    if (!out[c]) out[c] = [];
    out[c].push(a);
  }
  return out;
}
