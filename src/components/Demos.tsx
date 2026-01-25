import { useState, useEffect } from 'react';
import db from '../data/db.json';

interface DemoItem {
    id: number;
    title: string;
    description: string;
    image: string;
    tags: string[];
}

export default function Demos() {
    const [demos, setDemos] = useState<DemoItem[]>([]);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((db as any).demos) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setDemos((db as any).demos);
        }
    }, []);

    if (demos.length === 0) return null;

    return (
        <section className="py-24 bg-gray-900 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute -left-20 top-20 w-96 h-96 bg-brics-blue rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
                <div className="absolute -right-20 bottom-20 w-96 h-96 bg-brics-green rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
            </div>

            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
                <div className="text-center mb-16">
                    <span className="text-brics-green font-bold tracking-wider uppercase text-sm mb-4 block">Innovation Showcase</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Interactive Demos</h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Experience the future firsthand. From the immersive Bharat Dome to Navrobotec's cutting-edge kits, explore the technologies shaping Tomorrow's India.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {demos.map((demo) => (
                        <div
                            key={demo.id}
                            className="group relative overflow-hidden rounded-3xl shadow-2xl transition-all duration-500 hover:-translate-y-2 aspect-square xs:aspect-[4/3] md:aspect-[4/3] lg:aspect-[16/9]"
                        >
                            <img
                                src={demo.image}
                                alt={demo.title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                            <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full">
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {demo.tags.map(tag => (
                                        <span key={tag} className="px-2 py-0.5 bg-white/20 backdrop-blur-md text-white text-[10px] md:text-xs font-bold rounded-full border border-white/10">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <h3 className="font-bold text-white mb-2 group-hover:text-brics-yellow transition-colors text-xl md:text-3xl lg:text-4xl">
                                    {demo.title}
                                </h3>
                                <p className="text-gray-300 text-xs md:text-base leading-relaxed max-w-3xl line-clamp-3 md:line-clamp-none">
                                    {demo.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
