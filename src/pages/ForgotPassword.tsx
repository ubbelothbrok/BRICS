import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { EnvelopeIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { fetchApi } from '../utils/api';
import toast from 'react-hot-toast';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await fetchApi('/forgot-password/', {
                method: 'POST',
                body: JSON.stringify({ email })
            });
            setSent(true);
            toast.success('Reset link sent to your email');
        } catch (error: any) {
            toast.error(error.message || 'Failed to send reset link');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[var(--color-bg)] transition-colors duration-300">
            <Navbar />

            <main className="pt-32 pb-24 px-4 min-h-[calc(100vh-80px)] flex items-center justify-center">
                <div className="max-w-md w-full">
                    <div className="mb-8">
                        <Link to="/login" className="text-brics-blue font-semibold flex items-center gap-2 mb-8 hover:gap-3 transition-all w-fit">
                            <ArrowLeftIcon className="w-5 h-5" />
                            Back to Login
                        </Link>

                        <h1 className="text-3xl font-bold text-[var(--color-text)] mb-3">
                            Forgot Password?
                        </h1>
                        <p className="text-[var(--color-text)] opacity-60">
                            Enter your email address and we'll send you a link to reset your password.
                        </p>
                    </div>

                    <div className="bg-[var(--color-card-bg)] p-8 rounded-3xl border border-[var(--color-text)]/10 shadow-lg">
                        {!sent ? (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-[var(--color-text)] opacity-80 mb-2">Email Address</label>
                                    <div className="relative">
                                        <EnvelopeIcon className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text)] opacity-30" />
                                        <input
                                            type="email"
                                            required
                                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-transparent border border-[var(--color-text)]/20 text-[var(--color-text)] focus:border-brics-blue focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                                            placeholder="name@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-4 bg-brics-blue text-white rounded-xl font-bold text-lg hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
                                >
                                    {loading ? 'Sending Link...' : 'Send Reset Link'}
                                </button>
                            </form>
                        ) : (
                            <div className="text-center py-8">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <EnvelopeIcon className="w-8 h-8 text-green-600" />
                                </div>
                                <h3 className="text-xl font-bold text-[var(--color-text)] mb-2">Check your inbox</h3>
                                <p className="text-[var(--color-text)] opacity-60 mb-8">
                                    We have sent a password reset link to <br />
                                    <span className="font-semibold text-brics-blue">{email}</span>
                                </p>
                                <button
                                    onClick={() => setSent(false)}
                                    className="text-sm font-bold text-[var(--color-text)] opacity-40 hover:opacity-100 transition-opacity"
                                >
                                    Try another email
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
