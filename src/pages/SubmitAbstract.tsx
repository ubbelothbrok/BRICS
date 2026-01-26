import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { SparklesIcon, DocumentPlusIcon, CloudArrowUpIcon, DocumentIcon, XMarkIcon } from '@heroicons/react/24/outline';


export default function SubmitAbstract() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        schoolName: '',
        principalName: '',
        abstractTitle: '',
        abstractDescription: ''
    });

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form Submitted:', formData);
        setIsSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
                        Share your vision and challenges to help draft the Pragyaan Charter for the future of Indian schools.
                    </p>
                </div>
            </header>

            <main className="pb-24 px-6">
                <div className="max-w-3xl mx-auto">
                    <form
                        onSubmit={handleSubmit}
                        className="bg-[var(--color-card-bg)] rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-[var(--color-text)]/5 backdrop-blur-sm relative overflow-hidden"
                    >
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>

                        <div className="space-y-8 relative z-10">
                            <div className="grid md:grid-cols-2 gap-6">
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

                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-[var(--color-text)] uppercase tracking-wider ml-1">
                                    Abstract Description
                                </label>
                                <textarea
                                    required
                                    placeholder="Provide a detailed description of your abstract..."
                                    className="w-full h-[400px] px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-brics-blue focus:border-transparent transition-all outline-none text-gray-900 resize-none font-sans leading-relaxed"
                                    value={formData.abstractDescription}
                                    onChange={(e) => setFormData({ ...formData, abstractDescription: e.target.value })}
                                />
                            </div>

                            <div className="space-y-4">
                                <label className="block text-sm font-bold text-[var(--color-text)] uppercase tracking-wider ml-1">
                                    Supporting Documents (PDF/DOC)
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
                                                Click to upload or drag and drop
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
