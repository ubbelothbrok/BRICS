import { useState, useEffect } from 'react';

const MENU_ITEMS = [
    {
        label: 'About the BRICS',
        href: '#about-the-brics',
        subItems: [
            { label: 'History', href: '#' },
            { label: 'Mission & Values', href: '#' },
            { label: 'Member Countries', href: '#' },
            { label: 'Previous Summits', href: '#' }
        ]
    },
    {
        label: 'BRICS P2P',
        href: '#brics-p2p',
        subItems: [
            { label: 'Cultural Exchange', href: '#' },
            { label: 'Education Initiatives', href: '#' },
            { label: 'Youth Forum', href: '#' }
        ]
    },
    {
        label: 'News',
        href: '#news',
        subItems: [
            { label: 'Press Releases', href: '#' },
            { label: 'Speeches', href: '#' },
            { label: 'Photo Gallery', href: '#' }
        ]
    },
    { label: 'Calendar', href: '#calendar' },
    { label: 'Press', href: '#press' },
    {
        label: 'Documents',
        href: '#documents',
        subItems: [
            { label: 'Declarations', href: '#' },
            { label: 'Agreements', href: '#' },
            { label: 'Reports', href: '#' }
        ]
    },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[#242424] shadow-md py-4' : 'bg-transparent py-6'}`}>
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                <div className="flex justify-between items-center">

                    {/* Logo Section */}
                    <div className="flex items-center gap-4">
                        {/* Flower Icon */}
                        <div className="relative w-12 h-12 flex items-center justify-center">
                            <div className="absolute w-full h-full">
                                {/* Abstract Flower Petals matching brand */}
                                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
                                    <path d="M50 50 L50 10 Q50 0 60 10 L50 50" fill="#009b3a" /> {/* Green */}
                                    <path d="M50 50 L80 20 Q90 10 90 25 L50 50" fill="#fedf00" /> {/* Yellow */}
                                    <path d="M50 50 L90 50 Q100 50 90 60 L50 50" fill="#de2910" /> {/* Red */}
                                    <path d="M50 50 L80 80 Q90 90 75 90 L50 50" fill="#002776" /> {/* Blue */}
                                    <path d="M50 50 L20 80 Q10 90 10 75 L50 50" fill="#ff7f00" /> {/* Orange, approx */}
                                </svg>
                            </div>
                        </div>
                        <div className="flex flex-col text-white leading-none">
                            <span className="font-bold text-3xl tracking-wide">BRICS</span>
                            <span className="text-sm font-light tracking-widest opacity-90">Brasil 2025</span>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-8">
                        {MENU_ITEMS.map((item) => (
                            <div
                                key={item.label}
                                className="relative group"
                                onMouseEnter={() => setActiveDropdown(item.label)}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                <a
                                    href={item.href}
                                    className={`text-white text-[15px] font-medium hover:text-[var(--color-brics-yellow)] transition-colors flex items-center gap-1 py-2 ${activeDropdown === item.label ? 'text-[var(--color-brics-yellow)]' : ''}`}
                                >
                                    {item.label}
                                    {item.subItems && (
                                        <svg className={`w-3 h-3 opacity-70 transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                    )}
                                </a>

                                {/* Dropdown Menu */}
                                {item.subItems && (
                                    <div
                                        className={`absolute top-full left-0 mt-0 w-48 bg-white rounded-lg shadow-xl overflow-hidden transform transition-all duration-200 origin-top-left
                                            ${activeDropdown === item.label ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-2 invisible'}
                                        `}
                                    >
                                        <div className="py-2">
                                            {item.subItems.map((subItem) => (
                                                <a
                                                    key={subItem.label}
                                                    href={subItem.href}
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[var(--color-brics-blue)] transition-colors"
                                                >
                                                    {subItem.label}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Right Section: Socials & Lang */}
                    <div className="hidden lg:flex items-center gap-6 text-white">
                        {/* Social Icons */}
                        <div className="flex items-center gap-4 border-r border-white/20 pr-6">
                            <a href="#" className="hover:opacity-80 transition-opacity"><span className="sr-only">Flickr</span><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="white" fillOpacity="0.2" /><path d="M8 12a2 2 0 11-4 0 2 2 0 014 0zM18 12a2 2 0 11-4 0 2 2 0 014 0z" /></svg></a>
                            <a href="#" className="hover:opacity-80 transition-opacity"><span className="sr-only">Instagram</span><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg></a>
                            <a href="#" className="hover:opacity-80 transition-opacity"><span className="sr-only">YouTube</span><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg></a>
                        </div>

                        {/* Language Button */}
                        <button className="flex items-center gap-2 border border-white rounded-full px-4 py-1.5 text-sm font-medium hover:bg-white hover:text-[var(--color-brics-dark)] transition-all">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeWidth={2} /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" /></svg>
                            Português
                        </button>

                        {/* Search */}
                        <button className="bg-white text-[var(--color-brics-dark)] p-2 rounded-full hover:bg-gray-200 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
