import { useRef, type ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './SectionWrapper.css';

gsap.registerPlugin(ScrollTrigger);

interface SectionWrapperProps {
    children: ReactNode;
    id: string;
    className?: string;
    animation?: 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'none';
}

export function SectionWrapper({
    children,
    id,
    className = '',
    animation = 'fadeUp',
}: SectionWrapperProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (animation === 'none') return;

        const content = contentRef.current;
        if (!content) return;

        const animations: Record<string, gsap.TweenVars> = {
            fadeUp: { opacity: 0, y: 60 },
            fadeIn: { opacity: 0 },
            slideLeft: { opacity: 0, x: -100 },
            slideRight: { opacity: 0, x: 100 },
        };

        gsap.set(content, animations[animation]);

        gsap.to(content, {
            opacity: 1,
            y: 0,
            x: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
                once: true,
            },
        });
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} id={id} className={`section-wrapper section ${className}`}>
            <div ref={contentRef} className="section-wrapper__content container">
                {children}
            </div>
        </section>
    );
}
