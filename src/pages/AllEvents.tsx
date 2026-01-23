import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import eventsData from '../data/db.json';
import { CalendarIcon, MapPinIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

interface EventItem {
    id: number;
    title: string;
    date: string;
    location: string;
    time: string;
    description: string;
    category: string;
    image: string;
}

export default function AllEvents() {
    const [events, setEvents] = useState<EventItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setEvents((eventsData as any).events);
        setLoading(false);
    }, []);



    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <main className="pt-32 pb-24">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                    <div className="mb-12">
                        <Link to="/" className="text-brics-blue font-semibold flex items-center gap-2 mb-8 hover:gap-3 transition-all w-fit">
                            <ArrowLeftIcon className="w-5 h-5" />
                            Back to Home
                        </Link>
                        <h1 className="text-5xl font-bold text-brics-dark">Events Calendar</h1>
                        <p className="text-xl text-gray-600 mt-4">Explore all summits, forums, and gatherings for BRICS 2026.</p>
                    </div>

                    {loading ? (
                        <div className="py-24 text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brics-blue mx-auto"></div>
                            <p className="mt-4 text-gray-600">Loading events...</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {events.map((event) => (
                                <Link
                                    to={`/events/${event.id}`}
                                    key={event.id}
                                    className="group relative h-[450px] overflow-hidden rounded-2xl shadow-lg block"
                                >
                                    {/* Background Image */}
                                    <img
                                        src={event.image}
                                        alt={event.title}
                                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    
                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80"></div>

                                    {/* Content */}
                                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white transition-transform duration-500 translate-y-[100px] group-hover:translate-y-0">
                                        
                                        <div className="mb-4 flex items-center gap-3">
                                            <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur-md ${
                                                event.category === 'Arts' ? 'bg-brics-green/80 text-white' : 
                                                event.category === 'Tech' ? 'bg-brics-blue/80 text-white' : 
                                                'bg-brics-yellow/80 text-black'
                                            }`}>
                                                {event.category}
                                            </span>
                                        </div>

                                        <h3 className="mb-2 text-2xl font-bold leading-tight">
                                            {event.title}
                                        </h3>

                                        <div className="mb-4 space-y-2 text-sm text-gray-200">
                                            <div className="flex items-center gap-2">
                                                <CalendarIcon className="h-4 w-4 text-brics-yellow" />
                                                <span>{event.date}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPinIcon className="h-4 w-4 text-brics-yellow" />
                                                <span>{event.location}</span>
                                            </div>
                                        </div>

                                        <div className="opacity-0 transition-opacity duration-500 delay-100 group-hover:opacity-100">
                                            <p className="mb-6 text-sm leading-relaxed text-gray-300 line-clamp-3">
                                                {event.description}
                                            </p>
                                            
                                            <span className="flex items-center gap-2 font-bold text-brics-yellow hover:gap-3 transition-all">
                                                Learn More
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
