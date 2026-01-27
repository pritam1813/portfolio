import { useRef, type ReactNode, type MouseEvent } from 'react';
import { gsap } from 'gsap';
import './MagneticButton.css';

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    href?: string;
    onClick?: () => void;
    strength?: number;
    download?: boolean;
}

export function MagneticButton({
    children,
    className = '',
    href,
    onClick,
    strength = 0.5,
    download = false,
}: MagneticButtonProps) {
    const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);

    const handleMouseMove = (e: MouseEvent) => {
        const button = buttonRef.current;
        const text = textRef.current;
        if (!button) return;

        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(button, {
            x: x * strength,
            y: y * strength,
            duration: 0.3,
            ease: 'power2.out',
        });

        if (text) {
            gsap.to(text, {
                x: x * strength * 0.5,
                y: y * strength * 0.5,
                duration: 0.3,
                ease: 'power2.out',
            });
        }
    };

    const handleMouseLeave = () => {
        const button = buttonRef.current;
        const text = textRef.current;

        gsap.to(button, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)',
        });

        if (text) {
            gsap.to(text, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.5)',
            });
        }
    };

    const commonProps = {
        className: `magnetic-button ${className}`,
        onMouseMove: handleMouseMove,
        onMouseLeave: handleMouseLeave,
    };

    if (href) {
        return (
            <a
                ref={buttonRef as React.RefObject<HTMLAnchorElement>}
                href={href}
                download={download}
                target={!download ? '_blank' : undefined}
                rel={!download ? 'noopener noreferrer' : undefined}
                {...commonProps}
            >
                <span ref={textRef} className="magnetic-button__text">
                    {children}
                </span>
            </a>
        );
    }

    return (
        <button
            ref={buttonRef as React.RefObject<HTMLButtonElement>}
            onClick={onClick}
            {...commonProps}
        >
            <span ref={textRef} className="magnetic-button__text">
                {children}
            </span>
        </button>
    );
}
