import React, { useState, useEffect } from 'react';
import {
  Search,
  X,
  FolderGit2,
  FileText,
  ArrowRight,
  Terminal,
  Volume2,
  VolumeX,
  RotateCcw,
  Sliders,
  FileDown,
} from 'lucide-react';
import { GithubIcon } from '../icons/BrandIcons';
import { sound } from '../../utils/audio';
import { personalData } from '../../data/personal';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
  onReplayIntro?: () => void;
  onOpenSettings?: () => void;
}

interface PaletteItem {
  id: string;
  name: string;
  category: 'NAVIGATION' | 'PROJECT' | 'COMMAND';
  subtitle?: string;
  action: () => void;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onReplayIntro,
  onOpenSettings,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const navigateTo = (sectionId: string) => {
    sound.playClick();
    onNavigate(sectionId);
    onClose();
  };

  const ITEMS: PaletteItem[] = [
    // Primary Sections
    {
      id: 'overview',
      name: 'Go to Overview',
      subtitle: 'Workspace Hero & 3D Interactive Sculpture',
      category: 'NAVIGATION',
      icon: Terminal,
      action: () => navigateTo('overview'),
    },
    {
      id: 'about',
      name: 'Go to About Me',
      subtitle: 'Background, engineering philosophy & focus domains',
      category: 'NAVIGATION',
      icon: FileText,
      action: () => navigateTo('about'),
    },
    {
      id: 'projects',
      name: 'Go to My Work',
      subtitle: 'ORCA, ClassSync & Orthopedic AI',
      category: 'NAVIGATION',
      icon: FolderGit2,
      action: () => navigateTo('projects'),
    },
    {
      id: 'experience',
      name: 'Go to Experience',
      subtitle: 'Data Science Intern at Oasis Infobyte & B.Tech studies',
      category: 'NAVIGATION',
      icon: FileText,
      action: () => navigateTo('experience'),
    },
    {
      id: 'skills',
      name: 'Go to Skills',
      subtitle: 'Programming, AI/ML, Data Science & Tools',
      category: 'NAVIGATION',
      icon: Sliders,
      action: () => navigateTo('skills'),
    },
    {
      id: 'achievements',
      name: 'Go to Achievements',
      subtitle: 'Awards, certifications & recognized milestones',
      category: 'NAVIGATION',
      icon: FileText,
      action: () => navigateTo('achievements'),
    },
    {
      id: 'contact',
      name: 'Go to Contact',
      subtitle: 'Direct transmission channel & social links',
      category: 'NAVIGATION',
      icon: FileText,
      action: () => navigateTo('contact'),
    },

    // Projects Direct Search
    {
      id: 'proj-orca',
      name: 'ORCA — Marine Intelligence Platform',
      subtitle: 'Agentic AI marine platform for fishermen',
      category: 'PROJECT',
      icon: FolderGit2,
      action: () => navigateTo('projects'),
    },
    {
      id: 'proj-classsync',
      name: 'CLASSSYNC — Academic Platform',
      subtitle: 'Automated coordination & scheduling engine',
      category: 'PROJECT',
      icon: FolderGit2,
      action: () => navigateTo('projects'),
    },
    {
      id: 'proj-orthopedic',
      name: 'ORTHOPEDIC AI — Medical Vision',
      subtitle: 'Computer vision analysis for medical imaging',
      category: 'PROJECT',
      icon: FolderGit2,
      action: () => navigateTo('projects'),
    },
    {
      id: 'exp-intern',
      name: 'DATA SCIENCE INTERN — Oasis Infobyte',
      subtitle: 'Iris, Car Price & Unemployment analysis',
      category: 'NAVIGATION',
      icon: FileText,
      action: () => navigateTo('experience'),
    },

    // Commands
    {
      id: 'cmd-github',
      name: 'Open GitHub Profile',
      subtitle: 'github.com/sanjay-gs',
      category: 'COMMAND',
      icon: GithubIcon,
      action: () => {
        sound.playClick();
        window.open(personalData.contact.github, '_blank');
        onClose();
      },
    },
    {
      id: 'cmd-resume',
      name: 'Download / View Resume',
      subtitle: 'PDF document',
      category: 'COMMAND',
      icon: FileDown,
      action: () => {
        sound.playClick();
        window.open('/resume.pdf', '_blank');
        onClose();
      },
    },
    {
      id: 'cmd-audio',
      name: sound.getIsMuted() ? 'Enable Workspace Audio' : 'Mute Workspace Audio',
      subtitle: 'Toggle tactile interaction sounds',
      category: 'COMMAND',
      icon: sound.getIsMuted() ? Volume2 : VolumeX,
      action: () => {
        sound.toggleMute();
        onClose();
      },
    },
    {
      id: 'cmd-intro',
      name: 'Replay 3D Intro Sequence',
      subtitle: 'Re-trigger 3D fly-in sculpture & cinematic title',
      category: 'COMMAND',
      icon: RotateCcw,
      action: () => {
        sound.playClick();
        if (onReplayIntro) onReplayIntro();
        onClose();
      },
    },
    {
      id: 'cmd-settings',
      name: 'Open Workspace Preferences',
      subtitle: 'Adjust appearance, motion and audio',
      category: 'COMMAND',
      icon: Sliders,
      action: () => {
        sound.playClick();
        if (onOpenSettings) onOpenSettings();
        onClose();
      },
    },
  ];

  const filtered = ITEMS.filter(
    (item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.subtitle?.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />
      <div className="relative w-full max-w-xl bg-[#131316] border border-[#26262B] shadow-2xl font-mono text-xs overflow-hidden z-10">
        {/* Search Input */}
        <div className="flex items-center px-4 py-3 border-b border-[#26262B] gap-2.5 bg-[#17171A]">
          <Search size={14} className="text-[#8C8C93]" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, project, or section name... (ESC to exit)"
            className="flex-1 bg-transparent text-[#EDEDED] placeholder-[#5C5C64] focus:outline-none text-xs"
          />
          <span className="hidden sm:inline-block px-1.5 py-0.5 bg-[#121214] border border-[#26262B] text-[10px] text-[#5C5C64]">
            Ctrl + K
          </span>
          <button
            onClick={onClose}
            className="text-[#5C5C64] hover:text-[#EDEDED] p-1 ml-1"
          >
            <X size={14} />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-88 overflow-y-auto py-2 divide-y divide-[#1A1A1E]">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-[#5C5C64]">
              No matching commands or projects found.
            </div>
          ) : (
            filtered.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  className="w-full px-4 py-2.5 flex items-center justify-between text-left hover:bg-[#1A1A1E] text-[#8C8C93] hover:text-[#EDEDED] transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-[#121214] border border-[#26262B] group-hover:border-[#3E3E44] text-[#8C8C93] group-hover:text-[#22C55E] transition-colors">
                      <Icon size={13} />
                    </div>
                    <div>
                      <div className="text-xs text-[#EDEDED] font-medium">
                        {item.name}
                      </div>
                      {item.subtitle && (
                        <div className="text-[10px] text-[#5C5C64]">
                          {item.subtitle}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-[#5C5C64]">
                    <span>{item.category}</span>
                    <ArrowRight size={11} className="group-hover:translate-x-0.5 group-hover:text-[#22C55E] transition-all" />
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
