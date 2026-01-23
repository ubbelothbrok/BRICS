import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { LockClosedIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { fetchApi } from '../utils/api';

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
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
        <div className="min-h-screen bg-[var(--color-bg)] transition-colors duration-300">
            <Navbar />

            <main className="pt-32 pb-24 flex items-center justify-center">
                <div className="max-w-md w-full px-6">
                    <div className="bg-[var(--color-card-bg)] p-8 lg:p-12 rounded-3xl border border-[var(--color-text)]/10 shadow-sm transition-colors duration-300">
                        <div className="text-center mb-10">
                            <h1 className="text-3xl font-bold text-[var(--color-text)] transition-colors duration-300">Welcome Back</h1>
                            <p className="text-[var(--color-text)] opacity-70 mt-2 transition-colors duration-300">Login to your Pragyaan account</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-[var(--color-text)] opacity-80 mb-2 transition-colors duration-300">Email Address</label>
                                <div className="relative">
                                    <EnvelopeIcon className="w-5 h-5 opacity-40 absolute left-4 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="email"
                                        required
                                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-transparent border border-[var(--color-text)]/20 text-[var(--color-text)] focus:border-brics-blue focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                                        placeholder="your@email.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-[var(--color-text)] opacity-80 mb-2 transition-colors duration-300">Password</label>
                                <div className="relative">
                                    <LockClosedIcon className="w-5 h-5 opacity-40 absolute left-4 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="password"
                                        required
                                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-transparent border border-[var(--color-text)]/20 text-[var(--color-text)] focus:border-brics-blue focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 bg-brics-blue text-white rounded-xl font-bold text-lg hover:bg-opacity-90 shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                            >
                                {loading ? 'Logging in...' : 'Sign In'}
                            </button>

                            <p className="text-center text-[var(--color-text)] opacity-70 transition-colors duration-300">
                                Don't have an account? <Link to="/register" className="text-brics-blue font-bold">Register Now</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
