// components/common/SectionHeader.tsx
import Link from 'next/link';

interface SectionHeaderProps {
  title: string;
  linkHref?: string;
  linkText?: string;
}

export default function SectionHeader({ title, linkHref, linkText = "View All" }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6 border-b-2 border-gray-100 pb-2">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 uppercase tracking-tight relative">
        {title}
        {/* Decorative red underline specifically for the text */}
        <span className="absolute -bottom-2.5 left-0 w-full h-0.5 bg-red-600"></span>
      </h2>
      
      {linkHref && (
        <Link href={linkHref} className="text-xs font-bold text-gray-500 hover:text-red-600 uppercase transition-colors">
          {linkText} &rarr;
        </Link>
      )}
    </div>
  );
}