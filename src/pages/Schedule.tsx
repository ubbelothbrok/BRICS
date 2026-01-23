import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Schedule() {
    const days = [
        {
            date: "February 14 Fri",
            events: [
                { time: "09:00 AM", title: "Inauguration Ceremony", location: "Main Ground" },
                { time: "11:00 AM", title: "Keynote: The Future of Innovation", location: "Auditorium A" },
                { time: "02:00 PM", title: "Panel: Bridging School to STEM", location: "Conference Room 1" },
            ]
        },
        {
            date: "February 15 Sat",
            events: [
                { time: "09:30 AM", title: "School-Institute Collaboration Forum", location: "Main Hall" },
                { time: "01:00 PM", title: "Interactive Workshop: Robotics 101", location: "Robotics Lab" },
                { time: "03:30 PM", title: "Closing & Prize Distribution", location: "Main Ground" },
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-[var(--color-bg)] transition-colors duration-300">
            <Navbar />
            <main className="pt-32 pb-24 px-6 md:px-12 max-w-[1400px] mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text)] mb-12 transition-colors duration-300">Event Schedule</h1>

                <div className="space-y-12">
                    {days.map((day, idx) => (
                        <div key={idx} className="border-l-4 border-brics-blue pl-8 transition-colors duration-300">
                            <h2 className="text-2xl font-bold text-[var(--color-text)] mb-6 transition-colors duration-300">{day.date}</h2>
                            <div className="space-y-6">
                                {day.events.map((event, eIdx) => (
                                    <div key={eIdx} className="bg-[var(--color-card-bg)] p-6 rounded-xl hover:shadow-md transition-all border border-[var(--color-text)]/10 duration-300">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                            <div>
                                                <h3 className="text-xl font-bold text-[var(--color-text)] transition-colors duration-300">{event.title}</h3>
                                                <p className="text-[var(--color-text)] opacity-70 mt-1 transition-colors duration-300">{event.location}</p>
                                            </div>
                                            <div className="text-brics-blue font-semibold whitespace-nowrap bg-brics-blue/10 px-4 py-2 rounded-lg transition-colors duration-300">
                                                {event.time}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
}
