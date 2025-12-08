// pages/category/[slug].tsx
import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from '../../components/layouts/Layout';
import Sidebar from '../../components/layouts/Sidebar';
import ArticleCard from '../../components/common/ArticleCard';
import SectionHeader from '../../components/common/SectionHeader';
import TrendingWidget from '../../components/common/TrendingWidget';
import { LATEST_ARTICLES, TRENDING_ARTICLES, NAV_LINKS } from '../../constants/mockData';

export default function CategoryPage() {
  const router = useRouter();
  const { slug } = router.query;

  // Ensure slug is a string (handle array edge case)
  const categorySlug = Array.isArray(slug) ? slug[0] : slug;

  // Find the "Pretty Name" for the category (e.g., "politics" -> "Politics")
  // We look it up in our NAV_LINKS
  const categoryInfo = NAV_LINKS.find(
    (link) => link.href.split('/').pop() === categorySlug
  );
  
  const categoryName = categoryInfo ? categoryInfo.name : categorySlug;

  // FILTER LOGIC:
  // Get articles where the category name matches our current page
  // (Case insensitive comparison)
  const categoryArticles = LATEST_ARTICLES.filter(
    (article) => article.category.name.toLowerCase() === categorySlug?.toLowerCase()
  );

  if (!slug) return <Layout><div className="p-10">Loading...</div></Layout>;

  return (
    <Layout>
      <Head>
        <title>{categoryName} News - The Daily Pulse</title>
      </Head>

      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* MAIN CONTENT AREA */}
        <div className="w-full lg:w-2/3">
          
          <SectionHeader title={categoryName || 'Category'} />

          {categoryArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {categoryArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="py-10 text-center bg-gray-50 rounded border border-gray-200 text-gray-500">
              <p>No articles found in <strong>{categoryName}</strong> yet.</p>
            </div>
          )}

        </div>

        {/* SIDEBAR (Reused) */}
        <Sidebar>
          <TrendingWidget articles={TRENDING_ARTICLES} />
          
          {/* Category-Specific Ad or Content could go here */}
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
             <h3 className="font-bold text-blue-900 mb-2">Advertise in {categoryName}</h3>
             <p className="text-sm text-blue-700">
               Reach thousands of readers interested in {categoryName}.
             </p>
          </div>
        </Sidebar>

      </div>
    </Layout>
  );
}