// components/common/TrendingWidget.tsx
import Link from 'next/link';

interface TrendingArticle {
  id: number | string;
  title: string;
  slug: string;
}

interface TrendingWidgetProps {
  articles: TrendingArticle[];
}

export default function TrendingWidget({ articles }: TrendingWidgetProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider border-l-4 border-red-600 pl-3">
        Trending Now
      </h3>
      <ul className="space-y-4">
        {articles.map((item, index) => (
          <li key={item.id} className="flex items-start gap-3 border-b border-gray-100 last:border-0 pb-3 last:pb-0">
            <span className="text-3xl font-black text-gray-200 leading-none -mt-1 select-none">
              {index + 1}
            </span>
            <Link href={`/articles/${item.slug}`} className="text-sm font-medium text-gray-700 hover:text-red-700 leading-snug transition-colors">
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}