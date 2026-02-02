import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowTrendingUpIcon, LightBulbIcon, SparklesIcon, GlobeAltIcon, BuildingLibraryIcon } from '@heroicons/react/24/outline';



const STUDENT_LEADERSHIP = [
    {
        role: "Student Convenor",
        name: "Student Name",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Student1",
        note: "Leading Pragyaan has been about turning a vision into reality. We want every visiting student to leave with a spark of curiosity that stays with them forever."
    },
    {
        role: "Student Convenor",
        name: "Student Name",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Student2",
        note: "Our goal was to create an experience, not just an event. From the tech demos to the art zones, every detail is crafted to inspire."
    },
    {
        role: "Head, Principal Conclave",
        name: "Student Name",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=ManthanHead",
        note: "Manthan bridges the gap between administration and aspiration. It's inspiring to see school leaders so passionate about adopting future-ready pedagogies."
    }
];

export default function Vision() {
    return (
        <div className="min-h-screen bg-[var(--color-bg)] transition-colors duration-300">
            <Navbar />

            <main>
                {/* --- HERO SECTION --- */}
                <section className="relative pt-32 pb-20 px-6 md:px-12 max-w-[1400px] mx-auto overflow-hidden">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brics-blue/5 rounded-full blur-3xl -z-10"></div>

                    <div className="text-center max-w-4xl mx-auto mb-16">
                        <span className="inline-block px-4 py-1.5 bg-blue-50 text-brics-blue rounded-full text-sm font-bold uppercase tracking-widest mb-6">
                            Our Ambition
                        </span>
                        <h1 className="text-5xl md:text-7xl font-bold text-[var(--color-text)] mb-8 font-heading leading-tight tracking-tight">
                            Vision <span className="text-transparent bg-clip-text bg-gradient-to-r from-brics-blue to-brics-green">2026</span>
                        </h1>
                        <p className="text-2xl md:text-3xl font-light text-gray-600 leading-relaxed">
                            "To build a sustainable bridge between school education and higher technical institutes, fostering a culture of <span className="font-medium text-gray-900">fearless innovation</span>."
                        </p>
                    </div>
                </section>

                {/* --- CORE PHILOSOPHY --- */}
                <section className="py-16 px-6 md:px-12 bg-white">
                    <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-16 items-center">
                        <div className="relative">
                            <img
                                src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=1000"
                                alt="Students collaborating"
                                className="rounded-3xl shadow-2xl w-full h-auto object-cover"
                            />
                            <div className="absolute -bottom-8 -right-8 w-64 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 hidden lg:block">
                                <p className="text-gray-500 text-sm uppercase tracking-wide mb-2">Growth Target</p>
                                <div className="flex items-end gap-2">
                                    <span className="text-5xl font-bold text-brics-blue">25%</span>
                                    <span className="text-green-500 font-medium mb-2 flex items-center">
                                        <ArrowTrendingUpIcon className="w-4 h-4 mr-1" /> YoY
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-8">
                            <h2 className="text-4xl font-bold text-gray-900 font-heading">Beyond an Open Day</h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Pragyaan is not merely an annual event; it is a movement. For too long, schools and engineering institutes have operated in silos. We envision a future where this barrier dissolves.
                            </p>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                By opening our labs, lecture halls, and maker spaces to school students, we aim to demystify technology and inspire them to see themselves not just as consumers of technology, but as creators of tomorrow.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                                        <LightBulbIcon className="w-6 h-6 text-orange-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">Ignite Curiosity</h4>
                                        <p className="text-sm text-gray-500">Sparking interest in STEM early on.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center shrink-0">
                                        <SparklesIcon className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">Hands-on Learning</h4>
                                        <p className="text-sm text-gray-500">Learning by doing, not just reading.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- STRATEGIC PILLARS --- */}
                <section className="py-24 px-6 md:px-12 bg-gray-50">
                    <div className="max-w-[1400px] mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold mb-4 text-gray-900 font-heading">Our Three Strategic Pillars</h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">The roadmap for 2026 is built on these foundational goals.</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Pillar 1 */}
                            <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-8">
                                    <GlobeAltIcon className="w-8 h-8 text-brics-blue" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Inclusivity & Reach</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Expanding our footprint to remote and border area schools. Ensuring that geography is not a barrier to quality exposure. We aim to host <span className="font-bold text-brics-blue">5000+ students</span> from diverse backgrounds.
                                </p>
                            </div>

                            {/* Pillar 2 */}
                            <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                                <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mb-8">
                                    <LightBulbIcon className="w-8 h-8 text-brics-green" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Innovation Ecosystem</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Transforming static labs into dynamic innovation hubs. Through "Manthan", we are drafting a roadmap to modernize school infrastructure and integrate <span className="font-bold text-brics-green">AI & Robotics</span> into the daily curriculum.
                                </p>
                            </div>

                            {/* Pillar 3 */}
                            <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                                <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mb-8">
                                    <BuildingLibraryIcon className="w-8 h-8 text-purple-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Institutional Synergy</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Creating a lasting mentorship network. Connecting <span className="font-bold text-purple-600">85+ Schools</span> with IIT Jammu's faculty and student clubs for continuous knowledge exchange throughout the year.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- LEADERSHIP SPEAK --- */}
                <section className="py-20 px-6 md:px-12 bg-white border-t border-gray-100">
                    <div className="max-w-[1400px] mx-auto">
                        <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 font-heading">Leadership Speak</h2>

                        {/* Faculty Section */}


                        {/* Student Section */}
                        <div className="grid md:grid-cols-3 gap-8">
                            {STUDENT_LEADERSHIP.map((student, i) => (
                                <div key={i} className="bg-white p-8 rounded-3xl shadow-md border border-gray-200 hover:scale-[1.02] transition-transform duration-300 hover:border-brics-green/30">
                                    <div className="flex items-center gap-4 mb-6">
                                        <img src={student.image} alt={student.name} className="w-14 h-14 rounded-full object-cover border border-gray-200" />
                                        <div>
                                            <div className="text-xs font-bold text-brics-green uppercase tracking-wider">{student.role}</div>
                                            <h3 className="text-lg font-bold text-gray-900">{student.name}</h3>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 text-sm leading-relaxed">"{student.note}"</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- STATS STRIP --- */}
                <section className="py-24 px-6 md:px-12 bg-gray-900 text-white rounded-t-[3rem] mt-[-2rem]">
                    <div className="max-w-[1400px] mx-auto text-center">
                        <h2 className="text-4xl font-bold mb-16 font-heading">By The Numbers</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
                            <div className="space-y-3">
                                <div className="text-5xl md:text-6xl font-bold text-brics-blue">5000+</div>
                                <div className="text-gray-400 uppercase tracking-widest text-sm">Students Impacted</div>
                            </div>
                            <div className="space-y-3">
                                <div className="text-5xl md:text-6xl font-bold text-brics-green">85+</div>
                                <div className="text-gray-400 uppercase tracking-widest text-sm">Partner Schools</div>
                            </div>
                            <div className="space-y-3">
                                <div className="text-5xl md:text-6xl font-bold text-brics-orange">50+</div>
                                <div className="text-gray-400 uppercase tracking-widest text-sm">Live Demos</div>
                            </div>
                            <div className="space-y-3">
                                <div className="text-5xl md:text-6xl font-bold text-purple-400">1 Goal</div>
                                <div className="text-gray-400 uppercase tracking-widest text-sm">Future Ready India</div>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
}
