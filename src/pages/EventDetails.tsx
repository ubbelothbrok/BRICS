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
            <div className="min-h-screen bg-[var(--color-bg)] transition-colors duration-300 flex flex-col items-center justify-center">
                <h2 className="text-3xl font-bold text-[var(--color-text)] mb-4 transition-colors duration-300">Event Not Found</h2>
                <Link to="/events" className="text-brics-blue font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                    <ArrowLeftIcon className="w-5 h-5" />
                    Back to Events
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--color-bg)] transition-colors duration-300">
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

                    <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-4 ${event.category === 'Arts' ? 'bg-brics-green text-white' :
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
                        <h2 className="text-3xl font-bold text-[var(--color-text)] mb-6 transition-colors duration-300">About the Event</h2>
                        <div className="prose prose-lg text-[var(--color-text)] opacity-80 leading-relaxed whitespace-pre-line transition-colors duration-300">
                            {event.longDescription || event.description}
                        </div>
                    </section>

                    {event.schedule && (
                        <section>
                            <h2 className="text-3xl font-bold text-[var(--color-text)] mb-6 transition-colors duration-300">Event Schedule</h2>
                            <div className="bg-[var(--color-card-bg)] rounded-2xl p-8 border border-[var(--color-text)]/10 transition-colors duration-300">
                                <div className="space-y-6">
                                    {event.schedule.map((slot, index) => (
                                        <div key={index} className="flex gap-6 pb-6 border-b border-[var(--color-text)]/10 last:border-0 last:pb-0 transition-colors duration-300">
                                            <div className="w-24 flex-shrink-0 font-bold text-brics-blue">
                                                {slot.time}
                                            </div>
                                            <div className="text-[var(--color-text)] font-medium opacity-90 transition-colors duration-300">
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
                    <div className="bg-[var(--color-card-bg)] rounded-2xl p-8 shadow-lg border border-[var(--color-text)]/10 sticky top-32 transition-colors duration-300">
                        <h3 className="text-xl font-bold text-[var(--color-text)] mb-6 flex items-center gap-2 transition-colors duration-300">
                            <ExclamationTriangleIcon className="w-6 h-6 text-brics-orange" />
                            Rules & Guidelines
                        </h3>

                        {event.rules && (
                            <ul className="space-y-4 mb-8">
                                {event.rules.map((rule, index) => (
                                    <li key={index} className="flex gap-3 text-[var(--color-text)] opacity-80 text-sm transition-colors duration-300">
                                        <span className="text-brics-blue font-bold">•</span>
                                        {rule}
                                    </li>
                                ))}
                            </ul>
                        )}

                        <div className="pt-6 border-t border-[var(--color-text)]/10 space-y-4 transition-colors duration-300">
                            <div className="flex items-center gap-3">
                                <UserGroupIcon className="w-5 h-5 opacity-40" />
                                <div>
                                    <p className="text-xs text-[var(--color-text)] opacity-60 uppercase font-bold transition-colors duration-300">Team Size</p>
                                    <p className="font-medium text-[var(--color-text)] transition-colors duration-300">{event.teamSize || 'N/A'}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <EnvelopeIcon className="w-5 h-5 opacity-40" />
                                <div>
                                    <p className="text-xs text-[var(--color-text)] opacity-60 uppercase font-bold transition-colors duration-300">Contact</p>
                                    <p className="font-medium text-[var(--color-text)] transition-colors duration-300">{event.contact || 'N/A'}</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </main>

            <Footer />
        </div>
    );
}
