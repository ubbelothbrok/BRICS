import { useState, useEffect } from 'react';
import { fetchApi } from '../utils/api';

interface NewsItem {
  id?: number;
  _id?: string;
  title: string;
  date: string;
  summary: string;
  image?: string;
  category?: string;
  featured?: boolean;
}

export default function News() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const data = await fetchApi('/news');
        // If data is empty, use some defaults or handle accordingly
        setNews(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadNews();
  }, []);

  if (loading) return (
    <div className="py-24 text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brics-blue mx-auto"></div>
      <p className="mt-4 text-gray-600">Loading latest news...</p>
    </div>
  );

  if (error) return (
    <div className="py-24 text-center text-red-600">
      <p>Error loading news: {error}</p>
    </div>
  );

  const featured = news.find(n => n.featured) || news[0];
  const others = news.filter(n => n !== featured);

  return (
    <section id="news" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-[var(--color-brics-blue)] font-semibold tracking-wide uppercase text-sm">Latest Updates</span>
            <h2 className="mt-2 text-4xl font-bold text-[var(--color-brics-dark)]">News & Documents</h2>
          </div>
          <button className="hidden md:flex items-center gap-2 text-[var(--color-brics-blue)] font-semibold hover:text-blue-800 transition-colors">
            View All News
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Featured News */}
          {featured && (
            <article className="group cursor-pointer">
              <div className="relative h-96 rounded-2xl overflow-hidden mb-6 shadow-md">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-[var(--color-brics-red)] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Featured
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  {featured.date}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-[var(--color-brics-dark)] mb-3 group-hover:text-[var(--color-brics-blue)] transition-colors">
                {featured.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {featured.summary}
              </p>
            </article>
          )}

          {/* Side List */}
          <div className="flex flex-col gap-8">
            {others.map(item => (
              <article key={item.id} className="flex flex-col gap-2 group cursor-pointer border-b border-gray-100 pb-8 last:border-0">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500 font-medium flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    {item.date}
                  </span>
                  <span className="text-[var(--color-brics-blue)] font-semibold bg-blue-50 px-2 py-0.5 rounded">
                    {item.category}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[var(--color-brics-dark)] group-hover:text-[var(--color-brics-blue)] transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <div className="flex items-center text-[var(--color-brics-green)] text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity -ml-4 group-hover:ml-0 duration-300">
                  Read Article <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}