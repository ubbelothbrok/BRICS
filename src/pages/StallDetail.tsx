import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EventInteraction from '../components/EventInteraction.tsx';
import EventComments from '../components/EventComments.tsx';
import type { Comment } from '../components/EventComments.tsx';
import stallsData from '../data/db.json';
import { fetchApi } from '../utils/api';
import {
    ArrowLeftIcon,
    ExclamationTriangleIcon,
    CameraIcon,
    UserGroupIcon,
    CpuChipIcon
} from '@heroicons/react/24/outline';

interface StallItem {
    id: number;
    title: string;
    organizer: string;
    description: string;
    image: string;
    category: string;
}

export default function StallDetail() {
    const { id } = useParams();
    const [stall, setStall] = useState<StallItem | null>(null);
    const [loading, setLoading] = useState(true);

    // Comments state - will be fetched from backend using offset ID
    const [comments, setComments] = useState<Comment[]>([]);

    // Offset for distinct backend IDs
    const STALL_ID_OFFSET = 100;

    const fetchComments = (stallId: number) => {
        // Use offset ID for backend 
        const backendEventId = stallId + STALL_ID_OFFSET;
        fetchApi(`/events/${backendEventId}/comments/`)
            .then((data: Comment[]) => setComments(data))
            .catch(err => console.error('Failed to fetch comments:', err));
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        if (id) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const foundStall = (stallsData as any).stalls.find((s: any) => s.id === parseInt(id));
            setStall(foundStall || null);

            if (foundStall) {
                fetchComments(foundStall.id);
            }
        }
        setLoading(false);
    }, [id]);

    if (loading) return null;

    if (!stall) {
        return (
            <div className="min-h-screen bg-[var(--color-bg)] transition-colors duration-300 flex flex-col items-center justify-center">
                <Navbar />
                <h2 className="text-3xl font-bold text-[var(--color-text)] mb-4 transition-colors duration-300 mt-24">Stall Not Found</h2>
                <Link to="/stalls" className="text-brics-blue font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                    <ArrowLeftIcon className="w-5 h-5" />
                    Back to Exhibition
                </Link>
            </div>
        );
    }

    const backendEventId = stall.id + STALL_ID_OFFSET;

    return (
        <div className="min-h-screen bg-[var(--color-bg)] transition-colors duration-300">
            <Navbar />

            {/* Hero Section */}
            <div className="relative h-[60vh] w-full overflow-hidden flex flex-col justify-end">
                <img
                    src={stall.image}
                    alt={stall.title}
                    className="absolute inset-0 h-full w-full object-cover"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1470&auto=format&fit=crop';
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

                {/* Back Button (Top) */}
                <div className="absolute top-0 left-0 right-0 pt-32 px-6 md:px-12 max-w-[1400px] mx-auto w-full z-10">
                    <Link to="/stalls" className="text-white/80 hover:text-white font-medium flex items-center gap-2 w-fit transition-colors bg-black/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
                        <ArrowLeftIcon className="w-5 h-5" />
                        Back to Exhibition
                    </Link>
                </div>

                <div className="relative p-6 md:p-12 max-w-[1400px] mx-auto w-full">

                    <span className="inline-block px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-4 bg-brics-blue text-white">
                        {stall.category}
                    </span>

                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                        {stall.title}
                    </h1>

                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                        <div className="flex flex-wrap gap-6 text-white/90 text-lg">
                            <div className="flex items-center gap-3">
                                <UserGroupIcon className="w-6 h-6 text-brics-yellow" />
                                <span>{stall.organizer}</span>
                            </div>
                        </div>

                        <button
                            onClick={() => document.getElementById('share-experience')?.scrollIntoView({ behavior: 'smooth' })}
                            className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 transition-all group w-fit"
                        >
                            <CameraIcon className="w-6 h-6 text-brics-yellow group-hover:scale-110 transition-transform" />
                            <span className="font-bold">Share Feedback</span>
                        </button>
                    </div>
                </div>
            </div>

            <main className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">

                {/* Left Column: Interaction, Description */}
                <div className="lg:col-span-2 space-y-12">
                    <section>
                        <h2 className="text-3xl font-bold text-[var(--color-text)] mb-6 transition-colors duration-300">About the Project</h2>
                        <div className="prose prose-lg text-[var(--color-text)] opacity-80 leading-relaxed whitespace-pre-line transition-colors duration-300">
                            {stall.description}
                        </div>
                    </section>
                </div>

                {/* Right Column: Info */}
                <div className="space-y-8">
                    <div className="bg-[var(--color-card-bg)] rounded-2xl p-8 shadow-lg border border-[var(--color-text)]/10 sticky top-32 transition-colors duration-300">
                        <h3 className="text-xl font-bold text-[var(--color-text)] mb-6 flex items-center gap-2 transition-colors duration-300">
                            <CpuChipIcon className="w-6 h-6 text-brics-blue" />
                            Project Details
                        </h3>

                        <div className="space-y-4 text-[var(--color-text)] opacity-80">
                            <p><span className="font-bold">Team:</span> {stall.organizer}</p>
                            <p><span className="font-bold">Category:</span> {stall.category}</p>
                        </div>
                    </div>
                </div>

            </main>

            {/* Event Interaction Section */}
            <section id="share-experience" className="max-w-[800px] mx-auto px-4 mb-8 scroll-mt-24">
                <EventInteraction
                    eventId={backendEventId}
                    onCommentSubmit={() => fetchComments(stall.id)}
                />
            </section>

            {/* Comments Section */}
            <EventComments
                eventId={backendEventId}
                comments={comments}
                onRefresh={() => fetchComments(stall.id)}
            />

            <Footer />
        </div>
    );
}
