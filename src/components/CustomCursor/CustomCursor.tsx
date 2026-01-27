import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './CustomCursor.css';

export function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const cursorDotRef = useRef<HTMLDivElement>(null);
    const posRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const cursor = cursorRef.current;
        const cursorDot = cursorDotRef.current;
        if (!cursor || !cursorDot) return;

        // Quick setters for smooth animation
        const xTo = gsap.quickTo(cursor, 'x', { duration: 0.5, ease: 'power3.out' });
        const yTo = gsap.quickTo(cursor, 'y', { duration: 0.5, ease: 'power3.out' });
        const dotXTo = gsap.quickTo(cursorDot, 'x', { duration: 0.1, ease: 'power2.out' });
        const dotYTo = gsap.quickTo(cursorDot, 'y', { duration: 0.1, ease: 'power2.out' });

        const handleMouseMove = (e: MouseEvent) => {
            posRef.current = { x: e.clientX, y: e.clientY };
            xTo(e.clientX);
            yTo(e.clientY);
            dotXTo(e.clientX);
            dotYTo(e.clientY);
        };

        // Handle hover states
        const handleMouseEnter = (e: Event) => {
            const target = e.target as HTMLElement;

            if (target.matches('a, button, [data-cursor="pointer"]')) {
                cursor.classList.add('cursor--pointer');
            }

            if (target.matches('[data-cursor="text"]')) {
                cursor.classList.add('cursor--text');
            }

            if (target.matches('[data-cursor="expand"]')) {
                cursor.classList.add('cursor--expand');
            }
        };

        const handleMouseLeave = () => {
            cursor.classList.remove('cursor--pointer', 'cursor--text', 'cursor--expand');
        };

        // Hide cursor when leaving window
        const handleMouseOut = (e: MouseEvent) => {
            if (!e.relatedTarget) {
                gsap.to([cursor, cursorDot], { opacity: 0, duration: 0.2 });
            }
        };

        const handleMouseOver = () => {
            gsap.to([cursor, cursorDot], { opacity: 1, duration: 0.2 });
        };

        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseover', handleMouseEnter, true);
        document.addEventListener('mouseout', handleMouseLeave, true);
        document.addEventListener('mouseout', handleMouseOut);
        document.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseover', handleMouseEnter, true);
            document.removeEventListener('mouseout', handleMouseLeave, true);
            document.removeEventListener('mouseout', handleMouseOut);
            document.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    return (
        <>
            <div ref={cursorRef} className="custom-cursor" aria-hidden="true">
                <div className="cursor__circle" />
            </div>
            <div ref={cursorDotRef} className="cursor-dot" aria-hidden="true" />
        </>
    );
}
