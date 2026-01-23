import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Zones() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main className="pt-32 pb-24 px-6 md:px-12 max-w-[1400px] mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Engagement Zones</h1>
                <p className="text-xl text-gray-600 mb-12 max-w-3xl">
                    Explore our dedicated engagement zones designed to spark creativity,
                    foster technical skills, and showcase the future of STEM and Arts.
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Zone 1 */}
                    <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
                        <h3 className="text-2xl font-bold text-blue-900 mb-4">Tech & Innovation Hub</h3>
                        <p className="text-gray-700">
                            A space dedicated to school-level startups, student tech demos, and future-forward solutions.
                            Witness the latest in AI, robotics, and clean energy prototypes.
                        </p>
                    </div>

                    {/* Zone 2 */}
                    <div className="bg-green-50 rounded-2xl p-8 border border-green-100">
                        <h3 className="text-2xl font-bold text-green-900 mb-4">Sustainable Future Zone</h3>
                        <p className="text-gray-700">
                            Focused on environmental conservation, renewable energy experiments, and
                            sustainable living projects designed by young innovators.
                        </p>
                    </div>

                    {/* Zone 3 */}
                    <div className="bg-purple-50 rounded-2xl p-8 border border-purple-100">
                        <h3 className="text-2xl font-bold text-purple-900 mb-4">Creative Arts Studio</h3>
                        <p className="text-gray-700">
                            Experience the intersection of technology and art through digital installations,
                            interactive workshops, and live creative performances.
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
