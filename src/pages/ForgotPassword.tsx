import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { EnvelopeIcon, ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { fetchApi } from '../utils/api';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await fetchApi('/auth/forgot-password', {
                method: 'POST',
                body: JSON.stringify({ email })
            });
            alert('Password reset link sent to your email!');
            navigate('/login');
        } catch (error: any) {
            alert(error.message || 'Error connecting to server');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[var(--color-bg)] transition-colors duration-500 overflow-hidden relative">
            <Navbar />

            {/* Premium Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brics-blue/10 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brics-blue/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-brics-cyan/5 rounded-full blur-[150px]"></div>
            </div>

            <main className="relative pt-32 pb-24 flex items-center justify-center min-h-screen z-10 px-4">
                <div className="max-w-xl w-full">
                    {/* Glassmorphism Card */}
                    <div className="bg-white/10 dark:bg-white/5 backdrop-blur-2xl p-8 lg:p-14 rounded-[2.5rem] border border-white/20 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)] group animate-fadeIn">

                        <div className="mb-12 text-center">
                            <h1 className="text-4xl lg:text-5xl font-bold font-heading mb-4 tracking-tight text-[var(--color-text)]">
                                Recover <span className="text-brics-blue underline decoration-brics-blue/30 underline-offset-8">Password</span>
                            </h1>
                            <p className="text-lg opacity-60 font-medium text-[var(--color-text)]">
                                Enter your email to receive a reset link
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="space-y-6">
                                {/* Email Field */}
                                <div className="group/input relative">
                                    <label className={`block text-xs font-bold uppercase tracking-widest mb-2 transition-all duration-300 ${focusedField === 'email' ? 'text-brics-blue translate-x-1' : 'opacity-50 text-[var(--color-text)]'}`}>
                                        Email Address
                                    </label>
                                    <div className="relative group">
                                        <div className={`absolute inset-0 bg-gradient-to-r from-brics-blue to-brics-blue/40 rounded-2xl blur-md transition-opacity duration-300 ${focusedField === 'email' ? 'opacity-10' : 'opacity-0'}`}></div>
                                        <div className="relative">
                                            <EnvelopeIcon className={`w-5 h-5 absolute left-5 top-1/2 -translate-y-1/2 transition-colors duration-300 ${focusedField === 'email' ? 'text-brics-blue' : 'opacity-30'}`} />
                                            <input
                                                type="email"
                                                required
                                                onFocus={() => setFocusedField('email')}
                                                onBlur={() => setFocusedField(null)}
                                                className="w-full pl-14 pr-6 py-5 rounded-2xl bg-white/50 dark:bg-black/20 border border-white/30 dark:border-white/10 text-[var(--color-text)] text-lg placeholder:opacity-30 focus:bg-white dark:focus:bg-black/40 transition-all duration-500 outline-none shadow-sm group-hover/input:border-white/50"
                                                placeholder="name@example.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full relative group overflow-hidden rounded-2xl"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-brics-blue to-[#1a4eba] transition-transform duration-500 group-hover:scale-105"></div>
                                <div className="relative py-5 px-6 flex items-center justify-center gap-3 text-white font-bold text-xl transition-all">
                                    {loading ? (
                                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        <>
                                            <span>Send Reset Link</span>
                                            <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </div>
                            </button>

                            <div className="pt-4 text-center">
                                <Link to="/login" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest opacity-60 hover:opacity-100 hover:text-brics-blue transition-all">
                                    <ArrowLeftIcon className="w-4 h-4" />
                                    Back to Login
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
