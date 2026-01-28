import { scrollToSection } from '../../hooks/useLenis';
import { MagneticButton } from '../MagneticButton';
import './Footer.css';

const currentYear = new Date().getFullYear();

const footerLinks = [
    { label: 'GitHub', href: 'https://github.com/pritam1813' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/pritam1813' },
    { label: 'LeetCode', href: 'https://leetcode.com/u/Pritam1813' },
];

export function Footer() {
    const handleBackToTop = () => {
        scrollToSection('#hero');
    };

    return (
        <footer className="footer">
            <div className="container footer__container">
                {/* Logo / Brand */}
                <div className="footer__brand">
                    <span className="footer__logo">
                        <span className="text-gradient">{'<'}</span>
                        PritamDhara
                        <span className="text-gradient">{'/>'}</span>
                    </span>
                    <p className="footer__tagline">
                        Building digital experiences with passion and precision.
                    </p>
                </div>

                {/* Quick links */}
                <nav className="footer__nav">
                    <span className="footer__nav-title">Quick Links</span>
                    <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('#about'); }}>About</a>
                    <a href="#projects" onClick={(e) => { e.preventDefault(); scrollToSection('#projects'); }}>Projects</a>
                    <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('#contact'); }}>Contact</a>
                </nav>

                {/* Social links */}
                <nav className="footer__nav">
                    <span className="footer__nav-title">Connect</span>
                    {footerLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                {/* Back to top */}
                <div className="footer__actions">
                    <MagneticButton
                        onClick={handleBackToTop}
                        className="magnetic-button--sm footer__back-to-top"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 19V5M5 12l7-7 7 7" />
                        </svg>
                        Back to Top
                    </MagneticButton>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="footer__bottom">
                <div className="container footer__bottom-content">
                    <p className="footer__copyright">
                        © {currentYear} Pritam Dhara. All rights reserved.
                    </p>
                    <p className="footer__credits">
                        Built with <span className="text-gradient">♥</span> using React, TypeScript & GSAP
                    </p>
                </div>
            </div>
        </footer>
    );
}
