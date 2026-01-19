import { StarIcon } from '@heroicons/react/24/solid';

const reviews = [
    {
        name: "Aravind Sharma",
        role: "Teacher, DPS Jammu",
        content: "An incredible initiative! The students were fascinated by the robotics exhibits. Can't wait for 2026.",
        rating: 5
    },
    {
        name: "Priya Malik",
        role: "Student, Class 10",
        content: "I loved the Drone workshop. It inspired me to pursue engineering at IIT.",
        rating: 5
    },
    {
        name: "Rajesh Gupta",
        role: "Parent",
        content: "Very well organized. The safety arrangements and hospitality were top-notch.",
        rating: 5
    },
    {
        name: "Meera K.",
        role: "Principal, KV Gandhinagar",
        content: "Pragyaan is bridging the gap between school education and higher technical institutes.",
        rating: 5
    },
    {
        name: "Vikram Singh",
        role: "Volunteer",
        content: "Proud to be part of such a massive event. The energy was electric!",
        rating: 5
    },
    {
        name: "Sanya Kapoor",
        role: "Student, JNV",
        content: "The Art Zone was amazing. I didn't know engineering colleges encouraged arts so much!",
        rating: 5
    }
];

export default function Testimonials() {
    return (
        <section className="py-24 bg-brics-gray overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mb-12 text-center">
                <h2 className="text-4xl font-bold text-brics-dark">What People Say</h2>
                <p className="text-gray-600 mt-4">Hear from the students, teachers, and parents who made Pragyaan 2025 iconic.</p>
            </div>

            <div className="relative w-full overflow-hidden gradient-mask-l-r">
                {/* Scrolling Container */}
                <div className="flex gap-8 animate-scroll whitespace-nowrap py-4 hover:pause">
                    {/* Double the list for seamless loop */}
                    {[...reviews, ...reviews].map((review, index) => (
                        <div
                            key={index}
                            className="w-[350px] md:w-[400px] flex-shrink-0 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 whitespace-normal hover:shadow-md transition-shadow"
                        >
                            <div className="flex gap-1 mb-4">
                                {[...Array(review.rating)].map((_, i) => (
                                    <StarIcon key={i} className="w-5 h-5 text-brics-yellow" />
                                ))}
                            </div>
                            <p className="text-gray-700 italic mb-6 leading-relaxed">"{review.content}"</p>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brics-blue to-brics-green flex items-center justify-center text-white font-bold text-lg">
                                    {review.name[0]}
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">{review.name}</h4>
                                    <p className="text-sm text-brics-blue font-medium">{review.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
