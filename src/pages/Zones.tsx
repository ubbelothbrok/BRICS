import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Zones() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main className="pt-32 pb-24 px-6 md:px-12 max-w-[1400px] mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Engagement Zones</h1>
                <p className="text-xl text-gray-600 mb-12 max-w-3xl">
                    Explore the various dedicated zones designed to foster collaboration, innovation, and cultural exchange among BRICS nations.
                </p>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Zone 1 */}
                    <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
                        <h3 className="text-2xl font-bold text-blue-900 mb-4">Innovation Hub</h3>
                        <p className="text-gray-700">
                            A space dedicated to startups, tech demos, and future-forward solutions.
                            Witness the latest in AI, robotics, and sustainable energy.
                        </p>
                    </div>

                    {/* Zone 2 */}
                    <div className="bg-green-50 rounded-2xl p-8 border border-green-100">
                        <h3 className="text-2xl font-bold text-green-900 mb-4">Green Economy Zone</h3>
                        <p className="text-gray-700">
                            Focused on sustainable development, renewable energy projects, and 
                            environmental conservation strategies.
                        </p>
                    </div>

                    {/* Zone 3 */}
                    <div className="bg-purple-50 rounded-2xl p-8 border border-purple-100">
                        <h3 className="text-2xl font-bold text-purple-900 mb-4">Cultural Exchange</h3>
                        <p className="text-gray-700">
                            Experience the rich heritage of BRICS nations through art installations,
                            music performances, and culinary delights.
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
