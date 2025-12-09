// pages/category/[slug].tsx
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/layouts/Layout';
import Sidebar from '../../components/layouts/Sidebar';
import ArticleCard from '../../components/common/ArticleCard';
import SectionHeader from '../../components/common/SectionHeader';
import TrendingWidget from '../../components/common/TrendingWidget';
import { 
  LATEST_ARTICLES, 
  TRENDING_ARTICLES, 
  FEATURED_ARTICLE, 
  NAV_LINKS, 
  SITE_NAME 
} from '../../constants/mockData';

// 1. NEW: Define the shape of a "Full Article" that ArticleCard expects
interface Article {
  id: number | string;
  title: string;
  slug: string;
  excerpt: string;
  main_image_url: string;
  category: { name: string; href?: string };
  published_at: string;
  author_name?: string;
  href?: string;
}

export default function CategoryPage() {
  const router = useRouter();
  const { slug } = router.query;

  if (!router.isReady || !slug) {
    return (
      <Layout>
        <div className="min-h-[50vh] flex items-center justify-center">
          <span className="text-slate-400 text-xs font-bold uppercase tracking-widest animate-pulse">
            Loading Category...
          </span>
        </div>
      </Layout>
    );
  }

  const categorySlug = Array.isArray(slug) ? slug[0] : slug;

  const categoryInfo = NAV_LINKS.find(
    (link) => link.href.split('/').pop() === categorySlug
  );
  
  const categoryName = categoryInfo ? categoryInfo.name : (categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1));

  // Combine data sources
  const allArticles = [FEATURED_ARTICLE, ...LATEST_ARTICLES, ...TRENDING_ARTICLES];
  
  const categoryArticles = allArticles.filter((article) => {
    // Type guard: check if article.category is an object with a string 'name'
    if (
      !article ||
      typeof article !== 'object' ||
      !('category' in article) ||
      !article.category ||
      typeof article.category !== 'object' ||
      typeof (article.category as { name: string }).name !== 'string'
    ) {
      return false;
    }

    const articleCatLower = (article.category as { name: string }).name.toLowerCase();
    const slugLower = categorySlug.toLowerCase();

    return articleCatLower.includes(slugLower) || articleCatLower === categoryName.toLowerCase();
  }) as Article[];

  // 2. FIX: Cast the result to 'Article[]' so TypeScript knows they are complete
  const uniqueArticles = Array.from(new Set(categoryArticles.map(a => a.id)))
    .map(id => categoryArticles.find(a => a.id === id)!) as Article[];

  return (
    <Layout>
      <Head>
        <title>{categoryName} | {SITE_NAME}</title>
      </Head>

      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* === MAIN CONTENT AREA === */}
        <div className="w-full lg:w-2/3">
          
          <nav className="flex items-center text-xs text-slate-400 font-bold uppercase tracking-widest mb-6">
            <Link href="/" className="hover:text-red-700 transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-red-700">{categoryName}</span>
          </nav>
          
          <SectionHeader title={categoryName} />

          {uniqueArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
              {uniqueArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center bg-slate-50 rounded-sm border border-slate-200">
              <h3 className="font-serif text-xl font-bold text-slate-900 mb-2">No Reports Found</h3>
              <p className="text-slate-600 mb-6 text-sm">
                There are currently no articles filed under <strong>{categoryName}</strong>.
              </p>
              <Link href="/" className="text-xs font-bold uppercase tracking-widest text-red-700 hover:text-slate-900 border-b-2 border-red-700 hover:border-slate-900 pb-1 transition-all">
                Return to Front Page
              </Link>
            </div>
          )}

        </div>

        {/* === SIDEBAR === */}
        <Sidebar>
          <TrendingWidget articles={TRENDING_ARTICLES} />
          
          <div className="bg-slate-900 p-8 rounded-sm text-center">
             <h3 className="font-serif font-bold text-white text-lg mb-2">
               Support Our Reporting on {categoryName}
             </h3>
             <p className="text-xs text-slate-400 mb-6 leading-relaxed">
               Independent monitoring requires resources. Help us keep the world informed.
             </p>
             <button className="w-full bg-white text-slate-900 text-xs font-bold uppercase tracking-widest py-3 hover:bg-red-700 hover:text-white transition-colors">
               Become a Member
             </button>
          </div>
        </Sidebar>

      </div>
    </Layout>
  );
}