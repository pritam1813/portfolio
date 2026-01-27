import { useState, useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollToSection } from '../../hooks/useLenis';
import { MagneticButton } from '../MagneticButton';
import './Header.css';

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
];

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const headerRef = useRef<HTMLElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Animate header on mount
    useGSAP(() => {
        gsap.from(headerRef.current, {
            y: -100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            delay: 0.5,
        });
    }, { scope: headerRef });

    // Animate mobile menu
    useGSAP(() => {
        if (!mobileMenuRef.current) return;

        if (isMobileMenuOpen) {
            gsap.to(mobileMenuRef.current, {
                clipPath: 'circle(150% at top right)',
                duration: 0.6,
                ease: 'power3.inOut',
            });
            gsap.from('.mobile-menu__link', {
                opacity: 0,
                y: 30,
                stagger: 0.1,
                duration: 0.5,
                delay: 0.2,
            });
        } else {
            gsap.to(mobileMenuRef.current, {
                clipPath: 'circle(0% at top right)',
                duration: 0.4,
                ease: 'power3.inOut',
            });
        }
    }, { dependencies: [isMobileMenuOpen] });

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        scrollToSection(href);
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            <header
                ref={headerRef}
                className={`header ${isScrolled ? 'header--scrolled' : ''}`}
            >
                <div className="header__container container">
                    {/* Logo */}
                    <a href="#hero" className="header__logo" onClick={(e) => handleNavClick(e, '#hero')}>
                        <span className="header__logo-text">
                            <span className="text-gradient">{'<'}</span>
                            Dev
                            <span className="text-gradient">{'/>'}</span>
                        </span>
                    </a>

                    {/* Desktop Navigation */}
                    <nav className="header__nav">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="header__nav-link"
                                onClick={(e) => handleNavClick(e, link.href)}
                            >
                                {link.label}
                            </a>
                        ))}
                        <MagneticButton
                            href="/resume.pdf"
                            download
                            className="magnetic-button--sm"
                        >
                            Resume
                        </MagneticButton>
                    </nav>

                    {/* Mobile Menu Toggle */}
                    <button
                        className={`header__hamburger ${isMobileMenuOpen ? 'header__hamburger--open' : ''}`}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                        aria-expanded={isMobileMenuOpen}
                    >
                        <span className="header__hamburger-line" />
                        <span className="header__hamburger-line" />
                        <span className="header__hamburger-line" />
                    </button>
                </div>
            </header>

            {/* Mobile Menu */}
            <div
                ref={mobileMenuRef}
                className="mobile-menu"
                aria-hidden={!isMobileMenuOpen}
            >
                <nav className="mobile-menu__nav">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="mobile-menu__link"
                            onClick={(e) => handleNavClick(e, link.href)}
                        >
                            {link.label}
                        </a>
                    ))}
                    <MagneticButton
                        href="/resume.pdf"
                        download
                        className="mobile-menu__resume"
                    >
                        Download Resume
                    </MagneticButton>
                </nav>
            </div>
        </>
    );
}
