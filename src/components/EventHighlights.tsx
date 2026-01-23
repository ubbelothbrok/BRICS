import {
    BeakerIcon,
    LightBulbIcon,
    AcademicCapIcon,
    RocketLaunchIcon,
    PaintBrushIcon,
    UserGroupIcon,
    IdentificationIcon,
    BuildingLibraryIcon,
    CpuChipIcon
} from '@heroicons/react/24/outline';

export default function EventHighlights() {
    const highlights = [
        { name: 'Robotics & AI', icon: CpuChipIcon, description: 'Live demos of autonomous drones and VTOL prototypes.', color: 'bg-blue-50 text-blue-600' },
        { name: 'STEM Exhibits', icon: BeakerIcon, description: '50+ interactive stalls showcasing innovative research.', color: 'bg-green-50 text-green-600' },
        { name: 'Artech Gallery', icon: PaintBrushIcon, description: 'Exploring the intersection of creativity and technology.', color: 'bg-purple-50 text-purple-600' },
        { name: 'IITian Interaction', icon: UserGroupIcon, description: 'Candid sessions with current students about campus life.', color: 'bg-orange-50 text-orange-600' },
        { name: 'Career Guidance', icon: IdentificationIcon, description: 'Insights into engineering branches and career paths.', color: 'bg-red-50 text-red-600' },
        { name: 'Innovation Hub', icon: LightBulbIcon, description: 'Space for startups and future-forward solutions.', color: 'bg-yellow-50 text-yellow-600' },
        { name: 'Campus Tour', icon: BuildingLibraryIcon, description: 'Exclusive look at state-of-the-art labs and infrastructure.', color: 'bg-teal-50 text-teal-600' },
        { name: 'Science Shows', icon: RocketLaunchIcon, description: 'Breathtaking demonstrations and interactive experiments.', color: 'bg-indigo-50 text-indigo-600' },
        { name: 'Workshops', icon: AcademicCapIcon, description: 'Hands-on modules to master engineering skills.', color: 'bg-pink-50 text-pink-600' },
    ];

    return (
        <section id="highlights" className="py-24 bg-[var(--color-bg)] transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-brics-blue font-semibold tracking-wide uppercase text-sm">Experience Pragyaan</span>
                    <h2 className="mt-2 text-4xl font-bold text-[var(--color-text)] transition-colors duration-300">Event Highlights</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-brics-blue to-brics-blue/60 mx-auto mt-6 rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {highlights.map((item) => (
                        <div key={item.name} className="group relative bg-[var(--color-card-bg)] rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-8 flex flex-col items-center text-center border border-[var(--color-border)] hover:border-brics-blue">
                            <div className={`w-16 h-16 rounded-full ${item.color.replace('bg-', 'dark:bg-opacity-20 bg-')} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                <item.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-[var(--color-text)] mb-3 transition-colors duration-300">{item.name}</h3>
                            <p className="text-[var(--color-text)] opacity-80 leading-relaxed transition-opacity duration-300">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
