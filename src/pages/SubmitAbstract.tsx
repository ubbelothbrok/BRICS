import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchApi, GOOGLE_LOGIN_URL } from '../utils/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { SparklesIcon, DocumentPlusIcon, CloudArrowUpIcon, DocumentIcon, XMarkIcon } from '@heroicons/react/24/outline';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import toast from 'react-hot-toast';

const modules = {
    toolbar: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link'],
        ['clean']
    ],
};

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link'
];

export default function SubmitAbstract() {
    const [user, setUser] = useState<any>(null);
    const [loadingAuth, setLoadingAuth] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        schoolName: '',
        principalName: '',
        abstractTitle: '',
        abstractDescription: ''
    });

    // Load saved draft from local storage on mount
    useEffect(() => {
        const savedData = localStorage.getItem('abstractFormData');
        if (savedData) {
            try {
                const parsedData = JSON.parse(savedData);
                setFormData(parsedData);
            } catch (e) {
                console.error('Error parsing saved draft:', e);
            }
        }

        // Check authentication
        fetchApi('/accounts/me/')
            .then(data => setUser(data))
            .catch(() => setUser(null))
            .finally(() => setLoadingAuth(false));
    }, []);

    // Save draft to local storage whenever form data changes
    useEffect(() => {
        localStorage.setItem('abstractFormData', JSON.stringify(formData));
    }, [formData]);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
            if (allowedTypes.includes(file.type)) {
                setSelectedFile(file);
            } else {
                alert('Please upload a PDF or DOC/DOCX file.');
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.abstractDescription && !selectedFile) {
            toast.error("Please provide either a description or a file.");
            return;
        }

        const data = new FormData();
        data.append('school_name', formData.schoolName);
        data.append('principal_name', formData.principalName);
        data.append('title', formData.abstractTitle);
        if (formData.abstractDescription) {
            data.append('description', formData.abstractDescription);
        }
        if (selectedFile) {
            data.append('file', selectedFile);
        }

        try {
            await fetchApi('/submissions/abstracts/', {
                method: 'POST',
                body: data,
            });

            console.log('Form Submitted Successfully');
            localStorage.removeItem('abstractFormData'); // Clear saved draft
            setIsSubmitted(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            toast.success('Abstract submitted successfully!');
        } catch (error: any) {
            console.error('Submission error:', error);
            toast.error(error.message || 'Failed to submit abstract');
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
                        Submission Successful!
                    </h1>
                    <p className="text-xl text-[var(--color-text)] opacity-70 max-w-lg mx-auto mb-12">
                        Thank you for your contribution to Pragyaan 2026. Your abstract has been received and is being reviewed by our committee.
                    </p>
                    <button
                        onClick={() => window.location.href = '/manthan'}
                        className="px-8 py-3 bg-brics-blue text-white rounded-full font-bold shadow-lg hover:bg-blue-700 transition-all"
                    >
                        Return to Manthan
                    </button>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--color-bg)] transition-colors duration-300">
            <Navbar />
            {/* Add custom styles for Quill */}
            <style>{`
                .quill {
                    background-color: #f9fafb; /* bg-gray-50 */
                    border-radius: 1rem;
                }
                .ql-toolbar {
                    border: none !important;
                    border-bottom: 1px solid #e5e7eb !important; /* border-gray-200 */
                    border-radius: 1rem 1rem 0 0;
                }
                .ql-container {
                    border: none !important;
                    font-size: 1.1rem;
                    font-family: 'Times New Roman', Times, serif;
                    min-height: 200px;
                    border-radius: 0 0 1rem 1rem;
                }
                .ql-editor {
                    min-height: 200px;
                    padding: 1rem 1.5rem;
                }
            `}</style>

            <header className="pt-32 pb-16 px-6 text-center bg-gradient-to-b from-blue-50/50 to-transparent">
                <div className="max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-brics-blue text-sm font-bold uppercase tracking-wider mb-6">
                        <DocumentPlusIcon className="w-4 h-4" />
                        Manthan 2026
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-[var(--color-text)] mb-6 tracking-tight">
                        Submit Your <span className="text-brics-blue">Abstract</span>
                    </h1>
                    <p className="text-lg md:text-xl text-[var(--color-text)] opacity-80 max-w-2xl mx-auto">
                        We invite you to share your unique vision and the challenges you face in your educational journey. Your insights will be instrumental in drafting the Pragyaan Charter—a foundational document designed to shape the future of Indian schools. Please provide a detailed abstract outlining your ideas, potential solutions, and the impact you hope to achieve. This is your opportunity to contribute to a transformative dialogue on education.
                    </p>
                </div>
            </header>

            <main className="pb-24 px-6">
                <div className="max-w-6xl mx-auto">
                    <form
                        onSubmit={handleSubmit}
                        className="bg-[var(--color-card-bg)] rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-[var(--color-text)]/5 backdrop-blur-sm relative overflow-hidden"
                    >
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>

                        {/* Authentication Overlay */}
                        {!loadingAuth && !user && (
                            <div className="absolute inset-0 z-50 bg-white/60 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center rounded-[2.5rem]">
                                <div className="max-w-md w-full p-8 bg-white rounded-3xl shadow-2xl border border-gray-100 animate-in fade-in zoom-in duration-300">
                                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                        <DocumentPlusIcon className="w-8 h-8 text-brics-blue" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Login Required</h2>
                                    <p className="text-gray-500 mb-8">Please sign in to submit your abstract for Manthan 2026.</p>

                                    <a
                                        href={GOOGLE_LOGIN_URL}
                                        className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-all duration-300 text-gray-700 font-bold mb-4"
                                    >
                                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                        </svg>
                                        Log in with Google
                                    </a>

                                    <p className="text-sm text-gray-500">
                                        New here? <Link to="/register" className="text-brics-blue font-bold hover:underline">Create an account</Link>
                                    </p>
                                </div>
                            </div>
                        )}

                        <div className="space-y-8 relative z-10">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-[var(--color-text)] uppercase tracking-wider ml-1">
                                        School Name
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="Enter school name"
                                        className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-brics-blue focus:border-transparent transition-all outline-none text-gray-900"
                                        value={formData.schoolName}
                                        onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-[var(--color-text)] uppercase tracking-wider ml-1">
                                        Principal Name
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="Enter principal's name"
                                        className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-brics-blue focus:border-transparent transition-all outline-none text-gray-900"
                                        value={formData.principalName}
                                        onChange={(e) => setFormData({ ...formData, principalName: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-[var(--color-text)] uppercase tracking-wider ml-1">
                                    Abstract Title
                                </label>
                                <input
                                    required
                                    type="text"
                                    placeholder="Enter abstract title"
                                    className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-brics-blue focus:border-transparent transition-all outline-none text-gray-900"
                                    value={formData.abstractTitle}
                                    onChange={(e) => setFormData({ ...formData, abstractTitle: e.target.value })}
                                />
                            </div>

                            <div className="space-y-4">
                                <label className="block text-sm font-bold text-[var(--color-text)] uppercase tracking-wider ml-1">
                                    Upload Abstract Document (PDF/DOC)
                                </label>
                                {!selectedFile ? (
                                    <div className="relative group">
                                        <input
                                            type="file"
                                            accept=".pdf,.doc,.docx"
                                            onChange={handleFileChange}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                                        />
                                        <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center bg-gray-50/50 group-hover:bg-gray-50 group-hover:border-brics-blue/50 transition-all duration-300">
                                            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                                <CloudArrowUpIcon className="w-6 h-6 text-brics-blue" />
                                            </div>
                                            <p className="text-sm font-semibold text-gray-900 mb-1">
                                                Click to upload your abstract file
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                PDF, DOC, DOCX (Max 10MB)
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-4 p-4 bg-blue-50/50 border border-blue-100 rounded-2xl animate-fadeIn">
                                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                                            <DocumentIcon className="w-5 h-5 text-brics-blue" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-bold text-gray-900 truncate">
                                                {selectedFile.name}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setSelectedFile(null)}
                                            className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
                                        >
                                            <XMarkIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-4 py-2">
                                <div className="h-px bg-gray-200 flex-1"></div>
                                <span className="text-gray-400 font-bold text-sm uppercase tracking-wider">OR Write Directly</span>
                                <div className="h-px bg-gray-200 flex-1"></div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-[var(--color-text)] uppercase tracking-wider ml-1">
                                    Write Abstract Description
                                </label>
                                <div className="bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-brics-blue focus-within:border-transparent transition-all p-1">
                                    <ReactQuill
                                        theme="snow"
                                        value={formData.abstractDescription}
                                        onChange={(value: string) => setFormData({ ...formData, abstractDescription: value })}
                                        modules={modules}
                                        formats={formats}
                                        placeholder="Type your abstract content here..."
                                        className="min-h-[400px]"
                                    />
                                </div>
                            </div>

                            <div className="pt-6">
                                <button
                                    type="submit"
                                    className="w-full py-5 bg-gradient-to-r from-brics-blue to-indigo-600 text-white rounded-2xl font-bold text-xl shadow-xl shadow-blue-500/20 hover:shadow-2xl hover:scale-[1.02] active:scale-95 transition-all duration-300"
                                >
                                    Submit Application
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </main>

            <Footer />
        </div>
    );
}
