import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Vision() {
    return (
        <div className="min-h-screen bg-[var(--color-bg)] transition-colors duration-300">
            <Navbar />
            <main className="pt-32 pb-24 px-6 md:px-12 max-w-[1400px] mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text)] mb-8 transition-colors duration-300">Vision 2026</h1>

                <div className="prose prose-lg max-w-none text-[var(--color-text)] transition-colors duration-300">
                    <p className="text-2xl font-light text-brics-blue mb-8 leading-relaxed">
                        "Fostering Innovation and Bridging the Gap Between School Education
                        and Higher Technical Institutes"
                    </p>

                    <div className="grid md:grid-cols-2 gap-12 mt-12">
                        <div>
                            <h3 className="text-2xl font-bold text-[var(--color-text)] mb-4 transition-colors duration-300">Strategic Goals</h3>
                            <ul className="space-y-4 list-disc pl-5 opacity-80">
                                <li>Igniting curiosity and passion for STEM and Arts among school students.</li>
                                <li>Providing hands-on exposure to advanced research and infrastructure.</li>
                                <li>Facilitating direct interaction between aspiring students and expert faculty.</li>
                                <li>Showcasing innovative student projects and technological breakthroughs.</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-[var(--color-text)] mb-4 transition-colors duration-300">Educational Impact</h3>
                            <p className="opacity-80">
                                Pragyaan 2026 aims to inspire over 5,000 students from across 85+ schools
                                in the region, providing them with a unique window into the world of
                                higher education and cutting-edge research.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
