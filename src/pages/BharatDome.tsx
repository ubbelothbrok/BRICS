import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowLeftIcon, RocketLaunchIcon, BuildingLibraryIcon } from '@heroicons/react/24/outline';

export default function BharatDome() {
    return (
        <div className="min-h-screen bg-[var(--color-bg)] transition-colors duration-300">
            <Navbar />

            {/* Hero Section */}
            <div className="relative h-screen min-h-[500px] w-full overflow-hidden">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Bharat_Mandapam_Pragati_Maidan.jpg/1280px-Bharat_Mandapam_Pragati_Maidan.jpg"
                    alt="Bharat Dome"
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

                <div className="relative z-20 max-w-[1400px] mx-auto px-6 lg:px-12 w-full h-full flex items-center pt-20">
                    <div className="max-w-4xl">
                        <Link to="/" className="text-white/80 hover:text-white font-medium flex items-center gap-2 mb-8 w-fit transition-colors">
                            <ArrowLeftIcon className="w-5 h-5" />
                            Back to Home
                        </Link>

                        <span className="inline-block px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-6 bg-brics-orange text-white shadow-lg shadow-orange-500/20">
                            Immersive Experience
                        </span>

                        <h1 className="text-5xl md:text-[5rem] font-bold text-white mb-6 leading-[1.1] font-heading drop-shadow-sm tracking-tight">
                            Immersive Bharat Dome
                        </h1>

                        <p className="text-xl text-gray-300 max-w-2xl leading-relaxed">
                            Step inside a 360° projection dome that transcends time and space. From the lunar surface with Chandrayaan to the ancient temples of Hampi, experience India's saga in breathtaking surround reality.
                        </p>
                    </div>
                </div>
            </div>

            <main className="max-w-[1400px] mx-auto px-6 lg:px-12 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <h2 className="text-4xl font-bold text-[var(--color-text)] font-heading">
                            Experience History & Future
                        </h2>
                        <p className="text-lg text-[var(--color-text)] opacity-80 leading-relaxed">
                            The Bharat Dome is a state-of-the-art immersive installation designed to transport visitors to the heart of India's greatest achievements. Using advanced 4K projection mapping and spatial audio, the dome creates a seamless visual environment where the boundaries between the physical and digital dissolve.
                        </p>

                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                    <RocketLaunchIcon className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-[var(--color-text)] mb-2">Space Odyssey</h3>
                                    <p className="text-[var(--color-text)] opacity-70">
                                        Walk on the surface of the moon with <strong>Chandrayaan-3</strong> and witness the preparation for <strong>Gaganyaan</strong>, India's first human spaceflight mission.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                                    <BuildingLibraryIcon className="w-6 h-6 text-orange-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-[var(--color-text)] mb-2">Cultural Heritage</h3>
                                    <p className="text-[var(--color-text)] opacity-70">
                                        Explore digital reconstructions of ancient architectural marvels like the <strong>Sun Temple of Konark</strong> and the <strong>Ajanta Caves</strong> in stunning detail.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative h-[600px] rounded-[2rem] overflow-hidden shadow-2xl">
                        <img
                            src="https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2694&auto=format&fit=crop"
                            alt="Dome Experience"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                            <p className="text-white italic text-lg">"A portal to India's soul."</p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
