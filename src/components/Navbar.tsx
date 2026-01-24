import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';


const MENU_ITEMS = [
    { label: 'Home', href: '/' },
    { label: 'Zones', href: '/zones' },
    { label: 'Vision 2026', href: '/vision' },
    { label: 'Events', href: '/events' },
    { label: 'Manthan', href: '/manthan' },
    { label: 'Team', href: '/team' },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { pathname } = useLocation();

    const isHome = pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    // Force scrolled state on non-home pages or when menu is open
    const effectiveScrolled = isScrolled || !isHome || isMenuOpen;

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${effectiveScrolled ? 'py-4' : 'py-6'}`}>
            <div className={`mx-auto transition-all duration-500 px-6 lg:px-10 ${effectiveScrolled ? 'max-w-[1200px] bg-[var(--color-nav-bg)] backdrop-blur-xl border border-white/30 dark:border-white/10 shadow-lg rounded-full py-3 mx-4 lg:mx-auto' : 'max-w-[1400px]'}`}>
                <div className="flex justify-between items-center">

                    {/* Logo Section */}
                    <Link to="/" className="flex items-center gap-3">
                        <img src="/logo.png" alt="Pragyaan Logo" className="h-10 w-auto object-contain" />
                        <span className={`text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#33C5F3] to-[#2A5CAA] ${!effectiveScrolled && 'text-white'}`}>
                            Pragyaan 2026
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-8">
                        {MENU_ITEMS.map((item) => (
                            <Link
                                key={item.label}
                                to={item.href}
                                className={`text-[18px] font-medium transition-colors hover:text-brics-blue ${effectiveScrolled ? 'text-[var(--color-nav-text)]' : 'text-white'}`}
                            >
                                {item.label}
                            </Link>
                        ))}

                        {/* Theme Toggle Button (Desktop) */}

                    </div>

                    {/* Mobile Menu & Theme Toggle */}
                    <div className="lg:hidden flex items-center gap-2">

                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className={`p-2 rounded-lg transition-colors ${effectiveScrolled ? 'text-[var(--color-nav-text)]' : 'text-white'}`}
                        >
                            {isMenuOpen ? (
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div
                className={`lg:hidden fixed inset-0 z-[-1] bg-[var(--color-bg)] backdrop-blur-xl transition-all duration-500 transform ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
                    }`}
            >
                <div className="flex flex-col items-center justify-center h-full space-y-8 pt-20">
                    {MENU_ITEMS.map((item) => (
                        <Link
                            key={item.label}
                            to={item.href}
                            className="text-2xl font-bold text-[var(--color-text)] hover:text-brics-blue transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}
