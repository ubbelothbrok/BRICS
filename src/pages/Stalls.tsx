import { useState, useEffect, useMemo } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import stallsData from '../data/db.json';
import {
    BeakerIcon,
    CpuChipIcon,
    RocketLaunchIcon,
    GlobeAltIcon,
    MagnifyingGlassIcon,
    UserGroupIcon
} from '@heroicons/react/24/outline';

interface StallItem {
    id: number;
    title: string;
    organizer: string;
    description: string;
    image: string;
    category: string;
}

export default function Stalls() {
    const [stalls, setStalls] = useState<StallItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    useEffect(() => {
        setStalls((stallsData as any).stalls || []);
        setLoading(false);
    }, []);

    const categories = useMemo(() => {
        const cats = new Set(stalls.map(s => s.category));
        return ['All', ...Array.from(cats)].sort();
    }, [stalls]);

    const filteredStalls = useMemo(() => {
        return stalls.filter(stall => {
            const matchesSearch = stall.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                stall.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                stall.organizer.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = activeCategory === 'All' || stall.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [stalls, searchQuery, activeCategory]);

    return (
        <div className="min-h-screen bg-[var(--color-bg)] transition-colors duration-300">
            <Navbar />

            <main className="pt-32 pb-24">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                    {/* Header Section */}
                    <div className="mb-16 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brics-blue/10 text-brics-blue font-bold text-sm mb-6">
                            <RocketLaunchIcon className="w-4 h-4" />
                            EXHIBITION ZONE
                        </div>
                        <h1 className="text-5xl md:text-6xl font-black text-[var(--color-text)] leading-tight tracking-tight transition-colors duration-300">
                            Innovation <span className="text-transparent bg-clip-text bg-gradient-to-r from-brics-blue to-brics-green">Showcase</span>
                        </h1>
                        <p className="text-xl text-[var(--color-text)] opacity-70 mt-6 max-w-2xl transition-colors duration-300">
                            Explore the frontiers of technology and creativity. From advanced robotics to immersive VR, witness the projects shaping our future.
                        </p>
                    </div>

                    {/* Filters & Search */}
                    <div className="flex flex-col lg:flex-row gap-6 mb-12 items-center justify-between">
                        <div className="flex flex-wrap items-center gap-3 justify-center lg:justify-start">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${activeCategory === cat
                                            ? 'bg-brics-blue text-white shadow-lg shadow-brics-blue/20 scale-105'
                                            : 'bg-[var(--color-card-bg)] text-[var(--color-text)] opacity-70 hover:opacity-100 hover:bg-gray-100'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        <div className="relative w-full lg:w-96 group">
                            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-brics-blue transition-colors" />
                            <input
                                type="text"
                                placeholder="Search stalls, projects, or teams..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-6 py-3.5 rounded-2xl bg-[var(--color-card-bg)] border border-gray-200 focus:border-brics-blue focus:ring-4 focus:ring-brics-blue/10 outline-none transition-all text-[var(--color-text)]"
                            />
                        </div>
                    </div>

                    {loading ? (
                        <div className="py-24 text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brics-blue mx-auto"></div>
                            <p className="mt-4 text-gray-600 font-medium">Calibrating sensors...</p>
                        </div>
                    ) : filteredStalls.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredStalls.map((stall) => (
                                <div
                                    key={stall.id}
                                    className="group relative bg-[var(--color-card-bg)] rounded-[2rem] overflow-hidden border border-gray-100/50 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                                >
                                    {/* Image Container */}
                                    <div className="h-64 relative overflow-hidden">
                                        <img
                                            src={stall.image}
                                            alt={stall.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1470&auto=format&fit=crop';
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                        <div className="absolute top-4 left-4 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-black uppercase tracking-widest">
                                            {stall.category}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-8">
                                        <div className="flex items-start justify-between mb-4">
                                            <h3 className="text-2xl font-bold text-[var(--color-text)] transition-colors duration-300 leading-tight">
                                                {stall.title}
                                            </h3>
                                        </div>

                                        <p className="text-[var(--color-text)] opacity-70 text-sm leading-relaxed mb-6 line-clamp-3 transition-colors duration-300 font-medium">
                                            {stall.description}
                                        </p>

                                        <div className="flex items-center gap-3 pt-6 border-t border-gray-100">
                                            <div className="w-10 h-10 rounded-full bg-brics-blue/10 flex items-center justify-center">
                                                <UserGroupIcon className="w-5 h-5 text-brics-blue" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">ORGANIZER / TEAM</p>
                                                <p className="text-sm font-bold text-[var(--color-text)] truncate transition-colors duration-300">
                                                    {stall.organizer}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Hover Action Overlay */}
                                    <div className="absolute inset-0 bg-brics-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-24 text-center">
                            <div className="bg-gray-50 inline-flex p-8 rounded-full mb-6">
                                <CpuChipIcon className="w-16 h-16 text-gray-300" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">No exhibition found</h3>
                            <p className="text-gray-500">Try searching for different keywords or categories.</p>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
