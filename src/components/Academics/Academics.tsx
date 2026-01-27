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
        degree: 'Master of Computer Applications',
        field: 'Computer Science & Engineering',
        institution: 'Jadavpur University',
        location: 'Kolkata, India',
        period: '2024 - Present',
        grade: '7.55 CGPA',
        highlights: [
            'Relevant coursework: Data Structures, Algorithms, Web Development, DBMS'
        ],
    },
    {
        degree: 'Bachelor of Computer Applications',
        field: 'Computer Science & Engineering',
        institution: 'IGNOU',
        location: 'Delhi, India',
        period: '2020 - 2023',
        grade: '63.79%',
        highlights: [
            'Relevant coursework: Data Structures, Algorithms'
        ],
    },
    {
        degree: 'Diploma in Electronics and Telecommunication Engineering',
        field: 'Electronics and Telecommunication Engineering',
        institution: 'RamaKrishna Mission Shilpamandira',
        location: 'Howrah, India',
        period: '2015 - 2018',
        grade: '8.3 CGPA',
        highlights: ['Polytechnic'
        ],
    },
    {
        degree: 'Higher Secondary (12th)',
        field: 'Science Stream',
        institution: 'Netaji Vidyayatan',
        location: 'Howrah, India',
        period: '2013 - 2015',
        grade: '67.8',
        highlights: [
            'PCM with Biology',
        ],
    },
    {
        degree: 'Secondary (10th)',
        field: 'Computer Science',
        institution: 'Maria\'s Day School',
        location: 'Howrah, India',
        period: '2012',
        grade: '68.3%',
        highlights: [
            'ICSE',
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
