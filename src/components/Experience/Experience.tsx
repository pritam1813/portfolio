import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatedText } from '../AnimatedText';
import './Experience.css';

gsap.registerPlugin(ScrollTrigger);

// Experience data - customize these
const experiences = [
    {
        title: 'Freelance Web Developer',
        company: 'Self-employed',
        location: 'Remote',
        period: 'Jan 2024 - Present',
        description: [
            'Developed and maintained web applications using React and Node.js',
            'Built responsive websites for small businesses and startups',
            'Participated in code reviews and contributed to improving code quality',
        ],
        technologies: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Next.js', 'Prisma'],
    },

    {
        title: 'Quality Control Engineer',
        company: 'Sterlite Technologies Ltd.',
        location: 'Aurangabad',
        period: 'Jul 2018 - Dec 2018',
        description: [
            'Responsible for testing the quality of the products',
            'Conducted tests to ensure that the products met the required standards',
            'Documented the results of the tests and reported any issues to the team',
        ],
        technologies: ['Optical Fiber'],
    }
];

export function Experience() {
    const sectionRef = useRef<HTMLElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Animate timeline line
        gsap.from('.experience__timeline-line', {
            scaleY: 0,
            transformOrigin: 'top',
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 60%',
                once: true,
            },
        });

        // Animate cards
        gsap.from('.experience__card', {
            opacity: 0,
            x: (index) => index % 2 === 0 ? -50 : 50,
            stagger: 0.2,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: timelineRef.current,
                start: 'top 70%',
                once: true,
            },
        });
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} id="experience" className="experience section">
            <div className="container">
                {/* Section header */}
                <div className="experience__header">
                    <span className="section-label text-gradient">Experience</span>
                    <AnimatedText
                        as="h2"
                        className="section-title"
                        splitType="words"
                        animation="fadeUp"
                        scrollTrigger
                    >
                        Where I've worked
                    </AnimatedText>
                </div>

                {/* Timeline */}
                <div ref={timelineRef} className="experience__timeline">
                    <div className="experience__timeline-line" />

                    {experiences.map((exp, index) => (
                        <div
                            key={exp.title + exp.company}
                            className={`experience__card ${index % 2 === 0 ? 'experience__card--left' : 'experience__card--right'}`}
                        >
                            <div className="experience__card-dot" />
                            <div className="experience__card-content glass">
                                <span className="experience__period">{exp.period}</span>
                                <h3 className="experience__title">{exp.title}</h3>
                                <p className="experience__company">
                                    {exp.company} <span>• {exp.location}</span>
                                </p>
                                <ul className="experience__description">
                                    {exp.description.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                                <div className="experience__technologies">
                                    {exp.technologies.map((tech) => (
                                        <span key={tech} className="experience__tech-tag">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
