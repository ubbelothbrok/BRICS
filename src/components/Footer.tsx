export default function Footer() {
  return (
    <footer className="bg-[var(--color-brics-dark)] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-gray-700 pb-12">

          {/* Column 1: Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="text-[var(--color-brics-blue)]">Pragyaan</span>
              <span className="text-white">2026</span>
            </h3>
            <p className="text-gray-400 leading-relaxed max-w-sm mb-6">
              Fostering innovation and bridging the gap between school education and higher technical institutes through STEM and Arts.
            </p>
            <div className="flex gap-4">
              {['twitter', 'facebook', 'youtube', 'instagram'].map(social => (
                <a key={social} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[var(--color-brics-blue)] transition-all">
                  <span className="sr-only">{social}</span>
                  <div className="w-5 h-5 bg-current opacity-80" /> {/* Placeholder for Social Icons */}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Links */}
          <div>
            <h4 className="font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'Zones', 'Vision 2026', 'Team'].map(link => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-[var(--color-brics-blue)] transition-colors">{link}</a>
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

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>&copy; 2026 Pragyaan, IIT Jammu. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
}