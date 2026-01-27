import { useRef, useState, type FormEvent } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatedText } from '../AnimatedText';
import { MagneticButton } from '../MagneticButton';
import { GlowCard } from '../GlowCard';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

// Contact info - customize these
const contactInfo = [
    {
        icon: 'email',
        label: 'Email',
        value: 'your.email@example.com',
        href: 'mailto:your.email@example.com',
    },
    {
        icon: 'location',
        label: 'Location',
        value: 'City, Country',
        href: null,
    },
];

const socialLinks = [
    { label: 'GitHub', href: 'https://github.com/yourusername', icon: 'github' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/yourusername', icon: 'linkedin' },
    { label: 'Twitter', href: 'https://twitter.com/yourusername', icon: 'twitter' },
];

export function Contact() {
    const sectionRef = useRef<HTMLElement>(null);
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    useGSAP(() => {
        gsap.from('.contact__card', {
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 70%',
                once: true,
            },
        });

        gsap.from('.contact__form', {
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 70%',
                once: true,
            },
        });
    }, { scope: sectionRef });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Using Formspree - replace YOUR_FORM_ID with your actual form ID
            // Get one at https://formspree.io
            const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formState),
            });

            if (response.ok) {
                setSubmitStatus('success');
                setFormState({ name: '', email: '', message: '' });
            } else {
                setSubmitStatus('error');
            }
        } catch (_error) {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
            // Reset status after 5 seconds
            setTimeout(() => setSubmitStatus('idle'), 5000);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        // You could add a toast notification here
    };

    return (
        <section ref={sectionRef} id="contact" className="contact section">
            <div className="container">
                {/* Section header */}
                <div className="contact__header">
                    <span className="section-label text-gradient">Contact</span>
                    <AnimatedText
                        as="h2"
                        className="section-title"
                        splitType="words"
                        animation="fadeUp"
                        scrollTrigger
                    >
                        Let's work together
                    </AnimatedText>
                    <p className="contact__subtitle">
                        Have a project in mind? I'd love to hear from you.
                    </p>
                </div>

                <div className="contact__content">
                    {/* Info card */}
                    <GlowCard className="contact__card" glowColor="purple">
                        <h3 className="contact__card-title">Get in touch</h3>

                        <div className="contact__info">
                            {contactInfo.map((item) => (
                                <div key={item.label} className="contact__info-item">
                                    <span className="contact__info-icon">
                                        <ContactIcon name={item.icon} />
                                    </span>
                                    <div>
                                        <span className="contact__info-label">{item.label}</span>
                                        {item.href ? (
                                            <a
                                                href={item.href}
                                                className="contact__info-value"
                                                onClick={(e) => {
                                                    if (item.icon === 'email') {
                                                        e.preventDefault();
                                                        copyToClipboard(item.value);
                                                    }
                                                }}
                                            >
                                                {item.value}
                                            </a>
                                        ) : (
                                            <span className="contact__info-value contact__info-value--text">
                                                {item.value}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="contact__socials">
                            <span className="contact__socials-label">Find me on</span>
                            <div className="contact__socials-links">
                                {socialLinks.map((link) => (
                                    <a
                                        key={link.label}
                                        href={link.href}
                                        className="contact__social-link"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={link.label}
                                    >
                                        <SocialIcon name={link.icon} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </GlowCard>

                    {/* Contact form */}
                    <form className="contact__form glass" onSubmit={handleSubmit}>
                        <div className="contact__form-group">
                            <label htmlFor="name" className="contact__label">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formState.name}
                                onChange={handleInputChange}
                                className="contact__input"
                                required
                                placeholder="Your name"
                            />
                        </div>

                        <div className="contact__form-group">
                            <label htmlFor="email" className="contact__label">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formState.email}
                                onChange={handleInputChange}
                                className="contact__input"
                                required
                                placeholder="your.email@example.com"
                            />
                        </div>

                        <div className="contact__form-group">
                            <label htmlFor="message" className="contact__label">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formState.message}
                                onChange={handleInputChange}
                                className="contact__input contact__textarea"
                                required
                                placeholder="Tell me about your project..."
                                rows={5}
                            />
                        </div>

                        {submitStatus === 'success' && (
                            <p className="contact__status contact__status--success">
                                ✓ Message sent successfully! I'll get back to you soon.
                            </p>
                        )}

                        {submitStatus === 'error' && (
                            <p className="contact__status contact__status--error">
                                ✕ Something went wrong. Please try again or email me directly.
                            </p>
                        )}

                        <MagneticButton
                            className="magnetic-button--primary contact__submit"
                            onClick={() => { }} // Form handles submit
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </MagneticButton>
                    </form>
                </div>
            </div>
        </section>
    );
}

// Icons
function ContactIcon({ name }: { name: string }) {
    const icons: Record<string, React.ReactNode> = {
        email: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
            </svg>
        ),
        location: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
            </svg>
        ),
    };

    return icons[name] || null;
}

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
        twitter: (
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        ),
    };

    return icons[name] || null;
}
