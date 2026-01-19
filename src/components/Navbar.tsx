import { useState, useEffect } from 'react';

const MENU_ITEMS = [
    { label: 'Home', href: '#' },
    { label: 'Zones', href: '#zones' },
    { label: 'Vision 2026', href: '#vision' },
    { label: 'Schedule', href: '#schedule' },
    { label: 'Team', href: '#team' },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-4' : 'bg-transparent py-6'}`}>
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                <div className="flex justify-between items-center">

                    {/* Logo Section */}
                    <div className="flex items-center gap-3">
                        <img src="/logo.png" alt="Pragyaan Logo" className="h-12 w-auto object-contain" />
                        <span className={`text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brics-blue to-brics-green ${!isScrolled && 'text-white'}`}>
                            Pragyaan 2026
                        </span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-8">
                        {MENU_ITEMS.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                className={`text-[15px] font-medium transition-colors hover:text-brics-blue ${isScrolled ? 'text-gray-700' : 'text-white'}`}
                            >
                                {item.label}
                            </a>
                        ))}

                        <button className="bg-brics-green text-white px-6 py-2.5 rounded-full font-medium hover:bg-opacity-90 transition-all shadow-sm hover:shadow-md cursor-pointer">
                            Register Now
                        </button>
                    </div>

                    {/* Mobile Menu Button (Hamburger) - Placeholder */}
                    <div className="lg:hidden text-gray-700">
                        <svg className={`w-8 h-8 ${!isScrolled && 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
                    </div>
                </div>
            </div>
        </nav>
    );
}
