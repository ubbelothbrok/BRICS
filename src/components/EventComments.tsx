import { useState, useEffect, useRef } from 'react';
import {
    ChatBubbleLeftIcon,
    UserCircleIcon,
    ArrowUturnRightIcon,
    HeartIcon as HeartOutline
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import { fetchApi, SERVER_URL } from '../utils/api';

interface Reply {
    id: number;
    user_name: string;
    comment: string;
    created_at: string;
}

interface Comment {
    id: number;
    event_id: number;
    user_name: string;
    user_email: string;
    user_avatar?: string;
    comment: string;
    image?: string;
    created_at: string;
    replies: Reply[];
    likes_count: number;
    is_liked: boolean;
}

interface EventCommentsProps {
    eventId: number;
    comments: Comment[];
    onRefresh?: () => void;
}

export type { Comment, Reply };
export default function EventComments({ eventId, comments: externalComments, onRefresh }: EventCommentsProps) {
    const [user, setUser] = useState<any>(null);
    const [loadingAuth, setLoadingAuth] = useState(true);
    const [replyingTo, setReplyingTo] = useState<number | null>(null);
    const [replyText, setReplyText] = useState('');
    const [isPostingReply, setIsPostingReply] = useState(false);
    const [visibleCount, setVisibleCount] = useState(3);
    const [localComments, setLocalComments] = useState<Comment[]>([]);
    const [pendingCount, setPendingCount] = useState(0);
    const replyInputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        setLocalComments(externalComments);
    }, [externalComments]);

    useEffect(() => {
        if (replyingTo !== null) {
            // Small timeout to ensure the element is rendered before focusing
            const timer = setTimeout(() => {
                replyInputRef.current?.focus();
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [replyingTo]);

    useEffect(() => {
        // Check authentication
        fetchApi('/accounts/me/')
            .then(data => setUser(data))
            .catch(() => setUser(null))
            .finally(() => setLoadingAuth(false));

        // WebSocket for live updates
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const wsUrl = `${protocol}//${window.location.host}/ws/events/${eventId}/comments/`;
        const ws = new WebSocket(wsUrl);

        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            if (message.action === 'new_comment') {
                setPendingCount(prev => prev + 1);
            } else if (message.action === 'new_reply') {
                if (onRefresh) onRefresh();
            } else if (message.action === 'like_update') {
                setLocalComments(prev => prev.map(c =>
                    c.id === message.comment_id
                        ? { ...c, likes_count: message.likes_count }
                        : c
                ));
            }
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        return () => {
            ws.close();
        };
    }, [eventId, onRefresh]);

    const formatTimeAgo = (dateStr: string): string => {
        const date = new Date(dateStr);
        const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

        if (seconds < 60) return 'just now';
        if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
        if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
        return date.toLocaleDateString();
    };

    const handleReplySubmit = async (commentId: number) => {
        if (!replyText.trim() || isPostingReply) return;

        setIsPostingReply(true);
        try {
            const formData = new FormData();
            formData.append('comment', replyText);
            formData.append('event_id', eventId.toString());
            await fetchApi(`/comments/${commentId}/reply/`, {
                method: 'POST',
                body: formData,
            });

            setReplyText('');
            setReplyingTo(null);
            if (onRefresh) onRefresh();
        } catch (error) {
            console.error('Failed to submit reply:', error);
            alert('Failed to submit reply. Please try again.');
        } finally {
            setIsPostingReply(false);
        }
    };

    const handleToggleLike = async (commentId: number) => {
        if (!user) {
            window.location.href = `${SERVER_URL}/auth/login/google-oauth2/?next=${window.location.pathname}`;
            return;
        }

        // Optimistic update
        setLocalComments(prev => prev.map(c => {
            if (c.id === commentId) {
                return {
                    ...c,
                    is_liked: !c.is_liked,
                    likes_count: c.is_liked ? c.likes_count - 1 : c.likes_count + 1
                };
            }
            return c;
        }));

        try {
            await fetchApi(`/comments/${commentId}/like/`, { method: 'POST' });
        } catch (error) {
            console.error('Failed to toggle like:', error);
            // Revert on error
            if (onRefresh) onRefresh();
        }
    };

    const handleLoadNew = () => {
        setPendingCount(0);
        if (onRefresh) onRefresh();
    };

    const handleSeeMore = () => {
        setVisibleCount(prev => prev + 3);
    };

    const visibleComments = localComments.slice(0, visibleCount);

    if (localComments.length === 0 && !pendingCount) {
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
                <span className="text-gray-500 text-sm">{externalComments.length} comments</span>
            </div>

            {/* New Comments Floating Prompt */}
            {pendingCount > 0 && (
                <div className="sticky top-24 z-20 flex justify-center mb-6 animate-bounce">
                    <button
                        onClick={handleLoadNew}
                        className="bg-brics-blue text-white px-4 py-2 rounded-full shadow-lg border border-white/20 text-xs font-bold hover:bg-blue-600 transition-colors flex items-center gap-2"
                    >
                        <ArrowUturnRightIcon className="w-3 h-3 rotate-90" />
                        Load {pendingCount} new comments
                    </button>
                </div>
            )}

            <div className="space-y-4 relative">
                <div className="space-y-4">
                    {visibleComments.map((comment) => (
                        <div key={comment.id} className="animate-fadeIn">
                            {/* Main Comment Bubble */}
                            <div className="flex gap-3">
                                <div className="flex-shrink-0 mt-1">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center ring-2 ring-white shadow-sm overflow-hidden">
                                        {comment.user_avatar ? (
                                            <img
                                                src={comment.user_avatar}
                                                alt={comment.user_name}
                                                className="w-full h-full object-cover"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <UserCircleIcon className="w-5 h-5 text-indigo-500" />
                                        )}
                                    </div>
                                </div>
                                <div className="flex-1 max-w-[85%]">
                                    <div className="flex items-baseline gap-2 mb-1">
                                        <span className="font-bold text-sm text-gray-900">{comment.user_name}</span>
                                        <span className="text-xs text-gray-400">{formatTimeAgo(comment.created_at)}</span>
                                    </div>

                                    <div className="bg-white rounded-2xl rounded-tl-sm p-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                        <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">{comment.comment}</p>

                                        {/* Attachment Image - Synced with Preview Style */}
                                        {comment.image && (
                                            <div className="mt-3 rounded-xl overflow-hidden border border-gray-100 shadow-sm bg-gray-50">
                                                <img
                                                    src={comment.image.startsWith('http') ? comment.image : `${SERVER_URL}${comment.image}`}
                                                    alt="Attached"
                                                    className="w-full aspect-[4/5] sm:aspect-video object-cover hover:scale-[1.02] transition-transform duration-500"
                                                    loading="lazy"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {/* Action row */}
                                    <div className="mt-1.5 flex gap-4 px-2">
                                        <button
                                            onClick={() => handleToggleLike(comment.id)}
                                            className={`flex items-center gap-1.5 transition-all duration-300 ${comment.is_liked ? 'text-red-500 scale-110' : 'text-gray-500 hover:text-red-400'}`}
                                        >
                                            {comment.is_liked ? (
                                                <HeartSolid className="w-4 h-4" />
                                            ) : (
                                                <HeartOutline className="w-4 h-4" />
                                            )}
                                            <span className="text-xs font-bold leading-none">{comment.likes_count || ''}</span>
                                        </button>

                                        <button
                                            onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                                            className="text-xs font-bold text-gray-500 hover:text-brics-blue transition-colors flex items-center gap-1"
                                        >
                                            <ArrowUturnRightIcon className="w-3.5 h-3.5" />
                                            {replyingTo === comment.id ? 'Cancel' : 'Reply'}
                                        </button>

                                        {comment.replies.length > 0 && (
                                            <span className="text-xs text-gray-400 font-medium flex items-center gap-1">
                                                <ChatBubbleLeftIcon className="w-3.5 h-3.5" />
                                                {comment.replies.length}
                                            </span>
                                        )}
                                    </div>

                                    {/* Reply Input */}
                                    {replyingTo === comment.id && (
                                        <div className="mt-3 bg-gray-50 rounded-xl p-3 border border-gray-200 animate-slideDown">
                                            {loadingAuth ? (
                                                <div className="text-xs text-center py-2 text-gray-500">Loading auth...</div>
                                            ) : !user ? (
                                                <div className="text-center py-2">
                                                    <p className="text-xs text-gray-600 mb-2">Login to reply</p>
                                                    <a
                                                        href={`${SERVER_URL}/auth/login/google-oauth2/?next=${window.location.pathname}`}
                                                        className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-gray-200 rounded text-[10px] font-bold text-gray-700 hover:bg-gray-50 transition-colors"
                                                    >
                                                        <img src="https://www.google.com/favicon.ico" alt="G" className="w-3 h-3" />
                                                        Login with Google
                                                    </a>
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="text-[10px] font-medium text-gray-500 mb-2">
                                                        Replying as {user.first_name}
                                                    </div>
                                                    <textarea
                                                        ref={replyInputRef}
                                                        value={replyText}
                                                        onChange={(e) => {
                                                            const cleaned = e.target.value.replace(/[\n\r]/g, '');
                                                            setReplyText(cleaned);
                                                        }}
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Enter' && !e.shiftKey) {
                                                                e.preventDefault();
                                                                handleReplySubmit(comment.id);
                                                            }
                                                        }}
                                                        placeholder="Reply..."
                                                        className="w-full h-10 px-3 py-2 bg-white border border-gray-200 rounded text-xs focus:ring-1 focus:ring-brics-blue outline-none resize-none mb-2"
                                                    />
                                                    <div className="flex justify-end gap-2">
                                                        <button
                                                            disabled={!replyText.trim() || isPostingReply}
                                                            onClick={() => handleReplySubmit(comment.id)}
                                                            className="px-3 py-1 bg-brics-blue text-white rounded text-xs font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
                                                        >
                                                            {isPostingReply ? 'Sending...' : 'Send'}
                                                        </button>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    )}

                                    {/* Replies List */}
                                    {comment.replies.length > 0 && (
                                        <div className="mt-2 space-y-2 pl-2 border-l-2 border-gray-100">
                                            {comment.replies.map((reply) => (
                                                <div key={reply.id} className="bg-gray-50 rounded-xl rounded-tl-sm p-2.5">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="font-bold text-xs text-gray-800">{reply.user_name}</span>
                                                        <span className="text-[10px] text-gray-400">{formatTimeAgo(reply.created_at)}</span>
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
                {visibleCount < externalComments.length && (
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
