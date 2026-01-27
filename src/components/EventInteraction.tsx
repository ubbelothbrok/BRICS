import { useState } from 'react';
import {
    CameraIcon,
    XMarkIcon,
    PaperAirplaneIcon,
    CheckCircleIcon,
    PhotoIcon
} from '@heroicons/react/24/outline';

interface EventInteractionProps {
    eventId: number;
    onCommentSubmit?: (data: { userName: string; comment: string; imageUrl?: string }) => void;
}

export default function EventInteraction({ eventId, onCommentSubmit }: EventInteractionProps) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [comment, setComment] = useState('');
    const [userName, setUserName] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    const MAX_COMMENT_LENGTH = 500;

    const handleImageChange = (file: File | null) => {
        if (!file) return;

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            alert('Please upload a valid image file (JPG, PNG, or WebP)');
            return;
        }

        // Validate file size
        if (file.size > MAX_FILE_SIZE) {
            alert('Image size must be less than 5MB');
            return;
        }

        setImageFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setSelectedImage(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleImageChange(e.target.files[0]);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleImageChange(e.dataTransfer.files[0]);
        }
    };

    const removeImage = () => {
        setSelectedImage(null);
        setImageFile(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!comment.trim() && !imageFile) {
            alert('Please add a comment or upload a selfie');
            return;
        }

        // Here you would typically send data to backend
        console.log('Submission:', {
            eventId,
            userName: userName || 'Anonymous',
            comment,
            imageFile
        });

        // Call the callback to add comment to the list
        if (onCommentSubmit) {
            onCommentSubmit({
                userName: userName || 'Anonymous',
                comment,
                imageUrl: selectedImage || undefined
            });
        }

        // Show success message
        setIsSubmitted(true);

        // Reset form after 3 seconds
        setTimeout(() => {
            setIsSubmitted(false);
            setComment('');
            setUserName('');
            setSelectedImage(null);
            setImageFile(null);
        }, 3000);
    };

    if (isSubmitted) {
        return (
            <div className="mb-8 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-2xl p-6 border-2 border-green-200 shadow-lg">
                <div className="flex flex-col items-center justify-center text-center space-y-3 animate-fadeIn">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center animate-bounce shadow-lg">
                        <CheckCircleIcon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-green-900">
                        Thank You for Sharing!
                    </h3>
                    <p className="text-green-700 max-w-md">
                        Your experience has been recorded. We appreciate your participation!
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="mb-8">
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border-2 border-gray-100 relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full blur-3xl opacity-50"></div>
                <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full blur-3xl opacity-50"></div>

                <div className="relative z-10">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-brics-blue via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                            Share Your Experience
                        </h2>
                        <p className="text-gray-600 text-sm md:text-base max-w-xl mx-auto">
                            Upload a selfie and tell us what you think about this event!
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            {/* Selfie Upload Section */}
                            <div className="space-y-2">
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider ml-1">
                                    📸 Upload Selfie
                                </label>

                                {!selectedImage ? (
                                    <div
                                        onDragOver={handleDragOver}
                                        onDragLeave={handleDragLeave}
                                        onDrop={handleDrop}
                                        className={`relative group cursor-pointer transition-all duration-300 ${isDragging ? 'scale-105' : ''
                                            }`}
                                    >
                                        <input
                                            type="file"
                                            accept="image/jpeg,image/jpg,image/png,image/webp"
                                            onChange={handleFileInput}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                                        />
                                        <div className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center transition-all duration-300 ${isDragging
                                            ? 'border-brics-blue bg-blue-50 shadow-lg'
                                            : 'border-gray-300 bg-gradient-to-br from-gray-50 to-blue-50/40 group-hover:border-brics-blue group-hover:shadow-md'
                                            }`}>
                                            <div className="w-12 h-12 bg-gradient-to-br from-brics-blue to-indigo-500 rounded-xl shadow-md flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                                <CameraIcon className="w-6 h-6 text-white" />
                                            </div>
                                            <p className="text-sm font-bold text-gray-800 mb-1">
                                                Click to upload or drag and drop
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                JPG, PNG, WebP (Max 5MB)
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="relative rounded-xl overflow-hidden group animate-fadeIn shadow-md">
                                        <img
                                            src={selectedImage}
                                            alt="Preview"
                                            className="w-full h-48 object-cover rounded-xl"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <button
                                                type="button"
                                                onClick={removeImage}
                                                className="p-3 bg-red-500 hover:bg-red-600 text-white rounded-full transition-all transform hover:scale-110 active:scale-95 shadow-lg"
                                            >
                                                <XMarkIcon className="w-5 h-5" />
                                            </button>
                                        </div>
                                        <div className="absolute top-2 right-2 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                                            <PhotoIcon className="w-4 h-4 text-green-600" />
                                            <span className="text-xs font-bold text-green-600">Ready</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Comment Section */}
                            <div className="space-y-2">
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider ml-1">
                                    💬 Your Thoughts
                                </label>
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value.slice(0, MAX_COMMENT_LENGTH))}
                                    placeholder="Share your experience, thoughts, or feedback about this event..."
                                    className="w-full h-[180px] px-4 py-3 bg-gradient-to-br from-gray-50 to-blue-50/30 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-brics-blue focus:border-brics-blue transition-all outline-none text-gray-800 placeholder-gray-400 resize-none font-sans leading-relaxed shadow-sm hover:shadow-md text-sm"
                                />
                                <div className="flex justify-between items-center px-2">
                                    <span className={`text-xs font-medium ${comment.length >= MAX_COMMENT_LENGTH
                                        ? 'text-red-500'
                                        : 'text-gray-500'
                                        }`}>
                                        {comment.length}/{MAX_COMMENT_LENGTH} characters
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Name Input */}
                        <div className="space-y-2">
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider ml-1">
                                👤 Your Name (Optional)
                            </label>
                            <input
                                type="text"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                placeholder="Enter your name or stay anonymous"
                                className="w-full px-4 py-3 bg-gradient-to-br from-gray-50 to-blue-50/30 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-brics-blue focus:border-brics-blue transition-all outline-none text-gray-800 placeholder-gray-400 shadow-sm hover:shadow-md text-sm"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full py-4 bg-gradient-to-r from-brics-blue via-indigo-600 to-purple-600 text-white rounded-xl font-bold text-base shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-98 transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                <PaperAirplaneIcon className="w-5 h-5" />
                                Share Your Experience
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
