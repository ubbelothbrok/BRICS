import { CalendarIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';

const events = [
    {
        title: "BRICS Academic Forum 2026",
        date: "May 15-17, 2026",
        location: "Kazan, Russia",
        time: "09:00 AM - 05:00 PM",
        description: "A gathering of scholars and experts to discuss future cooperation and academic exchanges between BRICS nations.",
        color: "border-brics-blue",
        tag: "Academic"
    },
    {
        title: "BRICS Youth Summit",
        date: "July 10-12, 2026",
        location: "Rio de Janeiro, Brazil",
        time: "10:00 AM - 04:00 PM",
        description: "Empowering the next generation of leaders to collaborate on innovation, culture, and sustainable development.",
        color: "border-brics-green",
        tag: "Youth"
    },
    {
        title: "Business Forum & NDB Meetings",
        date: "September 22-24, 2026",
        location: "Cape Town, South Africa",
        time: "08:30 AM - 06:00 PM",
        description: "Engaging the private sector and financial institutions to drive investment and economic growth.",
        color: "border-brics-yellow",
        tag: "Business"
    }
];

export default function Events() {
    return (
        <section id="events" className="py-24 bg-gray-50">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-brics-dark mb-4">Upcoming Events</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Stay informed about the key gatherings and summits shaping the future of BRICS cooperation.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {events.map((event, index) => (
                        <div
                            key={index}
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
