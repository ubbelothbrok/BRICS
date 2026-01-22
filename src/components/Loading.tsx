import React from 'react';

const Loading: React.FC = () => {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img 
                    src="/hero_corousel/1.jpg" 
                    alt="Background" 
                    className="w-full h-full object-cover opacity-40 blur-sm"
                />
                <div className="absolute inset-0 bg-black/60"></div>
            </div>

            <div className="relative z-10 flex items-center justify-center">
                {/* Spinning Gradient Ring */}
                <div className="absolute w-32 h-32 rounded-full border-4 border-t-[#33C5F3] border-r-[#2A5CAA] border-b-[#33C5F3]/30 border-l-[#2A5CAA]/30 animate-spin"></div>
                
                {/* Logo in Center */}
                <img 
                    src="/logo.png" 
                    alt="Loading..." 
                    className="w-20 h-auto object-contain animate-pulse"
                />
            </div>
            <p className="mt-8 text-white font-semibold tracking-widest animate-pulse relative z-10">LOADING</p>
        </div>
    );
};

export default Loading;
