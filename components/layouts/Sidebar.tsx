// components/layouts/Sidebar.tsx
import { ReactNode } from 'react';

interface SidebarProps {
  children: ReactNode;
  className?: string;
}

export default function Sidebar({ children, className = "" }: SidebarProps) {
  return (
    <aside className={`w-full lg:w-1/3 shrink-0 ${className}`}>
      {/* Container Logic:
        1. sticky top-24: Sticks to top (clearing the 20px/header)
        2. lg:pl-8: Adds breathing room on Desktop
        3. lg:border-l: Adds the vertical separator line (Standard News UI)
      */}
      <div className="sticky top-24 flex flex-col gap-8 lg:pl-8 lg:border-l border-slate-200">
        {children}
      </div>
    </aside>
  );
}