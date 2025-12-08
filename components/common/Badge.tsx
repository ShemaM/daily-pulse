// components/common/Badge.tsx
import Link from 'next/link';

interface BadgeProps {
  label: string;
  href?: string; // Optional: make it clickable
  className?: string;
}

export default function Badge({ label, href, className = "" }: BadgeProps) {
  const baseStyles = "inline-block bg-red-600 text-white text-[10px] md:text-xs font-bold px-2 py-1 uppercase tracking-wider rounded-sm";
  
  if (href) {
    return (
      <Link href={href} className={`${baseStyles} hover:bg-red-700 transition-colors ${className}`}>
        {label}
      </Link>
    );
  }

  return <span className={`${baseStyles} ${className}`}>{label}</span>;
}