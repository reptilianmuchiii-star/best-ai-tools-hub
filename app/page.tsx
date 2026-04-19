import Link from 'next/link';
import { getAllArticles, groupByCategory } from '@/lib/articles';
import { getSiteConfig } from '@/lib/site';

export const revalidate = 3600;

export default function HomePage() {
  const site = getSiteConfig();
  const articles = getAllArticles();
  const byCat = groupByCategory(articles);
  const categories = Object.keys(byCat).sort();
  const latest = articles.slice(0, 6);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <section className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight">{site.name}</h1>
        <p className="text-lg text-slate-600 mt-3">{site.tagline}</p>
      </section>

      {latest.length > 0 && (
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-5">Latest articles</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {latest.map((a) => (
              <Link
                key={a.slug}
                href={'/articles/' + a.slug}
                className="block border rounded-lg p-5 hover:border-blue-500 transition"
              >
                <div className="text-xs text-slate-500 uppercase tracking-wide">{a.category}</div>
                <h3 className="text-lg font-semibold mt-1 mb-2">{a.seo_title}</h3>
                <p className="text-sm text-slate-600 line-clamp-3">{a.meta_description}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {categories.map((cat) => (
        <section key={cat} className="mb-10">
          <h2 className="text-xl font-bold mb-3 flex items-center justify-between">
            <span>{cat}</span>
            <span className="text-sm font-normal text-slate-500">{byCat[cat].length}</span>
          </h2>
          <ul className="divide-y border rounded-lg">
            {byCat[cat].map((a) => (
              <li key={a.slug} className="p-4 hover:bg-slate-50">
                <Link href={'/articles/' + a.slug} className="block">
                  <div className="font-medium">{a.seo_title}</div>
                  <div className="text-sm text-slate-500 line-clamp-1">{a.meta_description}</div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}

      {articles.length === 0 && (
        <section className="border rounded-lg p-10 text-center text-slate-500">
          <p>No articles published yet. Check back soon.</p>
        </section>
      )}
    </div>
  );
}
