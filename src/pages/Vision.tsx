import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Vision() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main className="pt-32 pb-24 px-6 md:px-12 max-w-[1400px] mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Vision 2026</h1>

                <div className="prose prose-lg max-w-none text-gray-600">
                    <p className="text-2xl font-light text-blue-900 mb-8 leading-relaxed">
                        "Fostering Innovation and Bridging the Gap Between School Education
                        and Higher Technical Institutes"
                    </p>

                    <div className="grid md:grid-cols-2 gap-12 mt-12">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Strategic Goals</h3>
                            <ul className="space-y-4 list-disc pl-5">
                                <li>Igniting curiosity and passion for STEM and Arts among school students.</li>
                                <li>Providing hands-on exposure to advanced research and infrastructure.</li>
                                <li>Facilitating direct interaction between aspiring students and expert faculty.</li>
                                <li>Showcasing innovative student projects and technological breakthroughs.</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Educational Impact</h3>
                            <p>
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
