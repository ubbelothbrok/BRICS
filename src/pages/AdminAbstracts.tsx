import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { fetchApi, SERVER_URL } from '../utils/api';
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

interface Registration {
    id: number;
    name: string;
    school_name: string;
    email: string;
    phone_number: string;
    school_category: string;
    has_atl_lab: string;
    is_pm_shree: string;
    created_at: string;
}

export default function AdminAbstracts() {
    const [abstracts, setAbstracts] = useState<Abstract[]>([]);
    const [registrations, setRegistrations] = useState<Registration[]>([]);
    const [activeTab, setActiveTab] = useState<'abstracts' | 'registrations'>('abstracts');
    const [loading, setLoading] = useState(true);
    const [selectedAbstract, setSelectedAbstract] = useState<Abstract | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchApi('/accounts/me/')
            .then(userData => {
                if (!userData || !userData.is_staff) {
                    navigate('/');
                    return;
                }
                Promise.all([fetchAbstracts(), fetchRegistrations()]).finally(() => setLoading(false));
            })
            .catch(() => navigate('/'));
    }, []);

    const fetchAbstracts = async () => {
        try {
            const data = await fetchApi('/submissions/abstracts/');
            setAbstracts(data);
        } catch (error) {
            console.error("Failed to fetch abstracts", error);
        }
    };

    const fetchRegistrations = async () => {
        try {
            const data = await fetchApi('/manthan/registrations/');
            setRegistrations(data);
        } catch (error) {
            console.error("Failed to fetch registrations", error);
        }
    };

    const downloadRegistrationsCSV = () => {
        if (registrations.length === 0) return;

        const headers = ["ID", "Name", "School Name", "Email", "Phone Number", "Category", "ATL Lab", "PM Shree", "Date"];
        const csvContent = [
            headers.join(','),
            ...registrations.map(r => [
                r.id,
                `"${r.name}"`,
                `"${r.school_name}"`,
                r.email,
                r.phone_number,
                `"${r.school_category}"`,
                r.has_atl_lab,
                r.is_pm_shree,
                new Date(r.created_at).toLocaleDateString()
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "manthan_registrations.csv");
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center font-bold text-brics-blue">Loading Dashboard...</div>;

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="pt-32 pb-24 px-6 max-w-[1400px] mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
                        <p className="text-gray-500">Manage and review all incoming submissions and registrations.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex bg-white p-1 rounded-2xl border border-gray-200 shadow-sm">
                            <button
                                onClick={() => setActiveTab('abstracts')}
                                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'abstracts' ? 'bg-brics-blue text-white shadow-lg' : 'text-gray-500 hover:text-gray-900'}`}
                            >
                                Abstracts
                            </button>
                            <button
                                onClick={() => setActiveTab('registrations')}
                                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'registrations' ? 'bg-brics-blue text-white shadow-lg' : 'text-gray-500 hover:text-gray-900'}`}
                            >
                                Registrations
                            </button>
                        </div>
                        <div className="px-4 py-2 bg-white rounded-xl shadow-sm border border-gray-200 text-sm font-bold text-gray-600">
                            Total: {activeTab === 'abstracts' ? abstracts.length : registrations.length}
                        </div>
                        {activeTab === 'registrations' && registrations.length > 0 && (
                            <button
                                onClick={downloadRegistrationsCSV}
                                className="flex items-center gap-2 px-6 py-2.5 bg-green-600 text-white rounded-xl font-bold text-sm shadow-lg hover:bg-green-700 transition-all"
                            >
                                <ArrowDownTrayIcon className="w-5 h-5" />
                                Download CSV
                            </button>
                        )}
                    </div>
                </div>

                <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        {activeTab === 'abstracts' ? (
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
                                                            onClick={(e) => e.stopPropagation()}
                                                            title="Download File"
                                                        >
                                                            <ArrowDownTrayIcon className="w-5 h-5" />
                                                        </a>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <table className="w-full text-left">
                                <thead className="bg-gray-50/50 border-b border-gray-100">
                                    <tr>
                                        <th className="px-8 py-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="px-8 py-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Principal & School</th>
                                        <th className="px-8 py-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Contacts</th>
                                        <th className="px-8 py-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Details</th>
                                        <th className="px-8 py-6 text-xs font-bold text-gray-500 uppercase tracking-wider">ATL/PM</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {registrations.map((reg) => (
                                        <tr key={reg.id} className="hover:bg-blue-50/30 transition-colors group">
                                            <td className="px-8 py-6 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(reg.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-gray-900 mb-1">{reg.name}</span>
                                                    <span className="text-sm text-gray-500">{reg.school_name}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex flex-col text-sm">
                                                    <span className="text-gray-900 font-medium">{reg.email}</span>
                                                    <span className="text-gray-500">{reg.phone_number}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="px-3 py-1 rounded-full bg-blue-50 text-brics-blue text-xs font-bold border border-blue-100">
                                                    {reg.school_category}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex gap-2">
                                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${reg.has_atl_lab === 'yes' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                                        ATL: {reg.has_atl_lab}
                                                    </span>
                                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${reg.is_pm_shree === 'yes' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-500'}`}>
                                                        PM: {reg.is_pm_shree}
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}

                        {((activeTab === 'abstracts' && abstracts.length === 0) || (activeTab === 'registrations' && registrations.length === 0)) && (
                            <div className="p-12 text-center text-gray-500">
                                <DocumentTextIcon className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                                <p>No {activeTab} found yet.</p>
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
                            <div className="flex flex-col gap-10">
                                {/* Abstract Description Section */}
                                {selectedAbstract.description && (
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-2 text-brics-blue font-bold uppercase tracking-widest text-xs">
                                            <DocumentTextIcon className="w-4 h-4" />
                                            Abstract Description
                                        </div>
                                        <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
                                            <div className="ql-snow">
                                                <div
                                                    className="ql-editor abstract-content"
                                                    dangerouslySetInnerHTML={{ __html: selectedAbstract.description }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Uploaded Document Section */}
                                {selectedAbstract.file && (
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-brics-blue font-bold uppercase tracking-widest text-xs">
                                                <DocumentTextIcon className="w-4 h-4" />
                                                Uploaded Document
                                            </div>
                                            <a
                                                href={selectedAbstract.file.startsWith('http') ? selectedAbstract.file : `${SERVER_URL}${selectedAbstract.file}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs font-bold text-brics-blue hover:underline flex items-center gap-1"
                                            >
                                                <ArrowDownTrayIcon className="w-3 h-3" />
                                                Open Original
                                            </a>
                                        </div>

                                        <div className="bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 min-h-[600px] flex flex-col relative shadow-inner">
                                            <div className="w-full h-full flex flex-col flex-1">
                                                <div className="flex-1">
                                                    <iframe
                                                        src={selectedAbstract.file.startsWith('http') ? selectedAbstract.file : `${SERVER_URL}${selectedAbstract.file}`}
                                                        className="w-full min-h-[600px] border-none"
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
                                        </div>
                                    </div>
                                )}

                                {/* Fallback if both are missing (shouldn't happen with current validation) */}
                                {!selectedAbstract.description && !selectedAbstract.file && (
                                    <div className="py-20 flex flex-col items-center justify-center text-gray-400 opacity-50 space-y-3 text-center">
                                        <XMarkIcon className="w-12 h-12" />
                                        <p className="font-medium italic">This submission has no content.</p>
                                    </div>
                                )}
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
