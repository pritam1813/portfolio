import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatedText } from '../AnimatedText';
import { MagneticButton } from '../MagneticButton';
import './Projects.css';

// Import optimized images with vite-imagetools
// w=800 resizes to 800px width, format=webp converts to WebP, quality=80 sets compression
import ynoteduImg from '../../assets/projects/ynotedu.png?w=800&format=webp&quality=80';
import shrinkyImg from '../../assets/projects/shrinky.png?w=800&format=webp&quality=80';
import tradingBotImg from '../../assets/projects/trading_bot.png?w=800&format=webp&quality=80';
import pclystImg from '../../assets/projects/pclyst.png?w=800&format=webp&quality=80';

gsap.registerPlugin(ScrollTrigger);

// Projects data - customize these (4 projects as requested)
const projects = [
    {
        id: 1,
        title: 'LMS Platform',
        description:
            'A full-featured LMS platform with user authentication, course management, cart functionality, and payment integration.',
        image: ynoteduImg,
        technologies: ['Next.js', 'PostgreSQL', 'Prisma', 'PhonePe'],
        liveUrl: 'https://www.ynotedu.com/',
        githubUrl: 'https://github.com/pritam1813/ynotedu',
        featured: true,
    },
    {
        id: 2,
        title: 'URL shortener App',
        description:
            'A simple, yet powerful URL shortener built using Next.js, MongoDB, and SHADCN',
        image: shrinkyImg,
        technologies: ['Next.js', 'TypeScript', 'MongoDB', 'SHADCN'],
        liveUrl: 'https://shrinky-v2.vercel.app/',
        githubUrl: 'https://github.com/pritam1813/shrinky-v2',
        featured: true,
    },
    {
        id: 3,
        title: 'Crypto Trading Bot',
        description:
            'A high-frequency scalping bot for Binance USDT-M Futures that trades based on live orderbook data.',
        image: tradingBotImg,
        technologies: ['TypeScript', 'Bun', 'Binance API', 'WebSocket'],
        liveUrl: 'https://github.com/pritam1813/orderbook_trader',
        githubUrl: 'https://github.com/pritam1813/orderbook_trader',
        featured: true,
    },
    {
        id: 4,
        title: 'Blogging Platform',
        description:
            'A full-featured blogging platform with user authentication, post management, and comment functionality.',
        image: pclystImg,
        technologies: ['Next.js', 'Next UI', 'Tailwind CSS', 'GraphQL'],
        liveUrl: 'https://pclyst.vercel.app',
        githubUrl: 'https://github.com/pritam1813/pclyst',
        featured: true,
    },
];

export function Projects() {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const container = containerRef.current;
        const scroll = scrollRef.current;
        if (!container || !scroll) return;

        // Calculate scroll distance
        const scrollWidth = scroll.scrollWidth;
        const containerWidth = container.offsetWidth;
        const scrollDistance = scrollWidth - containerWidth;

        // Create horizontal scroll animation
        gsap.to(scroll, {
            x: -scrollDistance,
            ease: 'none',
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top top',
                end: () => `+=${scrollDistance}`,
                pin: true,
                scrub: 1,
                anticipatePin: 1,
                invalidateOnRefresh: true,
            },
        });

        // Animate project cards on entry
        gsap.from('.project-card', {
            opacity: 0,
            y: 50,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
                once: true,
            },
        });
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} id="projects" className="projects">
            {/* Section header - outside the scroll container */}
            <div className="projects__header container">
                <span className="section-label text-gradient">Projects</span>
                <AnimatedText
                    as="h2"
                    className="section-title"
                    splitType="words"
                    animation="fadeUp"
                    scrollTrigger
                >
                    Featured work
                </AnimatedText>
                <p className="projects__subtitle">
                    Scroll to explore my projects →
                </p>
            </div>

            {/* Horizontal scroll container */}
            <div ref={containerRef} className="projects__container">
                <div ref={scrollRef} className="projects__scroll">
                    {projects.map((project) => (
                        <article key={project.id} className="project-card" data-cursor="expand">
                            {/* Project image */}
                            <div className="project-card__image">
                                {/* <div className="project-card__image-placeholder">
                                    <span>{project.title.charAt(0)}</span>
                                </div> */}
                                {/* Uncomment when you have images */}
                                <img src={project.image} alt={project.title} />
                                <div className="project-card__overlay">
                                    <div className="project-card__links">
                                        <MagneticButton
                                            href={project.liveUrl}
                                            className="magnetic-button--sm"
                                        >
                                            Live Demo
                                        </MagneticButton>
                                        <MagneticButton
                                            href={project.githubUrl}
                                            className="magnetic-button--sm magnetic-button--ghost"
                                        >
                                            GitHub
                                        </MagneticButton>
                                    </div>
                                </div>
                            </div>

                            {/* Project info */}
                            <div className="project-card__content">
                                <h3 className="project-card__title">{project.title}</h3>
                                <p className="project-card__description">{project.description}</p>
                                <div className="project-card__technologies">
                                    {project.technologies.map((tech) => (
                                        <span key={tech} className="project-card__tech">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </article>
                    ))}

                    {/* End card */}
                    <div className="project-card project-card--cta">
                        <div className="project-card__cta-content">
                            <h3>Want to see more?</h3>
                            <p>Check out my GitHub for more projects and experiments.</p>
                            <MagneticButton href="https://github.com/pritam1813">
                                View GitHub
                            </MagneticButton>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
