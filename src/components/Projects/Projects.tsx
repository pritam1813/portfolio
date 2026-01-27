import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatedText } from '../AnimatedText';
import { MagneticButton } from '../MagneticButton';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

// Projects data - customize these (4 projects as requested)
const projects = [
    {
        id: 1,
        title: 'E-Commerce Platform',
        description:
            'A full-featured e-commerce platform with user authentication, product management, cart functionality, and payment integration.',
        image: '/projects/project-1.jpg', // Add your project images
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        liveUrl: 'https://example.com',
        githubUrl: 'https://github.com/yourusername/project',
        featured: true,
    },
    {
        id: 2,
        title: 'Task Management App',
        description:
            'A collaborative task management application with real-time updates, drag-and-drop interface, and team features.',
        image: '/projects/project-2.jpg',
        technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Socket.io'],
        liveUrl: 'https://example.com',
        githubUrl: 'https://github.com/yourusername/project',
        featured: true,
    },
    {
        id: 3,
        title: 'AI Chat Interface',
        description:
            'An intelligent chat interface powered by AI with context-aware responses and beautiful animations.',
        image: '/projects/project-3.jpg',
        technologies: ['React', 'Python', 'FastAPI', 'OpenAI'],
        liveUrl: 'https://example.com',
        githubUrl: 'https://github.com/yourusername/project',
        featured: true,
    },
    {
        id: 4,
        title: 'Portfolio Website',
        description:
            'This very portfolio website you are viewing! Built with React, GSAP, and lots of attention to detail.',
        image: '/projects/project-4.jpg',
        technologies: ['React', 'TypeScript', 'GSAP', 'Lenis'],
        liveUrl: '#',
        githubUrl: 'https://github.com/yourusername/portfolio',
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
                                <div className="project-card__image-placeholder">
                                    <span>{project.title.charAt(0)}</span>
                                </div>
                                {/* Uncomment when you have images */}
                                {/* <img src={project.image} alt={project.title} /> */}
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
                            <MagneticButton href="https://github.com/yourusername">
                                View GitHub
                            </MagneticButton>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
