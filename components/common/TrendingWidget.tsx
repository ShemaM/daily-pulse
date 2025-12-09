// components/common/TrendingWidget.tsx
import Link from 'next/link';

interface TrendingArticle {
  id: number | string;
  title: string;
  slug: string;
  href?: string; // Added optional href to interface
}

interface TrendingWidgetProps {
  articles: TrendingArticle[];
}

export default function TrendingWidget({ articles }: TrendingWidgetProps) {
  return (
    <div className="mb-8">
      {/* Header */}
      <div className="flex items-center mb-6">
        <span className="w-2 h-2 bg-red-600 rounded-full mr-2 animate-pulse"></span>
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">
          Most Read / Live
        </h3>
      </div>
      
      <div className="flex flex-col space-y-6">
        {articles.map((item, index) => {
          // FIX: Use item.href if it exists, otherwise default to /article/ (singular)
          const linkTarget = item.href || `/article/${item.slug}`;

          return (
            <Link 
              key={item.id} 
              href={linkTarget} 
              className="group flex items-start gap-4"
            >
              {/* Big Serif Number */}
              <span className="text-3xl font-black text-slate-200 font-serif leading-none group-hover:text-red-200 select-none transition-colors">
                {index + 1}
              </span>
              
              {/* Title & Call to Action */}
              <div className="pt-1">
                <h4 className="text-base font-bold leading-snug text-slate-900 font-serif group-hover:text-red-700 transition-colors">
                  {item.title}
                </h4>
                <span className="text-[10px] text-red-700 font-bold mt-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 block uppercase tracking-wide">
                  Read full story &rarr;
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}