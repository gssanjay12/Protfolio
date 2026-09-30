import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { personalData } from '../../data/personal';
import { Send, CheckCircle2, Mail, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../icons/BrandIcons';
import { ContactSculpture } from '../three/ContactSculpture';
import { sound } from '../../utils/audio';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = 'NAME_REQUIRED';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'EMAIL_REQUIRED';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'INVALID_EMAIL_FORMAT';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'MESSAGE_REQUIRED';
    } else if (formData.message.trim().length < 8) {
      newErrors.message = 'MINIMUM 8 CHARACTERS REQUIRED';
    }
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
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
    <section id="contact" className="py-16 sm:py-24 border-t border-[#26262B] relative overflow-hidden">
      {/* Background 3D Geometric Loop: Object Returns */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-80 sm:w-96 sm:h-96 opacity-30 pointer-events-none -z-0">
        <ContactSculpture />
      </div>

      {/* Top Technical Hierarchy */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="text-xs font-mono text-[#8C8C93] mb-1">
          // SYS.CONNECTION
        </div>
        <h2 className="text-2xl sm:text-3xl font-sans font-bold text-[#EDEDED] tracking-tight">
          CONTACT ME
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
        {/* Left Column: Memorable Large Typography & Direct Links */}
        <div className="lg:col-span-6 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-3"
          >
            <h3 className="text-3xl sm:text-5xl font-sans font-extrabold tracking-tight text-[#EDEDED] leading-[1.05]">
              LET&apos;S BUILD<br />
              SOMETHING<br />
              INTERESTING.
            </h3>
            <p className="text-sm text-[#8C8C93] font-sans leading-relaxed max-w-md pt-2">
              Available for full-stack AI engineering roles, applied machine learning pipelines, and geospatial data collaborations.
            </p>
          </motion.div>

          <div className="space-y-2.5 font-mono text-xs max-w-md">
            {/* Email */}
            <a
              href={`mailto:${personalData.contact.email}`}
              onClick={() => sound.playClick()}
              data-cursor="pointer"
              className="flex items-center justify-between p-3.5 bg-[#17171A] border border-[#26262B] hover:border-[#3E3E44] text-[#EDEDED] transition-colors rounded-xs group"
            >
              <div className="flex items-center gap-3">
                <Mail size={15} className="text-[#8C8C93] group-hover:text-[#22C55E] transition-colors" />
                <div>
                  <div className="text-[10px] text-[#5C5C64] uppercase font-semibold">DIRECT TRANSMISSION</div>
                  <div className="text-xs font-medium text-[#EDEDED] mt-0.5">
                    {personalData.contact.email}
                  </div>
                </div>
              </div>
              <ArrowUpRight size={14} className="text-[#8C8C93] group-hover:text-[#EDEDED] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* LinkedIn */}
            <a
              href={personalData.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              data-cursor="pointer"
              className="flex items-center justify-between p-3.5 bg-[#17171A] border border-[#26262B] hover:border-[#3E3E44] text-[#EDEDED] transition-colors rounded-xs group"
            >
              <div className="flex items-center gap-3">
                <LinkedinIcon size={15} className="text-[#8C8C93] group-hover:text-[#22C55E] transition-colors" />
                <div>
                  <div className="text-[10px] text-[#5C5C64] uppercase font-semibold">PROFESSIONAL NETWORK</div>
                  <div className="text-xs font-medium text-[#EDEDED] mt-0.5">
                    linkedin.com/in/sanjay-gs
                  </div>
                </div>
              </div>
              <ArrowUpRight size={14} className="text-[#8C8C93] group-hover:text-[#EDEDED] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* GitHub */}
            <a
              href={personalData.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              data-cursor="pointer"
              className="flex items-center justify-between p-3.5 bg-[#17171A] border border-[#26262B] hover:border-[#3E3E44] text-[#EDEDED] transition-colors rounded-xs group"
            >
              <div className="flex items-center gap-3">
                <GithubIcon size={15} className="text-[#8C8C93] group-hover:text-[#22C55E] transition-colors" />
                <div>
                  <div className="text-[10px] text-[#5C5C64] uppercase font-semibold">OPEN SOURCE REPOSITORIES</div>
                  <div className="text-xs font-medium text-[#EDEDED] mt-0.5">
                    github.com/sanjay-gs
                  </div>
                </div>
              </div>
              <ArrowUpRight size={14} className="text-[#8C8C93] group-hover:text-[#EDEDED] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* Right Column: Clean Form */}
        <div className="lg:col-span-6">
          <div className="p-6 sm:p-7 bg-[#17171A] border border-[#26262B] rounded-xs shadow-lg backdrop-blur-xs">
            <div className="flex items-center justify-between pb-3 mb-5 border-b border-[#26262B] text-xs font-mono text-[#8C8C93]">
              <span>MESSAGE TRANSMISSION</span>
              <span className="text-[10px] text-[#EDEDED] font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                ENCRYPTED
              </span>
            </div>

            {submitted ? (
              <div className="p-6 bg-[#121214] border border-[#26262B] text-center space-y-2 font-mono rounded-xs">
                <CheckCircle2 size={20} className="text-[#22C55E] mx-auto mb-2" />
                <h4 className="text-sm font-sans font-bold text-[#EDEDED]">
                  MESSAGE TRANSMITTED
                </h4>
                <p className="text-xs text-[#8C8C93] font-sans">
                  Your message has been sent successfully. Thank you for connecting.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setApiError(null);
                  }}
                  className="mt-3 px-3 py-1.5 border border-[#26262B] hover:border-[#3E3E44] text-xs text-[#EDEDED] rounded-xs transition-colors"
                >
                  SEND ANOTHER
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                {/* Honeypot trap */}
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

                {/* NAME */}
                <div>
                  <label className="block text-[10px] text-[#5C5C64] uppercase mb-1">
                    NAME
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your Name / Organization"
                    className="w-full px-3.5 py-2.5 bg-[#121214] border border-[#26262B] focus:border-[#EDEDED] text-[#EDEDED] placeholder-[#5C5C64] focus:outline-none transition-colors rounded-xs"
                  />
                  {errors.name && (
                    <div className="text-[10px] text-[#EF4444] mt-1">{errors.name}</div>
                  )}
                </div>

                {/* EMAIL */}
                <div>
                  <label className="block text-[10px] text-[#5C5C64] uppercase mb-1">
                    EMAIL
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@example.com"
                    className="w-full px-3.5 py-2.5 bg-[#121214] border border-[#26262B] focus:border-[#EDEDED] text-[#EDEDED] placeholder-[#5C5C64] focus:outline-none transition-colors rounded-xs"
                  />
                  {errors.email && (
                    <div className="text-[10px] text-[#EF4444] mt-1">{errors.email}</div>
                  )}
                </div>

                {/* MESSAGE */}
                <div>
                  <label className="block text-[10px] text-[#5C5C64] uppercase mb-1">
                    MESSAGE
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your inquiry, proposal, or project parameters..."
                    className="w-full px-3.5 py-2.5 bg-[#121214] border border-[#26262B] focus:border-[#EDEDED] text-[#EDEDED] placeholder-[#5C5C64] focus:outline-none transition-colors resize-none rounded-xs"
                  />
                  {errors.message && (
                    <div className="text-[10px] text-[#EF4444] mt-1">{errors.message}</div>
                  )}
                </div>

                {apiError && (
                  <div className="p-3 bg-[#EF4444]/10 border border-[#EF4444]/30 text-[#EF4444] text-[11px] font-mono rounded-xs">
                    {apiError}
                  </div>
                )}

                {/* SEND MESSAGE */}
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  data-cursor="pointer"
                  className="w-full flex items-center justify-center gap-2 py-3 bg-[#EDEDED] hover:bg-white text-black font-semibold text-xs font-mono tracking-wider transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-xs shadow-sm"
                >
                  <Send size={13} className={isSubmitting ? 'animate-pulse text-black' : 'text-black'} />
                  <span>{isSubmitting ? 'Sending...' : 'SEND MESSAGE'}</span>
                </motion.button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
