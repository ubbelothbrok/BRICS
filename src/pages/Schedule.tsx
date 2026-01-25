import { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
    MapPinIcon,
    CalendarDaysIcon,
    BeakerIcon,
    PaintBrushIcon,
    ChatBubbleLeftRightIcon
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
    lane?: number; // Calculated during layout
}

const START_HOUR = 9;
const END_HOUR = 17; // 5 PM
const TOTAL_HOURS = END_HOUR - START_HOUR;
const EVENT_HEIGHT = 100; // Height of a single event card
const LANE_GAP = 12; // Gap between lanes

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
            id: 'd1-cupcake', start: 11, end: 12,
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
            description: 'Life at IIT.',
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
        border: 'border-l-4 border-l-blue-500'
    },
    {
        id: 'arts',
        label: 'Arts & Culture',
        types: ['arts'],
        icon: PaintBrushIcon,
        color: 'text-purple-600',
        bg: 'bg-purple-50',
        border: 'border-l-4 border-l-purple-500'
    },
    {
        id: 'conclave',
        label: 'Conclave / General',
        types: ['conclave', 'general'],
        icon: ChatBubbleLeftRightIcon,
        color: 'text-orange-600',
        bg: 'bg-orange-50',
        border: 'border-l-4 border-l-orange-500'
    }
];

export default function Schedule() {
    const [activeDay, setActiveDay] = useState<DayId>('day1');

    // Layout Algorithm: Horizontal Gantt Lane Packing
    const layoutTracks = useMemo(() => {
        const events = SCHEDULE_DATA[activeDay];
        const layout: Record<string, { items: ScheduleItem[], height: number }> = {
            tech: { items: [], height: 0 },
            arts: { items: [], height: 0 },
            conclave: { items: [], height: 0 }
        };

        TRACKS.forEach(track => {
            const trackEvents = events.filter(e => track.types.includes(e.type))
                .sort((a, b) => a.start - b.start || (b.end - a.end));

            const lanes: number[] = []; // Stores ending time of last event in each lane

            const packedEvents = trackEvents.map(event => {
                let laneIndex = -1;
                // Find first lane where this event fits
                for (let i = 0; i < lanes.length; i++) {
                    if (lanes[i] <= event.start) {
                        laneIndex = i;
                        break;
                    }
                }
                // If no lane found, create new one
                if (laneIndex === -1) {
                    laneIndex = lanes.length;
                    lanes.push(0);
                }

                // Update lane end time
                lanes[laneIndex] = event.end;

                return { ...event, lane: laneIndex };
            });

            layout[track.id] = {
                items: packedEvents,
                height: Math.max(1, lanes.length) * (EVENT_HEIGHT + LANE_GAP) + 20 // Base padding
            };
        });

        return layout;
    }, [activeDay]);

    const timeMarkers = Array.from({ length: TOTAL_HOURS + 1 }, (_, i) => START_HOUR + i);

    return (
        <div className="min-h-screen bg-white transition-colors duration-300">
            <Navbar />
            <main className="pt-32 pb-24 px-4 max-w-[1600px] mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <span className="inline-block px-4 py-1.5 bg-brics-blue/10 text-brics-blue rounded-full text-sm font-bold uppercase tracking-widest mb-4">
                        Horizontal View
                    </span>
                    <h1 className="text-5xl font-bold text-gray-900 mb-6 font-heading">
                        Program <span className="text-transparent bg-clip-text bg-gradient-to-r from-brics-blue to-brics-green">Timeline</span>
                    </h1>
                </div>

                {/* Day Toggle */}
                <div className="flex justify-center mb-10 sticky top-24 z-[200] pointer-events-none">
                    <div className="bg-white/90 backdrop-blur-md p-1.5 rounded-full shadow-xl border border-gray-100 inline-flex gap-2 pointer-events-auto">
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

                {/* HORIZONTAL GANTT CHART */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden flex flex-col">
                    <div className="overflow-x-auto">
                        <div className="min-w-[1000px]">
                            {/* Time Header (Sticky) */}
                            <div className="flex border-b border-gray-200 bg-gray-50 sticky top-0 z-20">
                                <div className="w-48 shrink-0 p-4 border-r border-gray-200 bg-gray-50 font-bold text-gray-400 text-xs uppercase tracking-wider flex items-center justify-center">
                                    Track / Time
                                </div>
                                <div className="flex-1 relative h-12">
                                    {timeMarkers.map((hour, i) => {
                                        // Don't render last marker to avoid overflow edge case
                                        if (i === timeMarkers.length - 1) return null;
                                        return (
                                            <div
                                                key={hour}
                                                className="absolute top-0 bottom-0 border-l border-gray-200 text-xs font-mono font-medium text-gray-400 pl-2 flex items-center"
                                                style={{ left: `${(i / TOTAL_HOURS) * 100}%` }}
                                            >
                                                {hour > 12 ? `${hour - 12} PM` : (hour === 12 ? '12 PM' : `${hour} AM`)}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Track Rows */}
                            <div className="divide-y divide-gray-200">
                                {TRACKS.map(track => {
                                    const { items, height } = layoutTracks[track.id];
                                    const Icon = track.icon;

                                    return (
                                        <div key={track.id} className="flex group">
                                            {/* Track Label Column */}
                                            <div className={`w-48 shrink-0 p-6 border-r border-gray-200 ${track.bg} ${track.border} flex flex-col justify-center items-center text-center gap-3 active:sticky left-0 z-10`}>
                                                <div className={`w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center ${track.color}`}>
                                                    <Icon className="w-6 h-6" />
                                                </div>
                                                <h3 className={`text-sm font-black uppercase tracking-wider ${track.color}`}>{track.label}</h3>
                                            </div>

                                            {/* Timeline Area */}
                                            <div className={`flex-1 relative ${track.bg} border-b border-gray-100/50`} style={{ height: `${height}px` }}>
                                                {/* Grid Guidelines */}
                                                {timeMarkers.map((_, i) => (
                                                    <div
                                                        key={i}
                                                        className="absolute top-0 bottom-0 border-l border-gray-100"
                                                        style={{ left: `${(i / TOTAL_HOURS) * 100}%` }}
                                                    ></div>
                                                ))}

                                                {/* Events */}
                                                {items.map(event => (
                                                    <div
                                                        key={event.id}
                                                        className="absolute rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl hover:z-30 hover:scale-[1.02] transition-all bg-white group/card"
                                                        style={{
                                                            left: `${((event.start - START_HOUR) / TOTAL_HOURS) * 100}%`,
                                                            width: `${((event.end - event.start) / TOTAL_HOURS) * 100}%`,
                                                            top: `${(event.lane || 0) * (EVENT_HEIGHT + LANE_GAP) + 16}px`, // 16px top padding
                                                            height: `${EVENT_HEIGHT}px`
                                                        }}
                                                    >
                                                        <div className="flex h-full">
                                                            {/* Image (Left) */}
                                                            <div className="w-24 shrink-0 relative text-black overflow-hidden">
                                                                <img
                                                                    src={event.image}
                                                                    alt={event.title}
                                                                    className="w-full h-full object-cover transform group-hover/card:scale-110 transition-transform duration-500"
                                                                />
                                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                                                                {/* Type Badge on Image */}
                                                                <div className="absolute bottom-2 left-2 right-2">
                                                                    <span className="text-[8px] text-white font-bold uppercase tracking-wider block truncate opacity-90">
                                                                        {event.type}
                                                                    </span>
                                                                </div>

                                                                {event.isContinuous && (
                                                                    <div className="absolute top-2 right-2">
                                                                        <span className="bg-green-500 text-white text-[7px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-tighter shadow-sm animate-pulse">
                                                                            Live
                                                                        </span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                            {/* Content */}
                                                            <div className="p-3 flex flex-col justify-center min-w-0 flex-1">
                                                                <div className="flex items-center gap-2 mb-1">
                                                                    <span className="text-[10px] font-mono font-bold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded truncate">
                                                                        {event.start > 12 ? event.start - 12 : event.start}{event.start % 1 !== 0 ? ':30' : ''} - {event.end > 12 ? event.end - 12 : event.end}{event.end % 1 !== 0 ? ':30' : ''}
                                                                    </span>
                                                                </div>
                                                                <h4 className="font-bold text-gray-900 text-sm leading-tight truncate group-hover/card:whitespace-normal group-hover/card:absolute group-hover/card:bg-white group-hover/card:z-20 group-hover/card:p-1 group-hover/card:shadow-lg group-hover/card:rounded">
                                                                    {event.title}
                                                                </h4>
                                                                <div className="flex items-center gap-1 text-xs text-gray-500 mt-1 truncate">
                                                                    <MapPinIcon className="w-3 h-3 shrink-0" />
                                                                    <span className="truncate">{event.location}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
