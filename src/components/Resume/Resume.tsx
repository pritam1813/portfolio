import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatedText } from '../AnimatedText';
import { MagneticButton } from '../MagneticButton';
import './Resume.css';

gsap.registerPlugin(ScrollTrigger);

export function Resume() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.from('.resume__content', {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 70%',
                once: true,
            },
        });
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} id="resume" className="resume section">
            <div className="container">
                <div className="resume__content glass">
                    <div className="resume__text">
                        <span className="section-label text-gradient">Resume</span>
                        <AnimatedText
                            as="h2"
                            className="resume__title"
                            splitType="words"
                            animation="fadeUp"
                            scrollTrigger
                        >
                            Want to know more?
                        </AnimatedText>
                        <p className="resume__description">
                            Download my resume for a detailed overview of my skills,
                            experience, and education. Let's work together!
                        </p>
                    </div>
                    <div className="resume__action">
                        <MagneticButton
                            href="/PritamDhara_Resume.pdf"
                            download
                            className="magnetic-button--primary magnetic-button--lg"
                        >
                            <DownloadIcon />
                            Download Resume
                        </MagneticButton>
                    </div>
                </div>
            </div>
        </section>
    );
}

function DownloadIcon() {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
    );
}
