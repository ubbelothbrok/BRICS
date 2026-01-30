import { useState, useRef, useEffect } from 'react';
import {
    XMarkIcon,
    PaperAirplaneIcon,
    PhotoIcon,
    UserCircleIcon
} from '@heroicons/react/24/outline';
import { fetchApi, SERVER_URL } from '../utils/api';

interface EventInteractionProps {
    eventId: number;
    onCommentSubmit?: (comment: any) => void;
}

export default function EventInteraction({ eventId, onCommentSubmit }: EventInteractionProps) {
    const [user, setUser] = useState<any>(null);
    const [loadingAuth, setLoadingAuth] = useState(true);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [comment, setComment] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    const MAX_COMMENT_LENGTH = 500;

    useEffect(() => {
        // Check authentication
        fetchApi('/accounts/me/')
            .then(data => setUser(data))
            .catch(() => setUser(null))
            .finally(() => setLoadingAuth(false));
    }, []);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            alert('Please upload a valid image file (JPG, PNG, or WebP)');
            return;
        }

        if (file.size > MAX_FILE_SIZE) {
            alert('Image size must be less than 5MB');
            return;
        }

        setSelectedImage(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const removeImage = () => {
        setSelectedImage(null);
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!comment.trim() && !selectedImage) {
            return;
        }

        try {
            const formData = new FormData();
            formData.append('comment', comment);
            if (selectedImage) {
                formData.append('image', selectedImage);
            }
            formData.append('event_id', eventId.toString());

            const newComment = await fetchApi(`/events/${eventId}/comments/`, {
                method: 'POST',
                body: formData,
            });

            if (onCommentSubmit) {
                onCommentSubmit(newComment);
            }

            setIsSubmitted(true);
            setTimeout(() => {
                setIsSubmitted(false);
                setComment('');
                setSelectedImage(null);
                setImagePreview(null);
                if (fileInputRef.current) fileInputRef.current.value = '';
            }, 2000);
        } catch (error) {
            console.error('Failed to submit comment:', error);
            alert('Failed to submit comment. Please try again.');
        }
    };

    if (loadingAuth) {
        return <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-6 text-center text-gray-500">Loading...</div>;
    }

    // Show login overlay if not authenticated
    if (!user) {
        return (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-6 relative overflow-hidden">
                {/* Blurred Background */}
                <div className="filter blur-sm opacity-50 pointer-events-none">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        Join the conversation
                    </h3>
                    <textarea
                        disabled
                        placeholder="Share your thoughts..."
                        className="w-full min-h-[80px] p-3 text-sm bg-gray-50 border border-gray-200 rounded-xl">
                    </textarea>
                </div>

                {/* Login Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-white/90 backdrop-blur-sm">
                    <div className="text-center px-8 py-10 max-w-md">
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">Share Your Experience</h3>
                        <p className="text-gray-600 mb-6">
                            Login to join the conversation and share your thoughts about this event.
                        </p>
                        <div className="space-y-3">
                            <a
                                href={`${SERVER_URL}/auth/login/google-oauth2/?next=${window.location.pathname}`}
                                className="inline-flex items-center justify-center gap-3 px-8 py-3 bg-white border-2 border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm w-full">
                                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                                Login with Google
                            </a>
                            <a
                                href="/register"
                                className="block text-sm text-brics-blue hover:underline font-medium">
                                Don't have an account? Register here
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Join the conversation
            </h3>

            <form onSubmit={handleSubmit}>
                <div className="flex gap-4">
                    <div className="flex-shrink-0 pt-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center overflow-hidden">
                            {user.picture ? (
                                <img src={user.picture} alt={user.first_name} className="w-full h-full object-cover" />
                            ) : (
                                <UserCircleIcon className="w-6 h-6 text-blue-600" />
                            )}
                        </div>
                    </div>

                    <div className="flex-1 min-w-0">
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value.slice(0, MAX_COMMENT_LENGTH))}
                            placeholder="Share your thoughts..."
                            className="w-full min-h-[80px] p-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brics-blue/50 focus:border-brics-blue outline-none resize-none transition-all"
                        />

                        {/* Image Preview */}
                        {imagePreview && (
                            <div className="relative mt-2 inline-block">
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="h-24 w-auto object-cover rounded-lg border border-gray-200"
                                />
                                <button
                                    type="button"
                                    onClick={removeImage}
                                    className="absolute -top-2 -right-2 p-1 bg-gray-800/80 text-white rounded-full hover:bg-gray-900 transition-colors"
                                >
                                    <XMarkIcon className="w-3 h-3" />
                                </button>
                            </div>
                        )}

                        <div className="flex flex-wrap items-center justify-between gap-3 mt-3">
                            <div className="flex items-center gap-4">
                                {/* Photo Upload Button */}
                                <div>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-brics-blue transition-colors px-2 py-1.5 rounded-lg hover:bg-gray-50"
                                    >
                                        <PhotoIcon className="w-4 h-4" />
                                        Add Photo
                                    </button>
                                </div>

                                {/* Show user's name */}
                                <span className="text-xs font-medium text-gray-600">
                                    Posting as {user.first_name} {user.last_name}
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className={`text-[10px] ${comment.length >= MAX_COMMENT_LENGTH ? 'text-red-500' : 'text-gray-400'}`}>
                                    {comment.length}/{MAX_COMMENT_LENGTH}
                                </span>
                                <button
                                    type="submit"
                                    disabled={(!comment.trim() && !selectedImage) || isSubmitted}
                                    className="px-4 py-1.5 bg-brics-blue hover:bg-blue-700 text-white text-xs font-bold rounded-full shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-1.5"
                                >
                                    {isSubmitted ? (
                                        'Posted!'
                                    ) : (
                                        <>
                                            Post <PaperAirplaneIcon className="w-3 h-3" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
