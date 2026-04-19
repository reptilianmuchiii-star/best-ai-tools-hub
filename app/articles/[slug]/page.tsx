import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getArticleBySlug, getArticleSlugs, getAllArticles } from '@/lib/articles';
import { getSiteConfig } from '@/lib/site';

export const revalidate = 3600;
export const dynamicParams = false;

export async function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);
  if (!article) return {};
  const site = getSiteConfig();
  const url = site.url + '/articles/' + article.slug;
  return {
    title: article.seo_title,
    description: article.meta_description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title: article.seo_title,
      description: article.meta_description,
      url,
      siteName: site.name,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.seo_title,
      description: article.meta_description,
    },
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();
  const site = getSiteConfig();
  const url = site.url + '/articles/' + article.slug;
  const all = getAllArticles().filter((a) => a.slug !== article.slug && a.category === article.category).slice(0, 4);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.seo_title,
    description: article.meta_description,
    datePublished: article.published_at,
    dateModified: article.published_at,
    author: { '@type': 'Organization', name: site.name },
    publisher: { '@type': 'Organization', name: site.name, url: site.url },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    articleSection: article.category,
  };

  return (
    <article className="max-w-3xl mx-auto px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav className="text-xs text-slate-500 mb-5">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        {' / '}
        <Link href="/articles" className="hover:text-blue-600">Articles</Link>
        {' / '}
        <span className="text-slate-600">{article.category}</span>
      </nav>
      <div className="text-xs uppercase tracking-wide text-slate-500 mb-1">{article.category}</div>
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-3">{article.seo_title}</h1>
      <p className="text-slate-600 mb-6">{article.meta_description}</p>
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: article.body_html }}
      />
      {all.length > 0 && (
        <section className="mt-14 border-t pt-8">
          <h2 className="text-xl font-bold mb-4">More in {article.category}</h2>
          <ul className="space-y-2">
            {all.map((a) => (
              <li key={a.slug}>
                <Link href={'/articles/' + a.slug} className="text-blue-600 hover:underline">
                  {a.seo_title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
