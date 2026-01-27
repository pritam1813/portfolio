import { useRef, type ReactNode, type MouseEvent } from 'react';
import { gsap } from 'gsap';
import './GlowCard.css';

interface GlowCardProps {
    children: ReactNode;
    className?: string;
    tilt?: boolean;
    glowColor?: 'blue' | 'purple' | 'pink';
}

export function GlowCard({
    children,
    className = '',
    tilt = true,
    glowColor = 'blue',
}: GlowCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: MouseEvent) => {
        const card = cardRef.current;
        const glow = glowRef.current;
        if (!card || !glow) return;

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Move glow to mouse position
        gsap.to(glow, {
            x: x - centerX,
            y: y - centerY,
            duration: 0.3,
            ease: 'power2.out',
        });

        // Tilt effect
        if (tilt) {
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            gsap.to(card, {
                rotateX,
                rotateY,
                duration: 0.3,
                ease: 'power2.out',
                transformPerspective: 1000,
            });
        }
    };

    const handleMouseLeave = () => {
        const card = cardRef.current;
        const glow = glowRef.current;

        if (glow) {
            gsap.to(glow, {
                opacity: 0,
                duration: 0.3,
            });
        }

        if (card && tilt) {
            gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.5,
                ease: 'power2.out',
            });
        }
    };

    const handleMouseEnter = () => {
        const glow = glowRef.current;
        if (glow) {
            gsap.to(glow, {
                opacity: 1,
                duration: 0.3,
            });
        }
    };

    return (
        <div
            ref={cardRef}
            className={`glow-card glow-card--${glowColor} ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
            data-cursor="expand"
        >
            <div ref={glowRef} className="glow-card__glow" />
            <div className="glow-card__content">{children}</div>
        </div>
    );
}
