import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AcademicCapIcon, UserGroupIcon, BuildingLibraryIcon } from '@heroicons/react/24/outline';
import { fetchApi } from '../utils/api';

export default function Registration() {
    const [formData, setFormData] = useState({
        schoolName: '',
        contactPerson: '',
        email: '',
        phone: '',
        studentCount: '',
        interest: 'Science & Technology'
    });

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Store student data
            await fetchApi('/students', {
                method: 'POST',
                body: JSON.stringify(formData)
            });
            alert('Registration submitted successfully! We will contact you soon.');
            console.log(formData);
        } catch (error: any) {
            alert(error.message || 'Error connecting to server');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <main className="pt-32 pb-24">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                    <div className="flex flex-col lg:flex-row gap-16">
                        {/* Left Side: Info */}
                        <div className="lg:w-1/2">
                            <Link to="/" className="text-brics-blue font-semibold flex items-center gap-2 mb-8 hover:gap-3 transition-all">
                                <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                                Back to Home
                            </Link>

                            <h1 className="text-5xl font-bold text-brics-dark mb-6 leading-tight">
                                Register for <span className="text-brics-blue">Pragyaan 2026</span>
                            </h1>
                            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
                                Join the region's largest educational open-day event. Bring your students to explore innovative projects, interactive stalls, and a world of opportunities in STEM and Arts.
                            </p>

                            <div className="space-y-8">
                                <div className="flex gap-4">
                                    <div className="bg-blue-50 p-3 rounded-xl h-fit">
                                        <BuildingLibraryIcon className="w-6 h-6 text-brics-blue" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-brics-dark">School Participation</h3>
                                        <p className="text-gray-600">Open for all middle and high schools in the J&K region.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="bg-green-50 p-3 rounded-xl h-fit">
                                        <UserGroupIcon className="w-6 h-6 text-brics-green" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-brics-dark">Massive Engagement</h3>
                                        <p className="text-gray-600">Interact with over 5000+ peers and professional educators.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="bg-red-50 p-3 rounded-xl h-fit">
                                        <AcademicCapIcon className="w-6 h-6 text-brics-red" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-brics-dark">Certificates & Awards</h3>
                                        <p className="text-gray-600">Participating schools and students receive official IIT Jammu Pragyaan certificates.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Form */}
                        <div className="lg:w-1/2">
                            <div className="bg-gray-50 p-8 lg:p-12 rounded-3xl border border-gray-100 shadow-sm">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">School Name</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brics-blue focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                                            placeholder="Enter your school name"
                                            value={formData.schoolName}
                                            onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Person</label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brics-blue focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                                                placeholder="FullName"
                                                value={formData.contactPerson}
                                                onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                                            <input
                                                type="tel"
                                                required
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brics-blue focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                                                placeholder="+91"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brics-blue focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                                            placeholder="school@example.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Expected Students</label>
                                            <input
                                                type="number"
                                                required
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brics-blue focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                                                placeholder="e.g. 50"
                                                value={formData.studentCount}
                                                onChange={(e) => setFormData({ ...formData, studentCount: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Area of Interest</label>
                                            <select
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brics-blue focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                                                value={formData.interest}
                                                onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                                            >
                                                <option>Science & Technology</option>
                                                <option>Arts & Culture</option>
                                                <option>Entrepreneurship</option>
                                                <option>Social Innovation</option>
                                            </select>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-4 bg-brics-blue text-white rounded-xl font-bold text-lg hover:bg-opacity-90 shadow-lg hover:shadow-xl transition-all mt-4 disabled:opacity-50"
                                    >
                                        {loading ? 'Submitting...' : 'Complete Registration'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
