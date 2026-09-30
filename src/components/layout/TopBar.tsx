import React from 'react';
import { Menu } from 'lucide-react';
import { GsLogo } from '../icons/GsLogo';
import { sound } from '../../utils/audio';

interface TopBarProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  mobileMenuOpen,
  setMobileMenuOpen,
}) => {
  return (
    <header className="lg:hidden fixed top-0 left-0 right-0 z-50 h-12 bg-[#131316] border-b border-[#26262B] px-4 flex items-center justify-between font-mono text-xs select-none">
      <div className="flex items-center gap-2.5">
        <button
          onClick={() => {
            sound.playClick();
            setMobileMenuOpen(!mobileMenuOpen);
          }}
          className="p-1 text-[#8C8C93] hover:text-[#EDEDED] focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          <Menu size={18} />
        </button>
        <GsLogo size={22} active={true} />
        <span className="font-sans font-bold text-sm text-[#EDEDED] tracking-tight">
          SANJAY G S
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
        <span className="text-[11px] text-[#8C8C93] font-medium">ONLINE</span>
      </div>
    </header>
  );
};
