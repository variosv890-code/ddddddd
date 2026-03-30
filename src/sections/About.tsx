import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Palette, Code2, Brain } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const skillIcons = [
  {
    icon: Palette,
    label: 'Design',
    description: 'UI/UX & Visual',
  },
  {
    icon: Code2,
    label: 'Programming',
    description: 'Full Stack Dev',
  },
  {
    icon: Brain,
    label: 'AI Tools',
    description: 'Modern Workflow',
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image reveal animation
      gsap.fromTo(
        imageRef.current,
        { clipPath: 'circle(0% at 50% 50%)', opacity: 0 },
        {
          clipPath: 'circle(100% at 50% 50%)',
          opacity: 1,
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Content animation
      gsap.fromTo(
        contentRef.current?.children || [],
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Icons animation
      gsap.fromTo(
        iconsRef.current?.children || [],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: iconsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 sm:py-32 lg:py-40 overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-neon-violet/5 rounded-full blur-[150px] -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <div ref={imageRef} className="relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              {/* Placeholder for portrait - using gradient instead */}
              <div className="absolute inset-0 bg-gradient-to-br from-neon-violet/30 via-purple-900/50 to-black">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
<div
  className="w-32 h-32 mx-auto mb-6 rounded-full bg-cover bg-center border-2 border-neon-violet shadow-lg"
  style={{ backgroundImage: "url('https://up6.cc/2026/03/177490797533861.jpg')" }}
/>
                    <p className="text-gray-400 text-sm">Your Photo Here</p>
                  </div>
                </div>
              </div>
              
              {/* Glass overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border border-neon-violet/30 rounded-lg floating" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border border-neon-violet/20 rounded-full floating-delayed" />
          </div>

          {/* Content Side */}
          <div ref={contentRef}>
            <span className="text-neon-violet text-sm font-medium tracking-wider uppercase mb-4 block">
              About Me
            </span>
            
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl mb-6">
              Crafting Digital
              <span className="block gradient-text">Experiences</span>
            </h2>
            
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              I&apos;m a passionate developer and designer with expertise in creating modern digital experiences. 
              With a strong foundation in both design principles and cutting-edge development technologies, 
              I bring ideas to life through clean code and intuitive interfaces.
            </p>
            
            <p className="text-gray-500 leading-relaxed mb-10">
              My approach combines aesthetic sensibility with technical precision, ensuring every project 
              not only looks stunning but performs flawlessly. I specialize in HTML, JavaScript, and 
              modern UI/UX design patterns.
            </p>

            {/* Skill Icons */}
            <div ref={iconsRef} className="grid grid-cols-3 gap-4">
              {skillIcons.map((skill, index) => (
                <div
                  key={index}
                  className="glass-card rounded-xl p-4 text-center group hover:neon-glow transition-all duration-300 cursor-pointer"
                >
                  <skill.icon className="w-8 h-8 mx-auto mb-3 text-neon-violet group-hover:scale-110 transition-transform" />
                  <h3 className="font-medium text-white text-sm mb-1">{skill.label}</h3>
                  <p className="text-xs text-gray-500">{skill.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
