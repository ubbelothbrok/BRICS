import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const MENU_ITEMS = [
    { label: 'Home', href: '/' },
    { label: 'Zones', href: '/zones' },
    { label: 'Vision 2026', href: '/vision' },
    { label: 'Manthan', href: '/manthan' },
    { label: 'Schedule', href: '/schedule' },
    { label: 'Events', href: '/events' },
    { label: 'Team', href: '/team' },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const { pathname } = useLocation();
    const isHome = pathname === '/' || pathname === '/manthan';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Force scrolled state on non-home pages
    const effectiveScrolled = isScrolled || !isHome;

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${effectiveScrolled ? 'py-4' : 'py-6'}`}>
            <div className={`mx-auto transition-all duration-500 px-6 lg:px-10 ${effectiveScrolled ? 'max-w-[1200px] bg-white/70 backdrop-blur-xl border border-white/30 shadow-lg rounded-full py-3 mx-4 lg:mx-auto' : 'max-w-[1400px]'}`}>
                <div className="flex justify-between items-center">

                    {/* Logo Section */}
                    <Link to="/" className="flex items-center gap-3">
                        <img src="/logo.png" alt="Pragyaan Logo" className="h-10 w-auto object-contain" />
                        <span className={`text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#33C5F3] to-[#2A5CAA] ${!effectiveScrolled && 'text-white'}`}>
                            Pragyaan 2026
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-6">
                        {MENU_ITEMS.map((item) => (
                            <Link
                                key={item.label}
                                to={item.href}
                                className={`text-[14px] font-medium transition-colors hover:text-brics-blue ${effectiveScrolled ? 'text-gray-700' : 'text-white'}`}
                            >
                                {item.label}
                            </Link>
                        ))}


                    </div>

                    {/* Mobile Menu Button (Hamburger) - Placeholder */}
                    <div className="lg:hidden">
                        <svg className={`w-8 h-8 ${effectiveScrolled ? 'text-gray-700' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
                    </div>
                </div>
            </div>
        </nav>
    );
}
