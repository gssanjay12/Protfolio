import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowUpRight, Send, CheckCircle2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../icons/BrandIcons';
import { personalData } from '../../data/personal';
import { ContactSculpture } from '../three/ContactSculpture';
import { sound } from '../../utils/audio';

export const CreativeContactSection: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'NAME REQUIRED';
    if (!formData.email.trim()) {
      errs.email = 'EMAIL REQUIRED';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'VALID EMAIL REQUIRED';
    }
    if (!formData.message.trim()) {
      errs.message = 'MESSAGE REQUIRED';
    } else if (formData.message.trim().length < 8) {
      errs.message = 'MINIMUM 8 CHARACTERS';
    }
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setApiError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _gotcha: honeypot,
        }),
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data?.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        if (data?.errors) {
          setErrors(data.errors);
        }
        setApiError(data?.error || 'Failed to dispatch message. Please try again.');
      }
    } catch {
      setApiError('Unable to connect to the transmission server. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative w-full py-28 sm:py-36 px-6 sm:px-10 lg:px-16 overflow-hidden">
      {/* Background 3D Ambient Sculpture */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 sm:w-[480px] sm:h-[480px] opacity-25 pointer-events-none -z-0">
        <ContactSculpture />
      </div>

      {/* Top Divider */}
      <div className="w-full max-w-7xl mx-auto border-t border-white/10 mb-20 sm:mb-28" />

      <div className="w-full max-w-7xl mx-auto relative z-10">
        {/* Editorial Section Header */}
        <div className="font-mono text-xs text-[#71717A] tracking-widest uppercase mb-6 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#CCFF00]" />
          <span>06 // THE CLIMAX // INITIATE TRANSMISSION</span>
        </div>

        {/* MASSIVE TYPOGRAPHY STATEMENT (Adobe MAX / Awwwards Scale) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl"
        >
          <h2 className="font-display font-extrabold text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tightest uppercase text-[#F4F4F6] leading-[0.88]">
            LET&apos;S<br />
            <span className="text-gradient-coral">BUILD</span><br />
            <span className="text-stroke text-stroke-hover">SOMETHING.</span>
          </h2>

          {/* Sub-Pillars */}
          <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-6 font-mono text-xs sm:text-sm text-[#A1A1AA] uppercase tracking-wider">
            <span className="text-[#F4F4F6] font-semibold">AI</span>
            <span>•</span>
            <span className="text-[#F4F4F6] font-semibold">DATA SCIENCE</span>
            <span>•</span>
            <span className="text-[#F4F4F6] font-semibold">SOFTWARE</span>
            <span>•</span>
            <span className="text-[#CCFF00] font-semibold">CREATIVE TECHNOLOGY</span>
          </div>
        </motion.div>

        {/* Two-Column Grid: Large Contact Links + Fast Transmission Dispatch */}
        <div className="mt-16 sm:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Huge Direct Contact Links */}
          <div className="lg:col-span-6 space-y-4">
            <div className="font-mono text-xs text-[#71717A] uppercase tracking-wider mb-2">
              // DIRECT CHANNELS
            </div>

            {/* Email Huge Link */}
            <a
              href={`mailto:${personalData.contact.email}`}
              onClick={() => sound.playClick()}
              data-cursor="pointer"
              className="p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/25 transition-all flex items-center justify-between group block"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-[#F4F4F6] group-hover:bg-[#CCFF00] group-hover:text-black transition-colors">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="font-mono text-xs text-[#71717A]">EMAIL TRANSMISSION</div>
                  <div className="font-display font-bold text-lg sm:text-xl text-[#F4F4F6] group-hover:text-[#CCFF00] transition-colors mt-0.5">
                    {personalData.contact.email}
                  </div>
                </div>
              </div>
              <ArrowUpRight size={20} className="text-[#71717A] group-hover:text-[#F4F4F6] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>

            {/* LinkedIn Huge Link */}
            <a
              href={personalData.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              data-cursor="pointer"
              className="p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/25 transition-all flex items-center justify-between group block"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-[#F4F4F6] group-hover:bg-[#00E5FF] group-hover:text-black transition-colors">
                  <LinkedinIcon size={20} />
                </div>
                <div>
                  <div className="font-mono text-xs text-[#71717A]">PROFESSIONAL NETWORK</div>
                  <div className="font-display font-bold text-base sm:text-xl text-[#F4F4F6] group-hover:text-[#00E5FF] transition-colors mt-0.5 truncate max-w-[240px] sm:max-w-sm">
                    {personalData.contact.linkedin.replace('https://www.', '').replace('https://', '').split('?')[0]}
                  </div>
                </div>
              </div>
              <ArrowUpRight size={20} className="text-[#71717A] group-hover:text-[#F4F4F6] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>

            {/* GitHub Huge Link */}
            <a
              href={personalData.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              data-cursor="pointer"
              className="p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/25 transition-all flex items-center justify-between group block"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-[#F4F4F6] group-hover:bg-white group-hover:text-black transition-colors">
                  <GithubIcon size={20} />
                </div>
                <div>
                  <div className="font-mono text-xs text-[#71717A]">OPEN REPOSITORIES</div>
                  <div className="font-display font-bold text-base sm:text-xl text-[#F4F4F6] group-hover:text-white transition-colors mt-0.5">
                    {personalData.contact.github.replace('https://', '')}
                  </div>
                </div>
              </div>
              <ArrowUpRight size={20} className="text-[#71717A] group-hover:text-[#F4F4F6] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>

          {/* Right Column: Clean Editorial Message Form */}
          <div className="lg:col-span-6">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#0F0F14]/80 border border-white/10 shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10 font-mono text-xs">
                <span className="text-[#A1A1AA]">TRANSMIT DISPATCH</span>
                <span className="text-[#CCFF00] flex items-center gap-1.5 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] animate-pulse" />
                  ONLINE
                </span>
              </div>

              {submitted ? (
                <div className="py-12 text-center space-y-4 font-mono">
                  <CheckCircle2 size={32} className="text-[#CCFF00] mx-auto" />
                  <h4 className="font-display font-bold text-xl text-[#F4F4F6]">
                    MESSAGE DISPATCHED
                  </h4>
                  <p className="text-sm text-[#A1A1AA] max-w-sm mx-auto font-sans">
                    Thank you for reaching out. I will respond to your inquiry as soon as possible.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setApiError(null);
                    }}
                    className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-xs text-[#F4F4F6] transition-colors"
                  >
                    SEND ANOTHER DISPATCH
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 font-mono text-xs">
                  {/* Spam honeypot trap */}
                  <input
                    type="text"
                    name="_gotcha"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                  />

                  <div>
                    <label className="block text-[10px] text-[#71717A] uppercase tracking-wider mb-2">
                      NAME / ENTITY
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name or organization"
                      className="w-full px-4 py-3.5 rounded-xl bg-black/40 border border-white/10 focus:border-[#CCFF00] text-[#F4F4F6] placeholder-[#52525B] focus:outline-none transition-colors"
                    />
                    {errors.name && <div className="text-[10px] text-[#EF4444] mt-1">{errors.name}</div>}
                  </div>

                  <div>
                    <label className="block text-[10px] text-[#71717A] uppercase tracking-wider mb-2">
                      EMAIL ADDRESS
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="email@example.com"
                      className="w-full px-4 py-3.5 rounded-xl bg-black/40 border border-white/10 focus:border-[#CCFF00] text-[#F4F4F6] placeholder-[#52525B] focus:outline-none transition-colors"
                    />
                    {errors.email && <div className="text-[10px] text-[#EF4444] mt-1">{errors.email}</div>}
                  </div>

                  <div>
                    <label className="block text-[10px] text-[#71717A] uppercase tracking-wider mb-2">
                      PARAMETERS / MESSAGE
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Discuss project requirements, roles, or research collaborations..."
                      className="w-full px-4 py-3.5 rounded-xl bg-black/40 border border-white/10 focus:border-[#CCFF00] text-[#F4F4F6] placeholder-[#52525B] focus:outline-none transition-colors resize-none"
                    />
                    {errors.message && <div className="text-[10px] text-[#EF4444] mt-1">{errors.message}</div>}
                  </div>

                  {apiError && (
                    <div className="p-3.5 rounded-xl bg-[#EF4444]/10 border border-[#EF4444]/30 text-[#EF4444] text-[11px] font-mono flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444] mt-1 shrink-0" />
                      <span>{apiError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    data-cursor="pointer"
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-[#F4F4F6] hover:bg-white text-black font-display font-bold text-xs tracking-wider uppercase transition-all shadow-lg hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send size={14} className={isSubmitting ? 'animate-pulse text-black' : 'text-black'} />
                    <span>{isSubmitting ? 'Sending...' : 'TRANSMIT MESSAGE'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
