import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GlowCard } from '../GlowCard';
import { AnimatedText } from '../AnimatedText';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

// Highlights data - customize these
const highlights = [
    { icon: '💻', label: 'Web Development', value: 'Full Stack' },
    { icon: '🎓', label: 'Education', value: 'CS Graduate' },
    { icon: '🚀', label: 'Projects', value: '10+' },
    { icon: '☕', label: 'Coffee Consumed', value: '∞' },
];

export function About() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.from('.about__highlight', {
            opacity: 0,
            y: 40,
            stagger: 0.1,
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
        <section ref={sectionRef} id="about" className="about section">
            <div className="container">
                {/* Section header */}
                <div className="about__header">
                    <span className="section-label text-gradient">About Me</span>
                    <AnimatedText
                        as="h2"
                        className="section-title"
                        splitType="words"
                        animation="fadeUp"
                        scrollTrigger
                    >
                        Passionate about building digital experiences
                    </AnimatedText>
                </div>

                <div className="about__content">
                    {/* Bio text */}
                    <div className="about__bio">
                        <p>
                            Hi there! I'm a <strong>Full Stack Developer</strong> with a passion for
                            creating beautiful, functional, and user-friendly web applications.
                            I recently graduated with a degree in Computer Science and am excited
                            to bring my skills to the professional world.
                        </p>
                        <p>
                            I specialize in modern web technologies like <span className="text-gradient">React</span>,
                            <span className="text-gradient"> Node.js</span>, and <span className="text-gradient">TypeScript</span>.
                            I believe in writing clean, maintainable code and creating
                            experiences that users love.
                        </p>
                        <p>
                            When I'm not coding, you can find me exploring new technologies,
                            contributing to open source, or learning something new. I'm always
                            looking for opportunities to grow and take on exciting challenges.
                        </p>
                    </div>

                    {/* Highlights bento grid */}
                    <div className="about__highlights">
                        {highlights.map((item) => (
                            <GlowCard key={item.label} className="about__highlight">
                                <span className="about__highlight-icon">{item.icon}</span>
                                <span className="about__highlight-value">{item.value}</span>
                                <span className="about__highlight-label">{item.label}</span>
                            </GlowCard>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
