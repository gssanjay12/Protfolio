import React, { useState } from 'react';
import { Menu, Volume2, VolumeX, RotateCcw, Moon } from 'lucide-react';
import { GsLogo } from '../icons/GsLogo';
import { sound } from '../../utils/audio';

interface TopApplicationBarProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  onReplayIntro: () => void;
}

export const TopApplicationBar: React.FC<TopApplicationBarProps> = ({
  mobileMenuOpen,
  setMobileMenuOpen,
  onReplayIntro,
}) => {
  const [isMuted, setIsMuted] = useState(sound.getIsMuted());

  const handleToggleSound = () => {
    const active = sound.toggleMute();
    setIsMuted(!active);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-9 bg-[#121215] border-b border-[#26262B] px-3 sm:px-4 flex items-center justify-between font-mono text-xs select-none">
      {/* Left: Mobile Menu Toggle + GS Brand */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={() => {
            sound.playClick();
            setMobileMenuOpen(!mobileMenuOpen);
          }}
          className="lg:hidden p-1 text-[#8C8C93] hover:text-[#EDEDED] focus:outline-none transition-colors"
          aria-label="Toggle navigation menu"
        >
          <Menu size={16} />
        </button>

        <a href="#overview" className="flex items-center gap-2 group">
          <GsLogo size={20} active={true} />
          <span className="font-sans font-bold text-xs sm:text-sm text-[#EDEDED] tracking-tight group-hover:text-white transition-colors">
            SANJAY G S
          </span>
        </a>
      </div>

      {/* Center: Title / Workspace Breadcrumb (Clean Neutral) */}
      <div className="hidden md:flex items-center">
        <div className="px-3 py-0.5 bg-[#17171A] border border-[#26262B] rounded-sm text-[11px] text-[#8C8C93] flex items-center gap-2">
          <span className="text-[#EDEDED] font-medium">SANJAY G S</span>
          <span className="text-[#5C5C64]">—</span>
          <span>AI &amp; DATA SCIENCE</span>
        </div>
      </div>

      {/* Right: Small Utility Controls (Neutral with single green online dot) */}
      <div className="flex items-center gap-2 sm:gap-3 text-[11px]">
        {/* System Status: Small green dot */}
        <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 text-[#8C8C93]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
          <span className="text-[10px] font-medium text-[#EDEDED]">ONLINE</span>
        </div>

        {/* Audio Toggle */}
        <button
          onClick={handleToggleSound}
          className="flex items-center gap-1.5 px-2 py-0.5 rounded border border-[#26262B] hover:border-[#3E3E44] text-[#8C8C93] hover:text-[#EDEDED] transition-colors"
          title={isMuted ? 'Enable Audio' : 'Mute Audio'}
        >
          {!isMuted ? <Volume2 size={14} className="text-[#EDEDED]" /> : <VolumeX size={14} className="text-[#5C5C64]" />}
          <span className="hidden sm:inline text-[10px]">{!isMuted ? 'AUDIO: ON' : 'AUDIO: OFF'}</span>
        </button>

        {/* Intro Replay */}
        <button
          onClick={() => {
            sound.playClick();
            onReplayIntro();
          }}
          className="flex items-center gap-1.5 px-2 py-0.5 rounded border border-[#26262B] hover:border-[#3E3E44] text-[#8C8C93] hover:text-[#EDEDED] transition-colors"
          title="Replay 3D intro animation"
        >
          <RotateCcw size={14} />
          <span className="hidden sm:inline text-[10px]">INTRO</span>
        </button>

        {/* Theme Indicator */}
        <div
          className="hidden lg:flex items-center gap-1.5 px-2 py-0.5 rounded border border-[#26262B] text-[#5C5C64]"
          title="Workspace Theme: Dark Neutral"
        >
          <Moon size={14} />
          <span className="text-[10px]">DARK</span>
        </div>
      </div>
    </header>
  );
};
