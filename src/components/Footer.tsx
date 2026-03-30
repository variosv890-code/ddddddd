import { Heart, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12 border-t border-white/5">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-neon-violet/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="font-display text-xl text-white hover:text-neon-violet transition-colors inline-block mb-2"
            >
              OVER
            </a>
          </div>

          {/* Made With Love */}
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <span>Made with Over</span>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="w-12 h-12 rounded-xl glass flex items-center justify-center group hover:neon-glow transition-all duration-300"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5 text-gray-400 group-hover:text-neon-violet transition-colors" />
          </button>
        </div>
      </div>
    </footer>
  );
}
