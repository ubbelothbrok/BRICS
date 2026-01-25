import { useState, useEffect, useMemo } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import eventsData from '../data/db.json';
import {
    CalendarIcon,
    MapPinIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
    BeakerIcon,
    PaintBrushIcon,
    ChatBubbleLeftRightIcon,
    UserGroupIcon
} from '@heroicons/react/24/outline';
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

const CATEGORY_MAP: Record<string, { label: string; icon: any; color: string; bg: string }> = {
    'Tech': { label: 'Tech & Innovation', icon: BeakerIcon, color: 'text-brics-blue', bg: 'bg-brics-blue/10' },
    'Arts': { label: 'Arts & Culture', icon: PaintBrushIcon, color: 'text-brics-green', bg: 'bg-brics-green/10' },
    'Conclave': { label: 'Strategic Conclaves', icon: ChatBubbleLeftRightIcon, color: 'text-brics-orange', bg: 'bg-brics-orange/10' },
    'General': { label: 'Interactive Sessions', icon: UserGroupIcon, color: 'text-purple-600', bg: 'bg-purple-100' }
};

export default function AllEvents() {
    const [events, setEvents] = useState<EventItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setEvents((eventsData as any).events);
        setLoading(false);
    }, []);

    const groupedEvents = useMemo(() => {
        const groups: Record<string, EventItem[]> = {};
        events.forEach(event => {
            if (!groups[event.category]) groups[event.category] = [];
            groups[event.category].push(event);
        });
        return groups;
    }, [events]);



    return (
        <div className="min-h-screen bg-[var(--color-bg)] transition-colors duration-300">
            <Navbar />

            <main className="pt-32 pb-24">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                    <div className="mb-12">
                        <Link to="/" className="text-brics-blue font-semibold flex items-center gap-2 mb-8 hover:gap-3 transition-all w-fit">
                            <ArrowLeftIcon className="w-5 h-5" />
                            Back to Home
                        </Link>
                        <h1 className="text-5xl font-bold text-[var(--color-text)] transition-colors duration-300">Events Calendar</h1>
                        <p className="text-xl text-[var(--color-text)] opacity-80 mt-4 transition-colors duration-300">Explore all summits, forums, and gatherings for Pragyaan 2026.</p>
                    </div>

                    {loading ? (
                        <div className="py-24 text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brics-blue mx-auto"></div>
                            <p className="mt-4 text-gray-600">Loading events...</p>
                        </div>
                    ) : (
                        <div className="space-y-20">
                            {Object.entries(groupedEvents).map(([category, items]) => {
                                const config = CATEGORY_MAP[category] || { label: category, icon: CalendarIcon, color: 'text-gray-600', bg: 'bg-gray-100' };
                                const Icon = config.icon;

                                return (
                                    <section key={category}>
                                        <div className="flex items-center gap-4 mb-8">
                                            <div className={`p-4 rounded-2xl ${config.bg} ${config.color}`}>
                                                <Icon className="w-8 h-8" />
                                            </div>
                                            <div>
                                                <h2 className="text-3xl font-bold text-[var(--color-text)] transition-colors duration-300">
                                                    {config.label}
                                                </h2>
                                                <p className="text-gray-500 font-medium">{items.length} {items.length === 1 ? 'Event' : 'Events'}</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                            {items.map((event) => (
                                                <Link
                                                    to={`/events/${event.id}`}
                                                    key={event.id}
                                                    className="group relative h-[450px] overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 block"
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
                                                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-20">
                                                        <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                                                            <div className="mb-3 flex items-center gap-3">
                                                                <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur-md ${event.category === 'Arts' ? 'bg-brics-green/80 text-white' :
                                                                    event.category === 'Tech' ? 'bg-brics-blue/80 text-white' :
                                                                        event.category === 'Conclave' ? 'bg-brics-orange/80 text-white' :
                                                                            'bg-purple-600/80 text-white'
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
                                    </section>
                                );
                            })}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
