// components/layouts/Header.tsx
import { useState } from 'react';
import Link from 'next/link';
import { NAV_LINKS, SITE_NAME } from '../../constants/mockData';

export default function Header() {
  // State to toggle mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm backdrop-blur-md bg-opacity-90">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="text-2xl font-black text-gray-900 tracking-tighter flex items-center gap-2">
            <span className="text-red-600 text-3xl leading-none">/</span>
            {SITE_NAME}
          </Link>

          {/* Desktop Nav (Hidden on Mobile) */}
          <nav className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-sm font-bold text-gray-600 hover:text-red-700 uppercase tracking-wide transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Action Icons & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <button className="hidden md:block text-gray-500 hover:text-gray-900">
               {/* Search Icon */}
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>
            
            {/* Mobile Menu Button (Visible on Mobile) */}
            <button 
              className="md:hidden text-gray-600 p-2 rounded hover:bg-gray-100 focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
               {isMobileMenuOpen ? (
                 // Close Icon (X)
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
               ) : (
                 // Hamburger Icon
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
               )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 bg-white absolute left-0 right-0 px-4 shadow-lg">
            <nav className="flex flex-col space-y-4">
              {NAV_LINKS.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className="text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50 p-2 rounded transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)} // Close menu when clicked
                >
                  {link.name}
                </Link>
              ))}
              <hr className="border-gray-100" />
              <button className="text-left text-base font-medium text-gray-500 p-2">
                Search
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}