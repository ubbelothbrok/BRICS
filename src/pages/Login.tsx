import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { LockClosedIcon, EnvelopeIcon, ArrowRightIcon, UserIcon, ShieldCheckIcon, SparklesIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { fetchApi } from '../utils/api';

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await fetchApi('/auth/login', {
                method: 'POST',
                body: JSON.stringify(formData)
            });
            alert('Login successful!');
            navigate('/');
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
                <div className="max-w-[1400px] w-full mx-auto px-6 lg:px-12">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        {/* Left Side: Info (Desktop Only) */}
                        <div className="hidden lg:block lg:w-1/2">
                            <Link to="/" className="text-brics-blue font-semibold flex items-center gap-2 mb-8 hover:gap-3 transition-all">
                                <ArrowLeftIcon className="w-5 h-5" />
                                Back to Home
                            </Link>

                            <h1 className="text-5xl font-bold text-[var(--color-text)] mb-6 leading-tight transition-colors duration-300">
                                Welcome to <span className="text-brics-blue">Pragyaan 2026</span>
                            </h1>
                            <p className="text-xl text-[var(--color-text)] opacity-80 mb-12 leading-relaxed transition-colors duration-300">
                                Access your personalized dashboard to manage event participation, track live scores, and stay connected with the Pragyaan community.
                            </p>

                            <div className="space-y-8">
                                <div className="flex gap-4">
                                    <div className="bg-brics-blue/10 p-3 rounded-xl h-fit">
                                        <UserIcon className="w-6 h-6 text-brics-blue" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-[var(--color-text)] transition-colors duration-300">Personalized Experience</h3>
                                        <p className="text-[var(--color-text)] opacity-70 transition-colors duration-300">Tailored dashboard with your event registrations and schedules.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="bg-brics-cyan/10 p-3 rounded-xl h-fit">
                                        <ShieldCheckIcon className="w-6 h-6 text-brics-cyan" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-[var(--color-text)] transition-colors duration-300">Secure Access</h3>
                                        <p className="text-[var(--color-text)] opacity-70 transition-colors duration-300">Your data and participation logs are protected with enterprise-grade security.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="bg-brics-blue/10 p-3 rounded-xl h-fit">
                                        <SparklesIcon className="w-6 h-6 text-brics-blue" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-[var(--color-text)] transition-colors duration-300">Live Updates</h3>
                                        <p className="text-[var(--color-text)] opacity-70 transition-colors duration-300">Get real-time notifications about upcoming sessions and result announcements.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Login Form */}
                        <div className="lg:w-1/2 w-full max-w-xl mx-auto">
                            {/* Mobile Only Header */}
                            <div className="lg:hidden mb-12 text-center">
                                <h1 className="text-4xl font-bold font-heading mb-4 tracking-tight text-[var(--color-text)]">
                                    Welcome <span className="text-brics-blue underline decoration-brics-blue/30 underline-offset-8">Back</span>
                                </h1>
                                <p className="text-lg opacity-60 font-medium text-[var(--color-text)]">
                                    Access your universe in Pragyaan 2026
                                </p>
                            </div>

                            {/* Glassmorphism Card */}
                            <div className="bg-white/10 dark:bg-white/5 backdrop-blur-2xl p-8 lg:p-14 rounded-[2.5rem] border border-white/20 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)] group animate-fadeIn">

                                <div className="hidden lg:block mb-12 text-center">
                                    <h1 className="text-4xl lg:text-5xl font-bold font-heading mb-4 tracking-tight text-[var(--color-text)]">
                                        Welcome <span className="text-brics-blue underline decoration-brics-blue/30 underline-offset-8">Back</span>
                                    </h1>
                                    <p className="text-lg opacity-60 font-medium text-[var(--color-text)]">
                                        Access your universe in Pragyaan 2026
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
                                                        value={formData.email}
                                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Password Field */}
                                        <div className="group/input relative">
                                            <div className="flex justify-between items-center mb-2">
                                                <label className={`block text-xs font-bold uppercase tracking-widest transition-all duration-300 ${focusedField === 'password' ? 'text-brics-blue translate-x-1' : 'opacity-50 text-[var(--color-text)]'}`}>
                                                    Password
                                                </label>
                                                <Link to="/forgot-password" size-xs className="text-[10px] font-bold uppercase tracking-widest opacity-40 hover:opacity-100 hover:text-brics-blue transition-all">
                                                    Forgot?
                                                </Link>
                                            </div>
                                            <div className="relative group">
                                                <div className={`absolute inset-0 bg-gradient-to-r from-brics-blue to-brics-blue/40 rounded-2xl blur-md transition-opacity duration-300 ${focusedField === 'password' ? 'opacity-10' : 'opacity-0'}`}></div>
                                                <div className="relative">
                                                    <LockClosedIcon className={`w-5 h-5 absolute left-5 top-1/2 -translate-y-1/2 transition-colors duration-300 ${focusedField === 'password' ? 'text-brics-blue' : 'opacity-30'}`} />
                                                    <input
                                                        type="password"
                                                        required
                                                        onFocus={() => setFocusedField('password')}
                                                        onBlur={() => setFocusedField(null)}
                                                        className="w-full pl-14 pr-6 py-5 rounded-2xl bg-white/50 dark:bg-black/20 border border-white/30 dark:border-white/10 text-[var(--color-text)] text-lg placeholder:opacity-30 focus:bg-white dark:focus:bg-black/40 transition-all duration-500 outline-none shadow-sm group-hover/input:border-white/50"
                                                        placeholder="••••••••"
                                                        value={formData.password}
                                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
                                                    <span>Sign Into Account</span>
                                                    <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                                </>
                                            )}
                                        </div>
                                    </button>

                                    <div className="pt-4 text-center">
                                        <p className="text-sm font-medium opacity-60 text-[var(--color-text)]">
                                            New to Pragyaan?{' '}
                                            <Link to="/register" className="text-brics-blue font-bold hover:underline underline-offset-4 decoration-2">
                                                Create an account
                                            </Link>
                                        </p>
                                    </div>
                                </form>
                            </div>

                            {/* Footer Links (Optional subtle) */}
                            <div className="mt-12 flex justify-center gap-8 opacity-30 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-text)]">
                                <Link to="/terms" className="hover:opacity-100 transition-opacity">Terms</Link>
                                <Link to="/privacy" className="hover:opacity-100 transition-opacity">Privacy</Link>
                                <Link to="/help" className="hover:opacity-100 transition-opacity">Support</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

