import Link from 'next/link';
export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center">
      <h1 className="text-3xl font-bold mb-3">Page not found</h1>
      <p className="text-slate-600 mb-6">The article you were looking for doesn't exist or has been moved.</p>
      <Link href="/" className="text-blue-600 hover:underline">Go home</Link>
    </div>
  );
}
