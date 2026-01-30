import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AcademicCapIcon, UserGroupIcon, BuildingLibraryIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { fetchApi } from '../utils/api';
import toast from 'react-hot-toast';

export default function Registration() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        schoolName: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        otp: ''
    });

    const [loading, setLoading] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [timer, setTimer] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const calculatePasswordStrength = (password: string) => {
        let strength = 0;
        if (password.length > 7) strength++;
        if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
        if (password.match(/\d/)) strength++;
        if (password.match(/[^a-zA-Z\d]/)) strength++;
        return strength;
    };

    const getStrengthColor = (strength: number) => {
        if (strength === 0) return 'bg-gray-200';
        if (strength <= 1) return 'bg-red-500';
        if (strength === 2) return 'bg-yellow-500';
        if (strength === 3) return 'bg-blue-500';
        return 'bg-green-500';
    };

    const handleSendOTP = async () => {
        if (!formData.schoolName || !formData.firstName || !formData.lastName || !formData.email) {
            toast.error('Please fill in School Name, First Name, Last Name, and Email Address to send OTP');
            return;
        }
        setLoading(true);
        try {
            await fetchApi('/send-otp/', {
                method: 'POST',
                body: JSON.stringify({ email: formData.email })
            });
            setOtpSent(true);
            setTimer(30);
            toast.success('OTP sent to your email!');
        } catch (error: any) {
            toast.error(error.message || 'Failed to send OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            // Prepare data for backend (snake_case)
            const payload = {
                school_name: formData.schoolName,
                first_name: formData.firstName,
                last_name: formData.lastName,
                phone_number: formData.phone,
                email: formData.email,
                password: formData.password,
                otp: formData.otp
            };

            await fetchApi('/register/', {
                method: 'POST',
                body: JSON.stringify(payload)
            });
            toast.success('Registration successful! Logging you in...');

            // Auto Login
            try {
                await fetchApi('/login/', {
                    method: 'POST',
                    body: JSON.stringify({ email: formData.email, password: formData.password })
                });
                toast.success('Login successful!');
                navigate('/');
            } catch (loginError) {
                console.error('Auto-login failed', loginError);
                toast.error('Registration successful, but auto-login failed. Please login manually.');
                navigate('/login');
            }

            console.log(formData);
        } catch (error: any) {
            toast.error(error.message || 'Error connecting to server');
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
                                        <label className="block text-sm font-semibold text-[var(--color-text)] opacity-80 mb-2 transition-colors duration-300">School Name <span className="text-red-500">*</span></label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-4 py-2.5 lg:py-3 rounded-xl bg-transparent border border-[var(--color-text)]/20 text-[var(--color-text)] focus:border-brics-blue focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                                            placeholder="Enter your school name"
                                            value={formData.schoolName}
                                            onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                                            disabled={otpSent}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-[var(--color-text)] opacity-80 mb-2 transition-colors duration-300">First Name <span className="text-red-500">*</span></label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full px-4 py-2.5 lg:py-3 rounded-xl bg-transparent border border-[var(--color-text)]/20 text-[var(--color-text)] focus:border-brics-blue focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                                                placeholder="First Name"
                                                value={formData.firstName}
                                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                                disabled={otpSent}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-[var(--color-text)] opacity-80 mb-2 transition-colors duration-300">Last Name <span className="text-red-500">*</span></label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full px-4 py-2.5 lg:py-3 rounded-xl bg-transparent border border-[var(--color-text)]/20 text-[var(--color-text)] focus:border-brics-blue focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                                                placeholder="Last Name"
                                                value={formData.lastName}
                                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                                disabled={otpSent}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-[var(--color-text)] opacity-80 mb-2 transition-colors duration-300">Phone Number</label>
                                            <input
                                                type="tel"
                                                className="w-full px-4 py-2.5 lg:py-3 rounded-xl bg-transparent border border-[var(--color-text)]/20 text-[var(--color-text)] focus:border-brics-blue focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                                                placeholder="+91"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                disabled={otpSent}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-[var(--color-text)] opacity-80 mb-2 transition-colors duration-300">Email Address <span className="text-red-500">*</span></label>
                                        <div className="flex gap-2">
                                            <input
                                                type="email"
                                                required
                                                className="flex-1 px-4 py-2.5 lg:py-3 rounded-xl bg-transparent border border-[var(--color-text)]/20 text-[var(--color-text)] focus:border-brics-blue focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                                                placeholder="school@example.com"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                disabled={otpSent}
                                            />
                                            <button
                                                type="button"
                                                onClick={handleSendOTP}
                                                disabled={loading || (otpSent && timer > 0) || !formData.email}
                                                className="px-4 py-2 bg-brics-blue text-white rounded-xl font-bold text-sm hover:bg-opacity-90 transition-all disabled:opacity-50 whitespace-nowrap"
                                                style={{ minWidth: '140px' }}
                                            >
                                                {otpSent ? (timer > 0 ? `Resend in ${timer}s` : 'Resend OTP') : 'Send OTP'}
                                            </button>
                                        </div>
                                    </div>

                                    {otpSent && (
                                        <div>
                                            <label className="block text-sm font-semibold text-[var(--color-text)] opacity-80 mb-2 transition-colors duration-300">Enter OTP <span className="text-red-500">*</span></label>
                                            <input
                                                type="text"
                                                required
                                                maxLength={6}
                                                className="w-full px-4 py-2.5 lg:py-3 rounded-xl bg-transparent border border-[var(--color-text)]/20 text-[var(--color-text)] focus:border-brics-blue focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                                                placeholder="Enter 6-digit OTP"
                                                value={formData.otp}
                                                onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                                            />
                                        </div>
                                    )}

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <div className="mb-2 flex justify-between items-center">
                                                <label className="block text-sm font-semibold text-[var(--color-text)] opacity-80 transition-colors duration-300">Password <span className="text-red-500">*</span></label>
                                            </div>
                                            <div className="relative">
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    required
                                                    className="w-full px-4 py-2.5 lg:py-3 rounded-xl bg-transparent border border-[var(--color-text)]/20 text-[var(--color-text)] focus:border-brics-blue focus:ring-2 focus:ring-blue-100 transition-all outline-none pr-10"
                                                    placeholder="••••••••"
                                                    value={formData.password}
                                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text)] opacity-50 hover:opacity-100"
                                                >
                                                    {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                                                </button>
                                            </div>

                                            {/* Password Strength Meter */}
                                            {formData.password && (
                                                <div className="mt-2 flex gap-1 h-1.5">
                                                    {[...Array(4)].map((_, i) => (
                                                        <div
                                                            key={i}
                                                            className={`flex-1 rounded-full transition-all duration-300 ${i < calculatePasswordStrength(formData.password)
                                                                ? getStrengthColor(calculatePasswordStrength(formData.password))
                                                                : 'bg-gray-200/20'
                                                                }`}
                                                        ></div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-[var(--color-text)] opacity-80 mb-2 transition-colors duration-300">Confirm Password <span className="text-red-500">*</span></label>
                                            <div className="relative">
                                                <input
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    required
                                                    className="w-full px-4 py-2.5 lg:py-3 rounded-xl bg-transparent border border-[var(--color-text)]/20 text-[var(--color-text)] focus:border-brics-blue focus:ring-2 focus:ring-blue-100 transition-all outline-none pr-10"
                                                    placeholder="••••••••"
                                                    value={formData.confirmPassword}
                                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text)] opacity-50 hover:opacity-100"
                                                >
                                                    {showConfirmPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading || !otpSent}
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
