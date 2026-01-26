import { useState, useEffect } from 'react';
import {
    ChatBubbleLeftIcon,
    UserCircleIcon,
    ClockIcon,
    ArrowUturnRightIcon,
    PaperAirplaneIcon,
    XMarkIcon
} from '@heroicons/react/24/outline';

interface Reply {
    id: string;
    userName: string;
    comment: string;
    timestamp: Date;
}

interface Comment {
    id: string;
    eventId: number;
    userName: string;
    comment: string;
    selfieUrl?: string;
    timestamp: Date;
    replies: Reply[];
}

interface EventCommentsProps {
    eventId: number;
    comments: Comment[];
    onAddComment?: (comment: Comment) => void;
}

export type { Comment, Reply };
export default function EventComments({ comments: externalComments }: EventCommentsProps) {
    const [comments, setComments] = useState<Comment[]>(externalComments);
    const [replyingTo, setReplyingTo] = useState<string | null>(null);
    const [replyText, setReplyText] = useState('');
    const [replyName, setReplyName] = useState('');

    // Sync external comments with local state
    useEffect(() => {
        setComments(externalComments);
    }, [externalComments]);

    const formatTimeAgo = (date: Date): string => {
        const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

        if (seconds < 60) return 'just now';
        if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
        if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
        return date.toLocaleDateString();
    };

    const handleReplySubmit = (commentId: string) => {
        if (!replyText.trim()) return;

        const newReply: Reply = {
            id: `r${Date.now()}`,
            userName: replyName.trim() || 'Anonymous',
            comment: replyText,
            timestamp: new Date()
        };

        setComments(comments.map(comment => {
            if (comment.id === commentId) {
                return {
                    ...comment,
                    replies: [...comment.replies, newReply]
                };
            }
            return comment;
        }));

        setReplyText('');
        setReplyName('');
        setReplyingTo(null);
    };

    const cancelReply = () => {
        setReplyingTo(null);
        setReplyText('');
        setReplyName('');
    };

    if (comments.length === 0) {
        return (
            <section className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
                <div className="bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-2xl p-12 text-center border-2 border-gray-100">
                    <ChatBubbleLeftIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">No Comments Yet</h3>
                    <p className="text-gray-600">Be the first to share your experience!</p>
                </div>
            </section>
        );
    }

    return (
        <section className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
            <div className="mb-8 text-center">
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-brics-blue via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
                    Community Feedback
                </h2>
                <p className="text-gray-600 text-sm md:text-base">
                    See what others are saying about this event
                </p>
            </div>

            <div className="space-y-6">
                {comments.map((comment) => (
                    <div
                        key={comment.id}
                        className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border-2 border-gray-100 hover:shadow-xl transition-all duration-300"
                    >
                        {/* Comment Header */}
                        <div className="flex items-start gap-4 mb-4">
                            {/* Avatar */}
                            <div className="flex-shrink-0">
                                {comment.selfieUrl ? (
                                    <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-gradient-to-r from-brics-blue to-indigo-500 ring-offset-2">
                                        <img
                                            src={comment.selfieUrl}
                                            alt={comment.userName}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                                        <UserCircleIcon className="w-8 h-8 text-gray-500" />
                                    </div>
                                )}
                            </div>

                            {/* User Info */}
                            <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-gray-900 text-lg">
                                    {comment.userName}
                                </h4>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <ClockIcon className="w-4 h-4" />
                                    <span>{formatTimeAgo(comment.timestamp)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Comment Text */}
                        <p className="text-gray-700 leading-relaxed mb-4 pl-16">
                            {comment.comment}
                        </p>

                        {/* Reply Button */}
                        <div className="pl-16">
                            <button
                                onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                                className="flex items-center gap-2 text-sm font-semibold text-brics-blue hover:text-indigo-600 transition-colors"
                            >
                                <ArrowUturnRightIcon className="w-4 h-4" />
                                {replyingTo === comment.id ? 'Cancel Reply' : 'Reply'}
                            </button>
                        </div>

                        {/* Reply Form */}
                        {replyingTo === comment.id && (
                            <div className="mt-4 pl-16 animate-fadeIn">
                                <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-xl p-4 border-2 border-blue-100">
                                    <div className="space-y-3">
                                        <input
                                            type="text"
                                            value={replyName}
                                            onChange={(e) => setReplyName(e.target.value)}
                                            placeholder="Your name (optional)"
                                            className="w-full px-4 py-2 bg-white border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-brics-blue focus:border-brics-blue transition-all outline-none text-sm"
                                        />
                                        <textarea
                                            value={replyText}
                                            onChange={(e) => setReplyText(e.target.value)}
                                            placeholder="Write your reply..."
                                            className="w-full h-24 px-4 py-3 bg-white border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-brics-blue focus:border-brics-blue transition-all outline-none text-sm resize-none"
                                        />
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleReplySubmit(comment.id)}
                                                disabled={!replyText.trim()}
                                                className="flex-1 py-2 bg-gradient-to-r from-brics-blue to-indigo-600 text-white rounded-lg font-semibold text-sm shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                                            >
                                                <PaperAirplaneIcon className="w-4 h-4" />
                                                Post Reply
                                            </button>
                                            <button
                                                onClick={cancelReply}
                                                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold text-sm transition-all flex items-center gap-2"
                                            >
                                                <XMarkIcon className="w-4 h-4" />
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Replies */}
                        {comment.replies.length > 0 && (
                            <div className="mt-6 pl-16 space-y-4">
                                {comment.replies.map((reply) => (
                                    <div
                                        key={reply.id}
                                        className="bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-xl p-4 border-l-4 border-brics-blue animate-fadeIn"
                                    >
                                        <div className="flex items-center gap-2 mb-2">
                                            <UserCircleIcon className="w-6 h-6 text-gray-400" />
                                            <span className="font-bold text-gray-900 text-sm">
                                                {reply.userName}
                                            </span>
                                            <span className="text-xs text-gray-500">•</span>
                                            <span className="text-xs text-gray-500">
                                                {formatTimeAgo(reply.timestamp)}
                                            </span>
                                        </div>
                                        <p className="text-gray-700 text-sm leading-relaxed pl-8">
                                            {reply.comment}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
