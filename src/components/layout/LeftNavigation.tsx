import React, { useState } from 'react';
import {
  Search,
  Terminal,
  FileDown,
  Settings,
  ChevronDown,
  ChevronRight,
  FileCode2,
  X,
  UserRound,
  FolderKanban,
  BriefcaseBusiness,
  SlidersHorizontal,
  Award,
  Mail,
  Home,
  Check,
} from 'lucide-react';
import { GsLogo } from '../icons/GsLogo';
import { GithubIcon, LinkedinIcon } from '../icons/BrandIcons';
import { personalData } from '../../data/personal';
import { sound } from '../../utils/audio';

interface LeftNavigationProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  onOpenSearch: () => void;
  onReplayIntro?: () => void;
}

export const LeftNavigation: React.FC<LeftNavigationProps> = ({
  activeSection,
  onNavigate,
  mobileMenuOpen,
  setMobileMenuOpen,
  onOpenSearch,
  onReplayIntro,
}) => {
  const [portfolioOpen, setPortfolioOpen] = useState(true);
  const [workOpen, setWorkOpen] = useState(true);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [audioActive, setAudioActive] = useState(!sound.getIsMuted());

  const handleItemClick = (sectionId: string) => {
    sound.playClick();
    onNavigate(sectionId);
    setMobileMenuOpen(false);
  };

  const handleOpenResume = () => {
    sound.playClick();
    window.open('/resume.pdf', '_blank');
  };

  const handleOpenGithub = () => {
    sound.playClick();
    window.open(personalData.contact.github, '_blank');
  };

  const handleToggleAudio = () => {
    const active = sound.toggleMute();
    setAudioActive(active);
  };

  const handleToggleMotion = () => {
    sound.playClick();
    setReducedMotion(!reducedMotion);
    document.documentElement.classList.toggle('reduce-motion', !reducedMotion);
  };

  // THE ONLY PRIMARY SECTION NAVIGATION: Explorer entries
  const portfolioItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'about', label: 'About Me', icon: UserRound },
    { id: 'projects', label: 'My Work', icon: FolderKanban },
    { id: 'experience', label: 'Experience', icon: BriefcaseBusiness },
    { id: 'skills', label: 'Skills', icon: SlidersHorizontal },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'contact', label: 'Contact Me', icon: Mail },
  ];

  // Exactly the 3 requested projects under MY WORK
  const workItems = [
    { id: 'projects', label: 'ORCA' },
    { id: 'projects', label: 'CLASSSYNC' },
    { id: 'projects', label: 'ORTHOPEDIC AI' },
  ];

  // Narrow Vertical Icon Rail (Activity Bar) with APPLICATION TOOLS ONLY
  const iconRail = (
    <aside className="w-12 h-full bg-[#101012] border-r border-[#26262B] flex flex-col justify-between items-center py-2 select-none shrink-0 z-10">
      {/* Top Application Tool Icons */}
      <div className="flex flex-col items-center gap-1.5 w-full">
        {/* TOOL 1: GS / Home -> Return to workspace overview */}
        <button
          onClick={() => handleItemClick('overview')}
          className="w-10 h-10 flex items-center justify-center text-[#EDEDED] hover:text-white transition-colors"
          title="GS — Return to Overview"
        >
          <GsLogo size={22} active={activeSection === 'overview'} />
        </button>

        <div className="w-6 h-[1px] bg-[#26262B] my-1" />

        {/* TOOL 2: Search -> Open Global Search */}
        <button
          onClick={() => {
            sound.playClick();
            onOpenSearch();
          }}
          className="w-10 h-10 flex items-center justify-center text-[#8C8C93] hover:text-[#EDEDED] transition-colors"
          title="Global Search"
        >
          <Search size={18} />
        </button>

        {/* TOOL 3: Command Palette -> Open Command Palette (Ctrl+K) */}
        <button
          onClick={() => {
            sound.playClick();
            onOpenSearch();
          }}
          className="w-10 h-10 flex items-center justify-center text-[#8C8C93] hover:text-[#EDEDED] transition-colors"
          title="Command Palette (Ctrl+K)"
        >
          <Terminal size={18} />
        </button>

        {/* TOOL 4: Resume -> Open / Download Resume */}
        <button
          onClick={handleOpenResume}
          className="w-10 h-10 flex items-center justify-center text-[#8C8C93] hover:text-[#EDEDED] transition-colors"
          title="View / Download Resume (PDF)"
        >
          <FileDown size={18} />
        </button>

        {/* TOOL 5: GitHub -> Open GitHub Profile */}
        <button
          onClick={handleOpenGithub}
          className="w-10 h-10 flex items-center justify-center text-[#8C8C93] hover:text-[#EDEDED] transition-colors"
          title="GitHub Profile"
        >
          <GithubIcon size={18} />
        </button>
      </div>

      {/* Bottom Tool Controls */}
      <div className="flex flex-col items-center gap-2 w-full">
        {/* TOOL 6: Settings -> Open Interface Preferences */}
        <button
          onClick={() => {
            sound.playClick();
            setShowSettingsModal(true);
          }}
          className="w-10 h-10 flex items-center justify-center text-[#8C8C93] hover:text-[#EDEDED] transition-colors"
          title="Workspace Settings"
        >
          <Settings size={18} />
        </button>

        {/* Status indicator */}
        <div className="w-10 h-6 flex items-center justify-center" title="Workspace: Online">
          <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
        </div>
      </div>
    </aside>
  );

  // Explorer Tree Panel (THE ONE PRIMARY SECTION NAVIGATION)
  const explorerPanel = (
    <div className="flex-1 flex flex-col justify-between h-full bg-[#131316] text-xs font-mono select-none overflow-y-auto">
      <div>
        {/* Explorer Header */}
        <div className="px-3 py-2 border-b border-[#26262B] flex items-center justify-between text-[11px] text-[#8C8C93] uppercase tracking-wider font-semibold">
          <span className="text-[#EDEDED]">EXPLORER</span>
          <span className="text-[10px] text-[#5C5C64]">PORTFOLIO</span>
        </div>

        {/* Root Directory Tree */}
        <div className="p-2 space-y-3">
          {/* Section: ▼ portfolio */}
          <div>
            <button
              onClick={() => setPortfolioOpen(!portfolioOpen)}
              className="w-full flex items-center gap-1.5 px-2 py-1 text-[11px] font-semibold text-[#8C8C93] hover:text-[#EDEDED] transition-colors"
            >
              {portfolioOpen ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
              <span className="tracking-wide">PORTFOLIO</span>
            </button>

            {portfolioOpen && (
              <div className="ml-3 pl-2 border-l border-[#26262B] space-y-0.5 mt-0.5">
                {portfolioItems.map((item) => {
                  const isActive = activeSection === item.id;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleItemClick(item.id)}
                      className={`w-full flex items-center gap-2 px-2 py-1 text-left text-xs transition-colors rounded-xs ${
                        isActive
                          ? 'text-[#EDEDED] font-semibold bg-[#17171A] border-l-2 border-[#22C55E]'
                          : 'text-[#8C8C93] hover:text-[#EDEDED] hover:bg-[#1A1A1E]'
                      }`}
                    >
                      <Icon size={14} className={isActive ? 'text-[#22C55E]' : 'text-[#8C8C93]'} />
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Section: ▼ MY WORK */}
          <div>
            <button
              onClick={() => setWorkOpen(!workOpen)}
              className="w-full flex items-center gap-1.5 px-2 py-1 text-[11px] font-semibold text-[#8C8C93] hover:text-[#EDEDED] transition-colors"
            >
              {workOpen ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
              <span className="tracking-wide uppercase text-[10px]">MY WORK</span>
            </button>

            {workOpen && (
              <div className="ml-3 pl-2 border-l border-[#26262B] space-y-0.5 mt-0.5">
                {workItems.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleItemClick(item.id)}
                    className="w-full flex items-center gap-2 px-2 py-1 text-left text-xs text-[#8C8C93] hover:text-[#EDEDED] hover:bg-[#1A1A1E] transition-colors rounded-xs group"
                  >
                    <FileCode2 size={13} className="text-[#5C5C64] group-hover:text-[#EDEDED] transition-colors" />
                    <span className="truncate">{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Area: SOCIAL & STATUS */}
      <div className="p-3 border-t border-[#26262B] space-y-3 bg-[#111114]">
        {/* SOCIAL */}
        <div>
          <div className="text-[10px] font-semibold text-[#5C5C64] uppercase tracking-wider mb-1.5">
            SOCIAL
          </div>
          <div className="space-y-0.5 text-xs">
            <a
              href={personalData.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-2 py-1 text-[#8C8C93] hover:text-[#EDEDED] hover:bg-[#1A1A1E] transition-colors rounded-xs group"
            >
              <GithubIcon size={14} className="text-[#8C8C93] group-hover:text-[#EDEDED] transition-colors" />
              <span>GitHub</span>
            </a>

            <a
              href={personalData.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-2 py-1 text-[#8C8C93] hover:text-[#EDEDED] hover:bg-[#1A1A1E] transition-colors rounded-xs group"
            >
              <LinkedinIcon size={14} className="text-[#8C8C93] group-hover:text-[#EDEDED] transition-colors" />
              <span>LinkedIn</span>
            </a>

            <a
              href={`mailto:${personalData.contact.email}`}
              className="flex items-center gap-2 px-2 py-1 text-[#8C8C93] hover:text-[#EDEDED] hover:bg-[#1A1A1E] transition-colors rounded-xs group"
            >
              <Mail size={14} className="text-[#8C8C93] group-hover:text-[#EDEDED] transition-colors" />
              <span>Email</span>
            </a>
          </div>
        </div>

        {/* STATUS */}
        <div className="pt-2 border-t border-[#26262B]">
          <div className="text-[10px] font-semibold text-[#5C5C64] uppercase tracking-wider mb-1">
            STATUS
          </div>
          <div className="flex items-center gap-2 px-2 py-0.5 text-xs text-[#8C8C93]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
            <span className="text-[#EDEDED] font-medium text-[11px]">ONLINE</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop / Laptop Persistent Dual Sidebar: Activity Rail + Explorer */}
      <aside className="hidden lg:flex fixed top-9 left-0 w-[272px] h-[calc(100vh-36px)] border-r border-[#26262B] bg-[#131316] z-40">
        {iconRail}
        {explorerPanel}
      </aside>

      {/* Mobile Drawer Overlay: Only Explorer Section Navigation + Separate Tools */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative flex flex-col w-[280px] max-w-[85vw] h-full bg-[#131316] border-r border-[#26262B] z-10 pt-9">
            {/* Top close */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-[#26262B] bg-[#101012]">
              <div className="flex items-center gap-2 text-xs font-mono text-[#EDEDED] font-semibold">
                <GsLogo size={18} active={true} />
                <span>NAVIGATION</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 text-[#8C8C93] hover:text-[#EDEDED]"
                aria-label="Close navigation"
              >
                <X size={16} />
              </button>
            </div>

            {/* Single Explorer Menu */}
            <div className="flex-1 overflow-y-auto">
              {explorerPanel}
            </div>

            {/* Mobile Utility Tools Row */}
            <div className="p-2 border-t border-[#26262B] bg-[#101012] grid grid-cols-5 gap-1 text-[#8C8C93]">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleItemClick('overview');
                }}
                className="p-2 flex items-center justify-center hover:text-white"
                title="Overview"
              >
                <Home size={16} />
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSearch();
                }}
                className="p-2 flex items-center justify-center hover:text-white"
                title="Search"
              >
                <Search size={16} />
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleOpenResume();
                }}
                className="p-2 flex items-center justify-center hover:text-white"
                title="Resume"
              >
                <FileDown size={16} />
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleOpenGithub();
                }}
                className="p-2 flex items-center justify-center hover:text-white"
                title="GitHub"
              >
                <GithubIcon size={16} />
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setShowSettingsModal(true);
                }}
                className="p-2 flex items-center justify-center hover:text-white"
                title="Settings"
              >
                <Settings size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal (Preferences Panel) */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60"
            onClick={() => setShowSettingsModal(false)}
          />
          <div className="relative w-full max-w-sm bg-[#17171A] border border-[#26262B] p-5 font-mono text-xs z-10 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#26262B]">
              <div className="flex items-center gap-2 text-[#EDEDED] font-semibold">
                <Settings size={14} className="text-[#8C8C93]" />
                <span>WORKSPACE SETTINGS</span>
              </div>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="text-[#8C8C93] hover:text-[#EDEDED]"
              >
                <X size={14} />
              </button>
            </div>

            <div className="space-y-3 text-[#8C8C93]">
              {/* Appearance */}
              <div className="flex items-center justify-between py-1 border-b border-[#26262B]">
                <span>APPEARANCE</span>
                <span className="text-[#EDEDED] font-semibold flex items-center gap-1">
                  <Check size={12} className="text-[#22C55E]" />
                  Dark Neutral
                </span>
              </div>

              {/* Motion Toggle */}
              <div className="flex items-center justify-between py-1 border-b border-[#26262B]">
                <span>MOTION</span>
                <button
                  onClick={handleToggleMotion}
                  className="px-2.5 py-1 bg-[#121214] border border-[#26262B] hover:border-[#3E3E44] text-[#EDEDED] text-[11px] rounded-xs transition-colors"
                >
                  {reducedMotion ? 'Reduced' : 'Full Motion'}
                </button>
              </div>

              {/* Audio Toggle */}
              <div className="flex items-center justify-between py-1 border-b border-[#26262B]">
                <span>AUDIO</span>
                <button
                  onClick={handleToggleAudio}
                  className="px-2.5 py-1 bg-[#121214] border border-[#26262B] hover:border-[#3E3E44] text-[#EDEDED] text-[11px] rounded-xs transition-colors"
                >
                  {audioActive ? 'On' : 'Off'}
                </button>
              </div>

              {/* Intro Replay */}
              <div className="flex items-center justify-between py-1">
                <span>3D INTRO</span>
                <button
                  onClick={() => {
                    sound.playClick();
                    setShowSettingsModal(false);
                    if (onReplayIntro) onReplayIntro();
                  }}
                  className="px-2.5 py-1 bg-[#EDEDED] hover:bg-white text-black font-semibold text-[11px] rounded-xs transition-colors"
                >
                  Replay
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
