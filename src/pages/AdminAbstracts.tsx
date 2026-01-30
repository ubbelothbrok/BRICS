import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { fetchApi, SERVER_URL, getCookie } from '../utils/api';
import { DocumentTextIcon, ArrowDownTrayIcon, XMarkIcon, IdentificationIcon, AcademicCapIcon, CalendarIcon } from '@heroicons/react/24/outline';
import 'react-quill/dist/quill.snow.css';

interface Abstract {
    id: number;
    title: string;
    school_name: string;
    principal_name: string;
    description: string;
    file: string | null;
    created_at: string;
    user: number;
}

export default function AdminAbstracts() {
    const [abstracts, setAbstracts] = useState<Abstract[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedAbstract, setSelectedAbstract] = useState<Abstract | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchApi('/me/')
            .then(userData => {
                if (!userData || !userData.is_staff) {
                    navigate('/');
                    return;
                }
                fetchAbstracts();
            })
            .catch(() => navigate('/'));
    }, []);

    const fetchAbstracts = async () => {
        try {
            const csrfToken = getCookie('csrftoken');
            const response = await fetch(`${SERVER_URL}/api/submissions/abstracts/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken || '',
                },
                credentials: 'include',
            });
            if (!response.ok) throw new Error('Failed to fetch');
            const data = await response.json();
            setAbstracts(data);
        } catch (error) {
            console.error("Failed to fetch abstracts", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="pt-32 pb-24 px-6 max-w-[1400px] mx-auto">
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">Submitted Abstracts</h1>
                        <p className="text-gray-500">Manage and review all incoming submissions.</p>
                    </div>
                    <div className="px-4 py-2 bg-white rounded-xl shadow-sm border border-gray-200 text-sm font-bold text-gray-600">
                        Total: {abstracts.length}
                    </div>
                </div>

                <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50/50 border-b border-gray-100">
                                <tr>
                                    <th className="px-8 py-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-8 py-6 text-xs font-bold text-gray-500 uppercase tracking-wider">School Info</th>
                                    <th className="px-8 py-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Abstract Title</th>
                                    <th className="px-8 py-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Content</th>
                                    <th className="px-8 py-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {abstracts.map((abstract) => (
                                    <tr
                                        key={abstract.id}
                                        className="hover:bg-blue-50/30 transition-colors group cursor-pointer"
                                        onClick={() => setSelectedAbstract(abstract)}
                                    >
                                        <td className="px-8 py-6 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(abstract.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-gray-900 mb-1">{abstract.school_name}</span>
                                                <span className="text-sm text-gray-500">Prin. {abstract.principal_name}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="font-medium text-gray-900">{abstract.title}</span>
                                        </td>
                                        <td className="px-8 py-6 max-w-xs">
                                            {abstract.description ? (
                                                <div
                                                    className="text-sm text-gray-600 line-clamp-2"
                                                    dangerouslySetInnerHTML={{ __html: abstract.description }}
                                                />
                                            ) : (
                                                <span className="text-xs text-gray-400 italic">File only submission</span>
                                            )}
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex justify-end gap-3">
                                                {abstract.file && (
                                                    <a
                                                        href={abstract.file.startsWith('http') ? abstract.file : `${import.meta.env.VITE_SERVER_URL}${abstract.file}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="p-2 text-brics-blue bg-blue-50 rounded-lg hover:bg-brics-blue hover:text-white transition-colors"
                                                        title="Download File"
                                                    >
                                                        <ArrowDownTrayIcon className="w-5 h-5" />
                                                    </a>
                                                )}
                                                {/* Logic to view full details can be added here */}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {abstracts.length === 0 && (
                            <div className="p-12 text-center text-gray-500">
                                <DocumentTextIcon className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                                <p>No abstracts submitted yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Detailed Abstract Modal */}
            {selectedAbstract && (
                <div className="fixed inset-0 z-[600] flex items-center justify-center p-4 sm:p-6 lg:p-10">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
                        onClick={() => setSelectedAbstract(null)}
                    ></div>

                    {/* Modal Content */}
                    <div className="relative w-full max-w-6xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in fade-in duration-300">
                        {/* Modal Header */}
                        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 leading-tight mb-1">{selectedAbstract.title}</h2>
                                <div className="flex items-center gap-4 text-sm text-gray-500 font-medium">
                                    <span className="flex items-center gap-1.5">
                                        <AcademicCapIcon className="w-4 h-4" />
                                        {selectedAbstract.school_name}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <IdentificationIcon className="w-4 h-4" />
                                        {selectedAbstract.principal_name}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <CalendarIcon className="w-4 h-4" />
                                        {new Date(selectedAbstract.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedAbstract(null)}
                                className="p-2 hover:bg-gray-200 text-gray-400 hover:text-gray-900 rounded-full transition-all duration-200"
                            >
                                <XMarkIcon className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="flex-1 overflow-y-auto p-8">
                            <div className="grid lg:grid-cols-2 gap-10 h-full">
                                {/* Left Side: HTML Content */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-2 text-brics-blue font-bold uppercase tracking-widest text-xs">
                                        <DocumentTextIcon className="w-4 h-4" />
                                        Abstract Description
                                    </div>
                                    <div className="bg-white border border-gray-100 rounded-3xl p-8 min-h-[400px] shadow-sm">
                                        {selectedAbstract.description ? (
                                            <div className="ql-snow">
                                                <div
                                                    className="ql-editor abstract-content"
                                                    dangerouslySetInnerHTML={{ __html: selectedAbstract.description }}
                                                />
                                            </div>
                                        ) : (
                                            <div className="h-full flex flex-col items-center justify-center text-gray-400 opacity-50 space-y-3">
                                                <DocumentTextIcon className="w-12 h-12" />
                                                <p className="font-medium italic">No written description provided for this submission.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Right Side: PDF Preview / Document Info */}
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-brics-blue font-bold uppercase tracking-widest text-xs">
                                            <DocumentTextIcon className="w-4 h-4" />
                                            Uploaded Document
                                        </div>
                                        {selectedAbstract.file && (
                                            <a
                                                href={selectedAbstract.file.startsWith('http') ? selectedAbstract.file : `${SERVER_URL}${selectedAbstract.file}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs font-bold text-brics-blue hover:underline flex items-center gap-1"
                                            >
                                                <ArrowDownTrayIcon className="w-3 h-3" />
                                                Open Original
                                            </a>
                                        )}
                                    </div>

                                    <div className="bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 h-full min-h-[500px] flex flex-col items-center justify-center relative shadow-inner">
                                        {selectedAbstract.file ? (
                                            <div className="w-full h-full flex flex-col">
                                                <div className="flex-1">
                                                    <iframe
                                                        src={selectedAbstract.file.startsWith('http') ? selectedAbstract.file : `${SERVER_URL}${selectedAbstract.file}`}
                                                        className="w-full h-full border-none"
                                                        title="PDF Preview"
                                                    />
                                                </div>
                                                <div className="p-4 bg-white border-t border-gray-200 flex justify-center">
                                                    <p className="text-xs text-gray-500 mr-4">Preview not loading?</p>
                                                    <a
                                                        href={selectedAbstract.file.startsWith('http') ? selectedAbstract.file : `${SERVER_URL}${selectedAbstract.file}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-xs font-bold text-brics-blue hover:underline"
                                                    >
                                                        Click here to open document in new tab
                                                    </a>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center text-gray-400 opacity-50 space-y-3 p-10 text-center">
                                                <XMarkIcon className="w-12 h-12" />
                                                <p className="font-medium italic">No document file was uploaded for this submission.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-8 py-6 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3">
                            <button
                                onClick={() => setSelectedAbstract(null)}
                                className="px-6 py-2.5 rounded-xl font-bold text-sm text-gray-600 hover:bg-gray-200 transition-all"
                            >
                                Close View
                            </button>
                            {selectedAbstract.file && (
                                <a
                                    href={selectedAbstract.file.startsWith('http') ? selectedAbstract.file : `${SERVER_URL}${selectedAbstract.file}`}
                                    download
                                    className="px-6 py-2.5 rounded-xl font-bold text-sm bg-brics-blue text-white shadow-lg shadow-blue-500/20 hover:shadow-xl transition-all flex items-center gap-2"
                                >
                                    <ArrowDownTrayIcon className="w-4 h-4" />
                                    Download Document
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}
