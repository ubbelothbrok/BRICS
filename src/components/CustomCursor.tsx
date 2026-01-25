import { useState, useEffect } from 'react';

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Only enable custom cursor if a fine pointer (mouse) is detected
        const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
        if (isTouchDevice) return;

        const onMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
            if (!isVisible) setIsVisible(true);
        };

        const onMouseEnter = () => setIsVisible(true);
        const onMouseLeave = () => setIsVisible(false);
        const onMouseDown = () => setIsMouseDown(true);
        const onMouseUp = () => setIsMouseDown(false);

        const onOver = (e: any) => {
            if (e.target.closest('a, button, input, [role="button"], .cursor-pointer')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseover', onOver);
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);
        document.addEventListener('mouseenter', onMouseEnter);
        document.addEventListener('mouseleave', onMouseLeave);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseover', onOver);
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('mouseenter', onMouseEnter);
            document.removeEventListener('mouseleave', onMouseLeave);
        };
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <>
            {/* Main Dot */}
            <div
                className="fixed top-0 left-0 w-2 h-2 bg-[#ffff00] rounded-full pointer-events-none z-[10000] mix-blend-difference"
                style={{
                    transform: `translate(${position.x - 4}px, ${position.y - 4}px) scale(${isMouseDown ? 0.8 : 1})`,
                }}
            />
            {/* Outer Ring */}
            <div
                className="fixed top-0 left-0 w-10 h-10 border border-[#ffff00] rounded-full pointer-events-none z-[9999] transition-all duration-300 ease-out mix-blend-difference"
                style={{
                    transform: `translate(${position.x - 20}px, ${position.y - 20}px) scale(${isHovering ? 1.5 : isMouseDown ? 0.9 : 1})`,
                    backgroundColor: isHovering ? 'rgba(255, 255, 0, 0.1)' : 'transparent',
                }}
            />
        </>
    );
}
