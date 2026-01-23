import { BeakerIcon, CpuChipIcon, PaintBrushIcon, BookOpenIcon, RocketLaunchIcon, UserGroupIcon } from '@heroicons/react/24/outline';

const zones = [
    {
        name: "STEM Zone",
        description: "Hands-on experience with Robotics, AI, AR/VR, Drones, and Astronomy.",
        icon: CpuChipIcon,
        color: "bg-blue-50 text-blue-600",
    },
    {
        name: "Science Zone",
        description: "Live experiments and demos from Physics, Chemistry, and Biology labs.",
        icon: BeakerIcon,
        color: "bg-green-50 text-green-600",
    },
    {
        name: "Arts Zone",
        description: "Painting exhibitions, Elocution, Bracelet making, and Documentaries.",
        icon: PaintBrushIcon,
        color: "bg-purple-50 text-purple-600",
    },
    {
        name: "Innovation Zone",
        description: "Showcasing cutting-edge products from industry partners and local startups.",
        icon: RocketLaunchIcon,
        color: "bg-orange-50 text-orange-600",
    },
    {
        name: "Student Zone",
        description: "Innovative projects displayed by students from 85+ participating schools.",
        icon: UserGroupIcon,
        color: "bg-red-50 text-red-600",
    },
    {
        name: "Book Zone",
        description: "A comprehensive collection of books to inspire young curious minds.",
        icon: BookOpenIcon,
        color: "bg-yellow-50 text-yellow-600",
    },
];

export default function Zones() {
    return (
        <section id="zones" className="py-24 bg-[var(--color-bg)] transition-colors duration-300">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4 text-[var(--color-text)] transition-colors duration-300">Event Zones</h2>
                    <p className="text-xl text-[var(--color-text)] opacity-80 max-w-2xl mx-auto transition-colors duration-300">
                        Discover six distinct zones designed to spark curiosity and creativity across Science, Technology, and Arts.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {zones.map((zone) => (
                        <div
                            key={zone.name}
                            className="group bg-[var(--color-card-bg)] rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border border-[var(--color-text)]/10 hover:-translate-y-1"
                        >
                            <div className={`w-14 h-14 rounded-xl ${zone.color.replace('bg-', 'dark:bg-opacity-20 bg-')} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                <zone.icon className="w-8 h-8" />
                            </div>

                            <h3 className="text-2xl font-bold mb-3 text-[var(--color-text)] group-hover:text-brics-blue transition-colors duration-300">
                                {zone.name}
                            </h3>

                            <p className="text-[var(--color-text)] opacity-80 leading-relaxed transition-colors duration-300">
                                {zone.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
