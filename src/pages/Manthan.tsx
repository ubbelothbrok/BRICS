import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Manthan() {
    return (
        <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] font-sans">
            <Navbar />

            {/* --- HERO SECTION --- */}
            <header className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=2670&auto=format&fit=crop"
                        alt="Conference Hall"
                        className="w-full h-full object-cover object-center brightness-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[var(--color-bg)]"></div>
                </div>

                {/* Hero Content */}
                <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
                    <div className="inline-block px-4 py-1.5 mb-6 border border-white/30 rounded-full bg-white/10 backdrop-blur-sm">
                        <span className="text-white/90 text-sm font-medium tracking-wider uppercase">Pragyaan 2026</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight font-heading">
                        Principal’s Conclave
                        <span className="block text-3xl md:text-4xl mt-4 font-light opacity-90 text-blue-200">Reimagining Indian Schools</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto font-light">
                        A high-intensity "Working Conclave" bringing together Principals, Policymakers, and Industry Leaders to draft the roadmap for 2030.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="px-8 py-3.5 bg-brics-blue hover:bg-blue-800 text-white rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg shadow-blue-900/50">
                            Download Brochure
                        </button>
                        <button className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-full font-semibold backdrop-blur-md transition-all">
                            View Agenda
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 space-y-24">

                {/* --- CONTEXT SECTION --- */}
                <section className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-4xl font-bold mb-4 text-brics-blue font-heading">The Context: Why We Are Here</h2>
                            <div className="w-20 h-1.5 bg-brics-orange rounded-full"></div>
                        </div>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            The Indian school education system stands at a pivotal moment. While the NEP 2020 offers a transformative vision, the ground reality faces significant hurdles.
                        </p>
                        <div className="grid gap-6">
                            <div className="bg-gray-50 border-l-4 border-brics-orange p-6 rounded-r-xl shadow-sm">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">The Gap</h3>
                                <p className="text-gray-600">
                                    Crumbling infrastructure and foundational deficits vs. the rapidly evolving aspirations of a global economy demanding AI & critical thinking.
                                </p>
                            </div>
                            <div className="bg-gray-50 border-l-4 border-brics-green p-6 rounded-r-xl shadow-sm">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">The Solution</h3>
                                <p className="text-gray-600">
                                    <strong>Pragyaan</strong> is not a ceremony. It is a unified dialogue to move beyond theoretical debates and draft the <strong>"Pragyaan Charter"</strong>—an actionable roadmap.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="relative group">
                        <div className="absolute -inset-2 bg-gradient-to-r from-brics-blue to-brics-green rounded-2xl opacity-30 blur-lg group-hover:opacity-50 transition duration-500"></div>
                        <img
                            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2670&auto=format&fit=crop"
                            alt="Leadership Meeting"
                            className="relative rounded-2xl shadow-2xl w-full h-[500px] object-cover transform transition duration-500 group-hover:scale-[1.01]"
                        />
                    </div>
                </section>

                {/* --- THEMES SECTION --- */}
                <section>
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-4xl font-bold mb-4 text-brics-blue font-heading">Thematic Agenda</h2>
                        <p className="text-gray-600">The conclave is structured around two critical themes addressed through focused, problem-solving discussions.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Theme 1 */}
                        <div className="group relative overflow-hidden rounded-3xl h-[500px] shadow-xl">
                            <img
                                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2670&auto=format&fit=crop"
                                alt="School Infrastructure"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-90 group-hover:opacity-80 transition-opacity"></div>
                            <div className="absolute bottom-0 left-0 p-10 text-white">
                                <div className="text-brics-yellow font-bold text-sm tracking-widest uppercase mb-2">Theme 1</div>
                                <h3 className="text-3xl font-bold mb-4 font-heading">Infrastructure, Equity & Access</h3>
                                <p className="text-gray-300 leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                    Addressing physical & digital foundations. Defining minimum viable standards for 2030, leveraging Samagra Shiksha & CSR for sustainable maintenance models.
                                </p>
                                <ul className="text-sm space-y-2 text-gray-300 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-brics-yellow rounded-full"></span>Rural & Border Area Schools</li>
                                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-brics-yellow rounded-full"></span>Digital Divide & Connectivity</li>
                                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-brics-yellow rounded-full"></span>Safety & Sanitation</li>
                                </ul>
                            </div>
                        </div>

                        {/* Theme 2 */}
                        <div className="group relative overflow-hidden rounded-3xl h-[500px] shadow-xl">
                            <img
                                src="https://images.unsplash.com/photo-1581092921461-e0b960d401fd?q=80&w=2670&auto=format&fit=crop"
                                alt="Future Learning"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-90 group-hover:opacity-80 transition-opacity"></div>
                            <div className="absolute bottom-0 left-0 p-10 text-white">
                                <div className="text-brics-green font-bold text-sm tracking-widest uppercase mb-2">Theme 2</div>
                                <h3 className="text-3xl font-bold mb-4 font-heading">Future-Ready Learning & Innovation</h3>
                                <p className="text-gray-300 leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                    Tackling the "software" of education: Pedagogy and Skills. Integrating AI & Robotics into the curriculum and transforming ATLs into vivid innovation hubs.
                                </p>
                                <ul className="text-sm space-y-2 text-gray-300 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-brics-green rounded-full"></span>STEM, AI & Robotics Integration</li>
                                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-brics-green rounded-full"></span>Teacher Upskilling Strategy</li>
                                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-brics-green rounded-full"></span>PM SHRI as Lighthouse Schools</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- TIMELINE SECTION --- */}
                <section className="bg-blue-50/50 rounded-[3rem] p-12 md:p-20">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4 text-brics-blue font-heading">Event Format & Timeline</h2>
                        <p className="text-gray-600">Zero formalities, 100% problem-solving. A structured day for tangible output.</p>
                    </div>

                    <div className="relative">
                        {/* Connector Line */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200 hidden md:block"></div>

                        <div className="space-y-12">
                            {/* Item 1 */}
                            <div className="flex flex-col md:flex-row items-center justify-between group">
                                <div className="md:w-5/12 text-right pr-8">
                                    <h4 className="text-2xl font-bold text-gray-900 group-hover:text-brics-blue transition-colors">Opening Plenary</h4>
                                    <p className="text-gray-600 mt-2">Vision setting: Framing the 'Why'. High-impact talks by IIT Jammu Leadership & Ministry Officials.</p>
                                </div>
                                <div className="w-12 h-12 rounded-full bg-brics-blue text-white flex items-center justify-center font-bold z-10 shadow-lg group-hover:scale-125 transition-transform duration-300">11:00</div>
                                <div className="md:w-5/12 pl-8">
                                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">Vision Setting</span>
                                </div>
                            </div>

                            {/* Item 2 */}
                            <div className="flex flex-col md:flex-row items-center justify-between group">
                                <div className="md:w-5/12 text-right pr-8">
                                    <span className="inline-block px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">Panel Discussion 1</span>
                                </div>
                                <div className="w-12 h-12 rounded-full bg-brics-orange text-white flex items-center justify-center font-bold z-10 shadow-lg group-hover:scale-125 transition-transform duration-300">11:45</div>
                                <div className="md:w-5/12 pl-8">
                                    <h4 className="text-2xl font-bold text-gray-900 group-hover:text-brics-orange transition-colors">Infrastructure & Equity</h4>
                                    <p className="text-gray-600 mt-2">Foundations: Minimum viable infra by 2030, funding models, and inclusion strategies.</p>
                                </div>
                            </div>

                            {/* Item 3 */}
                            <div className="flex flex-col md:flex-row items-center justify-between group">
                                <div className="md:w-5/12 text-right pr-8">
                                    <h4 className="text-2xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors">Lunch Break</h4>
                                    <p className="text-gray-600 mt-2">Networking lunch for stakeholders to connect informally.</p>
                                </div>
                                <div className="w-12 h-12 rounded-full bg-gray-400 text-white flex items-center justify-center font-bold z-10 shadow-lg">01:30</div>
                                <div className="md:w-5/12 pl-8">
                                    <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">Networking</span>
                                </div>
                            </div>

                            {/* Item 4 */}
                            <div className="flex flex-col md:flex-row items-center justify-between group">
                                <div className="md:w-5/12 text-right pr-8">
                                    <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Panel Discussion 2</span>
                                </div>
                                <div className="w-12 h-12 rounded-full bg-brics-green text-white flex items-center justify-center font-bold z-10 shadow-lg group-hover:scale-125 transition-transform duration-300">02:00</div>
                                <div className="md:w-5/12 pl-8">
                                    <h4 className="text-2xl font-bold text-gray-900 group-hover:text-brics-green transition-colors">Future-Ready Learning</h4>
                                    <p className="text-gray-600 mt-2">Innovation: Transforming ATLs, upsilling teachers, and outcome-based STEM learning.</p>
                                </div>
                            </div>

                            {/* Item 5 */}
                            <div className="flex flex-col md:flex-row items-center justify-between group">
                                <div className="md:w-5/12 text-right pr-8">
                                    <h4 className="text-2xl font-bold text-gray-900 group-hover:text-brics-blue transition-colors">Conclusion</h4>
                                    <p className="text-gray-600 mt-2">Release of the "Pragyaan Charter". Commitment statements and next-year roadmap.</p>
                                </div>
                                <div className="w-12 h-12 rounded-full bg-brics-blue text-white flex items-center justify-center font-bold z-10 shadow-lg group-hover:scale-125 transition-transform duration-300">03:30</div>
                                <div className="md:w-5/12 pl-8">
                                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">Charter Release</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- DIGITAL INNOVATION & CONCLUSION --- */}
                <section className="grid lg:grid-cols-3 gap-8">
                    {/* Digital Strategy Card */}
                    <div className="bg-brics-dark text-white p-10 rounded-3xl lg:col-span-1 border border-gray-700 hover:border-brics-blue transition-colors duration-300">
                        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-2xl mb-6">📱</div>
                        <h3 className="text-2xl font-bold mb-4 font-heading">Digital Innovation</h3>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            Powered by the <strong>Pragyaan Platform</strong>. Real-time digital facilities audit, live Q&A display, and instant audience polling to gauge policy sentiment.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <span className="text-xs px-3 py-1 bg-white/10 rounded-full border border-white/20">Pre-Event Audit</span>
                            <span className="text-xs px-3 py-1 bg-white/10 rounded-full border border-white/20">Live Polling</span>
                        </div>
                    </div>

                    {/* Closing Statement */}
                    <div className="bg-gradient-to-br from-blue-50 to-white text-gray-900 p-10 rounded-3xl lg:col-span-2 border border-blue-100 flex flex-col justify-center">
                        <h3 className="text-3xl font-bold mb-6 text-brics-blue font-heading">A Roadmap for 2047</h3>
                        <p className="text-xl text-gray-700 leading-relaxed font-light">
                            "By addressing the foundational deficits of today while simultaneously building the capacity for the future, the conclave aims to create a replicable model for school transformation."
                        </p>
                        <div className="mt-8 flex items-center gap-4">
                            <div className="h-px bg-gray-300 flex-1"></div>
                            <span className="text-sm font-semibold text-gray-500 uppercase tracking-widest">Join the Mission</span>
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
}
