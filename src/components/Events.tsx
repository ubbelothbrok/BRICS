import { useState, useEffect } from 'react';
import { CalendarIcon, MapPinIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import eventsData from '../data/db.json';
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

export default function Events() {
    const [events, setEvents] = useState<EventItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setEvents((eventsData as any).events.slice(0, 3)); // Only show top 3 on homepage
        setLoading(false);
    }, []);



    if (loading) return null;

    return (
        <section id="events" className="py-24 bg-[var(--color-bg)] transition-colors duration-300">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div>
                        <h2 className="text-4xl font-bold text-[var(--color-text)] mb-4 transition-colors duration-300">Upcoming Events</h2>
                        <p className="text-xl text-[var(--color-text)] opacity-80 max-w-2xl transition-colors duration-300">
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
                            {/* Content */}
                            <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-20">
                                <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                                    <div className="mb-3 flex items-center gap-3">
                                        <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur-md ${event.category === 'Arts' ? 'bg-brics-green/80 text-white' :
                                            event.category === 'Tech' ? 'bg-brics-blue/80 text-white' :
                                                'bg-brics-yellow/80 text-black'
                                            }`}>
                                            {event.category}
                                        </span>
                                    </div>

                                    <h3 className="mb-2 text-2xl font-bold leading-tight drop-shadow-md">
                                        {event.title}
                                    </h3>

                                    <div className="mb-4 space-y-2 text-sm text-gray-200 font-medium">
                                        <div className="flex items-center gap-2">
                                            <CalendarIcon className="h-4 w-4 text-brics-yellow" />
                                            <span>{event.date}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPinIcon className="h-4 w-4 text-brics-yellow" />
                                            <span>{event.location}</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-500 group-hover:grid-rows-[1fr] group-hover:opacity-100">
                                        <div className="overflow-hidden">
                                            <p className="mb-6 text-sm leading-relaxed text-gray-300 line-clamp-3">
                                                {event.description}
                                            </p>

                                            <span className="flex items-center gap-2 font-bold text-brics-yellow hover:gap-3 transition-all cursor-pointer">
                                                Learn More
                                                <ArrowRightIcon className="h-4 w-4" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
