import { useState, useEffect } from 'react';
import { CalendarIcon, MapPinIcon, ClockIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import eventsData from '../data/db.json';
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

export default function Events() {
    const [events, setEvents] = useState<EventItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setEvents(eventsData.slice(0, 3)); // Only show top 3 on homepage
        setLoading(false);
    }, []);

    if (loading) return null;

    return (
        <section id="events" className="py-24 bg-gray-50">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div>
                        <h2 className="text-4xl font-bold text-brics-dark mb-4">Upcoming Events</h2>
                        <p className="text-xl text-gray-600 max-w-2xl">
                            Stay informed about the key gatherings and summits shaping the future of BRICS cooperation.
                        </p>
                    </div>
                    <Link to="/events" className="flex items-center gap-2 text-brics-blue font-bold hover:gap-3 transition-all group">
                        View All Events
                        <ArrowRightIcon className="w-5 h-5" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {events.map((event) => (
                        <div
                            key={event._id}
                            className={`bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border-t-4 ${event.color}`}
                        >
                            <div className="flex justify-between items-start mb-6">
                                <span className="bg-gray-100 text-gray-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
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
            </div>
        </section>
    );
}
