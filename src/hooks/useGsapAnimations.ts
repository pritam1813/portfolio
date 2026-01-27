import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

// Animation presets for reusability
export const animations = {
    // Fade up animation
    fadeUp: (element: gsap.TweenTarget, options?: gsap.TweenVars) => {
        return gsap.fromTo(
            element,
            { opacity: 0, y: 60 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out',
                ...options,
            }
        );
    },

    // Fade in animation
    fadeIn: (element: gsap.TweenTarget, options?: gsap.TweenVars) => {
        return gsap.fromTo(
            element,
            { opacity: 0 },
            {
                opacity: 1,
                duration: 0.8,
                ease: 'power2.out',
                ...options,
            }
        );
    },

    // Stagger children
    staggerUp: (elements: gsap.TweenTarget, options?: gsap.TweenVars) => {
        return gsap.fromTo(
            elements,
            { opacity: 0, y: 40 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out',
                ...options,
            }
        );
    },

    // Scale in animation
    scaleIn: (element: gsap.TweenTarget, options?: gsap.TweenVars) => {
        return gsap.fromTo(
            element,
            { opacity: 0, scale: 0.8 },
            {
                opacity: 1,
                scale: 1,
                duration: 0.8,
                ease: 'back.out(1.7)',
                ...options,
            }
        );
    },

    // Slide in from left
    slideInLeft: (element: gsap.TweenTarget, options?: gsap.TweenVars) => {
        return gsap.fromTo(
            element,
            { opacity: 0, x: -100 },
            {
                opacity: 1,
                x: 0,
                duration: 1,
                ease: 'power3.out',
                ...options,
            }
        );
    },

    // Slide in from right
    slideInRight: (element: gsap.TweenTarget, options?: gsap.TweenVars) => {
        return gsap.fromTo(
            element,
            { opacity: 0, x: 100 },
            {
                opacity: 1,
                x: 0,
                duration: 1,
                ease: 'power3.out',
                ...options,
            }
        );
    },

    // Text reveal with SplitText
    textReveal: (element: Element, type: 'chars' | 'words' | 'lines' = 'chars') => {
        const split = new SplitText(element, { type });
        const targets = split[type];

        gsap.set(targets, { opacity: 0, y: 20 });

        return {
            tween: gsap.to(targets, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: type === 'chars' ? 0.02 : type === 'words' ? 0.05 : 0.1,
                ease: 'power2.out',
            }),
            split,
            revert: () => split.revert(),
        };
    },

    // Glitch effect
    glitch: (element: gsap.TweenTarget) => {
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 3 });

        tl.to(element, {
            skewX: 5,
            duration: 0.1,
            ease: 'power2.inOut',
        })
            .to(element, {
                skewX: -3,
                duration: 0.1,
                ease: 'power2.inOut',
            })
            .to(element, {
                skewX: 0,
                duration: 0.1,
                ease: 'power2.inOut',
            });

        return tl;
    },

    // Draw SVG path
    drawPath: (element: gsap.TweenTarget, options?: gsap.TweenVars) => {
        return gsap.fromTo(
            element,
            { strokeDashoffset: 1000, strokeDasharray: 1000 },
            {
                strokeDashoffset: 0,
                duration: 2,
                ease: 'power2.inOut',
                ...options,
            }
        );
    },
};

// ScrollTrigger presets
export const scrollTriggerDefaults = {
    standard: {
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
    },
    once: {
        start: 'top 80%',
        once: true,
    },
    scrub: {
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
    },
    pin: {
        start: 'top top',
        pin: true,
        scrub: 1,
    },
};

// Create a scroll-triggered animation
export function createScrollAnimation(
    element: gsap.TweenTarget,
    animation: 'fadeUp' | 'fadeIn' | 'scaleIn' | 'slideInLeft' | 'slideInRight',
    trigger?: Element | string,
    scrollTriggerOptions?: ScrollTrigger.Vars
) {
    const animationFn = animations[animation];

    return animationFn(element, {
        scrollTrigger: {
            trigger: trigger || (element as Element),
            ...scrollTriggerDefaults.once,
            ...scrollTriggerOptions,
        },
    });
}
