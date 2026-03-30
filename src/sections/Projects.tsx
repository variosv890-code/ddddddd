import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Palette, Code, Bot, PenTool, ArrowUpRight } from 'lucide-react';
gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: 'UI/UX Design',
    description: 'Modern and user-friendly interface design focused on usability and aesthetics.',
    icon: Palette,
    gradient: 'gradient1',
  },
  {
    title: 'Website Development',
    description: 'Building fast and responsive websites using modern technologies and best practices.',
    icon: Code,
    gradient: 'gradient2',
  },
  {
    title: 'AI Tools Integration',
    description: 'Using tools like ChatGPT and Canva Pro to create smart, automated solutions.',
    icon: Bot,
    gradient: 'gradient3',
  },
  {
    title: 'Content Creation',
    description: 'Creating engaging digital content and visuals that resonate with your audience.',
    icon: PenTool,
    gradient: 'gradient4',
  },
];

const gradientMap: Record<string, string> = {
  gradient1: 'from-neon-violet/40 via-purple-600/30 to-blue-600/20',
  gradient2: 'from-pink-500/40 via-neon-violet/30 to-purple-600/20',
  gradient3: 'from-cyan-500/40 via-blue-500/30 to-neon-violet/20',
  gradient4: 'from-orange-500/40 via-pink-500/30 to-neon-violet/20',
  gradient5: 'from-green-500/40 via-teal-500/30 to-cyan-600/20',
  gradient6: 'from-red-500/40 via-orange-500/30 to-yellow-600/20',
};

export default function Services() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Grid items animation
      gsap.fromTo(
        gridRef.current?.children || [],
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-24 sm:py-32 lg:py-40 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-neon-violet text-sm font-medium tracking-wider uppercase mb-4 block">
            Offerings
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl mb-6">
            Professional <span className="gradient-text">Services</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Tailored solutions to elevate your digital presence and streamline your workflow
          </p>
        </div>

        {/* Services Grid */}
        <div
          ref={gridRef}
          className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto"
        >
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative perspective-1000"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className={`
                  relative glass-card rounded-2xl overflow-hidden
                  transition-all duration-500 preserve-3d
                  ${hoveredIndex === index ? 'neon-glow scale-[1.02]' : ''}
                  ${hoveredIndex !== null && hoveredIndex !== index ? 'opacity-60 scale-[0.98]' : ''}
                `}
                style={{
                  transform:
                    hoveredIndex === index
                      ? 'translateZ(30px) rotateX(-2deg)'
                      : 'translateZ(0) rotateX(0)',
                }}
              >
                {/* Service Icon Background */}
                <div className="relative h-48 overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${gradientMap[service.gradient]} transition-transform duration-700 group-hover:scale-110`}
                  />
                  <div className="absolute inset-0 bg-black/20" />

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-neon-violet/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Service Number */}
                  <div className="absolute top-4 left-4 glass rounded-lg px-3 py-1">
                    <span className="text-xs font-medium text-white">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Central Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-2xl glass flex items-center justify-center shadow-lg group-hover:shadow-neon-violet/50 transition-shadow duration-300">
                      <service.icon className="w-10 h-10 text-white" />
                    </div>
                  </div>
                </div>

                {/* Service Content */}
                <div className="p-6">
                  <h3 className="font-display text-xl text-white mb-2 group-hover:text-neon-violet transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {service.description}
                  </p>

                  {/* Action Link */}
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 text-sm text-neon-violet hover:text-white transition-colors group/link"
                  >
                    <span>Learn More</span>
                    <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                  </a>
                </div>

                {/* Neon Border Effect */}
                <div className="absolute inset-0 rounded-2xl pointer-events-none">
                  <div
                    className={`
                      absolute inset-0 rounded-2xl border border-neon-violet/0 transition-all duration-300
                      ${hoveredIndex === index ? 'border-neon-violet/50' : ''}
                    `}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 btn-secondary text-white"
          >
            <ArrowUpRight className="w-5 h-5" />
            <span>Get In Touch</span>
          </a>
        </div>
      </div>
    </section>
  );
}