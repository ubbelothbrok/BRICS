import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import eventsData from '../data/db.json';
import { 
    CalendarIcon, 
    MapPinIcon, 
    ClockIcon, 
    ArrowLeftIcon,
    UserGroupIcon,
    ExclamationTriangleIcon,
    EnvelopeIcon
} from '@heroicons/react/24/outline';

interface ScheduleItem {
    time: string;
    activity: string;
}

interface EventItem {
    id: number;
    title: string;
    date: string;
    time: string;
    location: string;
    category: string;
    description: string;
    image: string;
    longDescription?: string;
    schedule?: ScheduleItem[];
    rules?: string[];
    teamSize?: string;
    contact?: string;
}

export default function EventDetails() {
    const { id } = useParams();
    const [event, setEvent] = useState<EventItem | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (id) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const foundEvent = (eventsData as any).events.find((e: any) => e.id === parseInt(id));
            setEvent(foundEvent || null);
        }
        setLoading(false);
    }, [id]);

    if (loading) return null;

    if (!event) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Event Not Found</h2>
                <Link to="/events" className="text-brics-blue font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                    <ArrowLeftIcon className="w-5 h-5" />
                    Back to Events
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Section */}
            <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
                <img 
                    src={event.image} 
                    alt={event.title} 
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 max-w-[1400px] mx-auto w-full">
                    <Link to="/events" className="text-white/80 hover:text-white font-medium flex items-center gap-2 mb-6 w-fit transition-colors">
                        <ArrowLeftIcon className="w-5 h-5" />
                        Back to Events
                    </Link>
                    
                    <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-4 ${
                        event.category === 'Arts' ? 'bg-brics-green text-white' : 
                        event.category === 'Tech' ? 'bg-brics-blue text-white' : 
                        'bg-brics-yellow text-black'
                    }`}>
                        {event.category}
                    </span>
                    
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                        {event.title}
                    </h1>

                    <div className="flex flex-wrap gap-6 text-white/90 text-lg">
                        <div className="flex items-center gap-3">
                            <CalendarIcon className="w-6 h-6 text-brics-yellow" />
                            <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <ClockIcon className="w-6 h-6 text-brics-yellow" />
                            <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <MapPinIcon className="w-6 h-6 text-brics-yellow" />
                            <span>{event.location}</span>
                        </div>
                    </div>
                </div>
            </div>

            <main className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
                
                {/* Left Column: Description & Schedule */}
                <div className="lg:col-span-2 space-y-12">
                    <section>
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">About the Event</h2>
                        <div className="prose prose-lg text-gray-600 leading-relaxed whitespace-pre-line">
                            {event.longDescription || event.description}
                        </div>
                    </section>

                    {event.schedule && (
                        <section>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Event Schedule</h2>
                            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                                <div className="space-y-6">
                                    {event.schedule.map((slot, index) => (
                                        <div key={index} className="flex gap-6 pb-6 border-b border-gray-200 last:border-0 last:pb-0">
                                            <div className="w-24 flex-shrink-0 font-bold text-brics-blue">
                                                {slot.time}
                                            </div>
                                            <div className="text-gray-700 font-medium">
                                                {slot.activity}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}
                </div>

                {/* Right Column: Rules & Info */}
                <div className="space-y-8">
                    {/* Key Info Card */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 sticky top-32">
                        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <ExclamationTriangleIcon className="w-6 h-6 text-brics-orange" />
                            Rules & Guidelines
                        </h3>
                        
                        {event.rules && (
                            <ul className="space-y-4 mb-8">
                                {event.rules.map((rule, index) => (
                                    <li key={index} className="flex gap-3 text-gray-600 text-sm">
                                        <span className="text-brics-blue font-bold">•</span>
                                        {rule}
                                    </li>
                                ))}
                            </ul>
                        )}

                        <div className="pt-6 border-t border-gray-100 space-y-4">
                            <div className="flex items-center gap-3">
                                <UserGroupIcon className="w-5 h-5 text-gray-400" />
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-bold">Team Size</p>
                                    <p className="font-medium text-gray-900">{event.teamSize || 'N/A'}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-3">
                                <EnvelopeIcon className="w-5 h-5 text-gray-400" />
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-bold">Contact</p>
                                    <p className="font-medium text-gray-900">{event.contact || 'N/A'}</p>
                                </div>
                            </div>
                        </div>

                        <button className="w-full mt-8 bg-brics-blue text-white font-bold py-4 rounded-xl hover:bg-blue-900 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-300">
                            Register Now
                        </button>
                    </div>
                </div>

            </main>

            <Footer />
        </div>
    );
}
