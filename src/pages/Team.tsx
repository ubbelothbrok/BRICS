import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Team() {
    // Original core team (minus Director)
    const initialTeam = [
        { name: "Dr. Sarah Chen", role: "Event Chair", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" },
        { name: "Rajesh Kumar", role: "Student Coordinator", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh" },
        { name: "Dr. Amit Sharma", role: "Technical Lead", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amit" },
    ];

    // Generate 20 demo members
    const demoMembers = Array.from({ length: 20 }, (_, i) => ({
        name: `Team Member ${i + 1}`,
        role: "Volunteer",
        image: `https://api.dicebear.com/7.x/avataaars/svg?seed=Member${i + 1}`
    }));

    // const team = [...initialTeam, ...demoMembers]; // No longer needed as a single list

    return (
        <div className="min-h-screen bg-[var(--color-bg)] transition-colors duration-300">
            <Navbar />
            <main className="pt-32 pb-24 px-6 md:px-12 max-w-[1400px] mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text)] mb-6 transition-colors duration-300">Our Team</h1>
                    <p className="text-xl text-[var(--color-text)] opacity-80 max-w-2xl mx-auto transition-colors duration-300">
                        Meet the dedicated professionals working behind the scenes to make Pragyaan 2026 a success.
                    </p>
                </div>

                {/* Core Team - Prominent Display */}
                <div className="mb-20">
                    <h2 className="text-2xl font-bold text-center mb-12 text-[var(--color-text)] relative inline-block left-1/2 transform -translate-x-1/2 after:content-[''] after:block after:w-1/2 after:h-1 after:bg-brics-blue after:mx-auto after:mt-2 after:rounded-full">
                        Leadership
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {initialTeam.map((member, idx) => (
                            <div key={`core-${idx}`} className="bg-[var(--color-card-bg)] rounded-2xl p-8 shadow-lg hover:-translate-y-2 transition-transform duration-300 border border-[var(--color-text)]/10 text-center group">
                                <div className="relative inline-block mb-6">
                                    <div className="absolute inset-0 bg-brics-blue/20 rounded-full blur-xl group-hover:blur-2xl transition-all opacity-0 group-hover:opacity-100"></div>
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-40 h-40 rounded-full relative z-10 object-cover border-4 border-[var(--color-bg)] shadow-md"
                                    />
                                </div>
                                <h3 className="text-2xl font-bold text-[var(--color-text)] mb-2">{member.name}</h3>
                                <p className="text-brics-blue font-medium bg-brics-blue/10 inline-block px-4 py-1 rounded-full text-sm">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Volunteers - Masonry / Grid Unique Layout */}
                <div>
                    <h2 className="text-2xl font-bold text-center mb-12 text-[var(--color-text)] opacity-80">
                        The Extended Team
                    </h2>

                    {/* Unique Staggered Layout */}
                    <div className="columns-1 sm:columns-2 lg:columns-4 gap-6 space-y-6">
                        {demoMembers.map((member, idx) => (
                            <div
                                key={`demo-${idx}`}
                                className="break-inside-avoid bg-[var(--color-card-bg)] rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-[var(--color-text)]/5 flex items-center space-x-4 hover:scale-[1.02] duration-300"
                            >
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-16 h-16 rounded-full bg-gray-100"
                                />
                                <div className="text-left">
                                    <h3 className="font-bold text-[var(--color-text)] text-lg leading-tight">{member.name}</h3>
                                    <p className="text-sm text-[var(--color-text-muted)] opacity-70">{member.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
