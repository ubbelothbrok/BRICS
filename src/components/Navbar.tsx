import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { XMarkIcon, Bars3Icon } from '@heroicons/react/24/outline';

const MENU_ITEMS = [
    { label: 'Home', href: '/' },
    { label: 'Zones', href: '/zones' },
    { label: 'Vision 2026', href: '/vision' },
    { label: 'Manthan', href: '/manthan', special: true },
    { label: 'Schedule', href: '/schedule' },
    { label: 'Events', href: '/events' },
    { label: 'Team', href: '/team' },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { pathname } = useLocation();
    const isHome = pathname === '/' || pathname === '/manthan';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu on route change
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    // Force scrolled state on non-home pages
    const effectiveScrolled = isScrolled || !isHome;

    return (
        <nav className={`fixed top-0 left-0 right-0 transition-all duration-500 z-[300] ${effectiveScrolled ? 'py-4' : 'py-6'}`}>
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
                        {MENU_ITEMS.map((item) => {
                            const isActive = item.href === '/'
                                ? pathname === '/'
                                : pathname.startsWith(item.href);
                            return (
                                <Link
                                    key={item.label}
                                    to={item.href}
                                    className={`text-[14px] font-medium transition-colors relative group flex items-center gap-2 ${item.special
                                        ? 'text-brics-orange font-bold hover:text-brics-red'
                                        : (isActive
                                            ? 'text-brics-blue font-bold'
                                            : (effectiveScrolled ? 'text-gray-700 hover:text-brics-blue' : 'text-white hover:text-brics-blue'))
                                        }`}
                                >
                                    {item.label}
                                    {item.special && (
                                        <span className="absolute -top-2 -right-5 px-1 py-[1px] bg-red-500 text-white text-[7px] font-bold rounded-full animate-pulse">
                                            NEW
                                        </span>
                                    )}
                                    {/* Active Indicator Underline */}
                                    <span className={`absolute -bottom-1.5 left-0 h-[2px] bg-brics-blue transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden p-2 rounded-full hover:bg-black/5 transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? (
                            <XMarkIcon className={`w-8 h-8 ${effectiveScrolled ? 'text-gray-900' : 'text-white'}`} />
                        ) : (
                            <Bars3Icon className={`w-8 h-8 ${effectiveScrolled ? 'text-gray-900' : 'text-white'}`} />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Drawer */}
            <div className={`fixed inset-0 bg-white z-[400] transition-all duration-500 lg:hidden ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                <div className="flex flex-col h-full bg-white px-8 pt-24 pb-12">
                    {/* Close Button Inside Drawer */}
                    <button
                        className="absolute top-8 right-8 p-2 rounded-full bg-gray-100"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <XMarkIcon className="w-8 h-8 text-gray-900" />
                    </button>

                    <div className="flex flex-col space-y-8">
                        {MENU_ITEMS.map((item, idx) => {
                            const isActive = item.href === '/'
                                ? pathname === '/'
                                : pathname.startsWith(item.href);
                            return (
                                <Link
                                    key={item.label}
                                    to={item.href}
                                    className={`text-4xl font-bold transition-all duration-300 transform flex items-center gap-4 ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}`}
                                    style={{ transitionDelay: `${idx * 50}ms` }}
                                >
                                    {isActive && <div className="w-3 h-3 rounded-full bg-brics-blue shadow-[0_0_10px_rgba(0,39,118,0.5)]"></div>}
                                    <span className={`bg-clip-text text-transparent bg-gradient-to-r ${item.special ? 'from-brics-orange to-brics-red' : (isActive ? 'from-brics-blue to-brics-blue' : 'from-gray-900 to-gray-600')}`}>
                                        {item.label}
                                    </span>
                                    {item.special && <span className="ml-4 text-xs bg-red-500 text-white px-2 py-0.5 rounded-full align-middle font-bold tracking-tight">NEW</span>}
                                </Link>
                            );
                        })}
                    </div>

                    <div className="mt-auto border-t border-gray-100 pt-12">
                        <p className="text-gray-400 text-sm font-medium uppercase tracking-widest mb-4">Quick Links</p>
                        <div className="grid grid-cols-2 gap-4 text-gray-600 font-bold">
                            <Link to="/vision" className="hover:text-brics-blue">Vision</Link>
                            <Link to="/schedule" className="hover:text-brics-blue">Schedule</Link>
                            <Link to="/manthan" className="hover:text-brics-blue">Manthan</Link>
                            <Link to="/team" className="hover:text-brics-blue">Team</Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
