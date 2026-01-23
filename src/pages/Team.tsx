import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Team() {
    const team = [
        { name: "Prof. Manoj Singh Gaur", role: "Director, IIT Jammu", image: "https://boldnewsonline.com/wp-content/uploads/2023/07/Prof.-Manoj-Singh-Gaur-1.jpg" },
        { name: "Dr. Sarah Chen", role: "Event Chair", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" },
        { name: "Rajesh Kumar", role: "Student Coordinator", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh" },
        { name: "Dr. Amit Sharma", role: "Technical Lead", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amit" },
    ];

    return (
        <div className="min-h-screen bg-[var(--color-bg)] transition-colors duration-300">
            <Navbar />
            <main className="pt-32 pb-24 px-6 md:px-12 max-w-[1400px] mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text)] mb-8 transition-colors duration-300">Our Team</h1>
                <p className="text-xl text-[var(--color-text)] opacity-80 mb-16 max-w-3xl transition-colors duration-300">
                    Meet the dedicated professionals working behind the scenes to make Pragyaan 2026 a success.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {team.map((member, idx) => (
                        <div key={idx} className="bg-[var(--color-card-bg)] rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all text-center border border-[var(--color-text)]/10 duration-300">
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-32 h-32 rounded-full mx-auto mb-6 bg-black/5 dark:bg-white/5 transition-colors duration-300"
                            />
                            <h3 className="text-xl font-bold text-[var(--color-text)] transition-colors duration-300">{member.name}</h3>
                            <p className="text-brics-blue font-medium mt-2">{member.role}</p>
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
}
