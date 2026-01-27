import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatedText } from '../AnimatedText';
import { SkillBar } from '../SkillBar';
import './Skills.css';

gsap.registerPlugin(ScrollTrigger);

// Skills data - customize these
const skillCategories = [
    {
        name: 'Frontend',
        skills: [
            { name: 'React / Next.js', level: 90, color: 'blue' as const },
            { name: 'TypeScript', level: 85, color: 'blue' as const },
            { name: 'HTML / CSS / SCSS', level: 95, color: 'blue' as const },
            { name: 'Tailwind CSS', level: 85, color: 'blue' as const },
        ],
    },
    {
        name: 'Backend',
        skills: [
            { name: 'Node.js / Express', level: 80, color: 'green' as const },
            { name: 'Python / Django', level: 70, color: 'green' as const },
            { name: 'PostgreSQL / MongoDB', level: 75, color: 'green' as const },
            { name: 'REST APIs / GraphQL', level: 80, color: 'green' as const },
        ],
    },
    {
        name: 'Tools & Others',
        skills: [
            { name: 'Git / GitHub', level: 90, color: 'purple' as const },
            { name: 'Docker', level: 65, color: 'purple' as const },
            { name: 'Figma / Design', level: 70, color: 'purple' as const },
            { name: 'Linux / CLI', level: 75, color: 'purple' as const },
        ],
    },
];

// Tech icons for floating animation
const techLogos = [
    { name: 'React', icon: '⚛️' },
    { name: 'TypeScript', icon: '📘' },
    { name: 'Node.js', icon: '💚' },
    { name: 'Python', icon: '🐍' },
    { name: 'Git', icon: '🔀' },
    { name: 'Docker', icon: '🐳' },
];

export function Skills() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        // Animate category headers
        gsap.from('.skills__category-name', {
            opacity: 0,
            x: -30,
            stagger: 0.2,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 70%',
                once: true,
            },
        });

        // Animate floating tech icons
        gsap.utils.toArray('.skills__float-icon').forEach((icon, index) => {
            gsap.to(icon as HTMLElement, {
                y: 'random(-20, 20)',
                x: 'random(-10, 10)',
                rotation: 'random(-10, 10)',
                duration: 'random(2, 4)',
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: index * 0.2,
            });
        });
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} id="skills" className="skills section">
            <div className="container">
                {/* Section header */}
                <div className="skills__header">
                    <span className="section-label text-gradient">Skills</span>
                    <AnimatedText
                        as="h2"
                        className="section-title"
                        splitType="words"
                        animation="fadeUp"
                        scrollTrigger
                    >
                        Technologies I work with
                    </AnimatedText>
                </div>

                <div className="skills__content">
                    {/* Skill categories */}
                    <div className="skills__categories">
                        {skillCategories.map((category) => (
                            <div key={category.name} className="skills__category">
                                <h3 className="skills__category-name">{category.name}</h3>
                                <div className="skills__list">
                                    {category.skills.map((skill) => (
                                        <SkillBar
                                            key={skill.name}
                                            name={skill.name}
                                            level={skill.level}
                                            color={skill.color}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Floating tech icons */}
                    <div className="skills__floating" aria-hidden="true">
                        {techLogos.map((tech, index) => (
                            <div
                                key={tech.name}
                                className="skills__float-icon"
                                style={{
                                    '--delay': `${index * 0.5}s`,
                                } as React.CSSProperties}
                                title={tech.name}
                            >
                                {tech.icon}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
