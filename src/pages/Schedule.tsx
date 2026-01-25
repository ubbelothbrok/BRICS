import { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
    ClockIcon,
    MapPinIcon,
    CalendarDaysIcon,
    BeakerIcon,
    PaintBrushIcon,
    ChatBubbleLeftRightIcon,
    ExclamationCircleIcon
} from '@heroicons/react/24/outline';

type EventType = 'tech' | 'arts' | 'conclave' | 'general';
type DayId = 'day1' | 'day2';

interface ScheduleItem {
    id: string;
    start: number; // Hour in 24h format (e.g. 10.5 = 10:30 AM)
    end: number;   // Hour in 24h format
    title: string;
    location: string;
    type: EventType;
    description?: string;
    image: string;
    isContinuous?: boolean;
}

// Helper to layout overlapping events
// Returns items with attached styling properties: top, height, left, width
interface LayoutItem extends ScheduleItem {
    style: {
        top: string;
        height: string;
        left: string;
        width: string;
    }
}

const START_HOUR = 9;
const END_HOUR = 17; // 5 PM
const HOUR_HEIGHT = 180; // Pixels per hour

const SCHEDULE_DATA: Record<DayId, ScheduleItem[]> = {
    day1: [
        {
            id: 'd1-drone', start: 10, end: 16,
            title: 'Drone Showcase', location: 'Main Ground', type: 'tech',
            description: 'FPV racing, hexacopters, VTOL demos.',
            image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=1470&auto=format&fit=crop",
            isContinuous: true
        },
        {
            id: 'd1-tinker', start: 10, end: 16,
            title: 'Tinkering Shop', location: 'Tinkering Lab', type: 'tech',
            description: 'Circuit building workshop.',
            image: "/images/tinkering_workshop.png",
            isContinuous: true
        },
        {
            id: 'd1-library', start: 10, end: 16,
            title: 'Locked Library', location: 'LHC', type: 'arts',
            description: 'Escape room.',
            image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2690&auto=format&fit=crop",
            isContinuous: true
        },
        {
            id: 'd1-art', start: 10, end: 16,
            title: 'Art Gallery', location: 'SAC', type: 'arts',
            description: 'Exhibition.',
            image: "/images/art_gallery_live.jpg",
            isContinuous: true
        },
        {
            id: 'd1-cupcake1', start: 11, end: 12,
            title: 'Cupcake Challenge', location: 'Cafeteria', type: 'arts',
            description: 'Batch 1.',
            image: "https://images.unsplash.com/photo-1593187623747-7ea827ad1013?q=80&w=687&auto=format&fit=crop"
        },
        {
            id: 'd1-cupcake2', start: 14, end: 15,
            title: 'Cupcake Challenge', location: 'Cafeteria', type: 'arts',
            description: 'Batch 2.',
            image: "https://images.unsplash.com/photo-1593187623747-7ea827ad1013?q=80&w=687&auto=format&fit=crop"
        },
        {
            id: 'd1-iit', start: 13, end: 14,
            title: 'IITian Interaction', location: 'Auditorium', type: 'general',
            description: 'Q&A session.',
            image: "/images/iitian_interaction.jpg"
        }
    ],
    day2: [
        {
            id: 'd2-paint', start: 9, end: 12,
            title: 'Painting Comp', location: 'Art Studio', type: 'arts',
            description: 'Live art.',
            image: "/images/painting_live.jpg"
        },
        {
            id: 'd2-ar', start: 10, end: 15,
            title: 'AR Builder', location: 'Comp Center', type: 'tech',
            description: 'VR/AR Demo.',
            image: "/images/ar_builder.jpg",
            isContinuous: true
        },
        {
            id: 'd2-doodle', start: 10, end: 15,
            title: 'AI Doodle', location: 'Comp Center', type: 'tech',
            description: 'ML Demo.',
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop",
            isContinuous: true
        },
        {
            id: 'd2-manthan-open', start: 11, end: 11.75,
            title: 'Opening Plenary', location: 'Conf Hall', type: 'conclave',
            description: 'Vision Setting.',
            image: "/images/manthan/speakers.jpg"
        },
        {
            id: 'd2-manthan-discuss', start: 11.75, end: 13.75,
            title: 'Discussion Rounds', location: 'Conf Hall', type: 'conclave',
            description: 'Policymaking.',
            image: "/images/manthan/infra.png"
        },
        {
            id: 'd2-iit', start: 13, end: 14,
            title: 'IITian Interaction', location: 'Auditorium', type: 'general',
            description: 'Q&A session.',
            image: "/images/iitian_interaction.jpg"
        },
        {
            id: 'd2-manthan-show', start: 14.5, end: 15.25,
            title: 'Innovation Showcase', location: 'Conf Hall', type: 'conclave',
            description: 'EdTech Demos.',
            image: "/images/manthan/stem.png"
        },
        {
            id: 'd2-manthan-close', start: 15.25, end: 16,
            title: 'Charter Release', location: 'Conf Hall', type: 'conclave',
            description: 'Closing.',
            image: "/images/manthan/students.png"
        }
    ]
};

const TRACKS = [
    {
        id: 'tech',
        label: 'Technology',
        types: ['tech'],
        icon: BeakerIcon,
        color: 'text-blue-600',
        bg: 'bg-blue-50',
        border: 'border-blue-200'
    },
    {
        id: 'arts',
        label: 'Arts & Culture',
        types: ['arts'],
        icon: PaintBrushIcon,
        color: 'text-purple-600',
        bg: 'bg-purple-50',
        border: 'border-purple-200'
    },
    {
        id: 'conclave',
        label: 'Conclave / General',
        types: ['conclave', 'general'],
        icon: ChatBubbleLeftRightIcon,
        color: 'text-orange-600',
        bg: 'bg-orange-50',
        border: 'border-orange-200'
    }
];

export default function Schedule() {
    const [activeDay, setActiveDay] = useState<DayId>('day1');

    // Layout Algorithm
    const layoutTracks = useMemo(() => {
        const events = SCHEDULE_DATA[activeDay];
        const layout: Record<string, LayoutItem[]> = { tech: [], arts: [], conclave: [] };

        TRACKS.forEach(track => {
            // 1. Filter events for this track
            const trackEvents = events.filter(e => track.types.includes(e.type))
                .sort((a, b) => a.start - b.start || (b.end - a.end));

            // 2. Assign columns (Greedy packing)
            const columns: LayoutItem[][] = [];

            trackEvents.forEach(event => {
                let placed = false;
                for (let i = 0; i < columns.length; i++) {
                    const lastInCol = columns[i][columns[i].length - 1];
                    if (lastInCol.end <= event.start) {
                        columns[i].push(event as any); // Temporary cast
                        placed = true;
                        break;
                    }
                }
                if (!placed) {
                    columns.push([event as any]);
                }
            });

            // 3. Calculate styles
            const finalItems: LayoutItem[] = [];
            const colWidth = 100 / columns.length;

            columns.forEach((col, colIndex) => {
                col.forEach(event => {
                    finalItems.push({
                        ...event,
                        style: {
                            top: `${(event.start - START_HOUR) * HOUR_HEIGHT}px`,
                            height: `${(event.end - event.start) * HOUR_HEIGHT}px`,
                            left: `${colIndex * colWidth}%`,
                            width: `${colWidth}%`
                        }
                    });
                });
            });

            layout[track.id] = finalItems;
        });

        return layout;
    }, [activeDay]);

    // Grid lines
    const hours = Array.from({ length: END_HOUR - START_HOUR + 1 }, (_, i) => START_HOUR + i);

    return (
        <div className="min-h-screen bg-white transition-colors duration-300">
            <Navbar />
            <main className="pt-32 pb-24 px-4 max-w-[1600px] mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <span className="inline-block px-4 py-1.5 bg-brics-blue/10 text-brics-blue rounded-full text-sm font-bold uppercase tracking-widest mb-4">
                        Gantt Chart View
                    </span>
                    <h1 className="text-5xl font-bold text-gray-900 mb-6 font-heading">
                        Program <span className="text-transparent bg-clip-text bg-gradient-to-r from-brics-blue to-brics-green">Timeline</span>
                    </h1>
                </div>

                {/* Day Toggle */}
                <div className="flex justify-center mb-10 sticky top-24 z-30">
                    <div className="bg-white p-1.5 rounded-full shadow-xl border border-gray-100 inline-flex gap-2">
                        <button
                            onClick={() => setActiveDay('day1')}
                            className={`px-6 py-3 rounded-full text-lg font-bold transition-all duration-300 flex items-center gap-2 ${activeDay === 'day1'
                                ? 'bg-gray-900 text-white shadow-md'
                                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                                }`}
                        >
                            <CalendarDaysIcon className="w-5 h-5" />
                            Feb 14
                        </button>
                        <button
                            onClick={() => setActiveDay('day2')}
                            className={`px-6 py-3 rounded-full text-lg font-bold transition-all duration-300 flex items-center gap-2 ${activeDay === 'day2'
                                ? 'bg-gray-900 text-white shadow-md'
                                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                                }`}
                        >
                            <CalendarDaysIcon className="w-5 h-5" />
                            Feb 15
                        </button>
                    </div>
                </div>

                {/* GANTT CHART CONTAINER */}
                <div className="relative border border-gray-200 rounded-3xl overflow-hidden shadow-sm bg-white">

                    {/* Header Row */}
                    <div className="grid grid-cols-[80px_1fr_1fr_1fr] bg-gray-50 border-b border-gray-200 divide-x divide-gray-200">
                        <div className="p-4 text-center text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center justify-center">
                            Time
                        </div>
                        {TRACKS.map(track => {
                            const Icon = track.icon;
                            return (
                                <div key={track.id} className={`p-4 flex items-center justify-center gap-2 ${track.bg}`}>
                                    <Icon className={`w-5 h-5 ${track.color}`} />
                                    <span className={`font-bold ${track.color}`}>{track.label}</span>
                                </div>
                            );
                        })}
                    </div>

                    {/* Body */}
                    <div className="relative grid grid-cols-[80px_1fr_1fr_1fr] divide-x divide-gray-200 overflow-x-auto">

                        {/* Time Column Background Grid */}
                        <div className="relative bg-gray-50/50" style={{ height: (END_HOUR - START_HOUR) * HOUR_HEIGHT }}>
                            {hours.map((hour) => (
                                <div
                                    key={hour}
                                    className="absolute w-full border-t border-gray-200 text-right pr-4 text-xs font-mono text-gray-400 font-medium pt-1"
                                    style={{ top: (hour - START_HOUR) * HOUR_HEIGHT }}
                                >
                                    {hour > 12 ? `${hour - 12} PM` : (hour === 12 ? '12 PM' : `${hour} AM`)}
                                </div>
                            ))}
                        </div>

                        {/* Tracks Columns */}
                        {TRACKS.map(track => (
                            <div key={track.id} className={`relative ${track.bg}`} style={{ height: (END_HOUR - START_HOUR) * HOUR_HEIGHT }}>
                                {/* Vertical Text Watermark */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none">
                                    <span className="text-[120px] font-black uppercase tracking-widest text-black/[0.03] -rotate-90 whitespace-nowrap transform origin-center">
                                        {track.label}
                                    </span>
                                </div>

                                {/* Horizontal Guidelines */}
                                {hours.map((hour) => (
                                    <div
                                        key={hour}
                                        className="absolute w-full border-t border-gray-200/60"
                                        style={{ top: (hour - START_HOUR) * HOUR_HEIGHT }}
                                    ></div>
                                ))}

                                {/* Events */}
                                {layoutTracks[track.id as keyof typeof layoutTracks].map(event => (
                                    <div
                                        key={event.id}
                                        className="absolute p-1 transition-all duration-300 hover:z-50"
                                        style={{
                                            top: event.style.top,
                                            height: event.style.height,
                                            left: event.style.left,
                                            width: event.style.width,
                                        }}
                                    >
                                        <div className="h-full w-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all flex flex-col group">
                                            {/* Image Banner (Only visible if height > 100px) */}
                                            {parseInt(event.style.height) > 100 && (
                                                <div className="h-24 shrink-0 relative overflow-hidden">
                                                    <img
                                                        src={event.image}
                                                        alt={event.title}
                                                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                                </div>
                                            )}

                                            <div className="p-3 flex flex-col h-full bg-white/95 backdrop-blur-sm">
                                                <div className="flex justify-between items-start mb-1">
                                                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                                                        {event.start > 12 ? event.start - 12 : event.start} - {event.end > 12 ? event.end - 12 : event.end}
                                                    </span>
                                                    {event.isContinuous && (
                                                        <span className="bg-green-100 text-green-700 text-[9px] font-bold px-1.5 py-0.5 rounded-full border border-green-200">
                                                            ALL DAY
                                                        </span>
                                                    )}
                                                </div>

                                                <h4 className="font-bold text-gray-900 text-sm leading-tight mb-1 line-clamp-2">
                                                    {event.title}
                                                </h4>

                                                <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                                                    <MapPinIcon className="w-3 h-3" />
                                                    <span className="truncate">{event.location}</span>
                                                </div>

                                                {parseInt(event.style.height) > 120 && (
                                                    <p className="text-gray-500 text-xs leading-snug line-clamp-3 mt-auto">
                                                        {event.description}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}

                    </div>
                </div>

                <div className="mt-12 text-center text-gray-500 text-sm flex items-center justify-center gap-2">
                    <ExclamationCircleIcon className="w-5 h-5" />
                    <span>Side-by-side events in the same column indicate simultaneous activities.</span>
                </div>
            </main>
            <Footer />
        </div>
    );
}
