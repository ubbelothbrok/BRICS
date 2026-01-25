import { useState, useEffect } from 'react';

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
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
                className="fixed top-0 left-0 w-2 h-2 bg-brics-blue rounded-full pointer-events-none z-[9999] transition-transform duration-100 ease-out"
                style={{
                    transform: `translate(${position.x - 4}px, ${position.y - 4}px) scale(${isMouseDown ? 0.8 : 1})`,
                }}
            />
            {/* Outer Ring */}
            <div
                className="fixed top-0 left-0 w-10 h-10 border border-brics-blue/30 rounded-full pointer-events-none z-[9998] transition-all duration-300 ease-out"
                style={{
                    transform: `translate(${position.x - 20}px, ${position.y - 20}px) scale(${isHovering ? 1.5 : isMouseDown ? 0.9 : 1})`,
                    backgroundColor: isHovering ? 'rgba(0, 39, 118, 0.05)' : 'transparent',
                    borderColor: isHovering ? 'rgba(0, 39, 118, 0.8)' : 'rgba(0, 39, 118, 0.3)',
                }}
            />
        </>
    );
}
