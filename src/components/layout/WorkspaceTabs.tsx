import React from 'react';
import {
  UserRound,
  FolderKanban,
  BriefcaseBusiness,
  SlidersHorizontal,
  Award,
  Mail,
  Terminal,
  X,
  Code2,
  GitBranch,
} from 'lucide-react';
import { sound } from '../../utils/audio';

interface WorkspaceTabsProps {
  activeSection: string;
  onSelectSection: (sectionId: string) => void;
}

interface TabDef {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const TABS: Record<string, TabDef> = {
  overview: { id: 'overview', label: 'Overview', icon: Terminal },
  about: { id: 'about', label: 'About Me', icon: UserRound },
  projects: { id: 'projects', label: 'My Work', icon: FolderKanban },
  experience: { id: 'experience', label: 'Experience', icon: BriefcaseBusiness },
  skills: { id: 'skills', label: 'Skills', icon: SlidersHorizontal },
  achievements: { id: 'achievements', label: 'Achievements', icon: Award },
  contact: { id: 'contact', label: 'Contact Me', icon: Mail },
};

export const WorkspaceTabs: React.FC<WorkspaceTabsProps> = ({
  activeSection,
  onSelectSection,
}) => {
  const currentTab = TABS[activeSection] || TABS.overview;
  const Icon = currentTab.icon;

  const handleCloseTab = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playClick();
    onSelectSection('overview');
  };

  return (
    <div className="sticky top-9 z-30 h-9 w-full bg-[#121215] border-b border-[#26262B] flex items-center justify-between px-3 sm:px-4 font-mono text-xs select-none">
      {/* Left: Application Active Tab */}
      <div className="flex items-center h-full">
        {/* Active Open Tab with subtle green top border and neutral icon */}
        <div className="h-full flex items-center gap-2 px-3 sm:px-4 bg-[#0E0E10] border-r border-[#26262B] border-t-2 border-t-[#22C55E] text-[#EDEDED] text-[11px] font-medium transition-colors">
          <Icon size={13} className="text-[#22C55E]" />
          <span>{currentTab.label}</span>
          <button
            onClick={handleCloseTab}
            className="ml-2 text-[#5C5C64] hover:text-[#EDEDED] hover:bg-[#1E1E23] rounded-xs p-0.5 transition-colors"
            title="Close tab (Return to Overview)"
          >
            <X size={10} />
          </button>
        </div>

        {/* Clean Neutral Path Breadcrumb */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 text-[11px] text-[#5C5C64]">
          <span className="text-[#8C8C93]">workspace</span>
          <span>/</span>
          <span className="text-[#EDEDED]">
            {currentTab.label.toLowerCase().replace(/\s+/g, '-')}
          </span>
        </div>
      </div>

      {/* Right: Workspace Technical Metadata (No duplicate section navigation) */}
      <div className="hidden md:flex items-center gap-3 text-[10px] text-[#5C5C64]">
        <div className="flex items-center gap-1 text-[#8C8C93]">
          <GitBranch size={11} className="text-[#22C55E]" />
          <span>main</span>
        </div>
        <span>•</span>
        <div className="flex items-center gap-1">
          <Code2 size={11} />
          <span>TSX / React 19</span>
        </div>
        <span>•</span>
        <span>UTF-8</span>
      </div>
    </div>
  );
};
