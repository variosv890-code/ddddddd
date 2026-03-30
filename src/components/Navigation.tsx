import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Determine active section
      const sections = navLinks.map((link) => link.href.slice(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-500
          ${isScrolled ? 'py-3' : 'py-5'}
        `}
      >
        <div
          className={`
            mx-4 sm:mx-6 lg:mx-8 rounded-2xl transition-all duration-500
            ${isScrolled ? 'glass shadow-lg' : 'bg-transparent'}
          `}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-14">
              {/* Logo */}
              <a
                href="#hero"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('#hero');
                }}
                className="font-display text-2xl text-white hover:text-neon-violet transition-colors"
              >
                OVER
              </a>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className={`
                      relative px-4 py-2 text-sm font-medium transition-colors rounded-lg
                      ${activeSection === link.href.slice(1) ? 'text-white' : 'text-gray-400 hover:text-white'}
                    `}
                  >
                    {link.label}
                    {activeSection === link.href.slice(1) && (
                      <span className="absolute inset-0 bg-white/5 rounded-lg" />
                    )}
                  </a>
                ))}
              </div>

              {/* CTA Button */}
              <div className="hidden md:block">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('#contact');
                  }}
                  className="px-5 py-2 rounded-lg bg-neon-violet/20 text-neon-violet text-sm font-medium hover:bg-neon-violet hover:text-white transition-all duration-300"
                >
                  Hire Me
                </a>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden w-10 h-10 rounded-lg glass flex items-center justify-center"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-white" />
                ) : (
                  <Menu className="w-5 h-5 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`
          fixed inset-0 z-40 md:hidden transition-all duration-500
          ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Content */}
        <div
          className={`
            absolute top-24 left-4 right-4 glass-card rounded-2xl p-6 transition-all duration-500
            ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}
          `}
        >
          <div className="space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className={`
                  block px-4 py-3 rounded-lg text-lg font-medium transition-colors
                  ${activeSection === link.href.slice(1) ? 'bg-neon-violet/20 text-neon-violet' : 'text-gray-400 hover:text-white hover:bg-white/5'}
                `}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-white/10">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#contact');
              }}
              className="block w-full py-3 rounded-lg bg-neon-violet text-white text-center font-medium"
            >
              Hire Me
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
