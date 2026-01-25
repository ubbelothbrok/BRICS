import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { BeakerIcon, CpuChipIcon, PaintBrushIcon, BookOpenIcon, RocketLaunchIcon, UserGroupIcon } from '@heroicons/react/24/outline';

const ZONES_DATA = [
    {
        id: 'stem',
        name: "STEM Zone",
        tagline: "The Future is Here",
        description: "Hands-on experience with Robotics, AI, AR/VR, Drones, and Astronomy.",
        longDescription: "Step into the future with our STEM Zone. From piloting high-speed drones to building your own AR structures, this zone is packed with interactive technologies. Experience the wonders of the cosmos in our portable planetarium and interact with autonomous robots built by IIT Jammu students.",
        icon: CpuChipIcon,
        color: "bg-blue-50 text-blue-600 border-blue-100",
        image: "/images/ar_builder.jpg",
        activities: ["Drone Flight Simulators", "AR/VR Experience", "Robotics Showcase", "Portable Planetarium"]
    },
    {
        id: 'science',
        name: "Science Zone",
        tagline: "Experiment & Explore",
        description: "Live experiments and demos from Physics, Chemistry, and Biology labs.",
        longDescription: "Science comes alive here! Witness mind-bending physics demonstrations, colorful chemistry magic shows, and explore the microscopic world. Our faculty and students will guide you through experiments that explain the fundamental laws of our universe in fun, engaging ways.",
        icon: BeakerIcon,
        color: "bg-green-50 text-green-600 border-green-100",
        image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800",
        activities: ["Chemistry Magic Show", "Physics Paradoxes", "Microscopy Lab", "Liquid Nitrogen Demos"]
    },
    {
        id: 'arts',
        name: "Arts Zone",
        tagline: "Creativity Unleashed",
        description: "Painting exhibitions, Elocution, Bracelet making, and Documentaries.",
        longDescription: "Where imagination meets expression. The Arts Zone features a gallery of student artwork, live painting competitions, and creative workshops. Whether you want to try your hand at bracelet making or watch thought-provoking documentaries, this is your creative sanctuary.",
        icon: PaintBrushIcon,
        color: "bg-purple-50 text-purple-600 border-purple-100",
        image: "/images/painting_live.jpg",
        activities: ["Live Painting", "Art Gallery", "Craft Workshops", "Film Screenings"]
    },
    {
        id: 'innovation',
        name: "Innovation Zone",
        tagline: "Ideas into Impact",
        description: "Showcasing cutting-edge products from industry partners and local startups.",
        longDescription: "Meet the change-makers. This zone hosts startups and industry partners showcasing their latest innovations. See how ideas turn into products that solve real-world problems. Interact with founders and learn about the entrepreneurial journey.",
        icon: RocketLaunchIcon,
        color: "bg-orange-50 text-orange-600 border-orange-100",
        image: "/images/manthan/stem.png",
        activities: ["Startup Expo", "Prototype Demos", "Founder Talks", "Industrial Solutions"]
    },
    {
        id: 'student',
        name: "Student Zone",
        tagline: "Young Innovators",
        description: "Innovative projects displayed by students from 85+ participating schools.",
        longDescription: "The heart of Pragyaan. Participating schools from across the region showcase their best science and art projects. Walk through rows of ingenuity and see what your peers are building to tackle local and global challenges.",
        icon: UserGroupIcon,
        color: "bg-red-50 text-red-600 border-red-100",
        image: "/images/tinkering_workshop.png",
        activities: ["School Project Expo", "Peer Learning", "Competition Displays", "Interactive Models"]
    },
    {
        id: 'books',
        name: "Book Zone",
        tagline: "Knowledge Unbound",
        description: "A comprehensive collection of books to inspire young curious minds.",
        longDescription: "A quiet corner for the curious. Browse through a carefully curated collection of books ranging from popular science and technology to biographies of great innovators. Sit down, read a page, and let your mind wander.",
        icon: BookOpenIcon,
        color: "bg-yellow-50 text-yellow-600 border-yellow-100",
        image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=800",
        activities: ["Book Fair", "Reading Corner", "Author Sessions", "Literary Quizzes"]
    }
];

export default function Zones() {
    return (
        <div className="min-h-screen bg-[var(--color-bg)] transition-colors duration-300">
            <Navbar />

            <main className="pt-32 pb-24 px-6 md:px-12 max-w-[1400px] mx-auto">
                <div className="text-center mb-20">
                    <h1 className="text-5xl md:text-6xl font-bold text-[var(--color-text)] mb-6 font-heading tracking-tight">
                        Explore Our <span className="text-brics-blue">Engagement Zones</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Pragyaan 2026 is divided into six distinct zones, each offering unique experiences designed to spark curiosity, foster creativity, and celebrate innovation.
                    </p>
                </div>

                <div className="space-y-24">
                    {ZONES_DATA.map((zone, index) => (
                        <div
                            key={zone.id}
                            id={zone.id}
                            className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
                        >
                            {/* Image Section */}
                            <div className="w-full lg:w-1/2">
                                <div className="relative group rounded-3xl overflow-hidden shadow-2xl">
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500 z-10"></div>
                                    <img
                                        src={zone.image}
                                        alt={zone.name}
                                        className="w-full h-[400px] object-cover transform transition-transform duration-700 group-hover:scale-105"
                                    />
                                    {/* Floating Icon */}
                                    <div className={`absolute top-6 left-6 w-16 h-16 rounded-2xl ${zone.color.split(' ')[0]} bg-opacity-90 backdrop-blur-md flex items-center justify-center shadow-lg z-20`}>
                                        <zone.icon className={`w-8 h-8 ${zone.color.split(' ')[1]}`} />
                                    </div>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="w-full lg:w-1/2 space-y-6">
                                <div className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider ${zone.color.replace('border', 'bg').replace('text', 'bg-opacity-10 text')}`}>
                                    {zone.tagline}
                                </div>
                                <h2 className="text-4xl font-bold text-[var(--color-text)] font-heading">
                                    {zone.name}
                                </h2>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    {zone.longDescription}
                                </p>

                                <div className="pt-4">
                                    <h4 className="font-bold text-gray-900 mb-4 uppercase text-sm tracking-wide">Key Highlights</h4>
                                    <div className="grid grid-cols-2 gap-3">
                                        {zone.activities.map((activity, i) => (
                                            <div key={i} className="flex items-center gap-2 text-gray-700">
                                                <div className={`w-2 h-2 rounded-full ${zone.color.split(' ')[0].replace('bg-', 'bg-')}`}></div>
                                                <span>{activity}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}
