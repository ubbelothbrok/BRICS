import { useState, useRef, useEffect } from 'react';
import { PaperAirplaneIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

interface Poll {
    id: number;
    question: string;
    options: string[];
}

interface ChatMessage {
    id: number;
    user: string;
    message: string;
    timestamp: string;
}

function LivePolling() {
    // Sample polls (in real app, this would come from admin/backend)
    const [polls] = useState<Poll[]>([
        {
            id: 1,
            question: "How have 1:1 devices (Now all students have a laptop/tablet) REALLY worked out on your campus?",
            options: [
                "Game-changing (transformed our pedagogy)",
                "Doing well (but still work-in-progress)",
                "Neutral (not bad)",
                "Struggle (we still prefer paper-based work/exams)"
            ]
        }
    ]);

    const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: number }>({});
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
        {
            id: 1,
            user: "Pradeep Srivastav",
            message: "How is self-paced learning working out? Are students really doing better, and how are you tracking progress?",
            timestamp: "10:30 AM"
        },
        {
            id: 2,
            user: "Rajdeep Chandra",
            message: "We're still working on it, but we've seen some improvements. We use weekly check-ins and digital portfolios to track student progress.",
            timestamp: "10:32 AM"
        }
    ]);
    const [newMessage, setNewMessage] = useState('');
    const chatContainerRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatMessages]);

    const handleVote = (pollId: number, optionIndex: number) => {
        setSelectedOptions({ ...selectedOptions, [pollId]: optionIndex });
    };

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim()) {
            const message: ChatMessage = {
                id: chatMessages.length + 1,
                user: "You",
                message: newMessage,
                timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
            };
            setChatMessages([...chatMessages, message]);
            setNewMessage('');
        }
    };

    return (
        <div className="h-screen bg-[var(--color-bg)] text-[var(--color-text)] font-sans overflow-hidden flex items-center justify-center p-0 sm:p-6">
            <main className="w-full sm:max-w-[900px] h-full flex items-center justify-center">

                {/* Combined Box: Chat with Embedded Poll */}
                <div className="bg-white rounded-none sm:rounded-2xl shadow-lg border-x sm:border border-gray-200 w-full h-full flex flex-col">
                    {/* Live Chat Section */}
                    <div className="flex flex-col h-full">
                        {/* Chat Header */}
                        <div className="bg-brics-blue px-4 py-3 sm:px-6 sm:py-4 flex-shrink-0">
                            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                                <ChatBubbleLeftRightIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                                Live Discussion
                            </h2>
                            <p className="text-blue-100 text-[10px] sm:text-sm mt-0.5 sm:mt-1">Join the conversation</p>
                        </div>

                        {/* Pinned Poll Section - Fixed at Top (Unified with Chat) */}
                        <div className="flex-shrink-0 px-4 pt-4 pb-8 sm:px-6 sm:pt-6 sm:pb-12 bg-gray-50 relative">
                            {polls.map((poll) => {
                                const voteData = [
                                    { votes: 45, percentage: 59 },
                                    { votes: 13, percentage: 17 },
                                    { votes: 18, percentage: 24 }
                                ];
                                const totalVotes = voteData.reduce((sum, data) => sum + data.votes, 0);

                                return (
                                    <div key={poll.id} className="group bg-yellow-50 rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-md border-2 border-yellow-300 hover:border-yellow-500 hover:shadow-2xl hover:scale-[1.01] sm:hover:scale-[1.02] cursor-pointer relative">

                                        {/* Content */}
                                        <div className="relative z-10">
                                            {/* Poll Header - Always Visible */}
                                            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                                                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300">
                                                    <span className="text-white font-bold text-sm sm:text-base">📊</span>
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-bold text-gray-900 text-sm sm:text-base leading-tight">Event Poll</h3>
                                                    <p className="text-[10px] sm:text-xs text-gray-500">📌 Pinned</p>
                                                </div>
                                            </div>

                                            <p className="text-xs sm:text-sm text-gray-700 mb-3 sm:mb-4 font-medium leading-normal">{poll.question}</p>

                                            {/* Poll Options - Reveal on Hover */}
                                            <div className="max-h-0 group-hover:max-h-[1000px] transition-all duration-700 ease-in-out overflow-hidden">
                                                <div className="space-y-4 pt-4 mt-2 border-t border-yellow-200/40">
                                                    {poll.options.slice(0, 3).map((option, index) => {
                                                        const data = voteData[index];
                                                        const isSelected = selectedOptions[poll.id] === index;

                                                        return (
                                                            <div key={index} className="space-y-2">
                                                                <div className="flex items-center justify-between text-sm">
                                                                    <button
                                                                        onClick={() => handleVote(poll.id, index)}
                                                                        className={`font-semibold transition-all duration-300 ${isSelected
                                                                            ? 'text-brics-blue scale-105'
                                                                            : 'text-gray-700 hover:text-brics-blue hover:scale-105'
                                                                            }`}
                                                                    >
                                                                        {option.split(' (')[0]}
                                                                    </button>
                                                                    <span className="text-gray-900 font-bold text-sm tracking-tight">{data.percentage}%</span>
                                                                </div>
                                                                <div className="relative w-full h-2.5 bg-gray-200/50 rounded-full overflow-hidden shadow-inner">
                                                                    <div
                                                                        className={`absolute left-0 top-0 h-full rounded-full transition-all duration-1000 ease-out ${isSelected
                                                                            ? 'bg-gradient-to-r from-green-400 via-green-500 to-emerald-600 shadow-sm'
                                                                            : 'bg-gradient-to-r from-gray-300 to-gray-400'
                                                                            }`}
                                                                        style={{ width: `${data.percentage}%` }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        );
                                                    })}

                                                    {selectedOptions[poll.id] !== undefined && (
                                                        <div className="pt-4 mt-4 border-t border-yellow-200/60">
                                                            <p className="text-sm text-gray-800 flex items-center gap-2 font-medium">
                                                                <span className="text-green-600 font-bold text-xl">✓</span>
                                                                <span>Your vote recorded • {totalVotes} participants</span>
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}

                        </div>

                        {/* Chat Messages - Scrollable */}
                        <div className="flex-1 relative overflow-hidden">
                            <div ref={chatContainerRef} className="h-full overflow-y-auto px-4 pb-4 pt-2 sm:px-6 sm:pb-6 space-y-3 sm:space-y-4 bg-gray-50">
                                {chatMessages.map((msg) => (
                                    <div key={msg.id} className="py-2 border-b border-gray-100 last:border-0 hover:bg-gray-100/50 transition-colors px-1 sm:px-2 rounded-lg">
                                        <div className="flex items-start gap-3 sm:gap-4">
                                            <UserCircleIcon className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400 flex-shrink-0" />
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between mb-1">
                                                    <h4 className="font-bold text-gray-900 text-sm">{msg.user}</h4>
                                                    <span className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">{msg.timestamp}</span>
                                                </div>
                                                <p className="text-gray-600 text-sm leading-relaxed">{msg.message}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Message Input - Fixed at Bottom */}
                        <form onSubmit={handleSendMessage} className="p-4 sm:p-6 bg-white border-t border-gray-200 flex-shrink-0">
                            <div className="flex gap-2 sm:gap-3">
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Type message..."
                                    className="flex-1 px-4 py-2 sm:py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-brics-blue focus:border-transparent text-sm sm:text-base"
                                />
                                <button
                                    type="submit"
                                    className="px-4 sm:px-6 py-2 sm:py-3 bg-brics-blue hover:bg-brics-blue/90 text-white rounded-full font-semibold transition-colors flex items-center gap-2 text-xs sm:text-sm"
                                >
                                    <PaperAirplaneIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                                    <span className="hidden xs:inline">Send</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default LivePolling;
