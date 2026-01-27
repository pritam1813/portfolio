import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatedText } from '../AnimatedText';
import { GlowCard } from '../GlowCard';
import './Academics.css';

gsap.registerPlugin(ScrollTrigger);

// Education data - customize these
const education = [
    {
        degree: 'Bachelor of Technology',
        field: 'Computer Science & Engineering',
        institution: 'Your University Name',
        location: 'City, Country',
        period: '2020 - 2024',
        grade: '8.5 CGPA',
        highlights: [
            'Relevant coursework: Data Structures, Algorithms, Web Development, DBMS',
            "Dean's List for academic excellence",
            'Led the college tech club',
        ],
    },
    {
        degree: 'Higher Secondary (12th)',
        field: 'Science Stream',
        institution: 'Your School Name',
        location: 'City, Country',
        period: '2018 - 2020',
        grade: '92%',
        highlights: [
            'PCM with Computer Science',
            'School topper in Computer Science',
        ],
    },
    {
        degree: 'Secondary (10th)',
        field: 'General',
        institution: 'Your School Name',
        location: 'City, Country',
        period: '2018',
        grade: '95%',
        highlights: [
            'School rank holder',
        ],
    },
];

export function Academics() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.from('.academics__card', {
            opacity: 0,
            y: 50,
            stagger: 0.15,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 70%',
                once: true,
            },
        });
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} id="academics" className="academics section">
            <div className="container">
                {/* Section header */}
                <div className="academics__header">
                    <span className="section-label text-gradient">Education</span>
                    <AnimatedText
                        as="h2"
                        className="section-title"
                        splitType="words"
                        animation="fadeUp"
                        scrollTrigger
                    >
                        My academic journey
                    </AnimatedText>
                </div>

                {/* Education cards */}
                <div className="academics__grid">
                    {education.map((edu) => (
                        <GlowCard
                            key={edu.degree + edu.institution}
                            className="academics__card"
                            glowColor="purple"
                        >
                            <div className="academics__card-header">
                                <span className="academics__period">{edu.period}</span>
                                <span className="academics__grade">{edu.grade}</span>
                            </div>
                            <h3 className="academics__degree">{edu.degree}</h3>
                            <p className="academics__field">{edu.field}</p>
                            <p className="academics__institution">
                                {edu.institution}
                                <span> • {edu.location}</span>
                            </p>
                            {edu.highlights && edu.highlights.length > 0 && (
                                <ul className="academics__highlights">
                                    {edu.highlights.map((highlight, i) => (
                                        <li key={i}>{highlight}</li>
                                    ))}
                                </ul>
                            )}
                        </GlowCard>
                    ))}
                </div>
            </div>
        </section>
    );
}
