// components/common/HeroArticle.tsx
import Link from 'next/link';
import Image from 'next/image'; // Import the optimized component
import Badge from './Badge';

// Define the shape of the data strictly
interface HeroArticleProps {
  article: {
    title: string;
    slug: string;
    excerpt: string;
    main_image_url: string;
    category: { name: string };
    author_name: string;
    published_at: string;
  };
}

export default function HeroArticle({ article }: HeroArticleProps) {
  return (
    <section className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden mb-12 group cursor-pointer">
      <Link href={`/articles/${article.slug}`}>
        {/* Using Next.js Image with 'fill' and 'unoptimized' for external links */}
        <Image 
          src={article.main_image_url} 
          alt={article.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          unoptimized 
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />

        {/* Text Content */}
        <div className="absolute bottom-0 left-0 p-6 md:p-12 max-w-3xl">
          <div className="mb-4">
             <Badge label={article.category.name} />
          </div>
          
          <h1 className="text-2xl md:text-5xl font-extrabold text-white mb-4 leading-tight group-hover:underline decoration-red-500 decoration-4 underline-offset-4">
            {article.title}
          </h1>
          
          <p className="hidden md:block text-gray-200 text-lg md:text-xl line-clamp-2 mb-4">
            {article.excerpt}
          </p>
          
          <div className="text-gray-400 text-xs md:text-sm">
            By <span className="text-white font-medium">{article.author_name}</span> • {article.published_at}
          </div>
        </div>
      </Link>
    </section>
  );
}