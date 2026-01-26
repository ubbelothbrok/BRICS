import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { DocumentCheckIcon, PencilSquareIcon, MapIcon, UserGroupIcon } from '@heroicons/react/24/outline';

export default function Manthan() {
    return (
        <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] font-sans">
            <Navbar />

            {/* --- HERO SECTION --- */}
            <header className="relative w-full h-screen min-h-[700px] overflow-hidden bg-black">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/manthan/speakers.jpg"
                        alt="Conference Hall"
                        className="w-full h-full object-cover object-[40%] md:object-center brightness-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
                </div>

                {/* Hero Content */}
                <div className="relative z-20 max-w-[1400px] mx-auto px-6 lg:px-12 w-full h-full flex items-center pt-20">
                    <div className="max-w-4xl">
                        <h1 className="text-5xl md:text-[5rem] font-bold text-white leading-[1.1] mb-6 tracking-tight drop-shadow-sm font-heading">
                            Principal’s Conclave
                            <span className="block text-3xl md:text-5xl mt-2 font-light opacity-90 text-blue-200">Reimagining Indian Schools</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl font-light">
                            A high-intensity "Working Conclave" bringing together Principals, Policymakers, and Industry Leaders to draft the roadmap for 2030.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="px-8 py-3.5 border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-black transition-all duration-300 cursor-pointer">
                                Download Brochure
                            </button>
                            <button
                                onClick={() => document.getElementById('themes')?.scrollIntoView({ behavior: 'smooth' })}
                                className="px-8 py-3.5 bg-brics-blue/80 hover:bg-brics-blue text-white rounded-full font-bold text-lg transition-all duration-300 cursor-pointer backdrop-blur-sm"
                            >
                                View Agenda
                            </button>
                        </div>
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
                            src="/images/manthan/students.png"
                            alt="Indian Students"
                            className="relative rounded-2xl shadow-2xl w-full h-[530px] object-cover transform transition duration-500 group-hover:scale-[1.01]"
                        />
                    </div>
                </section>

                {/* --- THEMES SECTION --- */}
                <section id="themes" className="scroll-mt-24">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-4xl font-bold mb-4 text-brics-blue font-heading">Thematic Agenda</h2>
                        <p className="text-gray-600">The conclave is structured around two critical themes addressed through focused, problem-solving discussions.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Theme 1 */}
                        <Link to="/manthan/infrastructure" className="group relative overflow-hidden rounded-3xl h-[500px] shadow-xl cursor-pointer transition-transform duration-300 hover:scale-[1.02] block">
                            <img
                                src="/images/manthan/infra.png"
                                alt="School Infrastructure"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-90 group-hover:opacity-80 transition-opacity"></div>
                            <div className="absolute bottom-0 left-0 p-10 text-white w-full">
                                <div className="text-brics-yellow font-bold text-sm tracking-widest uppercase mb-2">Theme 1</div>
                                <h3 className="text-3xl font-bold mb-0 font-heading">Infrastructure, Equity & Access</h3>
                                <div className="max-h-0 opacity-0 overflow-hidden transition-all duration-500 ease-in-out group-hover:max-h-[400px] group-hover:opacity-100 group-hover:mt-4">
                                    <p className="text-gray-300 leading-relaxed mb-6">
                                        Addressing physical & digital foundations. Defining minimum viable standards for 2030, leveraging Samagra Shiksha & CSR for sustainable maintenance models.
                                    </p>
                                    <ul className="text-sm space-y-2 text-gray-300">
                                        <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-brics-yellow rounded-full"></span>Rural & Border Area Schools</li>
                                        <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-brics-yellow rounded-full"></span>Digital Divide & Connectivity</li>
                                        <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-brics-yellow rounded-full"></span>Safety & Sanitation</li>
                                    </ul>
                                </div>
                            </div>
                        </Link>

                        {/* Theme 2 */}
                        <Link to="/manthan/innovation" className="group relative overflow-hidden rounded-3xl h-[500px] shadow-xl cursor-pointer transition-transform duration-300 hover:scale-[1.02] block">
                            <img
                                src="/images/manthan/stem.png"
                                alt="Future Learning"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-90 group-hover:opacity-80 transition-opacity"></div>
                            <div className="absolute bottom-0 left-0 p-10 text-white w-full">
                                <div className="text-brics-green font-bold text-sm tracking-widest uppercase mb-2">Theme 2</div>
                                <h3 className="text-3xl font-bold mb-0 font-heading">Future-Ready Learning & Innovation</h3>
                                <div className="max-h-0 opacity-0 overflow-hidden transition-all duration-500 ease-in-out group-hover:max-h-[400px] group-hover:opacity-100 group-hover:mt-4">
                                    <p className="text-gray-300 leading-relaxed mb-6">
                                        Tackling the "software" of education: Pedagogy and Skills. Integrating AI & Robotics into the curriculum and transforming ATLs into vivid innovation hubs.
                                    </p>
                                    <ul className="text-sm space-y-2 text-gray-300">
                                        <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-brics-green rounded-full"></span>STEM, AI & Robotics Integration</li>
                                        <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-brics-green rounded-full"></span>Teacher Upskilling Strategy</li>
                                        <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-brics-green rounded-full"></span>PM SHRI as Lighthouse Schools</li>
                                    </ul>
                                </div>
                            </div>
                        </Link>
                    </div>
                </section>

                {/* --- TIMELINE SECTION --- */}
                <section className="bg-blue-50/50 rounded-[3rem] p-6 md:p-12 lg:p-20">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-brics-blue font-heading">Event Format & Timeline</h2>
                        <p className="text-gray-600">Zero formalities, 100% problem-solving. A structured day for tangible output.</p>
                    </div>

                    {/* MOBILE TIMELINE - Vertical Left-Aligned */}
                    <div className="md:hidden space-y-8">
                        {/* Item 1 */}
                        <div className="relative pl-12">
                            <div className="absolute left-5 top-0 bottom-0 w-0.5 h-[calc(100%+2rem)] bg-gray-300"></div>
                            <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-brics-blue text-white flex items-center justify-center font-bold text-xs shadow-lg z-10">11:00</div>
                            <div className="bg-white rounded-2xl p-5 shadow-md relative z-10">
                                <h4 className="text-xl font-bold text-gray-900 mb-2">Opening Plenary</h4>
                                <p className="text-gray-600 text-sm mb-3">Vision setting: Framing the 'Why'. High-impact talks by IIT Jammu Leadership & Ministry Officials.</p>
                                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">Vision Setting</span>
                            </div>
                        </div>

                        {/* Item 2 */}
                        <div className="relative pl-12">
                            <div className="absolute left-5 top-0 bottom-0 w-0.5 h-[calc(100%+2rem)] bg-gray-300"></div>
                            <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-brics-orange text-white flex items-center justify-center font-bold text-xs shadow-lg z-10">11:45</div>
                            <div className="bg-white rounded-2xl p-5 shadow-md relative z-10">
                                <h4 className="text-xl font-bold text-gray-900 mb-2">Envisioning Schools of 2030</h4>
                                <p className="text-gray-600 text-sm mb-3">A comprehensive 2-hour working session with Principals and Policymakers to draft the roadmap.</p>
                                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">Discussion</span>
                            </div>
                        </div>

                        {/* Item 3 */}
                        <div className="relative pl-12">
                            <div className="absolute left-5 top-0 bottom-0 w-0.5 h-[calc(100%+2rem)] bg-gray-300"></div>
                            <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-gray-400 text-white flex items-center justify-center font-bold text-xs shadow-lg z-10">13:45</div>
                            <div className="bg-white rounded-2xl p-5 shadow-md relative z-10">
                                <h4 className="text-xl font-bold text-gray-900 mb-2">Lunch Break</h4>
                                <p className="text-gray-600 text-sm mb-3">Networking lunch for stakeholders to connect informally.</p>
                                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">Networking</span>
                            </div>
                        </div>

                        {/* Item 4 */}
                        <div className="relative pl-12">
                            <div className="absolute left-5 top-0 bottom-0 w-0.5 h-[calc(100%+2rem)] bg-gray-300"></div>
                            <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-brics-green text-white flex items-center justify-center font-bold text-xs shadow-lg z-10">14:30</div>
                            <div className="bg-white rounded-2xl p-5 shadow-md relative z-10">
                                <h4 className="text-xl font-bold text-gray-900 mb-2">Innovation Showcase</h4>
                                <p className="text-gray-600 text-sm mb-3">45 minutes of spotlighting cutting-edge ed-tech and pedagogical innovations.</p>
                                <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Showcase</span>
                            </div>
                        </div>

                        {/* Item 5 */}
                        <div className="relative pl-12">
                            <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-brics-blue text-white flex items-center justify-center font-bold text-xs shadow-lg z-10">15:15</div>
                            <div className="bg-white rounded-2xl p-5 shadow-md relative z-10">
                                <h4 className="text-xl font-bold text-gray-900 mb-2">Conclusion</h4>
                                <p className="text-gray-600 text-sm mb-3">Release of the "Pragyaan Charter". Commitment statements and next-year roadmap.</p>
                                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">Charter Release</span>
                            </div>
                        </div>
                    </div>

                    {/* DESKTOP TIMELINE - Alternating Layout */}
                    <div className="hidden md:block relative">
                        {/* Connector Line - Trimmed to align with circles */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 top-10 bottom-10 w-1 bg-gray-200"></div>

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
                                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">Discussion</span>
                                </div>
                                <div className="w-12 h-12 rounded-full bg-brics-orange text-white flex items-center justify-center font-bold z-10 shadow-lg group-hover:scale-125 transition-transform duration-300">11:45</div>
                                <div className="md:w-5/12 pl-8">
                                    <h4 className="text-2xl font-bold text-gray-900 group-hover:text-brics-orange transition-colors">Envisioning Schools of 2030</h4>
                                    <p className="text-gray-600 mt-2">A comprehensive 2-hour working session with Principals and Policymakers to draft the roadmap.</p>
                                </div>
                            </div>

                            {/* Item 3 */}
                            <div className="flex flex-col md:flex-row items-center justify-between group">
                                <div className="md:w-5/12 text-right pr-8">
                                    <h4 className="text-2xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors">Lunch Break</h4>
                                    <p className="text-gray-600 mt-2">Networking lunch for stakeholders to connect informally.</p>
                                </div>
                                <div className="w-12 h-12 rounded-full bg-gray-400 text-white flex items-center justify-center font-bold z-10 shadow-lg">13:45</div>
                                <div className="md:w-5/12 pl-8">
                                    <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">Networking</span>
                                </div>
                            </div>

                            {/* Item 4 */}
                            <div className="flex flex-col md:flex-row items-center justify-between group">
                                <div className="md:w-5/12 text-right pr-8">
                                    <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Showcase</span>
                                </div>
                                <div className="w-12 h-12 rounded-full bg-brics-green text-white flex items-center justify-center font-bold z-10 shadow-lg group-hover:scale-125 transition-transform duration-300">14:30</div>
                                <div className="md:w-5/12 pl-8">
                                    <h4 className="text-2xl font-bold text-gray-900 group-hover:text-brics-green transition-colors">Innovation Showcase</h4>
                                    <p className="text-gray-600 mt-2">45 minutes of spotlighting cutting-edge ed-tech and pedagogical innovations.</p>
                                </div>
                            </div>

                            {/* Item 5 */}
                            <div className="flex flex-col md:flex-row items-center justify-between group">
                                <div className="md:w-5/12 text-right pr-8">
                                    <h4 className="text-2xl font-bold text-gray-900 group-hover:text-brics-blue transition-colors">Conclusion</h4>
                                    <p className="text-gray-600 mt-2">Release of the "Pragyaan Charter". Commitment statements and next-year roadmap.</p>
                                </div>
                                <div className="w-12 h-12 rounded-full bg-brics-blue text-white flex items-center justify-center font-bold z-10 shadow-lg group-hover:scale-125 transition-transform duration-300">15:15</div>
                                <div className="md:w-5/12 pl-8">
                                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">Charter Release</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- DIGITAL INNOVATION & CONCLUSION --- */}
                {/* --- PRAGYAAN CHARTER --- */}
                <section className="relative overflow-hidden bg-white border border-gray-200 rounded-[3rem] p-12 md:p-20 text-center shadow-lg">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brics-blue via-brics-orange to-brics-green"></div>

                    <div className="max-w-4xl mx-auto relative z-10">
                        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm border border-blue-100">
                            <DocumentCheckIcon className="w-10 h-10 text-brics-blue" />
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 font-heading">The Pragyaan Charter</h2>

                        <p className="text-xl text-gray-600 leading-relaxed mb-10">
                            The ultimate outcome of Manthan is the <strong>"Pragyaan Charter"</strong>—a signed declaration by all participating Principals and Dignitaries. This document will codify the collective resolve to implement the "Minimum Viable Standards" for infrastructure and the "Future-Ready Pedagogy" framework in their respective institutions by 2030.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            <span className="px-6 py-3 bg-gray-50 rounded-full text-gray-700 font-medium border border-gray-200 flex items-center gap-2 hover:bg-white hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                                <PencilSquareIcon className="w-5 h-5 text-brics-blue" />
                                Signed Declaration
                            </span>
                            <span className="px-6 py-3 bg-gray-50 rounded-full text-gray-700 font-medium border border-gray-200 flex items-center gap-2 hover:bg-white hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                                <MapIcon className="w-5 h-5 text-brics-orange" />
                                One Year Roadmap
                            </span>
                            <span className="px-6 py-3 bg-gray-50 rounded-full text-gray-700 font-medium border border-gray-200 flex items-center gap-2 hover:bg-white hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                                <UserGroupIcon className="w-5 h-5 text-brics-green" />
                                Collective Resolve
                            </span>
                        </div>
                    </div>

                    {/* Decorative background elements */}
                    <div className="absolute top-10 left-10 w-32 h-32 bg-brics-blue/5 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-40 h-40 bg-brics-orange/5 rounded-full blur-3xl"></div>
                </section>

            </main>
            <Footer />
        </div>
    );
}
