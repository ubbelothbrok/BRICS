import React from 'react';

const Loading: React.FC = () => {
    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black overflow-hidden">
            {/* Background Image with heavy blur and dark overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/hero_corousel/1.jpg"
                    alt="Background"
                    className="w-full h-full object-cover opacity-50 blur-xl scale-110"
                />
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center">
                {/* Circular Container with Glow */}
                <div className="relative w-40 h-40 flex items-center justify-center">
                    {/* Glowing Ring */}
                    <div className="absolute inset-0 rounded-full border border-brics-blue/30"></div>
                    <div
                        className="absolute inset-0 rounded-full border-2 border-t-brics-blue border-r-transparent border-b-transparent border-l-transparent animate-spin"
                        style={{ filter: 'drop-shadow(0 0 8px #002776)' }}
                    ></div>

                    {/* Subtle Outer Glow */}
                    <div className="absolute -inset-4 rounded-full bg-brics-blue/5 blur-2xl"></div>

                    {/* Logo in Center */}
                    <img
                        src="/logo.png"
                        alt="Pragyaan 2026"
                        className="w-20 h-auto object-contain brightness-110"
                    />
                </div>

                {/* Loading Text */}
                <div className="mt-10 flex flex-col items-center">
                    <p className="text-white text-sm font-bold tracking-[0.4em] opacity-90">
                        LOADING
                    </p>
                    <div className="mt-4 flex gap-1">
                        <div className="w-1 h-1 bg-brics-blue rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-1 h-1 bg-brics-blue rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-1 h-1 bg-brics-blue rounded-full animate-bounce"></div>
                    </div>
                </div>
            </div>

            {/* Navrobotec Branding at Bottom */}
            <div className="absolute bottom-10 z-10 flex items-center gap-2 opacity-60">
                <span className="text-gray-400 text-xs font-medium tracking-wide">Platform developed by</span>
                <div className="flex items-center">
                    <span className="text-sm font-black text-gray-300 tracking-tighter uppercase">NAVR</span>
                    <img src="/navrobotec.svg" alt="O" className="h-5 w-auto brightness-0 invert mx-[-5px]" />
                    <span className="text-sm font-black text-gray-300 tracking-tighter uppercase">BOTEC</span>
                </div>
            </div>
        </div>
    );
};

export default Loading;
