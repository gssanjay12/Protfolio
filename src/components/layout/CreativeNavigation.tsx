import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from '../icons/BrandIcons';
import { personalData } from '../../data/personal';
import { sound } from '../../utils/audio';

interface CreativeNavigationProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const CreativeNavigation: React.FC<CreativeNavigationProps> = ({
  activeSection,
  onNavigate,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'work', label: 'WORK', target: 'projects' },
    { id: 'about', label: 'ABOUT', target: 'about' },
    { id: 'experience', label: 'EXPERIENCE', target: 'experience' },
    { id: 'skills', label: 'SKILLS', target: 'skills' },
    { id: 'achievements', label: 'AWARDS', target: 'achievements' },
    { id: 'contact', label: 'CONTACT', target: 'contact' },
  ];

  const handleLinkClick = (target: string) => {
    sound.playClick();
    onNavigate(target);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Floating Minimal Navigation Bar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex justify-center px-4 sm:px-8 py-4 sm:py-6 ${
          scrolled ? 'translate-y-0' : 'translate-y-0'
        }`}
      >
        <nav
          className={`w-full max-w-6xl mx-auto flex items-center justify-between px-5 py-3 transition-all duration-500 rounded-full ${
            scrolled
              ? 'glass-pill shadow-[0_8px_32px_rgba(0,0,0,0.5)] border-white/10'
              : 'bg-transparent border-transparent'
          }`}
        >
          {/* Brand Mark */}
          <button
            onClick={() => {
              sound.playClick();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 text-left group"
          >
            <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" />
            <span className="font-display font-bold text-sm tracking-wider text-[#F4F4F6] group-hover:text-white transition-colors">
              SANJAY GS
            </span>
            <span className="hidden md:inline-block font-mono text-[10px] text-[#71717A] tracking-widest pl-1">
              / AI &amp; DATA
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((item) => {
              const isActive = activeSection === item.target || (item.target === 'projects' && activeSection === 'projects');
              return (
                <button
                  key={item.id}
                  onClick={() => handleLinkClick(item.target)}
                  className={`relative px-3.5 py-1.5 font-mono text-xs tracking-wider transition-colors uppercase ${
                    isActive ? 'text-[#F4F4F6] font-semibold' : 'text-[#A1A1AA] hover:text-[#F4F4F6]'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-white/10 rounded-full -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Right Action: GitHub CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href={personalData.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-[#F4F4F6] tracking-wider transition-all hover:border-white/20 group"
            >
              <GithubIcon size={13} className="text-[#A1A1AA] group-hover:text-white transition-colors" />
              <span>GITHUB</span>
              <ArrowUpRight size={13} className="text-[#A1A1AA] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => {
                sound.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="md:hidden p-2 rounded-full bg-white/5 border border-white/10 text-[#F4F4F6] hover:bg-white/10 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Fullscreen Editorial Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#070709]/95 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-10 pt-28 md:hidden"
          >
            <div className="space-y-4">
              <div className="text-[10px] font-mono text-[#71717A] tracking-widest uppercase">
                // NAVIGATION DIRECTORY
              </div>
              <div className="space-y-2">
                {navLinks.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <button
                      onClick={() => handleLinkClick(item.target)}
                      className="text-3xl font-display font-extrabold text-[#F4F4F6] hover:text-[#CCFF00] tracking-tight block py-2 text-left transition-colors"
                    >
                      <span className="font-mono text-sm text-[#71717A] mr-3">0{idx + 1}</span>
                      {item.label}
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-white/10 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-[#A1A1AA]">
                <span>SANJAY G S</span>
                <span className="text-[#CCFF00]">AVAILABLE FOR ROLES</span>
              </div>
              <div className="flex items-center gap-4">
                <a
                  href={personalData.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 text-center rounded bg-white/5 border border-white/10 font-mono text-xs text-[#F4F4F6]"
                >
                  GITHUB
                </a>
                <a
                  href={personalData.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 text-center rounded bg-white/5 border border-white/10 font-mono text-xs text-[#F4F4F6]"
                >
                  LINKEDIN
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
