import { useState, useEffect } from 'react';
import {
    ChatBubbleLeftIcon,
    UserCircleIcon,
    ArrowUturnRightIcon
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
    const [visibleCount, setVisibleCount] = useState(3);

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

    const handleSeeMore = () => {
        setVisibleCount(prev => prev + 3);
    };

    const visibleComments = comments.slice(0, visibleCount);

    if (comments.length === 0) {
        return (
            <section className="max-w-[800px] mx-auto px-4 py-8">
                <div className="bg-gray-50 rounded-2xl p-8 text-center border border-gray-200">
                    <ChatBubbleLeftIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <h3 className="text-xl font-bold text-gray-800 mb-1">No Comments Yet</h3>
                    <p className="text-gray-500 text-sm">Be the first to share your experience!</p>
                </div>
            </section>
        );
    }

    return (
        <section className="max-w-[800px] mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-brics-blue via-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
                    <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                    Live Feedback
                </h2>
                <span className="text-gray-500 text-sm">{comments.length} comments</span>
            </div>

            <div className="space-y-4 relative">
                <div className="space-y-4">
                    {visibleComments.map((comment) => (
                        <div key={comment.id} className="animate-fadeIn">
                            {/* Main Comment Bubble */}
                            <div className="flex gap-3">
                                <div className="flex-shrink-0 mt-1">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center ring-2 ring-white shadow-sm">
                                        <UserCircleIcon className="w-5 h-5 text-indigo-500" />
                                    </div>
                                </div>
                                <div className="flex-1 max-w-[85%]">
                                    <div className="flex items-baseline gap-2 mb-1">
                                        <span className="font-bold text-sm text-gray-900">{comment.userName}</span>
                                        <span className="text-xs text-gray-400">{formatTimeAgo(comment.timestamp)}</span>
                                    </div>

                                    <div className="bg-white rounded-2xl rounded-tl-sm p-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                        <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">{comment.comment}</p>

                                        {/* Attachment Image */}
                                        {comment.selfieUrl && (
                                            <div className="mt-3 rounded-lg overflow-hidden">
                                                <img
                                                    src={comment.selfieUrl}
                                                    alt="Attached"
                                                    className="max-h-60 w-auto object-cover rounded-lg border border-gray-100"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {/* Action row */}
                                    <div className="mt-1 flex gap-4">
                                        <button
                                            onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                                            className="text-xs font-medium text-gray-500 hover:text-brics-blue transition-colors flex items-center gap-1"
                                        >
                                            <ArrowUturnRightIcon className="w-3 h-3" />
                                            {replyingTo === comment.id ? 'Cancel' : 'Reply'}
                                        </button>

                                        {comment.replies.length > 0 && (
                                            <span className="text-xs text-gray-400 flex items-center gap-1">
                                                <ChatBubbleLeftIcon className="w-3 h-3" />
                                                {comment.replies.length} replies
                                            </span>
                                        )}
                                    </div>

                                    {/* Reply Input */}
                                    {replyingTo === comment.id && (
                                        <div className="mt-3 bg-gray-50 rounded-xl p-3 border border-gray-200 animate-slideDown">
                                            <input
                                                type="text"
                                                value={replyName}
                                                onChange={(e) => setReplyName(e.target.value)}
                                                placeholder="Name (opt)"
                                                className="w-full mb-2 px-3 py-1.5 bg-white border border-gray-200 rounded text-xs focus:ring-1 focus:ring-brics-blue outline-none"
                                            />
                                            <textarea
                                                value={replyText}
                                                onChange={(e) => setReplyText(e.target.value)}
                                                placeholder="Reply..."
                                                className="w-full h-16 px-3 py-2 bg-white border border-gray-200 rounded text-xs focus:ring-1 focus:ring-brics-blue outline-none resize-none mb-2"
                                            />
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => handleReplySubmit(comment.id)}
                                                    className="px-3 py-1 bg-brics-blue text-white rounded text-xs font-medium hover:bg-blue-700 transition-colors"
                                                >
                                                    Send
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {/* Replies List */}
                                    {comment.replies.length > 0 && (
                                        <div className="mt-2 space-y-2 pl-2 border-l-2 border-gray-100">
                                            {comment.replies.map((reply) => (
                                                <div key={reply.id} className="bg-gray-50 rounded-xl rounded-tl-sm p-2.5">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="font-bold text-xs text-gray-800">{reply.userName}</span>
                                                        <span className="text-[10px] text-gray-400">{formatTimeAgo(reply.timestamp)}</span>
                                                    </div>
                                                    <p className="text-gray-600 text-xs">{reply.comment}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* See More Button */}
                {visibleCount < comments.length && (
                    <div className="text-center pt-4">
                        <button
                            onClick={handleSeeMore}
                            className="group inline-flex items-center gap-2 px-6 py-2 bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md hover:border-brics-blue/30 transition-all duration-300"
                        >
                            <span className="text-sm font-medium text-gray-600 group-hover:text-brics-blue">
                                See More Comments
                            </span>
                            <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-brics-blue/10 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 text-gray-500 group-hover:text-brics-blue">
                                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
