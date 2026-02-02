import { Link } from 'react-router-dom';

const FOOTER_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Zones', href: '/zones' },
  { label: 'Vision 2026', href: '/vision' },
  { label: 'Manthan', href: '/manthan' },
  { label: 'Stalls', href: '/stalls' },
  { label: 'Events', href: '/events' },
  { label: 'Team', href: '/team' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-gray-700 pb-12">

          {/* Column 1: Info */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="inline-block">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="text-[var(--color-brics-blue)]">Pragyaan</span>
                <span className="text-white">2026</span>
              </h3>
            </Link>
            <p className="text-gray-400 leading-relaxed max-w-sm mb-6">
              Fostering innovation and bridging the gap between school education and higher technical institutes through STEM and Arts.
            </p>

          </div>

          {/* Column 2: Links */}
          <div>
            <h4 className="font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {FOOTER_LINKS.map(link => (
                <li key={link.label}>
                  <Link to={link.href} className="text-gray-400 hover:text-[var(--color-brics-blue)] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="font-bold text-lg mb-6">Contact</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span>Indian Institute of Technology Jammu<br />Jagti, NH-44, PO Nagrota<br />Jammu - 181221 J&K, India</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <span>pragyaan@iitjammu.ac.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-500 border-t border-gray-800/50 mt-8">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <p>&copy; {new Date().getFullYear()} Pragyaan, IIT Jammu.</p>
            <div className="hidden md:block w-px h-4 bg-gray-800"></div>
            <div className="flex items-center gap-2 group cursor-pointer">
              <span className="text-gray-500">Platform developed by</span>
              <a href="https://navrobotec.com" target="_blank" rel="noopener noreferrer" className="flex items-center hover:opacity-80 transition-opacity">
                <span className="text-lg font-black text-gray-400 group-hover:text-white transition-colors tracking-tighter uppercase">NAVR</span>
                <img src="/navrobotec.svg" alt="O" className="h-6 w-auto brightness-0 invert opacity-60 group-hover:opacity-100 transition-opacity mx-[-7px]" />
                <span className="text-lg font-black text-gray-400 group-hover:text-white transition-colors tracking-tighter uppercase">BOTEC</span>
              </a>
            </div>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
}