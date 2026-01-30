import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { XMarkIcon, Bars3Icon, ArrowRightOnRectangleIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

import { fetchApi } from '../utils/api';

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
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [user, setUser] = useState<any>(null);
    const { pathname } = useLocation();
    const isHome = pathname === '/' || pathname === '/manthan';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);

        // Fetch user auth status
        fetchApi('/accounts/me/')
            .then(data => setUser(data))
            .catch(() => setUser(null));

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = async () => {
        try {
            await fetchApi('/accounts/logout/', { method: 'POST' });
            setUser(null);
            window.location.reload();
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    // Close menu on route change
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    // Force scrolled state on non-home pages
    const effectiveScrolled = isScrolled || !isHome;

    return (
        <nav className={`fixed top-0 left-0 w-full max-w-[100vw] transition-all duration-500 z-[300] ${effectiveScrolled ? 'py-4' : 'py-6'}`}>
            <div className={`mx-auto transition-all duration-500 px-6 lg:px-10 ${effectiveScrolled ? 'max-w-[1200px] bg-white/70 backdrop-blur-xl border border-white/30 shadow-lg rounded-full py-3 mx-6 md:mx-10 lg:mx-auto' : 'max-w-[1400px]'}`}>
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

                        {/* Join Now / User Profile CTA */}
                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="flex items-center gap-3 focus:outline-none group"
                                >
                                    <div className={`flex items-center justify-center p-1 rounded-full transition-all duration-300 ${effectiveScrolled ? 'bg-gray-100/50 hover:bg-gray-100' : 'bg-white/10 hover:bg-white/20'}`}>
                                        {user.avatar_url ? (
                                            <img
                                                src={user.avatar_url}
                                                alt="Profile"
                                                className="w-8 h-8 rounded-full object-cover border-2 border-white/50"
                                            />
                                        ) : (
                                            <div className="w-8 h-8 rounded-full bg-brics-blue flex items-center justify-center text-white font-bold text-sm border-2 border-white/50">
                                                {user.first_name ? user.first_name[0].toUpperCase() : 'U'}
                                            </div>
                                        )}
                                    </div>
                                </button>

                                {/* Dropdown Menu */}
                                {isProfileOpen && (
                                    <div
                                        className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transform origin-top-right transition-all animate-in fade-in zoom-in-95 duration-200"
                                    >
                                        <div className="p-4 border-b border-gray-50 bg-gray-50/50">
                                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Signed in as</p>
                                            <p className="text-sm font-bold text-gray-900 truncate">
                                                {user.first_name} {user.last_name}
                                            </p>
                                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                        </div>

                                        <div className="p-2">
                                            {user.is_staff && (
                                                <Link
                                                    to="/admin-abstracts"
                                                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-700 rounded-xl hover:bg-gray-100 transition-colors mb-1"
                                                >
                                                    <ShieldCheckIcon className="w-5 h-5 text-blue-600" />
                                                    Admin Dashboard
                                                </Link>
                                            )}
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-red-600 rounded-xl hover:bg-red-50 transition-colors"
                                            >
                                                <ArrowRightOnRectangleIcon className="w-5 h-5" />
                                                Sign out
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Backdrop to close dropdown */}
                                {isProfileOpen && (
                                    <div
                                        className="fixed inset-0 z-[-1]"
                                        onClick={() => setIsProfileOpen(false)}
                                    ></div>
                                )}
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg ${effectiveScrolled
                                    ? 'bg-brics-blue text-white hover:bg-opacity-90'
                                    : 'bg-white text-brics-blue hover:bg-gray-100'
                                    }`}
                            >
                                Join Now
                            </Link>
                        )}
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
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {isActive && <div className="w-3 h-3 rounded-full bg-brics-blue shadow-[0_0_10px_rgba(0,39,118,0.5)]"></div>}
                                    <span className={`bg-clip-text text-transparent bg-gradient-to-r ${item.special ? 'from-brics-orange to-brics-red' : (isActive ? 'from-brics-blue to-brics-blue' : 'from-gray-900 to-gray-600')}`}>
                                        {item.label}
                                    </span>
                                    {item.special && <span className="ml-4 text-xs bg-red-500 text-white px-2 py-0.5 rounded-full align-middle font-bold tracking-tight">NEW</span>}
                                </Link>
                            );
                        })}

                        {/* Mobile Join Now CTA */}
                        <div className={`pt-8 transition-all duration-500 delay-300 ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                            {user ? (
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setIsMenuOpen(false);
                                    }}
                                    className="inline-block w-full py-5 rounded-2xl bg-red-500 text-white text-center text-xl font-bold shadow-xl active:scale-95 transition-all"
                                >
                                    Logout ({user.first_name} {user.last_name})
                                </button>
                            ) : (
                                <Link
                                    to="/login"
                                    className="inline-block w-full py-5 rounded-2xl bg-brics-blue text-white text-center text-xl font-bold shadow-xl active:scale-95 transition-all"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Join Now
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

