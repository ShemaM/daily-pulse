// components/layouts/Footer.tsx
import Link from 'next/link';
import { SITE_NAME, NAV_LINKS } from '../../constants/mockData';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-slate-800 pb-12">
          
          {/* Column 1: Brand Info (Spans 4 columns) */}
          <div className="md:col-span-4">
            <Link href="/" className="inline-block mb-6">
              <h2 className="text-white text-3xl font-serif font-black uppercase tracking-tighter leading-none">
                {SITE_NAME}
              </h2>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed font-serif max-w-sm">
              Dedicated to truthful reporting on the security, humanitarian, and political dynamics shaping South Kivu and the Great Lakes region.
            </p>
          </div>

          {/* Column 2: Sections (Spans 2 columns) */}
          <div className="md:col-span-2">
            <h3 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">
              Sections
            </h3>
            <ul className="space-y-3 text-sm font-medium">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-white hover:underline decoration-red-700 decoration-2 underline-offset-4 transition-all">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company (Spans 2 columns) */}
          <div className="md:col-span-2">
            <h3 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">
              Support
            </h3>
            <ul className="space-y-3 text-sm font-medium">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Column 4: Newsletter (Spans 4 columns) */}
          <div className="md:col-span-4 bg-slate-800/50 p-6 rounded-sm">
            <h3 className="text-white font-bold mb-2 uppercase text-xs tracking-widest">
              Briefing
            </h3>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Sign up for our weekly dispatch. No algorithms, just the facts from the ground.
            </p>
            <form className="flex flex-col gap-2">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-slate-900 text-white text-sm px-4 py-3 rounded-sm border border-slate-700 focus:outline-none focus:border-red-700 w-full placeholder:text-slate-600"
              />
              <button className="bg-red-700 hover:bg-white hover:text-slate-900 text-white px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-widest transition-colors">
                Subscribe
              </button>
            </form>
          </div>

        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 font-medium uppercase tracking-wider">
          <p>&copy; {currentYear} {SITE_NAME}.</p>
          <p className="mt-2 md:mt-0">Journalism for the people.</p>
        </div>
      </div>
    </footer>
  );
}