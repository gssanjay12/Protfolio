import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight, Award, Eye } from 'lucide-react';
import { GithubIcon } from '../icons/BrandIcons';
import { projectsData } from '../../data/projects';
import type { Project } from '../../data/projects';
import { ProjectDetailModal } from '../projects/ProjectDetailModal';
import {
  CreativeOrcaVisual,
  CreativeClassSyncVisual,
  CreativeOrthopedicVisual,
} from '../projects/CreativeProjectVisuals';
import { personalData } from '../../data/personal';
import { sound } from '../../utils/audio';

export const CreativeProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleOpenProject = (project: Project) => {
    sound.playClick();
    setSelectedProject(project);
  };

  const getVisual = (id: string) => {
    switch (id) {
      case 'orca':
        return <CreativeOrcaVisual />;
      case 'classsync':
        return <CreativeClassSyncVisual />;
      case 'orthopedic-ai':
      default:
        return <CreativeOrthopedicVisual />;
    }
  };

  const getAccentColor = (id: string) => {
    switch (id) {
      case 'orca':
        return {
          badgeBg: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400',
          titleHover: 'group-hover:text-cyan-400',
          accentText: 'text-cyan-400',
        };
      case 'classsync':
        return {
          badgeBg: 'bg-purple-500/10 border-purple-500/30 text-purple-400',
          titleHover: 'group-hover:text-purple-400',
          accentText: 'text-[#CCFF00]',
        };
      case 'orthopedic-ai':
      default:
        return {
          badgeBg: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
          titleHover: 'group-hover:text-amber-400',
          accentText: 'text-amber-400',
        };
    }
  };

  return (
    <section id="projects" className="relative w-full py-28 sm:py-36 px-6 sm:px-10 lg:px-16 overflow-hidden">
      {/* Background Ambient Divider Line */}
      <div className="w-full max-w-7xl mx-auto border-t border-white/10 mb-20 sm:mb-28" />

      <div className="w-full max-w-7xl mx-auto">
        {/* Editorial Section Header */}
        <div className="mb-20 sm:mb-28 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="font-mono text-xs text-[#71717A] tracking-widest uppercase mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#CCFF00]" />
              <span>01 // SELECTED WORK CAMPAIGN</span>
            </div>
            <h2 className="font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-tightest uppercase text-[#F4F4F6] leading-[0.9]">
              PROJECTS<br />
              <span className="text-gradient-coral">THAT THINK.</span>
            </h2>
          </div>

          <p className="max-w-md text-base sm:text-lg text-[#A1A1AA] font-sans font-light leading-relaxed">
            Three dedicated intelligent systems exploring autonomous marine intelligence, academic constraint optimization, and deep medical computer vision.
          </p>
        </div>

        {/* 3 Major Creative Campaigns */}
        <div className="space-y-28 sm:space-y-40">
          {projectsData.map((project, idx) => {
            const visual = getVisual(project.id);
            const colors = getAccentColor(project.id);
            const isReversed = idx % 2 === 1;

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8 }}
                data-cursor="project"
                className="relative group"
              >
                {/* Asymmetric Campaign Grid */}
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center ${
                    isReversed ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Text Column (Takes 5 or 6 cols depending on placement) */}
                  <div className={`lg:col-span-5 space-y-6 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                    {/* Index & Category Tags */}
                    <div className="flex items-center gap-3">
                      <span className="font-display font-extrabold text-3xl sm:text-4xl text-[#71717A] group-hover:text-[#F4F4F6] transition-colors">
                        0{idx + 1}
                      </span>
                      <span className={`px-3 py-1 rounded-full border text-[11px] font-mono tracking-wider uppercase font-semibold ${colors.badgeBg}`}>
                        {project.category}
                      </span>
                      {project.award && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#CCFF00]/10 border border-[#CCFF00]/30 text-[#CCFF00] text-[10px] font-mono font-bold tracking-wider">
                          <Award size={12} />
                          {project.award}
                        </span>
                      )}
                    </div>

                    {/* Giant Project Title */}
                    <h3
                      className={`font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl text-[#F4F4F6] tracking-tight uppercase leading-none transition-colors ${colors.titleHover}`}
                    >
                      {project.title}
                    </h3>

                    {/* Tagline */}
                    <div className="font-mono text-sm sm:text-base text-[#D4D4D8] font-medium">
                      {project.tagline}
                    </div>

                    {/* Description */}
                    <p className="text-sm sm:text-base text-[#A1A1AA] font-sans leading-relaxed">
                      {project.shortDescription}
                    </p>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#D4D4D8]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-4 pt-4">
                      <button
                        onClick={() => handleOpenProject(project)}
                        data-cursor="pointer"
                        className="flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#F4F4F6] hover:bg-white text-black font-display font-bold text-xs tracking-wider uppercase transition-all shadow-[0_4px_16px_rgba(255,255,255,0.15)] group/btn"
                      >
                        <Eye size={14} className="text-black" />
                        <span>EXPLORE SYSTEM</span>
                        <ArrowRight size={13} className="text-black group-hover/btn:translate-x-1 transition-transform" />
                      </button>

                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => sound.playClick()}
                        data-cursor="pointer"
                        className="flex items-center gap-2 px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 text-[#F4F4F6] font-mono text-xs tracking-wider transition-all"
                      >
                        <GithubIcon size={14} className="text-[#A1A1AA]" />
                        <span>SOURCE CODE</span>
                        <ExternalLink size={12} className="text-[#71717A]" />
                      </a>
                    </div>
                  </div>

                  {/* Interactive Visual Canvas Column */}
                  <div
                    className={`lg:col-span-7 cursor-pointer ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}
                    onClick={() => handleOpenProject(project)}
                  >
                    <div className="transition-transform duration-500 transform group-hover:scale-[1.01]">
                      {visual}
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* ==========================================
            15. GITHUB TRANSITION SECTION
            "THERE'S MORE."
            ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-36 sm:mt-48 p-8 sm:p-14 rounded-3xl bg-gradient-to-br from-[#121217] via-[#0F0F14] to-[#0A0A0E] border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative overflow-hidden"
        >
          {/* Background Ambient Glow */}
          <div className="absolute right-0 top-0 w-96 h-96 bg-radial from-[#CCFF00]/10 via-transparent to-transparent pointer-events-none" />

          <div className="relative z-10 max-w-xl">
            <div className="font-mono text-xs text-[#CCFF00] tracking-widest uppercase mb-2">
              // REPOSITORY ARCHIVE
            </div>
            <h3 className="font-display font-extrabold text-4xl sm:text-6xl text-[#F4F4F6] tracking-tightest uppercase leading-none">
              THERE&apos;S<br />
              <span className="text-stroke text-stroke-hover">MORE.</span>
            </h3>
            <p className="mt-4 text-sm sm:text-base text-[#A1A1AA] font-sans leading-relaxed">
              Explore the rest of my machine learning experiments, algorithms, neural network models, and open-source contributions directly on GitHub.
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <a
              href={personalData.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              data-cursor="pointer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#CCFF00] hover:bg-[#b8e600] text-black font-display font-bold text-sm tracking-wider uppercase transition-all shadow-[0_0_24px_rgba(204,255,0,0.3)] hover:scale-105 group"
            >
              <GithubIcon size={17} className="text-black" />
              <span>EXPLORE ON GITHUB</span>
              <ArrowRight size={16} className="text-black group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};
