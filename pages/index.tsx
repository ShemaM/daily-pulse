// pages/index.tsx
import Layout from '../components/layouts/Layout';
import Sidebar from '../components/layouts/Sidebar';
import HeroArticle from '../components/common/HeroArticle';
import ArticleCard from '../components/common/ArticleCard';
import SectionHeader from '../components/common/SectionHeader';
import TrendingWidget from '../components/common/TrendingWidget';
import { FEATURED_ARTICLE, LATEST_ARTICLES, TRENDING_ARTICLES } from '../constants/mockData';

export default function Home() {
  return (
    <Layout>
      {/* 1. HERO SECTION */}
      <HeroArticle article={FEATURED_ARTICLE} />

      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* 2. MAIN CONTENT COLUMN (Left, 2/3 width) */}
        <div className="w-full lg:w-2/3">
          {/* Replaced raw h2 with standardized SectionHeader */}
          <SectionHeader 
            title="Latest News" 
            linkHref="/articles" 
            linkText="View All News" 
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {LATEST_ARTICLES.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>

        {/* 3. SIDEBAR (Right, 1/3 width) */}
        {/* Replaced raw aside with sticky Sidebar wrapper */}
        <Sidebar>
          {/* Replaced raw list with TrendingWidget */}
          <TrendingWidget articles={TRENDING_ARTICLES} />

          {/* Advertisement Placeholder */}
          <div className="bg-gray-100 h-64 rounded-lg flex flex-col items-center justify-center text-gray-400 text-sm border-2 border-dashed border-gray-300">
            <span className="font-bold">Advertisement</span>
            <span className="text-xs">300x250</span>
          </div>

          {/* Newsletter (Optional Sidebar Module) */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-2">Subscribe</h3>
            <p className="text-sm text-gray-600 mb-4">Get the latest updates delivered to your inbox.</p>
            <input 
              type="email" 
              placeholder="Your email address" 
              className="w-full px-3 py-2 border border-gray-300 rounded mb-2 text-sm"
            />
            <button className="w-full bg-red-600 text-white text-sm font-bold py-2 rounded hover:bg-red-700 transition-colors">
              Join Now
            </button>
          </div>
        </Sidebar>

      </div>
    </Layout>
  );
}