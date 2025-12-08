// pages/articles/[slug].tsx
import { useRouter } from 'next/router';
import Image from 'next/image';
import Layout from '../../components/layouts/Layout';
import Sidebar from '../../components/layouts/Sidebar';
import TrendingWidget from '../../components/common/TrendingWidget';
import Badge from '../../components/common/Badge';
import { FEATURED_ARTICLE, TRENDING_ARTICLES } from '../../constants/mockData';

export default function ArticlePage() {
  const router = useRouter();
  const { slug } = router.query;

  // FALLBACK: In a real app, 'slug' would fetch specific data.
  // For this mock phase, we just reuse the FEATURED_ARTICLE data 
  // so the page doesn't crash.
  const article = {
    ...FEATURED_ARTICLE,
    title: FEATURED_ARTICLE.title + " (Demo View)", // Just to show it changed
    body: `
      <p class="mb-4"><strong>(This is a mock body content).</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      <p class="mb-4">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <h2 class="text-2xl font-bold mt-8 mb-4">A Major Turning Point</h2>
      <p class="mb-4">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
      <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
    `
  };

  if (!slug) return <Layout><div className="p-10">Loading...</div></Layout>;

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* MAIN ARTICLE CONTENT */}
        <article className="w-full lg:w-2/3">
          {/* Breadcrumb / Category */}
          <div className="mb-4">
             <Badge label={article.category.name} />
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center text-gray-600 text-sm mb-8 border-b border-gray-200 pb-8">
            <div className="mr-4 font-bold text-gray-900">{article.author_name}</div>
            <div className="mr-4">•</div>
            <div>{article.published_at}</div>
          </div>

          {/* Main Image */}
          <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
             <Image 
               src={article.main_image_url} 
               alt={article.title}
               fill
               className="object-cover"
               unoptimized
             />
          </div>

          {/* Rich Text Body */}
          {/* We use dangerouslySetInnerHTML because CMS content usually comes as HTML */}
          <div 
            className="prose prose-lg max-w-none prose-red text-gray-800 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: article.body }}
          />
        </article>

        {/* SIDEBAR (Reused!) */}
        <Sidebar>
          <TrendingWidget articles={TRENDING_ARTICLES} />
          <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center text-gray-400 text-sm border border-dashed border-gray-300">
             Related Ad
          </div>
        </Sidebar>

      </div>
    </Layout>
  );
}