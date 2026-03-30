import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Send,
  Instagram,
  Mail,
  MapPin,
  CheckCircle,
  X,
} from 'lucide-react';
import { FaWhatsapp } from "react-icons/fa";
gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { icon: Instagram, href: 'https://www.instagram.com/elmandour.ib_?igsh=MWwwcnY1Z2x6NHpzNQ==', label: 'Instagram' },
  { icon: FaWhatsapp, href: "https://wa.me/4915510961696", label: 'WhatsApp' }
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false); // ✅ Added toast state

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content animation
      gsap.fromTo(
        contentRef.current?.children || [],
        { x: -50, opacity: 0 },
        {
          x: 0,
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

      // Form animation
      gsap.fromTo(
        formRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const token = "8757015554:AAE-EK-Z_Q145XLp5RMq-oUR8TIZQx-6tzc";
    const chatId = "7520433380";

    const message = `🔥 New Message\n\n👤 Name: ${formData.name}\n📧 Email: ${formData.email}\n\n💬 ${formData.message}`;

    try {
      const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
        }),
      });

      const data = await res.json();

      if (data.ok) {
        setShowToast(true); // ✅ Show toast on success
        setFormData({ name: '', email: '', message: '' });
        
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 sm:py-32 lg:py-40 overflow-hidden"
    >
      {/* ✅ Toast Notification - Glass Strong (Bottom Right) */}
      {showToast && (
        <div className="fixed bottom-8 right-8 z-50 animate-[slide-up_0.4s_ease-out]">
          <div className="relative px-6 py-4 rounded-2xl backdrop-blur-2xl border border-green-400/40 shadow-[0_0_60px_rgba(34,197,94,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] overflow-hidden">
            {/* Glass Background Layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-emerald-500/10 to-transparent" />
            <div className="absolute inset-0 bg-white/5" />
            {/* Glow Effect */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-500/30 rounded-full blur-3xl" />
            {/* Content */}
            <div className="relative flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-500/20 backdrop-blur-sm border border-green-400/30 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-400" />
              </div>
              <span className="text-white font-semibold text-sm">Message sent successfully! 🎉</span>
              <button 
                onClick={() => setShowToast(false)}
                className="ml-2 text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            {/* Bottom Glow Line */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-400/50 to-transparent" />
          </div>
        </div>
      )}

      {/* Background Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-violet/5 rounded-full blur-[250px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Left Side - Info */}
          <div ref={contentRef}>
            <span className="text-neon-violet text-sm font-medium tracking-wider uppercase mb-4 block">
              Get In Touch
            </span>
            
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl mb-6">
              Let&apos;s Work
              <span className="block gradient-text">Together</span>
            </h2>
            
            <p className="text-gray-400 text-lg mb-10 max-w-md">
              Have a project in mind? I&apos;d love to hear about it. 
              Send me a message and let&apos;s create something amazing.
            </p>

            {/* Contact Info */}
            <div className="space-y-4 mb-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl glass flex items-center justify-center">
                  <Mail className="w-5 h-5 text-neon-violet" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Email</p>
                  <a
                    href="mailto:over.ib@outlook.com"
                    className="text-white hover:text-neon-violet transition-colors"
                  >
                    over.ib@outlook.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl glass flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-neon-violet" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Location</p>
                  <p className="text-white">Agadir / Tiznit</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <p className="text-gray-500 text-sm mb-4">Follow me on</p>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-12 h-12 rounded-xl glass flex items-center justify-center group hover:neon-glow transition-all duration-300"
                  >
                    <social.icon className="w-5 h-5 text-gray-400 group-hover:text-neon-violet transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="relative">
            {/* Neon Border Container */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-neon-violet/50 via-transparent to-neon-violet/50 opacity-30 blur-sm" />
            
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="relative glass-card rounded-2xl p-8 lg:p-10"
            >
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="font-display text-2xl text-white mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-gray-400">
                    Thank you for reaching out. I&apos;ll get back to you soon.
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="font-display text-2xl text-white mb-6">
                    Send a Message
                  </h3>

                  <div className="space-y-6">
                    {/* Name Field - ⚠️ ORIGINAL COLORS (UNCHANGED) */}
                    <div className="relative">
                      <label className="block text-gray-400 text-sm mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition-all duration-300"
                        placeholder="John Doe"
                      />
                      <div
                        className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-neon-violet transition-all duration-300 ${
                          focusedField === 'name' ? 'w-full' : 'w-0'
                        }`}
                      />
                    </div>

                    {/* Email Field - ⚠️ ORIGINAL COLORS (UNCHANGED) */}
                    <div className="relative">
                      <label className="block text-gray-400 text-sm mb-2">
                        Your Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition-all duration-300"
                        placeholder="john@example.com"
                      />
                      <div
                        className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-neon-violet transition-all duration-300 ${
                          focusedField === 'email' ? 'w-full' : 'w-0'
                        }`}
                      />
                    </div>

                    {/* Message Field - ⚠️ ORIGINAL COLORS (UNCHANGED) */}
                    <div className="relative">
                      <label className="block text-gray-400 text-sm mb-2">
                        Your Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        required
                        rows={4}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition-all duration-300 resize-none"
                        placeholder="Tell me about your project..."
                      />
                      <div
                        className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-neon-violet transition-all duration-300 ${
                          focusedField === 'message' ? 'w-full' : 'w-0'
                        }`}
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-primary flex items-center justify-center gap-2 text-white disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>

        </div>
      </div>

      {/* Keyframes for toast animation */}
      <style>{`
        @keyframes slide-up {
          from { 
            opacity: 0; 
            transform: translateY(30px) scale(0.9);
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </section>
  );
}
