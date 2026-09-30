import React, { useEffect } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { GithubIcon } from '../icons/BrandIcons';
import type { Project } from '../../data/projects';
import {
  OrcaMarineVisual,
  ClassSyncVisual,
  OrthopedicVisual,
} from './ProjectVisuals';
import { sound } from '../../utils/audio';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        sound.playClick();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const renderVisual = () => {
    switch (project.systemVisualizationType) {
      case 'marine-radar':
        return <OrcaMarineVisual />;
      case 'schedule-matrix':
        return <ClassSyncVisual />;
      case 'orthopedic-vision':
      default:
        return <OrthopedicVisual />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Dark backdrop */}
      <div
        className="fixed inset-0 bg-black/80 transition-opacity"
        onClick={() => {
          sound.playClick();
          onClose();
        }}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-3xl bg-[#17171A] border border-[#26262B] z-10 my-auto overflow-hidden">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#26262B] bg-[#121214]">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[#8C8C93]">
              {project.code}
            </span>
            <span className="hidden sm:inline text-xs font-mono text-[#5C5C64]">|</span>
            <span className="hidden sm:inline text-xs font-mono text-[#EDEDED]">
              {project.category}
            </span>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1.5 text-[#8C8C93] hover:text-[#EDEDED] transition-colors"
            aria-label="Close project modal"
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto space-y-5">
          <div className="space-y-1">
            {project.award && (
              <div className="text-xs font-mono text-[#22C55E] mb-1">
                AWARD: <span className="text-[#EDEDED]">{project.award}</span>
              </div>
            )}
            <h2 className="text-2xl sm:text-3xl font-sans font-bold text-[#EDEDED] tracking-tight">
              {project.title}
            </h2>
            <div className="text-xs font-mono text-[#8C8C93]">
              {project.tagline}
            </div>
          </div>

          {/* Interactive Visual Preview */}
          <div className="border border-[#26262B] overflow-hidden">
            {renderVisual()}
          </div>

          {/* Project Summary */}
          <div className="p-4 bg-[#121214] border border-[#26262B] space-y-2">
            <div className="text-xs font-mono text-[#8C8C93] font-semibold uppercase">
              OVERVIEW
            </div>
            <p className="text-xs sm:text-sm text-[#EDEDED] leading-relaxed font-sans">
              {project.shortDescription}
            </p>
          </div>

          {/* Tech Stack Badges */}
          <div className="space-y-2">
            <div className="text-xs font-mono text-[#5C5C64] uppercase font-semibold">
              TECHNOLOGIES
            </div>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 bg-[#121214] border border-[#26262B] text-xs font-mono text-[#8C8C93]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#26262B] bg-[#121214]">
          <div className="text-[11px] font-mono text-[#5C5C64]">
            STATUS: <span className="text-[#EDEDED]">{project.status}</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="flex items-center gap-2 px-3.5 py-1.5 bg-[#EDEDED] hover:bg-white text-black font-semibold text-xs font-mono transition-colors"
            >
              <GithubIcon size={13} />
              <span>SOURCE CODE</span>
              <ArrowRight size={12} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
