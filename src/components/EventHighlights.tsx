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
        { name: 'Robotics & AI', icon: CpuChipIcon, description: 'Live demos of autonomous drones and VTOL prototypes.' },
        { name: 'STEM Exhibits', icon: BeakerIcon, description: '50+ interactive stalls showcasing innovative research.' },
        { name: 'Artech Gallery', icon: PaintBrushIcon, description: 'Exploring the intersection of creativity and technology.' },
        { name: 'IITian Interaction', icon: UserGroupIcon, description: 'Candid sessions with current students about campus life.' },
        { name: 'Career Guidance', icon: IdentificationIcon, description: 'Insights into engineering branches and career paths.' },
        { name: 'Innovation Hub', icon: LightBulbIcon, description: 'Space for startups and future-forward solutions.' },
        { name: 'Campus Tour', icon: BuildingLibraryIcon, description: 'Exclusive look at state-of-the-art labs and infrastructure.' },
        { name: 'Science Shows', icon: RocketLaunchIcon, description: 'Breathtaking demonstrations and interactive experiments.' },
        { name: 'Workshops', icon: AcademicCapIcon, description: 'Hands-on modules to master engineering skills.' },
    ];

    return (
        <section id="highlights" className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-brics-blue font-semibold tracking-wide uppercase text-sm">Experience Pragyaan</span>
                    <h2 className="mt-2 text-4xl font-bold text-gray-900">Event Highlights</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-brics-blue to-brics-blue/60 mx-auto mt-6 rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {highlights.map((item) => (
                        <div key={item.name} className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-8 flex flex-col items-center text-center border border-gray-100 hover:border-brics-blue">
                            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <item.icon className="w-8 h-8 text-brics-blue" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{item.name}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
