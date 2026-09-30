import React, { useState } from 'react';
import {
  ExternalLink,
  ArrowRight,
  Waves,
  GraduationCap,
  Activity,
} from 'lucide-react';
import { GithubIcon } from '../icons/BrandIcons';
import { projectsData } from '../../data/projects';
import type { Project } from '../../data/projects';
import { ProjectDetailModal } from '../projects/ProjectDetailModal';
import {
  OrcaMarineVisual,
  ClassSyncVisual,
  OrthopedicVisual,
} from '../projects/ProjectVisuals';
import { personalData } from '../../data/personal';
import { sound } from '../../utils/audio';

export const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleOpenProject = (project: Project) => {
    sound.playClick();
    setSelectedProject(project);
  };

  const getProjectIcon = (id: string) => {
    switch (id) {
      case 'orca':
        return Waves;
      case 'classsync':
        return GraduationCap;
      case 'orthopedic-ai':
      default:
        return Activity;
    }
  };

  const renderVisual = (type: Project['systemVisualizationType']) => {
    switch (type) {
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
    <section id="projects" className="py-16 sm:py-20 border-t border-[#26262B]">
      {/* Top Technical Section Header */}
      <div className="mb-8">
        <div className="text-xs font-mono text-[#8C8C93] mb-1">
          // SYS.PROJECT_STREAM
        </div>
        <h2 className="text-2xl sm:text-3xl font-sans font-bold text-[#EDEDED] tracking-tight">
          FEATURED PROJECTS
        </h2>
      </div>

      {/* Grid of EXACTLY 3 Featured Projects: ORCA, CLASSSYNC, ORTHOPEDIC AI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {projectsData.map((project) => {
          const ProjectIcon = getProjectIcon(project.id);
          return (
            <div
              key={project.id}
              data-cursor="project"
              className="p-5 bg-[#17171A] border border-[#26262B] hover:border-[#3E3E44] transition-all flex flex-col justify-between rounded-xs group"
            >
              <div>
                {/* Header Code & Category */}
                <div className="flex items-center justify-between pb-2.5 border-b border-[#26262B] text-[11px] font-mono text-[#8C8C93]">
                  <div className="flex items-center gap-1.5">
                    <ProjectIcon size={14} className="text-[#8C8C93] group-hover:text-[#22C55E] transition-colors" />
                    <span className="font-semibold text-[#EDEDED]">{project.code}</span>
                  </div>
                  <span className="text-[10px] text-[#5C5C64]">{project.category}</span>
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-lg font-sans font-bold text-[#EDEDED] mt-3 group-hover:text-white transition-colors">
                  {project.title}
                </h3>
                <div className="text-xs font-mono text-[#8C8C93] mt-0.5">
                  {project.tagline}
                </div>

                {/* Interactive Schematic Visual */}
                <div
                  className="my-3 cursor-pointer"
                  onClick={() => handleOpenProject(project)}
                >
                  {renderVisual(project.systemVisualizationType)}
                </div>

                {/* Short, professional description */}
                <p className="text-xs text-[#8C8C93] font-sans leading-relaxed">
                  {project.shortDescription}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 bg-[#121214] border border-[#26262B] text-[10px] font-mono text-[#8C8C93] rounded-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer: Status & Action Button */}
              <div className="pt-4 mt-4 border-t border-[#26262B] flex items-center justify-between text-xs font-mono">
                <span className="text-[10px] text-[#5C5C64]">{project.status}</span>
                <button
                  onClick={() => handleOpenProject(project)}
                  className="flex items-center gap-1.5 px-3 py-1.5 border border-[#26262B] hover:border-[#3E3E44] text-[#EDEDED] text-xs hover:bg-[#1E1E23] transition-colors"
                >
                  <span>VIEW PROJECT</span>
                  <ExternalLink size={12} className="text-[#8C8C93] group-hover:text-[#22C55E] transition-colors" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* More Projects Section (Clean GitHub Link Block) */}
      <div className="mt-8 p-6 bg-[#131316] border border-[#26262B] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-mono text-[#22C55E] uppercase tracking-wider mb-1">
            MORE PROJECTS
          </div>
          <p className="text-sm font-sans text-[#EDEDED] font-medium">
            I've worked on additional machine learning and data science projects.
          </p>
          <p className="text-xs text-[#8C8C93] mt-0.5 font-sans">
            Want to see more of my work? Check out my GitHub.
          </p>
        </div>

        <a
          href={personalData.contact.github}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => sound.playClick()}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#17171A] hover:bg-[#202024] border border-[#26262B] hover:border-[#3E3E44] text-[#EDEDED] hover:text-white font-mono text-xs font-semibold tracking-wide transition-colors shrink-0 group"
        >
          <GithubIcon size={14} className="text-[#8C8C93] group-hover:text-white transition-colors" />
          <span>VIEW GITHUB</span>
          <ArrowRight size={13} className="text-[#8C8C93] group-hover:translate-x-1 group-hover:text-[#22C55E] transition-all" />
        </a>
      </div>

      {/* Modal Inspector */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};
