export type SiteConfig = { name: string; tagline: string; url: string; twitter?: string };

export function getSiteConfig(): SiteConfig {
  const url = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  return {
    name: 'Best AI Tools Hub',
    tagline: 'Honest, in-depth comparisons of AI tools',
    url: url.replace(/\/$/, ''),
  };
}
