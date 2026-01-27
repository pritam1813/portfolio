import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { GlitchText } from '../GlitchText';
import { MagneticButton } from '../MagneticButton';
import { scrollToSection } from '../../hooks/useLenis';
import './Hero.css';

gsap.registerPlugin(SplitText);

// Social links - customize these
const socialLinks = [
    { label: 'GitHub', href: 'https://github.com/pritam1813', icon: 'github' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/pritam1813', icon: 'linkedin' },
    { label: 'LeetCode', href: 'https://leetcode.com/u/Pritam1813', icon: 'leetcode' },
    // { label: 'Twitter', href: 'https://twitter.com/yourusername', icon: 'twitter' },
];

export function Hero() {
    const heroRef = useRef<HTMLElement>(null);
    const taglineRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const socialsRef = useRef<HTMLDivElement>(null);
    const scrollIndicatorRef = useRef<HTMLDivElement>(null);
    const blobRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({ delay: 0.8 });

        // Tagline animation
        if (taglineRef.current) {
            const split = new SplitText(taglineRef.current, { type: 'words' });
            gsap.set(split.words, { opacity: 0, y: 30 });
            tl.to(split.words, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.05,
                ease: 'power3.out',
            }, '+=0.3');
        }

        // CTA buttons
        tl.from(ctaRef.current, {
            opacity: 0,
            y: 30,
            duration: 0.6,
            ease: 'power3.out',
        }, '-=0.2');

        // Social links
        tl.from('.hero__social-link', {
            opacity: 0,
            x: -20,
            stagger: 0.1,
            duration: 0.5,
            ease: 'power3.out',
        }, '-=0.3');

        // Scroll indicator
        tl.from(scrollIndicatorRef.current, {
            opacity: 0,
            y: -20,
            duration: 0.5,
            ease: 'power3.out',
        }, '-=0.2');

        // Scroll indicator bounce animation
        gsap.to(scrollIndicatorRef.current, {
            y: 10,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
        });

    }, { scope: heroRef });

    // Mouse-following blob
    useGSAP(() => {
        const blob = blobRef.current;
        if (!blob) return;

        const xTo = gsap.quickTo(blob, 'x', { duration: 1, ease: 'power3.out' });
        const yTo = gsap.quickTo(blob, 'y', { duration: 1, ease: 'power3.out' });

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;

            // Map mouse position to blob movement (centered)
            xTo((clientX - innerWidth / 2) * 0.3);
            yTo((clientY - innerHeight / 2) * 0.3);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, { scope: heroRef });

    const handleScrollToProjects = () => {
        scrollToSection('#projects');
    };

    const handleScrollToContact = () => {
        scrollToSection('#contact');
    };

    return (
        <section ref={heroRef} id="hero" className="hero">
            {/* Animated background blob */}
            <div ref={blobRef} className="hero__blob" aria-hidden="true" />

            <div className="hero__container container">
                {/* Left side - Social links */}
                <div ref={socialsRef} className="hero__socials">
                    {socialLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="hero__social-link"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={link.label}
                        >
                            <SocialIcon name={link.icon} />
                        </a>
                    ))}
                    <div className="hero__socials-line" />
                </div>

                {/* Center content */}
                <div className="hero__content">
                    {/* Greeting */}
                    <p className="hero__greeting">
                        <span className="text-gradient">Hello, I'm</span>
                    </p>

                    {/* Name with glitch effect */}
                    <h1 className="hero__name">
                        <GlitchText as="span" continuous>Pritam Dhara</GlitchText>
                    </h1>

                    {/* Tagline */}
                    <p ref={taglineRef} className="hero__tagline">
                        Full Stack Developer crafting digital experiences
                        with clean code and creative solutions.
                    </p>

                    {/* CTA Buttons */}
                    <div ref={ctaRef} className="hero__cta">
                        <MagneticButton
                            className="magnetic-button--primary magnetic-button--lg"
                            onClick={handleScrollToProjects}
                        >
                            View My Work
                        </MagneticButton>
                        <MagneticButton
                            className="magnetic-button--lg"
                            onClick={handleScrollToContact}
                        >
                            Get In Touch
                        </MagneticButton>
                    </div>
                </div>

                {/* COMMENTED: Split layout with avatar
        <div className="hero__avatar-container">
          <div className="hero__avatar">
            <img src="/avatar.jpg" alt="Your Name" />
          </div>
        </div>
        */}

                {/* Scroll indicator */}
                {/* <div ref={scrollIndicatorRef} className="hero__scroll-indicator">
                    <span>Scroll</span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M12 5v14M19 12l-7 7-7-7"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div> */}
            </div>
        </section>
    );
}

// Simple social icons
function SocialIcon({ name }: { name: string }) {
    const icons: Record<string, React.ReactNode> = {
        github: (
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
        ),
        linkedin: (
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
        leetcode: (
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
            </svg>
        ),
        // twitter: (
        //     <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        //         <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        //     </svg>
        // ),
    };

    return icons[name] || null;
}
