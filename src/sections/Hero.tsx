import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowDown, Sparkles } from 'lucide-react';
import FloatingShapes from '../components/3d/FloatingShapes';

export default function Hero() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation - split chars
      const heading = headingRef.current;
      if (heading) {
        const text = heading.textContent || '';
        heading.innerHTML = text
          .split('')
          .map((char) => `<span class="inline-block">${char === ' ' ? '&nbsp;' : char}</span>`)
          .join('');
        
        gsap.fromTo(
          heading.querySelectorAll('span'),
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.03,
            ease: 'expo.out',
            delay: 0.3,
          }
        );
      }

      // Subheading animation
      gsap.fromTo(
        subheadingRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out', delay: 0.8 }
      );

      // Buttons animation
      gsap.fromTo(
        buttonsRef.current?.children || [],
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'expo.out',
          delay: 1,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToWork = () => {
    const projectsSection = document.getElementById('services');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Background */}
      <FloatingShapes />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black z-[1]" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 opacity-0 animate-[fadeIn_0.6s_ease-out_0.2s_forwards]">
          <Sparkles className="w-4 h-4 text-neon-violet" />
          <span className="text-sm text-gray-300">Available for freelance work</span>
        </div>

        {/* Main Heading */}
        <h1
          ref={headingRef}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl mb-6 leading-none tracking-wide"
        >
          Creative Developer
          <span className="block gradient-text">& Designer</span>
        </h1>

        {/* Subheading */}
        <p
          ref={subheadingRef}
          className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-12 font-light"
        >
          I build modern digital experiences using code and design
        </p>

        {/* CTA Buttons */}
        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={scrollToWork}
            className="btn-primary flex items-center gap-2 text-white"
          >
            <span>View Services</span>
            <ArrowDown className="w-4 h-4" />
          </button>
          <button
            onClick={scrollToContact}
            className="btn-secondary text-white"
          >
            Contact Me
          </button>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-[1]" />

      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-violet/10 rounded-full blur-[150px] pointer-events-none z-0" />
    </section>
  );
}
