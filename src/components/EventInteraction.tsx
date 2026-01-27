import { useState, useRef } from 'react';
import {
    XMarkIcon,
    PaperAirplaneIcon,
    PhotoIcon,
    UserCircleIcon
} from '@heroicons/react/24/outline';

interface EventInteractionProps {
    eventId: number;
    onCommentSubmit?: (data: { userName: string; comment: string; imageUrl?: string }) => void;
}

export default function EventInteraction({ eventId, onCommentSubmit }: EventInteractionProps) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [comment, setComment] = useState('');
    const [userName, setUserName] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    const MAX_COMMENT_LENGTH = 500;

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

        const reader = new FileReader();
        reader.onloadend = () => {
            setSelectedImage(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const removeImage = () => {
        setSelectedImage(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!comment.trim() && !selectedImage) {
            return;
        }

        if (onCommentSubmit) {
            onCommentSubmit({
                userName: userName.trim() || 'Anonymous',
                comment,
                imageUrl: selectedImage || undefined
            });
        }

        setIsSubmitted(true);
        setTimeout(() => {
            setIsSubmitted(false);
            setComment('');
            setUserName('');
            setSelectedImage(null);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }, 2000);
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Join the conversation
            </h3>

            <form onSubmit={handleSubmit}>
                <div className="flex gap-4">
                    <div className="flex-shrink-0 pt-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                            <UserCircleIcon className="w-6 h-6 text-gray-400" />
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
                        {selectedImage && (
                            <div className="relative mt-2 inline-block">
                                <img
                                    src={selectedImage}
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

                                {/* Name Input */}
                                <input
                                    type="text"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    placeholder="Name (Optional)"
                                    className="bg-transparent text-xs text-gray-600 placeholder-gray-400 focus:text-gray-900 focus:outline-none border-b border-transparent focus:border-gray-300 py-1"
                                />
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
