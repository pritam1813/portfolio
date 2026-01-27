import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './SkillBar.css';

gsap.registerPlugin(ScrollTrigger);

interface SkillBarProps {
    name: string;
    level: number; // 0-100
    color?: 'blue' | 'purple' | 'pink' | 'green';
}

export function SkillBar({ name, level, color = 'blue' }: SkillBarProps) {
    const barRef = useRef<HTMLDivElement>(null);
    const fillRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const fill = fillRef.current;
        if (!fill) return;

        gsap.fromTo(
            fill,
            { scaleX: 0 },
            {
                scaleX: 1,
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: barRef.current,
                    start: 'top 90%',
                    once: true,
                },
            }
        );
    }, { scope: barRef });

    return (
        <div ref={barRef} className="skill-bar">
            <div className="skill-bar__header">
                <span className="skill-bar__name">{name}</span>
                <span className="skill-bar__level">{level}%</span>
            </div>
            <div className="skill-bar__track">
                <div
                    ref={fillRef}
                    className={`skill-bar__fill skill-bar__fill--${color}`}
                    style={{ width: `${level}%` }}
                />
            </div>
        </div>
    );
}
