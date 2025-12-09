// components/common/ArticleCard.tsx
import Link from 'next/link';
import Image from 'next/image';
import Badge from './Badge';

interface ArticleProps {
  article: {
    title: string;
    slug: string;
    excerpt: string;
    main_image_url: string;
    category: { name: string; slug?: string };
    published_at: string;
    author_name?: string; // Optional: Added to match your mock data structure if present
  };
}

export default function ArticleCard({ article }: ArticleProps) {
  return (
    <div className="group flex flex-col h-full">
      {/* Image Container - Aspect Ratio 4:3 */}
      <Link href={`/articles/${article.slug}`} className="block relative aspect-4/3 w-full bg-slate-100 overflow-hidden rounded-sm mb-4">
        <Image 
          src={article.main_image_url} 
          alt={article.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          unoptimized
        />
        {/* Badge - Positioned inside */}
        <div className="absolute top-2 left-2 z-10">
          <Badge label={article.category.name} />
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col grow">
        <Link href={`/articles/${article.slug}`} className="block mb-3">
          <h3 className="text-xl font-bold font-serif leading-tight text-slate-900 group-hover:text-red-700 transition-colors">
            {article.title}
          </h3>
        </Link>
        
        <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-4 grow">
          {article.excerpt}
        </p>

        {/* Footer / Metadata */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium font-sans">
           {/* If author exists, show it, otherwise just date */}
           {article.author_name && (
             <span className="uppercase tracking-wider font-bold text-slate-800">
               {article.author_name}
             </span>
           )}
           <span>{article.published_at}</span>
        </div>
      </div>
    </div>
  );
}