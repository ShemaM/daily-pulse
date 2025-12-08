// components/layouts/Sidebar.tsx
interface SidebarProps {
  children: React.ReactNode;
  className?: string;
}

export default function Sidebar({ children, className = "" }: SidebarProps) {
  return (
    <aside className={`w-full lg:w-1/3 shrink-0 ${className}`}>
      {/* sticky: Stays in view while scrolling
         top-24: Leaves space for the sticky header 
      */}
      <div className="sticky top-24 space-y-8">
        {children}
      </div>
    </aside>
  );
}