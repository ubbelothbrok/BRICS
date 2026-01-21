import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { fetchApi } from '../utils/api';
import { PlusIcon, PencilIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface EventItem {
    _id: string;
    title: string;
    date: string;
    location: string;
    time: string;
    description: string;
    tag: string;
    color: string;
}

export default function AdminEvents() {
    const [events, setEvents] = useState<EventItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        location: '',
        time: '',
        description: '',
        tag: 'Academic',
        color: 'border-brics-blue'
    });

    const loadEvents = async () => {
        try {
            const data = await fetchApi('/events');
            setEvents(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadEvents();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingEvent) {
                await fetchApi(`/events/${editingEvent._id}`, {
                    method: 'PUT',
                    body: JSON.stringify(formData)
                });
            } else {
                await fetchApi('/events', {
                    method: 'POST',
                    body: JSON.stringify(formData)
                });
            }
            setShowModal(false);
            setEditingEvent(null);
            setFormData({ title: '', date: '', location: '', time: '', description: '', tag: 'Academic', color: 'border-brics-blue' });
            loadEvents();
        } catch (err) {
            alert('Operation failed');
        }
    };

    const handleEdit = (event: EventItem) => {
        setEditingEvent(event);
        setFormData({
            title: event.title,
            date: event.date,
            location: event.location,
            time: event.time,
            description: event.description,
            tag: event.tag,
            color: event.color
        });
        setShowModal(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this event?')) return;
        try {
            await fetchApi(`/events/${id}`, { method: 'DELETE' });
            loadEvents();
        } catch (err) {
            alert('Delete failed');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <main className="pt-32 pb-24">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="flex justify-between items-center mb-12">
                        <div>
                            <h1 className="text-4xl font-bold text-brics-dark">Manage Events</h1>
                            <p className="text-gray-600 mt-2">Add, update or remove events from the platform.</p>
                        </div>
                        <button
                            onClick={() => { setEditingEvent(null); setFormData({ title: '', date: '', location: '', time: '', description: '', tag: 'Academic', color: 'border-brics-blue' }); setShowModal(true); }}
                            className="bg-brics-blue text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-opacity-90 transition-all shadow-lg"
                        >
                            <PlusIcon className="w-5 h-5" />
                            Add Event
                        </button>
                    </div>

                    {loading ? (
                        <div className="text-center py-20">Loading...</div>
                    ) : (
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="px-8 py-4 font-bold text-gray-700">Event Details</th>
                                        <th className="px-8 py-4 font-bold text-gray-700">Date & Location</th>
                                        <th className="px-8 py-4 font-bold text-gray-700 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {events.map((event) => (
                                        <tr key={event._id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-8 py-6">
                                                <div className="font-bold text-brics-dark">{event.title}</div>
                                                <div className="text-sm text-gray-500 mt-1">{event.tag}</div>
                                            </td>
                                            <td className="px-8 py-6 text-gray-600">
                                                <div>{event.date}</div>
                                                <div className="text-sm">{event.location}</div>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <div className="flex justify-end gap-3">
                                                    <button onClick={() => handleEdit(event)} className="p-2 text-gray-400 hover:text-brics-blue transition-colors">
                                                        <PencilIcon className="w-5 h-5" />
                                                    </button>
                                                    <button onClick={() => handleDelete(event._id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                                                        <TrashIcon className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm px-4">
                    <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-brics-dark">{editingEvent ? 'Edit Event' : 'Add New Event'}</h2>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                                <XMarkIcon className="w-6 h-6" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Event Title</label>
                                    <input
                                        type="text" required
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brics-blue focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Date (e.g. May 15, 2026)</label>
                                    <input
                                        type="text" required
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brics-blue focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                                    <input
                                        type="text" required
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brics-blue focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Time</label>
                                    <input
                                        type="text" required
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brics-blue focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                        value={formData.time}
                                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Tag</label>
                                    <select
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brics-blue focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                        value={formData.tag}
                                        onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                                    >
                                        <option>Academic</option>
                                        <option>Youth</option>
                                        <option>Business</option>
                                        <option>Culture</option>
                                    </select>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                                    <textarea
                                        required rows={3}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brics-blue focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    ></textarea>
                                </div>
                            </div>
                            <button className="w-full bg-brics-blue text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:bg-opacity-90 transition-all">
                                {editingEvent ? 'Update Event' : 'Create Event'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}
