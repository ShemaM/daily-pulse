// components/layouts/Footer.tsx
import Link from 'next/link';
import { SITE_NAME, NAV_LINKS } from '../../constants/mockData';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-20 border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Column 1: Brand Info */}
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-white text-xl font-bold mb-4 tracking-tight">
              {SITE_NAME}
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              Your daily source for the latest news, in-depth analysis, and trending stories from around the globe.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">
              Sections
            </h3>
            <ul className="space-y-2 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal / About */}
          <div>
            <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">
              Company
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Column 4: Newsletter (Visual only for now) */}
          <div>
            <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">
              Subscribe
            </h3>
            <p className="text-xs text-gray-500 mb-3">
              Get the latest updates directly in your inbox.
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-gray-800 text-white text-sm px-3 py-2 rounded-l w-full focus:outline-none focus:ring-1 focus:ring-red-600"
              />
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-r text-sm font-bold transition-colors">
                Go
              </button>
            </div>
          </div>

        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-xs text-gray-500">
          &copy; {currentYear} {SITE_NAME}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}