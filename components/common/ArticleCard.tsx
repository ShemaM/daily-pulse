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
  };
}

export default function ArticleCard({ article }: ArticleProps) {
  return (
    <div className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative h-48 w-full bg-gray-200 overflow-hidden">
        <Image 
          src={article.main_image_url} 
          alt={article.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          unoptimized
        />
        {/* Positioned Badge */}
        <div className="absolute top-2 left-2 z-10">
          <Badge label={article.category.name} />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col grow"> {/* Changed flex-grow to grow */}
        <div className="text-gray-400 text-xs mb-2 flex items-center">
           <span>{article.published_at}</span>
        </div>
        
        <Link href={`/articles/${article.slug}`} className="block mb-2">
          <h3 className="text-lg font-bold leading-tight text-gray-900 group-hover:text-red-700 transition-colors">
            {article.title}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm line-clamp-3 grow"> {/* Changed flex-grow to grow */}
          {article.excerpt}
        </p>
      </div>
    </div>
  );
}