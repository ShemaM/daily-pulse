import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Layouts & Components
import Layout from '../../components/layouts/Layout';
import Sidebar from '../../components/layouts/Sidebar';
import TrendingWidget from '../../components/common/TrendingWidget';
import Badge from '../../components/common/Badge';

// Data
import { 
  FEATURED_ARTICLE, 
  LATEST_ARTICLES, 
  TRENDING_ARTICLES 
} from '../../constants/mockData';

// Types
interface Article {
  slug: string;
  title: string;
  excerpt?: string;
  category?: {
    name: string;
  };
  author_name?: string;
  published_at?: string;
  main_image_url?: string;
}

export default function ArticlePage() {
  const router = useRouter();
  const { slug } = router.query;
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Wait for Next.js to read the URL
    if (!router.isReady) return;

    // 2. Combine ALL data sources to search through
    const allArticles = [
        FEATURED_ARTICLE, 
        ...LATEST_ARTICLES, 
        ...TRENDING_ARTICLES
    ];

    // 3. Find the matching article
    const found = allArticles.find(a => a.slug === slug);
    
    // Use a microtask to batch state updates
    queueMicrotask(() => {
      setArticle(found || null);
      setLoading(false);
    });
  }, [router.isReady, slug]);

  // LOADING STATE
  if (loading) {
    return (
      <Layout>
        <div className="min-h-[50vh] flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-4 w-4 bg-red-700 rounded-full mb-2"></div>
            <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Loading Report...</span>
          </div>
        </div>
      </Layout>
    );
  }

  // 404 / NOT FOUND STATE
  if (!article) {
    return (
      <Layout title="Not Found">
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <h1 className="text-6xl font-serif font-black mb-6 text-slate-200">404</h1>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Article Unavailable</h2>
          <p className="text-slate-600 mb-8 max-w-md mx-auto">
            The dispatch you are looking for may have been moved or archived.
          </p>
          <Link href="/" className="bg-red-700 text-white px-6 py-3 rounded-sm font-bold uppercase tracking-widest hover:bg-slate-900 transition-colors">
            Return to Front Page
          </Link>
        </div>
      </Layout>
    );
  }

  // SUCCESS STATE
  return (
    <Layout title={article.title}>
      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* === MAIN COLUMN === */}
        <article className="w-full lg:w-2/3">
          
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center text-xs text-slate-400 font-bold uppercase tracking-widest mb-8">
            <Link href="/" className="hover:text-red-700 transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-red-700">{article.category?.name}</span>
          </nav>

          {/* Article Header */}
          <header className="mb-8">
            <div className="mb-4">
               <Badge label={article.category?.name || 'News'} />
            </div>
            <h1 className="text-3xl md:text-5xl font-serif font-black text-slate-900 leading-tight mb-6">
              {article.title}
            </h1>
            
            <p className="text-xl text-slate-600 leading-relaxed font-serif border-l-4 border-red-700 pl-4 mb-8 italic">
              {article.excerpt}
            </p>

            {/* Author Metadata Bar */}
            <div className="flex items-center justify-between border-t border-b border-slate-200 py-4">
              <div className="flex items-center gap-3">
                <div className="flex flex-col">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    {article.author_name || 'Staff Writer'}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Correspondent
                  </span>
                </div>
              </div>
              <div className="text-xs font-bold uppercase tracking-widest text-slate-400">
                {article.published_at}
              </div>
            </div>
          </header>

          {/* Main Image */}
          <figure className="mb-10 relative h-[300px] md:h-[450px] w-full bg-slate-100 rounded-sm overflow-hidden shadow-sm">
            <Image 
              src={article.main_image_url || '/placeholder-image.jpg'} 
              alt={article.title}
              fill
              className="object-cover"
              unoptimized
            />
            <figcaption className="absolute bottom-0 left-0 w-full bg-linear-to-t from-black/90 to-transparent p-4 pt-12 text-[10px] md:text-xs text-white/90 font-sans">
              Photo via Local Sources / Archives
            </figcaption>
          </figure>

          {/* Article Body (Simulated for Mock Data) */}
          <div className="prose prose-slate prose-lg max-w-none font-serif text-slate-800">
            <p className="lead">
              <span className="float-left text-5xl font-black text-slate-900 mr-3 -mt-1.5">T</span>
              he situation regarding <strong>{article.title}</strong> has reached a critical point this week. 
              Local sources confirm that tensions have been escalating in the {article.category?.name} sector, drawing the attention of regional observers.
            </p>
            <p>
              &quot;We are seeing unprecedented developments,&quot; stated a local civil society leader who wished to remain anonymous for security reasons. 
              This report, filed by {article.author_name}, highlights the urgent need for attention in the region.
            </p>

            <h3 className="font-bold text-slate-900 mt-8 mb-4 text-xl">Strategic Implications</h3>
            <p>
              The recent events described as &quot;{article.excerpt}&quot; have triggered a series of responses from local authorities. 
              According to data collected by The Kivu Monitor, this fits a pattern observed over the last three months.
            </p>
            
            {/* Pull Quote */}
            <blockquote className="border-l-4 border-red-700 pl-6 italic text-xl text-slate-700 my-10 bg-slate-50 py-6 pr-6 rounded-r-sm">
              &quot;For the residents of the High Plateaux, this is not just a political abstraction but a daily reality of survival.&quot;
            </blockquote>

            <p>
              As night falls over the region, the sound of distant activity serves as a grim reminder that stability remains elusive. 
              Markets remain closed, and the price of basic goods has tripled in the last 48 hours. 
              The Kivu Monitor will continue to track developments as they happen.
            </p>
          </div>

          {/* Tags / Footer */}
          <div className="mt-12 pt-8 border-t border-slate-200">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Filed Under</h4>
            <div className="flex flex-wrap gap-2">
              {[article.category?.name, 'South Kivu', 'Great Lakes', 'Security', 'DRC'].map((tag, i) => (
                <span key={i} className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wide rounded-sm hover:bg-slate-200 cursor-pointer transition-colors">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

        </article>

        {/* === SIDEBAR === */}
        <Sidebar>
          <TrendingWidget articles={TRENDING_ARTICLES} />
          
          {/* Advertisement Placeholder */}
          <div className="bg-slate-100 aspect-square w-full rounded-sm flex flex-col items-center justify-center text-slate-400 text-sm border-2 border-dashed border-slate-300">
             <span className="font-bold mb-1">Advertisement</span>
             <span className="text-xs">Support Independent News</span>
          </div>
        </Sidebar>

      </div>
    </Layout>
  );
}