import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const MENU_ITEMS = [
    { label: 'Home', href: '/' },
    { label: 'Zones', href: '/zones' },
    { label: 'Vision 2026', href: '/vision' },
    { label: 'Events', href: '/events' },
    { label: 'Team', href: '/team' },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { pathname } = useLocation();
    const { theme, toggleTheme } = useTheme();
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
                                className={`text-[18px] font-bold transition-colors hover:text-brics-blue ${effectiveScrolled ? 'text-[var(--color-nav-text)]' : 'text-white'}`}
                            >
                                {item.label}
                            </Link>
                        ))}

                        {/* Theme Toggle Button (Desktop) */}
                        <button
                            onClick={toggleTheme}
                            className={`p-2 rounded-full transition-all hover:bg-black/5 dark:hover:bg-white/10 ${effectiveScrolled ? 'text-[var(--color-nav-text)]' : 'text-white'}`}
                            aria-label="Toggle Theme"
                        >
                            {theme === 'dark' ? (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                            ) : (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                            )}
                        </button>
                    </div>

                    {/* Mobile Menu & Theme Toggle */}
                    <div className="lg:hidden flex items-center gap-2">
                        <button
                            onClick={toggleTheme}
                            className={`p-2 rounded-full transition-all ${effectiveScrolled ? 'text-[var(--color-nav-text)]' : 'text-white'}`}
                        >
                            {theme === 'dark' ? (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                            ) : (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                            )}
                        </button>
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
