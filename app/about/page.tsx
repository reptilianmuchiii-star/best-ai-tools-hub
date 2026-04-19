import { getSiteConfig } from '@/lib/site';

export const metadata = {
  title: 'About',
  description: 'About this site.',
};

export default function AboutPage() {
  const site = getSiteConfig();
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 prose">
      <h1>About {site.name}</h1>
      <p>{site.tagline}</p>
      <p>
        This site publishes in-depth, continuously updated comparisons of AI tools and software —
        evaluating features, pricing, and real-world fit for specific use cases.
      </p>
      <h2>Affiliate disclosure</h2>
      <p>
        Some links on this site are affiliate links, which means we may earn a small commission if
        you click through and purchase — at no extra cost to you. We only recommend tools we believe
        deliver real value.
      </p>
    </div>
  );
}
