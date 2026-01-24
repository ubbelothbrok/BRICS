import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Manthan() {
    return (
        <div className="min-h-screen bg-[var(--color-bg)] transition-colors duration-300">
            <Navbar />
            <main className="pt-32 pb-24 px-6 md:px-12 max-w-[1400px] mx-auto">
                {/* Header Section aligned like Zones */}
                <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text)] mb-8 transition-colors duration-300">
                    Pragyaan 2026
                </h1>
                <p className="text-xl text-gray-600 mb-12 max-w-3xl">
                    <span className="font-semibold text-brics-blue">Reimagining Indian Schools</span><br />
                    Principal’s Conclave | IIT JAMMU
                </p>

                <div className="space-y-12">

                    {/* 1. Executive Summary - Styled as a card like Zone items */}
                    <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
                        <h2 className="text-2xl font-bold text-blue-900 mb-6">
                            1. Executive Summary
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-6">
                            The Indian school education system stands at a pivotal moment. While the National Education Policy (NEP) 2020 offers a transformative vision, the ground reality faces significant hurdles ranging from foundational infrastructure deficits to a lack of future-ready pedagogical skills.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            <strong>Pragyaan</strong> is proposed as a high-intensity "Working Conclave" designed to bridge this gap. Unlike traditional ceremonial events, Pragyaan will bring together school principals, senior policymakers, higher education leaders (IITs), and industry veterans onto a single platform. The primary objective is to move beyond theoretical debates and draft the <strong>"Pragyaan Charter"</strong>—a concrete, actionable roadmap for infrastructure standards, digital equity, and skills integration by 2030.
                        </p>
                    </div>

                    {/* 2. Strategic Context */}
                    <div className="bg-purple-50 rounded-2xl p-8 border border-purple-100">
                        <h2 className="text-2xl font-bold text-purple-900 mb-6">
                            2. Strategic Context
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-6">
                            India faces a "dual challenge" that requires immediate, synchronized action. First, there is the struggle with the basics: crumbling infrastructure, lack of amenities in border and remote areas, and a widening post-pandemic digital divide. Second, there represents the challenge of aspiration: a rapidly evolving global economy demanding competencies in AI, robotics, and critical thinking that our current syllabus-heavy model struggles to deliver.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            The necessity for this conclave arises from the disconnect between the four critical stakeholders of education: the <strong>Schools</strong>, <strong>Policymakers</strong>, <strong>Higher Education Institutions</strong>, and <strong>Industry</strong>. Pragyaan aims to replace these silos with a unified dialogue.
                        </p>
                    </div>

                    {/* 3. Thematic Agenda */}
                    <div>
                        <h2 className="text-3xl font-bold text-[var(--color-text)] mb-6 border-b border-brics-blue/30 pb-2">
                            3. Thematic Agenda
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-green-50 rounded-2xl p-8 border border-green-100">
                                <h3 className="text-xl font-bold text-green-900 mb-4">Theme 1: Infrastructure, Equity & Access</h3>
                                <p className="text-gray-700 text-sm leading-relaxed">
                                    Addresses the physical and digital foundations. Focus mainly on defining minimum viable infrastructure standards for 2030 and addressing disparities. Key areas: Samagra Shiksha support, sustainable maintenance models (CSR/PPP), residential solutions, and safety/sanitation. Goal: Develop a "Comprehensive School Readiness Framework".
                                </p>
                            </div>
                            <div className="bg-orange-50 rounded-2xl p-8 border border-orange-100">
                                <h3 className="text-xl font-bold text-orange-900 mb-4">Theme 2: Future-Ready Learning & Innovation</h3>
                                <p className="text-gray-700 text-sm leading-relaxed">
                                    Tackles the "software" of education: pedagogy and skills. Bringing regulators (NCERT/CBSE) and deep-tech leaders to map STEM, AI, and robotics integration. Focusing on transforming ATLs into vibrant hubs and upskilling educators without burnout.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 4. Operational Plan */}
                    <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            4. Operational Plan
                        </h2>

                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Event Format</h3>
                            <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                <li><strong>Opening Plenary (11:00 AM):</strong> Key leaders set the context.</li>
                                <li><strong>Working Discussions (11:45 AM & 2:00 PM):</strong> Panel discussions on "Foundations" and "Future".</li>
                                <li><strong>Conclusion (3:30 PM):</strong> Release of the "Pragyaan Charter".</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Details</h3>
                            <p className="text-gray-700 mb-2"><strong>Digital Strategy:</strong> Powered by Pragyaan Digital Platform (audits, Q&A, polling).</p>
                            <p className="text-gray-700"><strong>Stakeholders:</strong> IIT Jammu, Ministry of Education, Industry leaders, Principals.</p>
                        </div>
                    </div>

                    {/* 5. Conclusion */}
                    <div className="bg-gradient-to-r from-brics-blue/10 to-transparent p-8 rounded-2xl border border-brics-blue/20">
                        <h2 className="text-2xl font-bold text-[var(--color-text)] mb-4">
                            5. Conclusion
                        </h2>
                        <p className="text-[var(--color-text)] opacity-80 leading-relaxed text-lg">
                            Pragyaan represents more than just a gathering of experts; it is a decisive step towards operationalizing the vision of a <strong>Developed India (Viksit Bharat) by 2047</strong>. By addressing the foundational deficits of today while simultaneously building the capacity for the future, the conclave aims to create a replicable model for school transformation.
                        </p>
                    </div>

                </div>
            </main>
            <Footer />
        </div>
    );
}
