import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getSiteConfig } from '@/lib/site';

const site = getSiteConfig();

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name + ' — ' + site.tagline,
    template: '%s · ' + site.name,
  },
  description: site.tagline,
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: site.name,
    description: site.tagline,
    url: site.url,
  },
  twitter: {
    card: 'summary_large_image',
    title: site.name,
    description: site.tagline,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pubId = process.env.ADSENSE_PUBLISHER_ID;
  return (
    <html lang="en">
      <head>
        {pubId && pubId.startsWith('ca-pub-') ? (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pubId}`}
            crossOrigin="anonymous"
          />
        ) : null}
      </head>
      <body className="min-h-screen flex flex-col">
        <header className="border-b bg-white sticky top-0 z-10">
          <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="font-bold text-lg tracking-tight">{site.name}</Link>
            <nav className="flex gap-5 text-sm">
              <Link href="/" className="hover:text-blue-600">Home</Link>
              <Link href="/articles" className="hover:text-blue-600">All articles</Link>
              <Link href="/about" className="hover:text-blue-600">About</Link>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t mt-16 py-8 text-sm text-slate-500">
          <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row justify-between gap-3">
            <div>© {new Date().getFullYear()} {site.name}. All rights reserved.</div>
            <div className="flex gap-4">
              <Link href="/sitemap.xml" className="hover:text-blue-600">Sitemap</Link>
              <Link href="/feed.xml" className="hover:text-blue-600">RSS</Link>
              <Link href="/about" className="hover:text-blue-600">About</Link>
            </div>
          </div>
          <div className="max-w-5xl mx-auto px-4 mt-3 text-xs">
            Some links on this site are affiliate links. We may earn a commission at no extra cost to you.
          </div>
        </footer>
      </body>
    </html>
  );
}
