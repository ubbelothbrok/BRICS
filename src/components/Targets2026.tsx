import { ArrowTrendingUpIcon, AcademicCapIcon, BuildingLibraryIcon, UserGroupIcon } from '@heroicons/react/24/outline';

const targets = [
    {
        label: "Expected Footfall",
        value: "5000+",
        subtext: "Students & Teachers",
        icon: UserGroupIcon,
        color: "text-brics-blue",
    },
    {
        label: "Participating Schools",
        value: "85+",
        subtext: "Across J&K Region",
        icon: BuildingLibraryIcon,
        color: "text-brics-green",
    },
    {
        label: "Interactive Stalls",
        value: "50+",
        subtext: "STEM, Arts & Innovation",
        icon: AcademicCapIcon,
        color: "text-brics-red",
    },
    {
        label: "Growth from 2025",
        value: "25%",
        subtext: "Projected Increase",
        icon: ArrowTrendingUpIcon,
        color: "text-brics-yellow",
    },
];

export default function Targets2026() {
    return (
        <section id="vision" className="py-24 bg-white">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-16">
                    {/* Text Content */}
                    <div className="md:w-1/3">
                        <h2 className="text-4xl font-bold mb-6 text-brics-dark">Our Vision for 2026</h2>
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            Building on the massive success of Pragyaan 2025, we are scaling up to reach even more young minds.
                        </p>
                        <p className="text-gray-600 mb-8">
                            With a target of over 5000 students and 85+ schools, Pragyaan 2026 aims to be the largest open-day event in the region, bridging the gap between advanced technology and school education.
                        </p>
                        <button className="px-8 py-3 bg-brics-blue text-white rounded-full font-medium hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl">
                            Register Your School
                        </button>
                    </div>

                    {/* Stats Grid */}
                    <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                        {targets.map((target) => (
                            <div key={target.label} className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-lg transition-all duration-300">
                                <div className="flex items-start justify-between mb-4">
                                    <target.icon className={`w-10 h-10 ${target.color}`} />
                                    <span className={`text-4xl font-bold ${target.color}`}>{target.value}</span>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">{target.label}</h3>
                                <p className="text-gray-500 text-sm mt-1">{target.subtext}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
