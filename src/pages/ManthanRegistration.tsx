import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import toast from 'react-hot-toast';
import { fetchApi } from '../utils/api';
import { SparklesIcon } from '@heroicons/react/24/outline';

export default function ManthanRegistration() {
    const navigate = useNavigate();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        schoolName: '',
        email: '',
        phoneNumber: '',
        schoolCategory: '',
        otherCategory: '',
        hasAtlLab: '', // 'yes' or 'no'
        isPmShree: ''  // 'yes' or 'no'
    });

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const payload = {
                name: formData.name,
                school_name: formData.schoolName,
                email: formData.email,
                phone_number: formData.phoneNumber,
                school_category: formData.schoolCategory,
                other_category: formData.otherCategory,
                has_atl_lab: formData.hasAtlLab,
                is_pm_shree: formData.isPmShree
            };

            await fetchApi('/manthan/register/', {
                method: 'POST',
                body: JSON.stringify(payload)
            });

            console.log('Form Data Submitted:', payload);
            toast.success('Registration successful! Check your email.');
            setIsSubmitted(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            console.error('Registration error:', error);
            toast.error('Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-[var(--color-bg)] transition-colors duration-300">
                <Navbar />
                <main className="pt-32 pb-24 px-6 flex flex-col items-center justify-center text-center">
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8 animate-bounce">
                        <SparklesIcon className="w-12 h-12 text-green-600" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--color-text)] mb-4">
                        Registration Successful!
                    </h1>
                    <p className="text-xl text-[var(--color-text)] opacity-70 max-w-lg mx-auto mb-12">
                        Thank you for registering for the Principal Conclave. We have sent a confirmation email to your registered address.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                            to="/manthan/submit-abstract"
                            className="px-8 py-3 bg-brics-blue text-white rounded-full font-bold shadow-lg hover:bg-blue-700 transition-all hover:-translate-y-1"
                        >
                            Submit Abstract
                        </Link>
                        <button
                            onClick={() => navigate('/manthan')}
                            className="px-8 py-3 bg-white border-2 border-brics-blue text-brics-blue rounded-full font-bold shadow-lg hover:bg-blue-50 transition-all hover:-translate-y-1"
                        >
                            Return to Manthan
                        </button>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--color-bg)] transition-colors duration-300">
            <Navbar />

            <main className="pt-24 lg:pt-32 pb-16 lg:pb-24">
                <div className="max-w-3xl mx-auto px-6 lg:px-12">
                    <div className="mb-8 text-center">
                        <h1 className="text-4xl lg:text-5xl font-bold text-[var(--color-text)] mb-4 font-heading">
                            Principal’s Conclave <span className="text-brics-blue">Registration</span>
                        </h1>
                        <p className="text-xl text-[var(--color-text)] opacity-80 leading-relaxed">
                            Join us in reimagining Indian Schools.
                        </p>
                    </div>

                    <div className="bg-[var(--color-card-bg)] p-6 lg:p-10 rounded-3xl border border-[var(--color-text)]/10 shadow-lg">
                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* Personal Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-[var(--color-text)] opacity-80 mb-2">Full Name <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-3 rounded-xl bg-transparent border border-[var(--color-text)]/20 text-[var(--color-text)] focus:border-brics-blue focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                                        placeholder="Principal's Name"
                                        value={formData.name}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-[var(--color-text)] opacity-80 mb-2">School Name <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-3 rounded-xl bg-transparent border border-[var(--color-text)]/20 text-[var(--color-text)] focus:border-brics-blue focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                                        placeholder="School Name"
                                        value={formData.schoolName}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, schoolName: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-[var(--color-text)] opacity-80 mb-2">Email Address <span className="text-red-500">*</span></label>
                                    <input
                                        type="email"
                                        required
                                        className="w-full px-4 py-3 rounded-xl bg-transparent border border-[var(--color-text)]/20 text-[var(--color-text)] focus:border-brics-blue focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                                        placeholder="principal@school.com"
                                        value={formData.email}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-[var(--color-text)] opacity-80 mb-2">Phone Number <span className="text-red-500">*</span></label>
                                    <input
                                        type="tel"
                                        required
                                        className="w-full px-4 py-3 rounded-xl bg-transparent border border-[var(--color-text)]/20 text-[var(--color-text)] focus:border-brics-blue focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                                        placeholder="+91 98765 43210"
                                        value={formData.phoneNumber}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                    />
                                </div>
                            </div>

                            {/* School Details */}
                            <div>
                                <label className="block text-sm font-semibold text-[var(--color-text)] opacity-80 mb-2">School Category <span className="text-red-500">*</span></label>
                                <select
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-transparent border border-[var(--color-text)]/20 text-[var(--color-text)] focus:border-brics-blue focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                                    value={formData.schoolCategory}
                                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, schoolCategory: e.target.value })}
                                >
                                    <option value="" disabled>Select Category</option>
                                    <option value="APS" className="bg-[var(--color-card-bg)]">APS (Army Public School)</option>
                                    <option value="KV" className="bg-[var(--color-card-bg)]">KV (Kendriya Vidyalaya)</option>
                                    <option value="State Public School" className="bg-[var(--color-card-bg)]">State Public School</option>
                                    <option value="Private" className="bg-[var(--color-card-bg)]">Private School</option>
                                    <option value="Other" className="bg-[var(--color-card-bg)]">Other</option>
                                </select>
                            </div>

                            {formData.schoolCategory === 'Other' && (
                                <div>
                                    <label className="block text-sm font-semibold text-[var(--color-text)] opacity-80 mb-2">Specify Category <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-3 rounded-xl bg-transparent border border-[var(--color-text)]/20 text-[var(--color-text)] focus:border-brics-blue focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                                        placeholder="Please specify"
                                        value={formData.otherCategory}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, otherCategory: e.target.value })}
                                    />
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                                <div>
                                    <label className="block text-sm font-semibold text-[var(--color-text)] opacity-80 mb-3">Does School have ATL Lab? <span className="text-red-500">*</span></label>
                                    <div className="flex gap-6">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="atlLab"
                                                value="yes"
                                                checked={formData.hasAtlLab === 'yes'}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, hasAtlLab: e.target.value })}
                                                className="w-5 h-5 text-brics-blue"
                                                required
                                            />
                                            <span className="text-[var(--color-text)]">Yes</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="atlLab"
                                                value="no"
                                                checked={formData.hasAtlLab === 'no'}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, hasAtlLab: e.target.value })}
                                                className="w-5 h-5 text-brics-blue"
                                            />
                                            <span className="text-[var(--color-text)]">No</span>
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-[var(--color-text)] opacity-80 mb-3">Is School PM SHRI Status? <span className="text-red-500">*</span></label>
                                    <div className="flex gap-6">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="pmShree"
                                                value="yes"
                                                checked={formData.isPmShree === 'yes'}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, isPmShree: e.target.value })}
                                                className="w-5 h-5 text-brics-blue"
                                                required
                                            />
                                            <span className="text-[var(--color-text)]">Yes</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="pmShree"
                                                value="no"
                                                checked={formData.isPmShree === 'no'}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, isPmShree: e.target.value })}
                                                className="w-5 h-5 text-brics-blue"
                                            />
                                            <span className="text-[var(--color-text)]">No</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-4 bg-brics-blue text-white rounded-xl font-bold text-lg hover:bg-opacity-90 shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                                >
                                    {loading ? 'Submitting...' : 'Register for Conclave'}
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
