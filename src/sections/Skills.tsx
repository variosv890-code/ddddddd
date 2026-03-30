import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Figma,
  Palette,
  Layout,
  Code2,
  FileCode,
  Braces,
  Atom,
  Bot,
  Sparkles,
  Wand2,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: 'Design',
    icon: Palette,
    skills: [
      { name: 'UI/UX Design', icon: Layout, level: 90 },
      { name: 'Figma', icon: Figma, level: 85 },
      { name: 'Canva Pro', icon: Palette, level: 95 },
    ],
  },
  {
    title: 'Development',
    icon: Code2,
    skills: [
      { name: 'HTML/CSS', icon: FileCode, level: 95 },
      { name: 'JavaScript', icon: Braces, level: 90 },
      { name: 'React', icon: Atom, level: 88 },
      { name: 'TypeScript', icon: Code2, level: 85 },
    ],
  },
  {
    title: 'Tools & AI',
    icon: Bot,
    skills: [
      { name: 'ChatGPT', icon: Bot, level: 90 },
      { name: 'AI Tools', icon: Sparkles, level: 85 },
      { name: 'Git/GitHub', icon: Code2, level: 88 },
      { name: 'Vercel', icon: Wand2, level: 80 },
    ],
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cards stagger animation
      gsap.fromTo(
        cardsRef.current?.children || [],
        { y: 60, opacity: 0, rotateX: -15 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Skill bars animation
      const skillBars = document.querySelectorAll('.skill-bar-fill');
      skillBars.forEach((bar) => {
        const level = bar.getAttribute('data-level');
        gsap.fromTo(
          bar,
          { width: '0%' },
          {
            width: `${level}%`,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: bar,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 sm:py-32 lg:py-40 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-neon-violet/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-neon-violet text-sm font-medium tracking-wider uppercase mb-4 block">
            Expertise
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl mb-6">
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A comprehensive toolkit of technologies and design principles 
            that power my creative workflow
          </p>
        </div>

        {/* Skills Grid */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 perspective-1000"
        >
          {skillCategories.map((category, catIndex) => (
            <div
              key={catIndex}
              className="glass-card rounded-2xl p-6 lg:p-8 group hover:neon-glow transition-all duration-500 preserve-3d"
            >
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-neon-violet/20 flex items-center justify-center group-hover:bg-neon-violet/30 transition-colors">
                  <category.icon className="w-6 h-6 text-neon-violet" />
                </div>
                <h3 className="font-display text-2xl text-white">{category.title}</h3>
              </div>

              {/* Skills List */}
              <div className="space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="group/skill">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <skill.icon className="w-4 h-4 text-gray-500 group-hover/skill:text-neon-violet transition-colors" />
                        <span className="text-gray-300 text-sm font-medium">
                          {skill.name}
                        </span>
                      </div>
                      <span className="text-neon-violet text-sm font-medium">
                        {skill.level}%
                      </span>
                    </div>
                    {/* Progress Bar */}
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="skill-bar-fill h-full bg-gradient-to-r from-neon-violet to-purple-500 rounded-full"
                        data-level={skill.level}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-2xl">
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-neon-violet/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Decorative Element */}
        <div className="mt-16 flex justify-center">
          <div className="flex items-center gap-2 glass rounded-full px-6 py-3">
            <Sparkles className="w-4 h-4 text-neon-violet" />
            <span className="text-gray-400 text-sm">Always learning new technologies</span>
          </div>
        </div>
      </div>
    </section>
  );
}
