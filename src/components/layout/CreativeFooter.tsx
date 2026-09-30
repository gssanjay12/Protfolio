import React from 'react';
import { ArrowUp } from 'lucide-react';
import { personalData } from '../../data/personal';
import { sound } from '../../utils/audio';

export const CreativeFooter: React.FC = () => {
  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full border-t border-white/10 py-12 px-6 sm:px-10 lg:px-16 bg-[#050507] text-[#71717A] font-mono text-xs">
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-center sm:text-left">
          <span className="font-display font-bold text-sm tracking-wider text-[#F4F4F6]">
            SANJAY G S
          </span>
          <span className="hidden sm:inline">•</span>
          <span>AI &amp; DATA SCIENCE ENGINEER</span>
          <span className="hidden sm:inline">•</span>
          <span>© {new Date().getFullYear()}</span>
        </div>

        <div className="flex items-center gap-6">
          <a
            href={personalData.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#F4F4F6] transition-colors"
          >
            GITHUB
          </a>
          <a
            href={personalData.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#F4F4F6] transition-colors"
          >
            LINKEDIN
          </a>
          <a
            href={`mailto:${personalData.contact.email}`}
            className="hover:text-[#F4F4F6] transition-colors"
          >
            EMAIL
          </a>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-[#F4F4F6] border border-white/10 hover:border-white/20 transition-all group"
            title="Return to top"
          >
            <span>TOP</span>
            <ArrowUp size={13} className="group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};
