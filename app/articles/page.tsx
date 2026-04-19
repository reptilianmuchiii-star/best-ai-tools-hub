import Link from 'next/link';
import { getAllArticles, groupByCategory } from '@/lib/articles';

export const revalidate = 3600;

export const metadata = {
  title: 'All articles',
  description: 'Browse all AI tool comparison articles.',
};

export default function ArticlesIndex() {
  const articles = getAllArticles();
  const byCat = groupByCategory(articles);
  const categories = Object.keys(byCat).sort();
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">All articles</h1>
      {categories.length === 0 && <p className="text-slate-500">No articles yet.</p>}
      {categories.map((cat) => (
        <section key={cat} className="mb-10">
          <h2 className="text-xl font-bold mb-3">{cat}</h2>
          <ul className="divide-y border rounded-lg">
            {byCat[cat].map((a) => (
              <li key={a.slug} className="p-4 hover:bg-slate-50">
                <Link href={'/articles/' + a.slug} className="block">
                  <div className="font-medium">{a.seo_title}</div>
                  <div className="text-sm text-slate-500 line-clamp-2 mt-1">{a.meta_description}</div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
