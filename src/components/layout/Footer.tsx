import React from 'react';
import { ArrowUp } from 'lucide-react';
import { sound } from '../../utils/audio';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-20 border-t border-[#2A2A2E] py-8 text-xs font-mono text-[#5C5C64]">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-[#8C8C93]">
          <span className="text-[#EDEDED] font-semibold">SANJAY G S</span>
          <span>// PORTFOLIO</span>
        </div>

        <div className="flex items-center gap-6">
          <span>ALL MODULES NOMINAL</span>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 px-2.5 py-1 rounded border border-[#2A2A2E] hover:border-[#3E3E44] text-[#8C8C93] hover:text-[#EDEDED] transition-colors"
            title="Return to top"
          >
            <span>TOP</span>
            <ArrowUp size={12} />
          </button>
        </div>
      </div>
    </footer>
  );
};
