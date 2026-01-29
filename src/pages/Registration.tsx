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
        password: '',
        confirmPassword: ''
    });

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            // Prepare data for backend (snake_case)
            const payload = {
                school_name: formData.schoolName,
                contact_person: formData.contactPerson,
                phone_number: formData.phone,
                email: formData.email,
                password: formData.password
            };

            await fetchApi('/register/', {
                method: 'POST',
                body: JSON.stringify(payload)
            });
            alert('Registration successful!');
            console.log(formData);
        } catch (error: any) {
            alert(error.message || 'Error connecting to server');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[var(--color-bg)] transition-colors duration-300">
            <Navbar />

            <main className="pt-24 lg:pt-32 pb-16 lg:pb-24">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        {/* Left Side: Info */}
                        <div className="hidden lg:block lg:w-1/2 lg:-mt-3">
                            <Link to="/login" className="text-brics-blue font-semibold flex items-center gap-2 mb-8 hover:gap-3 transition-all">
                                <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                                Back to Login
                            </Link>

                            <h1 className="text-5xl font-bold text-[var(--color-text)] mb-6 leading-tight transition-colors duration-300">
                                Register for <span className="text-brics-blue">Pragyaan 2026</span>
                            </h1>
                            <p className="text-xl text-[var(--color-text)] opacity-80 mb-12 leading-relaxed transition-colors duration-300">
                                Join the region's largest educational open-day event. Bring your students to explore innovative projects, interactive stalls, and a world of opportunities in STEM and Arts.
                            </p>

                            <div className="space-y-8">
                                <div className="flex gap-4 group/feature hover:translate-x-2 transition-all duration-300">
                                    <div className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 p-3 rounded-xl h-fit border border-blue-500/10 group-hover/feature:scale-110 transition-transform">
                                        <BuildingLibraryIcon className="w-6 h-6 text-blue-500" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-[var(--color-text)] transition-colors duration-300">School Participation</h3>
                                        <p className="text-[var(--color-text)] opacity-70 transition-colors duration-300">Open for all middle and high schools in the J&K region.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 group/feature hover:translate-x-2 transition-all duration-300">
                                    <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 p-3 rounded-xl h-fit border border-emerald-500/10 group-hover/feature:scale-110 transition-transform">
                                        <UserGroupIcon className="w-6 h-6 text-emerald-500" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-[var(--color-text)] transition-colors duration-300">Massive Engagement</h3>
                                        <p className="text-[var(--color-text)] opacity-70 transition-colors duration-300">Interact with over 5000+ peers and professional educators.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 group/feature hover:translate-x-2 transition-all duration-300">
                                    <div className="bg-gradient-to-br from-rose-500/20 to-red-500/20 p-3 rounded-xl h-fit border border-rose-500/10 group-hover/feature:scale-110 transition-transform">
                                        <AcademicCapIcon className="w-6 h-6 text-rose-500" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-[var(--color-text)] transition-colors duration-300">Certificates & Awards</h3>
                                        <p className="text-[var(--color-text)] opacity-70 transition-colors duration-300">Participating schools and students receive official IIT Jammu Pragyaan certificates.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Form */}
                        <div className="lg:w-1/2 w-full">
                            {/* Mobile Only Header */}
                            <div className="lg:hidden mb-8 text-center px-4">
                                <h1 className="text-3xl font-bold text-[var(--color-text)] leading-tight transition-colors duration-300">
                                    Register for <span className="text-brics-blue">Pragyaan 2026</span>
                                </h1>
                                <p className="mt-3 text-base text-[var(--color-text)] opacity-60 leading-relaxed transition-colors duration-300">
                                    Join the region's largest educational open-day event.
                                </p>
                            </div>

                            <div className="bg-[var(--color-card-bg)] p-5 lg:p-10 rounded-3xl lg:rounded-[2.5rem] border border-[var(--color-text)]/10 shadow-sm transition-colors duration-300">
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-[var(--color-text)] opacity-80 mb-2 transition-colors duration-300">School Name</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-4 py-2.5 lg:py-3 rounded-xl bg-transparent border border-[var(--color-text)]/20 text-[var(--color-text)] focus:border-brics-blue focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                                            placeholder="Enter your school name"
                                            value={formData.schoolName}
                                            onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-[var(--color-text)] opacity-80 mb-2 transition-colors duration-300">Contact Person</label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full px-4 py-2.5 lg:py-3 rounded-xl bg-transparent border border-[var(--color-text)]/20 text-[var(--color-text)] focus:border-brics-blue focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                                                placeholder="FullName"
                                                value={formData.contactPerson}
                                                onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-[var(--color-text)] opacity-80 mb-2 transition-colors duration-300">Phone Number</label>
                                            <input
                                                type="tel"
                                                required
                                                className="w-full px-4 py-2.5 lg:py-3 rounded-xl bg-transparent border border-[var(--color-text)]/20 text-[var(--color-text)] focus:border-brics-blue focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                                                placeholder="+91"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-[var(--color-text)] opacity-80 mb-2 transition-colors duration-300">Email Address</label>
                                        <input
                                            type="email"
                                            required
                                            className="w-full px-4 py-2.5 lg:py-3 rounded-xl bg-transparent border border-[var(--color-text)]/20 text-[var(--color-text)] focus:border-brics-blue focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                                            placeholder="school@example.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-[var(--color-text)] opacity-80 mb-2 transition-colors duration-300">Password</label>
                                            <input
                                                type="password"
                                                required
                                                className="w-full px-4 py-2.5 lg:py-3 rounded-xl bg-transparent border border-[var(--color-text)]/20 text-[var(--color-text)] focus:border-brics-blue focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                                                placeholder="••••••••"
                                                value={formData.password}
                                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-[var(--color-text)] opacity-80 mb-2 transition-colors duration-300">Confirm Password</label>
                                            <input
                                                type="password"
                                                required
                                                className="w-full px-4 py-2.5 lg:py-3 rounded-xl bg-transparent border border-[var(--color-text)]/20 text-[var(--color-text)] focus:border-brics-blue focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                                                placeholder="••••••••"
                                                value={formData.confirmPassword}
                                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-3.5 lg:py-4 bg-brics-blue text-white rounded-xl font-bold text-lg hover:bg-opacity-90 shadow-lg hover:shadow-xl transition-all mt-2 disabled:opacity-50"
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
