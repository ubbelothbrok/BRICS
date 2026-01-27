import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
    CalendarIcon,
    MapPinIcon,
    ClockIcon,
    ArrowLeftIcon,
    ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

export default function ManthanInfrastructure() {
    return (
        <div className="min-h-screen bg-[var(--color-bg)] transition-colors duration-300">
            <Navbar />

            {/* Hero Section */}
            <div className="relative h-screen min-h-[500px] w-full overflow-hidden">
                <img
                    src="/images/manthan/infra.png"
                    alt="School Infrastructure"
                    className="absolute inset-0 h-full w-full object-cover object-[10%_20%] md:object-[0%_20%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

                <div className="relative z-20 max-w-[1400px] mx-auto px-6 lg:px-12 w-full h-full flex items-center pt-20">
                    <div className="max-w-4xl">
                        <Link to="/manthan" className="text-white/80 hover:text-white font-medium flex items-center gap-2 mb-8 w-fit transition-colors">
                            <ArrowLeftIcon className="w-5 h-5" />
                            Back to Manthan
                        </Link>

                        <span className="inline-block px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-6 bg-brics-yellow text-black shadow-lg shadow-yellow-500/20">
                            Theme 1
                        </span>

                        <h1 className="text-5xl md:text-[5rem] font-bold text-white mb-6 leading-[1.1] font-heading drop-shadow-sm tracking-tight">
                            Infrastructure, Equity & Access
                        </h1>

                        <div className="flex flex-wrap gap-6 text-white/90 text-lg font-light">
                            <div className="flex items-center gap-3 bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
                                <CalendarIcon className="w-5 h-5 text-brics-yellow" />
                                <span>Feb 14, 2026</span>
                            </div>
                            <div className="flex items-center gap-3 bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
                                <ClockIcon className="w-5 h-5 text-brics-yellow" />
                                <span>11:45 AM - 01:30 PM</span>
                            </div>
                            <div className="flex items-center gap-3 bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
                                <MapPinIcon className="w-5 h-5 text-brics-yellow" />
                                <span>Main Conference Hall</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <main className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">

                {/* Left Column: Description & Schedule */}
                <div className="lg:col-span-2 space-y-12">
                    <section>
                        <h2 className="text-3xl font-bold text-[var(--color-text)] mb-6 transition-colors duration-300 font-heading">About the Session</h2>
                        <div className="prose prose-lg text-[var(--color-text)] opacity-80 leading-relaxed whitespace-pre-line transition-colors duration-300">
                            <p className="mb-4">
                                This session addresses the physical and digital foundations of schooling. It is not merely a question of constructing walls, but of ensuring dignity and access. The dialogue will focus on defining minimum viable infrastructure standards for 2030 and addressing the stark disparities between urban centers and remote border regions.
                            </p>
                            <p>
                                Key areas of focus include leveraging Samagra Shiksha for holistic infrastructure support, sustainable maintenance models involving CSR and Public-Private Partnerships, residential solutions for remote areas, and ensuring safety and sanitation for girls. The goal is to develop a "Comprehensive School Readiness Framework" that ensures no child is left behind due to geography or lack of resources.
                            </p>
                        </div>
                    </section>


                </div>

                {/* Right Column: Key Focus Areas */}
                <div className="space-y-8">
                    <div className="bg-[var(--color-card-bg)] rounded-2xl p-8 shadow-lg border border-[var(--color-text)]/10 sticky top-32 transition-colors duration-300">
                        <h3 className="text-xl font-bold text-[var(--color-text)] mb-6 flex items-center gap-2 transition-colors duration-300 font-heading">
                            <ExclamationTriangleIcon className="w-6 h-6 text-brics-orange" />
                            Key Focus Areas
                        </h3>

                        <ul className="space-y-4 mb-8">
                            <li className="flex gap-3 text-[var(--color-text)] opacity-80 text-sm transition-colors duration-300">
                                <span className="text-brics-blue font-bold">•</span>
                                <strong>Rural & Border Area Schools:</strong> Bridging the physical gap.
                            </li>
                            <li className="flex gap-3 text-[var(--color-text)] opacity-80 text-sm transition-colors duration-300">
                                <span className="text-brics-blue font-bold">•</span>
                                <strong>Digital Divide:</strong> Ensuring connectivity as a basic utility.
                            </li>
                            <li className="flex gap-3 text-[var(--color-text)] opacity-80 text-sm transition-colors duration-300">
                                <span className="text-brics-blue font-bold">•</span>
                                <strong>Safety & Sanitation:</strong> Dignity in infrastructure.
                            </li>
                            <li className="flex gap-3 text-[var(--color-text)] opacity-80 text-sm transition-colors duration-300">
                                <span className="text-brics-blue font-bold">•</span>
                                <strong>Maintenance Models:</strong> Moving beyond construction to sustainability.
                            </li>
                        </ul>

                        <div className="pt-6 border-t border-[var(--color-text)]/10 space-y-4 transition-colors duration-300">
                            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Speakers</h4>
                            <div className="flex -space-x-3 overflow-hidden">
                                <div className="h-10 w-10 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs font-bold text-gray-600" title="Education Secretary">ES</div>
                                <div className="h-10 w-10 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs font-bold text-gray-600" title="CSR Leader">CSR</div>
                                <div className="h-10 w-10 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs font-bold text-gray-600" title="IIT Faculty">IIT</div>
                            </div>
                            <p className="text-xs text-gray-500 italic">Panel includes Education Secretaries, Industry Leaders & Senior Faculty.</p>
                        </div>

                    </div>
                </div>

            </main>

            <Footer />
        </div>
    );
}
