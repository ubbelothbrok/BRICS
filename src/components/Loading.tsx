import React from 'react';

const Loading: React.FC = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
            <div className="relative h-24 w-24">
                {/* Green Ring */}
                <div className="absolute inset-0 animate-spin rounded-full border-4 border-t-brics-green border-r-transparent border-b-transparent border-l-transparent" style={{ animationDuration: '1s' }}></div>

                {/* Blue Ring */}
                <div className="absolute inset-2 animate-spin rounded-full border-4 border-t-transparent border-r-brics-blue border-b-transparent border-l-transparent" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}></div>

                {/* Yellow Ring */}
                <div className="absolute inset-4 animate-spin rounded-full border-4 border-t-transparent border-r-transparent border-b-brics-yellow border-l-transparent" style={{ animationDuration: '2s' }}></div>

                {/* Red Ring */}
                <div className="absolute inset-6 animate-spin rounded-full border-4 border-t-transparent border-r-transparent border-b-transparent border-l-brics-red" style={{ animationDuration: '2.5s', animationDirection: 'reverse' }}></div>

                {/* Center Logo/Dot */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-brics-dark animate-pulse"></div>
                </div>
            </div>
        </div>
    );
};

export default Loading;
