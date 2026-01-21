import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { fetchApi } from '../utils/api';
import { CalendarIcon, MapPinIcon, ClockIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

interface EventItem {
    _id: string;
    title: string;
    date: string;
    location: string;
    time: string;
    description: string;
    tag: string;
    color: string;
}

export default function AllEvents() {
    const [events, setEvents] = useState<EventItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadEvents = async () => {
            try {
                const data = await fetchApi('/events');
                setEvents(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        loadEvents();
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
                    ) : error ? (
                        <div className="py-24 text-center text-red-600">
                            <p>Error loading events: {error}</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {events.map((event) => (
                                <div
                                    key={event._id}
                                    className={`bg-gray-50 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border-t-4 ${event.color}`}
                                >
                                    <div className="flex justify-between items-start mb-6">
                                        <span className="bg-white text-gray-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-gray-100">
                                            {event.tag}
                                        </span>
                                    </div>

                                    <h3 className="text-2xl font-bold text-brics-dark mb-4 group-hover:text-brics-blue transition-colors">
                                        {event.title}
                                    </h3>

                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-center gap-3 text-gray-600">
                                            <CalendarIcon className="w-5 h-5 text-brics-blue" />
                                            <span>{event.date}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-gray-600">
                                            <ClockIcon className="w-5 h-5 text-brics-blue" />
                                            <span>{event.time}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-gray-600">
                                            <MapPinIcon className="w-5 h-5 text-brics-blue" />
                                            <span>{event.location}</span>
                                        </div>
                                    </div>

                                    <p className="text-gray-600 leading-relaxed mb-8">
                                        {event.description}
                                    </p>

                                    <button className="text-brics-blue font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                                        Learn More
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
