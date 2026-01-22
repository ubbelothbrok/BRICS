import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Team() {
    const team = [
        { name: "Dr. Sarah Chen", role: "Event Director", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" },
        { name: "Rajesh Kumar", role: "Program Coordinator", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh" },
        { name: "Elena Volkov", role: "International Liaison", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena" },
        { name: "David Nkosi", role: "Logistics Manager", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=David" },
    ];

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main className="pt-32 pb-24 px-6 md:px-12 max-w-[1400px] mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Our Team</h1>
                <p className="text-xl text-gray-600 mb-16 max-w-3xl">
                    Meet the dedicated professionals working behind the scenes to make Pragyaan 2026 a success.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {team.map((member, idx) => (
                        <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all text-center border border-gray-100">
                            <img 
                                src={member.image} 
                                alt={member.name}
                                className="w-32 h-32 rounded-full mx-auto mb-6 bg-gray-50"
                            />
                            <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                            <p className="text-brics-blue font-medium mt-2">{member.role}</p>
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
}
