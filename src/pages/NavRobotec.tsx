import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowLeftIcon, CpuChipIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

export default function NavRobotec() {
    return (
        <div className="min-h-screen bg-[var(--color-bg)] transition-colors duration-300">
            <Navbar />

            {/* Hero Section */}
            <div className="relative h-screen min-h-[500px] w-full overflow-hidden">
                <img
                    src="/showcase/navrobotec/nav.png"
                    alt="NAVRobotec"
                    className="absolute inset-0 h-full w-full object-cover"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?q=80&w=2670&auto=format&fit=crop";
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

                <div className="relative z-20 max-w-[1400px] mx-auto px-6 lg:px-12 w-full h-full flex items-center pt-20">
                    <div className="max-w-4xl">
                        <Link to="/" className="text-white/80 hover:text-white font-medium flex items-center gap-2 mb-8 w-fit transition-colors">
                            <ArrowLeftIcon className="w-5 h-5" />
                            Back to Home
                        </Link>

                        <span className="inline-block px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-6 bg-brics-blue text-white shadow-lg shadow-blue-500/20">
                            Future of Education
                        </span>

                        <h1 className="text-5xl md:text-[5rem] font-bold text-white mb-6 leading-[1.1] font-heading drop-shadow-sm tracking-tight">
                            NAVRobotec
                        </h1>

                        <p className="text-xl text-gray-300 max-w-2xl leading-relaxed">
                            Building the next generation of robotics and IoT kits for STEAM learning. Empowering students from Class 6 to 9 with Computational Thinking and Design Thinking curriculums.
                        </p>
                    </div>
                </div>
            </div>

            <main className="max-w-[1400px] mx-auto px-6 lg:px-12 py-24 space-y-32">

                {/* Section 1: STEAM Kits */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="order-2 lg:order-1 relative h-[500px] rounded-[2rem] overflow-hidden shadow-2xl bg-gray-100 group">
                        <img
                            src="https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?q=80&w=2670&auto=format&fit=crop"
                            alt="STEAM Kits"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                            <h3 className="text-white text-3xl font-bold">Build. Code. Learn.</h3>
                        </div>
                    </div>
                    <div className="order-1 lg:order-2 space-y-6">
                        <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mb-6">
                            <CpuChipIcon className="w-8 h-8 text-blue-600" />
                        </div>
                        <h2 className="text-4xl font-bold text-[var(--color-text)] font-heading">
                            STEAM Kits
                        </h2>
                        <p className="text-lg text-[var(--color-text)] opacity-80 leading-relaxed">
                            Our flagship <strong>Robotics & IoT Kits</strong> are designed to turn passive listeners into active makers. Tailored for students from <strong>Class 6 to 9</strong>, these kits enable experimenting with real-world sensors, motors, and microcontrollers.
                        </p>
                        <ul className="space-y-3 text-[var(--color-text)] opacity-70">
                            <li className="flex gap-3 items-center"><span className="w-2 h-2 rounded-full bg-blue-500"></span>Hands-on learning of core science concepts.</li>
                            <li className="flex gap-3 items-center"><span className="w-2 h-2 rounded-full bg-blue-500"></span>Bridge the gap between theory and application.</li>
                            <li className="flex gap-3 items-center"><span className="w-2 h-2 rounded-full bg-blue-500"></span>Encourage fearlessness in experimentation.</li>
                        </ul>
                    </div>
                </section>

                {/* Section 2: Books & Curriculum */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-6">
                        <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center mb-6">
                            <AcademicCapIcon className="w-8 h-8 text-purple-600" />
                        </div>
                        <h2 className="text-4xl font-bold text-[var(--color-text)] font-heading">
                            Comprehensive Curriculum
                        </h2>
                        <p className="text-lg text-[var(--color-text)] opacity-80 leading-relaxed">
                            We have developed specialized books on <strong>Design Thinking</strong> and <strong>Computational Thinking</strong> providing a structured pathway from basics to advanced engineering.
                        </p>
                        <p className="text-[var(--color-text)] opacity-80 leading-relaxed">
                            The curriculum covers a vast spectrum: starting with the <strong>Basics of Coding</strong>, moving through <strong>Group collaboration</strong>, and advancing to complex topics like <strong>Robotics, IoT,</strong> and high-end programming. It culminates in <strong>Software Development</strong> modules, preparing students for the future of tech.
                        </p>
                    </div>
                    <div className="relative h-[500px] rounded-[2rem] overflow-hidden shadow-2xl bg-gray-100 group">
                        <img
                            src="https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1287&auto=format&fit=crop"
                            alt="Curriculum Books"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                            <h3 className="text-white text-3xl font-bold">From Logic to Code.</h3>
                        </div>
                    </div>
                </section>

                {/* Section 3: Vyom Board */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="order-2 lg:order-1 relative h-[500px] rounded-[2rem] overflow-hidden shadow-2xl bg-gray-100 group">
                        <img
                            src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop"
                            alt="Vyom Board"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                            <h3 className="text-white text-3xl font-bold">Vyom: The AI Powerhouse.</h3>
                        </div>
                    </div>
                    <div className="order-1 lg:order-2 space-y-6">
                        <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center mb-6">
                            <CpuChipIcon className="w-8 h-8 text-green-600" />
                        </div>
                        <h2 className="text-4xl font-bold text-[var(--color-text)] font-heading">
                            The Vyom Board
                        </h2>
                        <h3 className="text-xl font-bold text-gray-500 uppercase tracking-widest">Multi-Purpose AI & IoT Board</h3>
                        <p className="text-lg text-[var(--color-text)] opacity-80 leading-relaxed">
                            Meet <strong>Vyom</strong>, our custom-developed development board designed for next-gen projects. It is a powerhouse that combines AI capabilities with robust IoT connectivity.
                        </p>
                        <div className="bg-[var(--color-card-bg)] p-6 rounded-2xl border border-[var(--color-text)]/10 space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-green-50 rounded-lg text-green-700 font-bold text-xs uppercase">Vision</div>
                                <div>
                                    <h4 className="font-bold text-[var(--color-text)]">ESP32 AI Thinker Camera</h4>
                                    <p className="text-sm opacity-70">Enables Computer Vision and AI processing on the edge.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-blue-50 rounded-lg text-blue-700 font-bold text-xs uppercase">Connect</div>
                                <div>
                                    <h4 className="font-bold text-[var(--color-text)]">ESP8266 IoT Module</h4>
                                    <p className="text-sm opacity-70">Seamless Wi-Fi connectivity for IoT applications.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-orange-50 rounded-lg text-orange-700 font-bold text-xs uppercase">Sense</div>
                                <div>
                                    <h4 className="font-bold text-[var(--color-text)]">Onboard Sensors</h4>
                                    <p className="text-sm opacity-70">Multiple sensors + expansion ports for endless possibilities.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </main>

            <Footer />
        </div>
    );
}
