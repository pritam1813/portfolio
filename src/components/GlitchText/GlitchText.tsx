import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import './GlitchText.css';

interface GlitchTextProps {
    children: string;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'span';
    className?: string;
    continuous?: boolean;
}

export function GlitchText({
    children,
    as: Tag = 'span',
    className = '',
    continuous = false,
}: GlitchTextProps) {
    const textRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        const element = textRef.current;
        if (!element) return;

        const tl = gsap.timeline({
            repeat: continuous ? -1 : 0,
            repeatDelay: continuous ? 4 : 0,
            delay: 0.5,
        });

        // Glitch effect sequence
        tl.to(element, {
            skewX: 10,
            duration: 0.1,
            ease: 'power2.inOut',
        })
            .to(element, {
                skewX: -8,
                duration: 0.08,
                ease: 'power2.inOut',
            })
            .to(element, {
                skewX: 5,
                duration: 0.06,
                ease: 'power2.inOut',
            })
            .to(element, {
                skewX: 0,
                duration: 0.1,
                ease: 'power2.inOut',
            });

        return () => {
            tl.kill();
        };
    }, { scope: textRef });

    return (
        <Tag ref={textRef as React.RefObject<HTMLHeadingElement>} className={`glitch-text ${className}`} data-text={children}>
            {children}
        </Tag>
    );
}
