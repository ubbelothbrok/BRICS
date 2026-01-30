import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { LockClosedIcon, EnvelopeIcon, ArrowRightIcon, UserIcon, ShieldCheckIcon, SparklesIcon, ArrowLeftIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { fetchApi, GOOGLE_LOGIN_URL } from '../utils/api';
import toast from 'react-hot-toast';

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await fetchApi('/login/', {
                method: 'POST',
                body: JSON.stringify(formData)
            });
            toast.success('Login successful!');
            navigate('/');
        } catch (error: any) {
            toast.error(error.message || 'Error connecting to server');
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

            <main className="relative pt-24 lg:pt-32 pb-16 lg:pb-24 flex items-center justify-center min-h-screen z-10 px-4">
                <div className="max-w-[1400px] w-full mx-auto px-6 lg:px-12">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        {/* Left Side: Info (Desktop Only) */}
                        <div className="hidden lg:block lg:w-1/2 lg:-mt-45">
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
                                <div className="flex gap-4 group/feature hover:translate-x-2 transition-all duration-300">
                                    <div className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 p-3 rounded-xl h-fit border border-blue-500/10 group-hover/feature:scale-110 transition-transform">
                                        <UserIcon className="w-6 h-6 text-blue-500" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-[var(--color-text)] transition-colors duration-300">Personalized Experience</h3>
                                        <p className="text-[var(--color-text)] opacity-70 transition-colors duration-300">Tailored dashboard with your event registrations and schedules.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 group/feature hover:translate-x-2 transition-all duration-300">
                                    <div className="bg-gradient-to-br from-cyan-500/20 to-teal-500/20 p-3 rounded-xl h-fit border border-cyan-500/10 group-hover/feature:scale-110 transition-transform">
                                        <ShieldCheckIcon className="w-6 h-6 text-cyan-500" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-[var(--color-text)] transition-colors duration-300">Secure Access</h3>
                                        <p className="text-[var(--color-text)] opacity-70 transition-colors duration-300">Your data and participation logs are protected with enterprise-grade security.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 group/feature hover:translate-x-2 transition-all duration-300">
                                    <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-3 rounded-xl h-fit border border-purple-500/10 group-hover/feature:scale-110 transition-transform">
                                        <SparklesIcon className="w-6 h-6 text-purple-600" />
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
                            <div className="lg:hidden mb-8 text-center">
                                <h1 className="text-3xl font-bold font-heading mb-3 tracking-tight text-[var(--color-text)]">
                                    Welcome <span className="text-brics-blue underline decoration-brics-blue/30 underline-offset-8">Back</span>
                                </h1>
                                <p className="text-base opacity-60 font-medium text-[var(--color-text)]">
                                    Access your universe in Pragyaan 2026
                                </p>
                            </div>

                            {/* Glassmorphism Card */}
                            <div className="bg-white/10 dark:bg-white/5 backdrop-blur-2xl p-6 lg:p-14 rounded-3xl lg:rounded-[2.5rem] border border-white/20 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)] group animate-fadeIn">

                                <div className="hidden lg:block mb-8 text-center">
                                    <h1 className="text-4xl lg:text-5xl font-bold font-heading mb-3 tracking-tight text-[var(--color-text)]">
                                        Welcome <span className="text-brics-blue underline decoration-brics-blue/30 underline-offset-8">Back</span>
                                    </h1>
                                    <p className="text-lg opacity-60 font-medium text-[var(--color-text)]">
                                        Access your universe in Pragyaan 2026
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-4">
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
                                                        className="w-full pl-12 lg:pl-14 pr-4 lg:pr-6 py-4 lg:py-5 rounded-xl lg:rounded-2xl bg-white/5 dark:bg-white/5 border border-white/30 dark:border-white/10 text-[var(--color-text)] text-base lg:text-lg placeholder:opacity-30 focus:bg-white/10 dark:focus:bg-white/10 transition-all duration-500 outline-none shadow-sm group-hover/input:border-white/50"
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
                                                        type={showPassword ? "text" : "password"}
                                                        required
                                                        onFocus={() => setFocusedField('password')}
                                                        onBlur={() => setFocusedField(null)}
                                                        className="w-full pl-12 lg:pl-14 pr-12 lg:pr-14 py-4 lg:py-5 rounded-xl lg:rounded-2xl bg-white/5 dark:bg-white/5 border border-white/30 dark:border-white/10 text-[var(--color-text)] text-base lg:text-lg placeholder:opacity-30 focus:bg-white/10 dark:focus:bg-white/10 transition-all duration-500 outline-none shadow-sm group-hover/input:border-white/50"
                                                        placeholder="••••••••"
                                                        value={formData.password}
                                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        className="absolute right-5 top-1/2 -translate-y-1/2 text-[var(--color-text)] opacity-30 hover:opacity-100 hover:text-brics-blue transition-all"
                                                    >
                                                        {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                                                    </button>
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
                                        <div className="relative py-4 lg:py-5 px-6 flex items-center justify-center gap-3 text-white font-bold text-lg lg:text-xl transition-all">
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

                                    <div className="relative py-2 flex items-center gap-4">
                                        <div className="h-px flex-1 bg-white/10"></div>
                                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-30">Or</span>
                                        <div className="h-px flex-1 bg-white/10"></div>
                                    </div>

                                    <a
                                        href={GOOGLE_LOGIN_URL}
                                        className="w-full flex items-center justify-center gap-3 py-3 rounded-2xl border border-white/20 hover:bg-white/5 transition-all duration-300 text-[var(--color-text)] font-semibold text-lg"
                                    >
                                        <svg className="w-6 h-6" viewBox="0 0 24 24">
                                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                        </svg>
                                        <span className="text-sm">Continue with Google</span>
                                    </a>

                                    <div className="pt-2 text-center">
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
                            <div className="mt-8 flex justify-center gap-8 opacity-30 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-text)]">
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

