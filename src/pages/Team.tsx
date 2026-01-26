import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState } from 'react';
import {
    BeakerIcon,
    SparklesIcon,
    ShieldCheckIcon,
    WrenchScrewdriverIcon,
    PaintBrushIcon,
    CameraIcon,
    MegaphoneIcon,
    CodeBracketIcon,
    UserGroupIcon
} from '@heroicons/react/24/outline';

// Enhanced Data Structure
const TEAM_DATA = {
    "Technical": [
        { name: "Aryan Sheel", role: "Head", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aryan" },
        { name: "Rohan Gupta", role: "Volunteer", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan" },
        { name: "Sneha Patel", role: "Volunteer", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha" },
        { name: "Vikram Singh", role: "Volunteer", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram" },
        { name: "Anjali Sharma", role: "Volunteer", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anjali" },
        { name: "Kabir Das", role: "Volunteer", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kabir" },
    ],
    "Arts": [
        { name: "Raghav Jaiman", role: "Head", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Raghav" },
        { name: "Vaishnavi Singh", role: "Head", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vaishnavi" },
        { name: "Priya Mehta", role: "Volunteer", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya" },
        { name: "Arjun Reddy", role: "Volunteer", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun" },
        { name: "Sana Khan", role: "Volunteer", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sana" },
        { name: "Mira Nair", role: "Volunteer", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mira" },
    ],
    "Hospitality": [
        { name: "Nipun Singh", role: "Head", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nipun" },
        { name: "Raj Malhotra", role: "Volunteer", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Raj" },
        { name: "Simran Kaur", role: "Volunteer", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Simran" },
        { name: "Amit Verma", role: "Volunteer", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=AmitV" },
        { name: "Neha Gupta", role: "Volunteer", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Neha" },
    ],
    "Coverage": [
        { name: "Yash Faujzar", role: "Head", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Yash" },
        { name: "Deepak Kumar", role: "Editor", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Deepak" },
        { name: "Aisha Siddiqui", role: "Photographer", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha" },
        { name: "Ravi Kishan", role: "Videographer", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ravi" },
    ],
    "Public Relations": [
        { name: "Rahul Kumar", role: "Head", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul" },
        { name: "Pooja Hegde", role: "Manager", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pooja" },
        { name: "Kunal Shah", role: "Executive", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kunal" },
        { name: "Tanya Roy", role: "Executive", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tanya" },
    ],
    "Design": [
        { name: "Devesh Sharma", role: "Head", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Devesh" },
        { name: "Ishan Khattar", role: "Graphic Designer", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ishan" },
        { name: "Tara Sutaria", role: "Illustrator", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tara" },
        { name: "Zain Imam", role: "UI Designer", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zain" },
    ],
    "Infra": [
        { name: "Vibhu Gupta", role: "Head", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vibhu" },
        { name: "Vivek Sawalkar", role: "Head", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vivek" },
        { name: "Sam Wilson", role: "Logistics", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sam" },
        { name: "Natasha Romanoff", role: "Manager", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Natasha" },
    ],
    "Security": [
        { name: "Vishal Kumar", role: "Head", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vishal" },
        { name: "Bruce Wayne", role: "Advisor", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bruce" },
        { name: "Clark Kent", role: "Officer", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Clark" },
        { name: "Diana Prince", role: "Officer", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Diana" },
    ],
    "Web Development": [
        { name: "Aryan Raj", role: "Head", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=AryanR" },
        { name: "Peter Parker", role: "Frontend Dev", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Peter" },
        { name: "Tony Stark", role: "Backend Dev", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tony" },
        { name: "Steve Rogers", role: "QA", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Steve" },
    ],
    "Coordinator": [
        { name: "Ashutosh Vishwakarma", role: "Coordinator", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ashutosh" },
        { name: "Aditi Rao", role: "Assistant Coordinator", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aditi" },
        { name: "Manish Paul", role: "Manager", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Manish" },
    ]
};

const CATEGORIES = Object.keys(TEAM_DATA);

const VOLUNTEER_STATS = [
    { name: "SCIENCE FAIR", count: 5, icon: BeakerIcon, color: "from-purple-500 to-indigo-500" },
    { name: "HOSPITALITY", count: 30, icon: SparklesIcon, color: "from-pink-500 to-rose-500" },
    { name: "SECURITY", count: 18, icon: ShieldCheckIcon, color: "from-blue-500 to-cyan-500" },
    { name: "INFRA", count: 2, icon: WrenchScrewdriverIcon, color: "from-orange-500 to-amber-500" },
    { name: "DESIGN", count: 8, icon: PaintBrushIcon, color: "from-fuchsia-500 to-purple-500" },
    { name: "COVERAGE", count: 7, icon: CameraIcon, color: "from-red-500 to-orange-500" },
    { name: "PR", count: 14, icon: MegaphoneIcon, color: "from-green-500 to-emerald-500" },
    { name: "WEB DEV", count: 6, icon: CodeBracketIcon, color: "from-sky-500 to-blue-500" },
];

export default function Team() {
    const [activeTab, setActiveTab] = useState("Technical");

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

                {/* Team Tabs Section */}
                <div className="mb-24">
                    {/* Tabs Navigation */}
                    <div className="flex flex-wrap justify-center gap-3 mb-16 z-20 bg-[var(--color-bg)]/80 backdrop-blur-md p-4 rounded-full mx-auto max-w-fit shadow-sm border border-[var(--color-text)]/5 transition-all">
                        {CATEGORIES.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveTab(category)}
                                className={`px-5 py-2.5 rounded-full text-sm md:text-base font-semibold transition-all duration-300 relative overflow-hidden group ${activeTab === category
                                    ? "text-white shadow-lg shadow-blue-500/30 scale-105"
                                    : "text-[var(--color-text)] hover:bg-[var(--color-text)]/5"
                                    }`}
                            >
                                <span className={`absolute inset-0 bg-gradient-to-r from-brics-blue to-indigo-600 transition-opacity duration-300 ${activeTab === category ? 'opacity-100' : 'opacity-0'}`}></span>
                                <span className="relative z-10">{category}</span>
                            </button>
                        ))}
                    </div>

                    {/* Active Tab Content */}
                    <div className="min-h-[400px] px-4">
                        <div key={activeTab} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-fadeIn">
                            {TEAM_DATA[activeTab as keyof typeof TEAM_DATA].map((member, idx) => (
                                <div
                                    key={idx}
                                    className="group relative bg-[var(--color-card-bg)] rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-[var(--color-text)]/5 flex flex-col items-center text-center overflow-hidden hover:-translate-y-2"
                                    style={{ animationDelay: `${idx * 100}ms` }}
                                >
                                    {/* Glassmorphism Hover Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brics-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                                    <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-br from-blue-300 to-purple-300 mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md">
                                        <div className="w-full h-full rounded-full overflow-hidden bg-white">
                                            <img
                                                src={member.image}
                                                alt={member.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>

                                    <h3 className="font-bold text-[var(--color-text)] text-xl mb-2 group-hover:text-brics-blue transition-colors">{member.name}</h3>
                                    <div className="text-sm font-semibold text-white bg-gradient-to-r from-brics-blue to-indigo-600 px-4 py-1.5 rounded-full shadow-sm">
                                        {member.role}
                                    </div>

                                    {/* Social Icons Placeholder */}
                                    <div className="flex gap-4 mt-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white cursor-pointer transition-colors">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                                        </div>
                                        <div className="w-8 h-8 rounded-full bg-blue-400/10 flex items-center justify-center text-blue-400 hover:bg-blue-400 hover:text-white cursor-pointer transition-colors">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
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
                        {VOLUNTEER_STATS.map((stat, idx) => (
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
                                    <span className="text-brics-blue">90+</span> Dedicated Members
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
