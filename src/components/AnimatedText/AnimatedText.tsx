import { useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(SplitText, ScrollTrigger);

interface AnimatedTextProps {
    children: string;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
    className?: string;
    splitType?: 'chars' | 'words' | 'lines';
    animation?: 'fadeUp' | 'slideUp' | 'fadeIn';
    delay?: number;
    stagger?: number;
    scrollTrigger?: boolean;
    once?: boolean;
}

export function AnimatedText({
    children,
    as: Tag = 'p',
    className = '',
    splitType = 'words',
    animation = 'fadeUp',
    delay = 0,
    stagger = 0.02,
    scrollTrigger = false,
    once = true,
}: AnimatedTextProps) {
    const textRef = useRef<HTMLElement>(null);
    const splitRef = useRef<SplitText | null>(null);

    useGSAP(() => {
        const element = textRef.current;
        if (!element) return;

        // Create split
        splitRef.current = new SplitText(element, {
            type: splitType,
            linesClass: 'split-line',
            wordsClass: 'split-word',
            charsClass: 'split-char',
        });

        const targets = splitRef.current[splitType];

        // Set initial state
        const initialState = {
            fadeUp: { opacity: 0, y: 30 },
            slideUp: { opacity: 0, y: 50, rotateX: -20 },
            fadeIn: { opacity: 0 },
        };

        const endState = {
            fadeUp: { opacity: 1, y: 0 },
            slideUp: { opacity: 1, y: 0, rotateX: 0 },
            fadeIn: { opacity: 1 },
        };

        gsap.set(targets, initialState[animation]);

        // Animation config
        const animationConfig: gsap.TweenVars = {
            ...endState[animation],
            duration: 0.8,
            stagger,
            delay,
            ease: 'power3.out',
        };

        // Add scroll trigger if needed
        if (scrollTrigger) {
            animationConfig.scrollTrigger = {
                trigger: element,
                start: 'top 85%',
                once,
            };
        }

        gsap.to(targets, animationConfig);

        // Cleanup
        return () => {
            splitRef.current?.revert();
        };
    }, { scope: textRef, dependencies: [children, splitType, animation] });

    // Ensure we revert on unmount
    useEffect(() => {
        return () => {
            splitRef.current?.revert();
        };
    }, []);

    return (
        <Tag ref={textRef as React.RefObject<HTMLHeadingElement>} className={className}>
            {children}
        </Tag>
    );
}
