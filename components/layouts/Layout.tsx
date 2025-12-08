// components/layouts/Layout.tsx
import Header from './Header'; 
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 flex flex-col">
      <Header />
      
      {/* Main grows to fill available space, pushing footer down */}
      <main className="container mx-auto px-4 py-8 grow">
        {children}
      </main>
      
      <Footer />
    </div>
  );
}