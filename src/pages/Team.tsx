import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState, useEffect } from 'react';
import {
    BeakerIcon,
    SparklesIcon,
    ShieldCheckIcon,
    WrenchScrewdriverIcon,
    PaintBrushIcon,
    MegaphoneIcon,
    CodeBracketIcon,
    ChevronDownIcon,
    UserGroupIcon
} from '@heroicons/react/24/outline';

interface TeamMember {
    name: string;
    role: string;
    image: string;
    team: string;
}

interface TeamData {
    [key: string]: TeamMember[];
}

export default function Team() {
    const [teamData, setTeamData] = useState<TeamData>({});
    const [categories, setCategories] = useState<string[]>([]);
    const [activeTab, setActiveTab] = useState("");
    const [volunteerStats, setVolunteerStats] = useState<any[]>([]);
    const [totalStrength, setTotalStrength] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeamData = async () => {
            try {
                const response = await fetch('/data/team/team.csv');
                const text = await response.text();
                const lines = text.split('\n').filter(line => line.trim() !== '');

                // Parse CSV Header (handling spaces in keys)
                // Expected format: Timestamp,Name ,Team ,Role,Your picture 
                const data: TeamData = {};
                const stats: { [key: string]: number } = {};

                const toTitleCase = (str: string) => {
                    return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                };

                // Skip header line 0
                for (let i = 1; i < lines.length; i++) {
                    const line = lines[i];
                    const parts = line.split(',').map(part => part.trim());
                    if (parts.length < 5) continue;

                    const name = toTitleCase(parts[1]);
                    const team = parts[2];
                    const role = parts[3];
                    let imgPath = parts[4];

                    // Handle image path
                    if (imgPath && !imgPath.startsWith('http')) {
                        imgPath = `/data/team/${imgPath}`;
                    }

                    const member: TeamMember = {
                        name,
                        role,
                        image: imgPath,
                        team
                    };

                    if (!data[team]) {
                        data[team] = [];
                    }
                    data[team].push(member);
                    stats[team] = (stats[team] || 0) + 1;
                }

                // Sort members in each team: Head > Co-Head > others
                Object.keys(data).forEach(team => {
                    data[team].sort((a, b) => {
                        const roles = ["Head", "Co-Head"];
                        const aIndex = roles.indexOf(a.role);
                        const bIndex = roles.indexOf(b.role);

                        // If both are leaders, maintain their relative order
                        if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
                        // a is leader, b is not
                        if (aIndex !== -1) return -1;
                        // b is leader, a is not
                        if (bIndex !== -1) return 1;
                        // both are non-leaders, sort alphabetically by name
                        return a.name.localeCompare(b.name);
                    });
                });

                const sortedCategories = Object.keys(data).sort();
                setTeamData(data);
                setCategories(sortedCategories);
                if (sortedCategories.length > 0) {
                    setActiveTab(sortedCategories[0]);
                }

                // Map stats to UI format
                const uiStats = Object.entries(stats).map(([name, count]) => {
                    // Try to match with existing icons or use default
                    const iconMap: { [key: string]: any } = {
                        "Hospitality": SparklesIcon,
                        "Security": ShieldCheckIcon,
                        "Design": PaintBrushIcon,
                        "Robotics": WrenchScrewdriverIcon,
                        "Outreach": MegaphoneIcon,
                        "ATL": BeakerIcon,
                        "Coding Club": CodeBracketIcon,
                        "AR/VR": CodeBracketIcon,
                        "Media Making": MegaphoneIcon,
                        "Sponsorship": SparklesIcon,
                        "Infra": WrenchScrewdriverIcon,
                    };
                    const colorMap: { [key: string]: string } = {
                        "Hospitality": "from-pink-500 to-rose-500",
                        "Design": "from-fuchsia-500 to-purple-500",
                        "ATL": "from-purple-500 to-indigo-500",
                        "Security": "from-blue-500 to-cyan-500",
                        "Coding Club": "from-blue-600 to-indigo-600",
                        "Outreach": "from-orange-500 to-red-600",
                        "Media Making": "from-emerald-500 to-teal-600",
                    };

                    return {
                        name: name.toUpperCase(),
                        count,
                        icon: iconMap[name] || UserGroupIcon,
                        color: colorMap[name] || "from-sky-500 to-blue-500"
                    };
                }).sort((a, b) => b.count - a.count); // Show all teams

                const total = Object.values(stats).reduce((acc, curr) => acc + curr, 0);
                setTotalStrength(total);
                setVolunteerStats(uiStats);
                setLoading(false);
            } catch (error) {
                console.error("Error loading team data:", error);
                setLoading(false);
            }
        };

        fetchTeamData();
    }, []);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    if (loading) return <div className="min-h-screen flex items-center justify-center font-bold text-brics-blue">Loading Team...</div>;


    return (
        <div className="min-h-screen bg-[var(--color-bg)] transition-colors duration-300">
            <Navbar />
            <main className="pt-32 pb-24 px-6 md:px-12 max-w-[1400px] mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-[var(--color-text)] mb-6 transition-colors duration-300 tracking-tight">
                        Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-brics-blue to-purple-600">Team</span>
                    </h1>
                    <p className="text-xl text-[var(--color-text)] opacity-80 max-w-2xl mx-auto transition-colors duration-300">
                        The brilliant minds and dedicated souls powering Pragyaan 2026.
                    </p>
                </div>

                {/* Team Navigation Section - Dropdown for Mobile/Desktop */}
                <div className="mb-24 relative z-[60]">
                    <div className="max-w-md mx-auto relative">
                        <label className="block text-sm font-bold text-[var(--color-text)]/60 uppercase tracking-widest mb-4 text-center">
                            Select Department
                        </label>
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="w-full flex items-center justify-between px-8 py-5 bg-[var(--color-card-bg)] border border-[var(--color-text)]/10 rounded-3xl shadow-xl hover:shadow-2xl hover:border-brics-blue/30 transition-all group overflow-hidden relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-brics-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <span className="text-xl font-bold text-[var(--color-text)] relative z-10">{activeTab || "Select Team"}</span>
                            <ChevronDownIcon className={`w-6 h-6 text-brics-blue transition-transform duration-500 relative z-10 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <div className="absolute top-full left-0 right-0 mt-4 bg-[var(--color-card-bg)] border border-[var(--color-text)]/10 rounded-3xl shadow-2xl overflow-hidden z-[70] animate-fadeIn backdrop-blur-xl bg-opacity-95">
                                <div className="max-h-[400px] overflow-y-auto py-4 custom-scrollbar">
                                    {categories.map((category: string) => (
                                        <button
                                            key={category}
                                            onClick={() => {
                                                setActiveTab(category);
                                                setIsDropdownOpen(false);
                                            }}
                                            className={`w-full text-left px-8 py-4 text-lg font-semibold transition-all hover:bg-brics-blue hover:text-white ${activeTab === category ? 'bg-brics-blue/10 text-brics-blue' : 'text-[var(--color-text)]'
                                                }`}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Active Tab Content */}
                <div className="min-h-[400px] px-4 mb-24 transition-all duration-500">
                    <div key={activeTab} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-fadeIn">
                        {(teamData[activeTab] || []).map((member: TeamMember, idx: number) => {
                            const isLeader = member.role.toLowerCase().includes('head');
                            return (
                                <div
                                    key={idx}
                                    className={`group relative bg-[var(--color-card-bg)] rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 flex flex-col items-center text-center overflow-hidden hover:-translate-y-2 ${isLeader
                                        ? 'border-brics-blue/40 bg-gradient-to-b from-brics-blue/5 to-transparent'
                                        : 'border-[var(--color-text)]/5'
                                        }`}
                                    style={{ animationDelay: `${idx * 100}ms` }}
                                >
                                    {/* Glassmorphism Hover Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brics-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                                    <div className={`w-32 h-32 rounded-full p-1 mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md ${isLeader ? 'bg-gradient-to-br from-yellow-400 to-orange-500' : 'bg-gradient-to-br from-blue-300 to-purple-300'
                                        }`}>
                                        <div className="w-full h-full rounded-full overflow-hidden bg-white">
                                            <img
                                                src={member.image}
                                                alt={member.name}
                                                className="w-full h-full object-cover"
                                                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                                    (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`;
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <h3 className="font-bold text-[var(--color-text)] text-xl mb-2 group-hover:text-brics-blue transition-colors">{member.name}</h3>
                                    <div className={`text-sm font-semibold text-white px-4 py-1.5 rounded-full shadow-sm ${isLeader ? 'bg-gradient-to-r from-orange-500 to-red-600' : 'bg-gradient-to-r from-brics-blue to-indigo-600'
                                        }`}>
                                        {member.role}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Enhanced Volunteers Stats Section */}
                <div className="max-w-7xl mx-auto mb-16">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--color-text)] tracking-tight mb-4">
                            Volunteer <span className="text-brics-blue">Force</span>
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-brics-blue to-indigo-600 mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {volunteerStats.map((stat: any, idx: number) => (
                            <div
                                key={idx}
                                className="relative group bg-[var(--color-card-bg)] rounded-3xl p-8 border border-[var(--color-text)]/5 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                            >
                                {/* Background Gradient Blob */}
                                <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full bg-gradient-to-br ${stat.color} opacity-10 group-hover:opacity-20 transition-opacity blur-xl`}></div>

                                <div className="relative z-10 flex flex-col items-center">
                                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                        <stat.icon className="w-8 h-8" />
                                    </div>

                                    <div className="text-4xl font-extrabold text-[var(--color-text)] mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-brics-blue group-hover:to-indigo-600 transition-all">
                                        {stat.count}
                                    </div>

                                    <div className="text-sm font-bold tracking-widest text-[var(--color-text)]/60 uppercase group-hover:text-[var(--color-text)]/80">
                                        {stat.name}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Grand Total Hero Stat */}
                    <div className="mt-12 text-center animate-fadeIn" style={{ animationDelay: '500ms' }}>
                        <div className="inline-flex items-center gap-4 bg-[var(--color-card-bg)] px-8 py-4 rounded-full shadow-lg border border-[var(--color-text)]/5 hover:border-brics-blue/30 transition-all">
                            <span className="flex items-center justify-center w-12 h-12 bg-brics-blue rounded-full text-white">
                                <UserGroupIcon className="w-6 h-6" />
                            </span>
                            <div className="text-left">
                                <p className="text-sm text-[var(--color-text)]/60 font-medium uppercase tracking-wider">Total Strength</p>
                                <p className="text-2xl font-bold text-[var(--color-text)]">
                                    <span className="text-brics-blue">{totalStrength}+</span> Dedicated Members
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
