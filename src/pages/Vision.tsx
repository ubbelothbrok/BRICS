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
                        "Fostering High-Quality BRICS Partnership, Ushering in a New Era 
                        of Global Development"
                    </p>

                    <div className="grid md:grid-cols-2 gap-12 mt-12">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Strategic Goals</h3>
                            <ul className="space-y-4 list-disc pl-5">
                                <li>Enhancing economic cooperation and trade facilitation.</li>
                                <li>Promoting digital economy and technological innovation.</li>
                                <li>Strengthening people-to-people exchanges and cultural bonds.</li>
                                <li>Advancing sustainable development and climate action.</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Global Impact</h3>
                            <p>
                                By 2026, we aim to establish a robust framework for inter-regional 
                                collaboration that not only benefits member nations but contributes 
                                significantly to global stability and prosperity.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
