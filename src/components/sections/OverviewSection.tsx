import React from 'react';
import { Download, ChevronRight, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../icons/BrandIcons';
import { personalData } from '../../data/personal';
import { NeuralDataCore } from '../three/NeuralDataCore';
import { sound } from '../../utils/audio';

interface OverviewSectionProps {
  onNavigateToProjects: () => void;
  onNavigateToContact: () => void;
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({
  onNavigateToProjects,
  onNavigateToContact,
}) => {
  return (
    <section id="overview" className="min-h-[calc(100vh-140px)] flex flex-col justify-center py-10 sm:py-16">
      {/* Top Technical Label (Clean Neutral) */}
      <div className="mb-4">
        <div className="text-xs font-mono text-[#8C8C93]">
          // SYS.WORKSPACE_ROOT
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        {/* Left Column: Huge Typography & Identity Panel */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-1">
            <h1 className="text-5xl sm:text-7xl font-sans font-extrabold tracking-tight text-[#EDEDED] leading-[0.9]">
              SANJAY<br />G S
            </h1>

            <div className="text-sm sm:text-base font-mono text-[#8C8C93] tracking-wider pt-3">
              AI &amp; DATA SCIENCE ENGINEER
            </div>
          </div>

          <p className="text-sm sm:text-base text-[#8C8C93] max-w-xl leading-relaxed font-sans">
            &ldquo;{personalData.tagline}&rdquo;
          </p>

          {/* Structured Information Panel (Clean Dark Neutral with Single Green Status) */}
          <div className="p-4 bg-[#17171A] border border-[#26262B] space-y-2.5 font-mono text-xs max-w-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between py-1 border-b border-[#26262B] gap-1">
              <span className="text-[#5C5C64] uppercase text-[10px] tracking-wider">CLASS</span>
              <span className="text-[#EDEDED] font-medium">AI &amp; DATA SCIENCE ENGINEER</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between py-1 border-b border-[#26262B] gap-1">
              <span className="text-[#5C5C64] uppercase text-[10px] tracking-wider">FOCUS</span>
              <span className="text-[#EDEDED] font-medium">ARTIFICIAL INTELLIGENCE / MACHINE LEARNING</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between py-1 border-b border-[#26262B] gap-1">
              <span className="text-[#5C5C64] uppercase text-[10px] tracking-wider">STATUS</span>
              <span className="text-[#22C55E] font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                BUILDING
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between py-1 gap-1">
              <span className="text-[#5C5C64] uppercase text-[10px] tracking-wider">EDUCATION</span>
              <span className="text-[#EDEDED] font-medium">B.TECH AI &amp; DATA SCIENCE</span>
            </div>
          </div>

          {/* Action Links & Downloads */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              onClick={() => {
                sound.playClick();
                onNavigateToProjects();
              }}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#EDEDED] hover:bg-white text-black font-semibold text-xs font-mono tracking-wider transition-colors"
            >
              <span>VIEW WORK</span>
              <ChevronRight size={14} />
            </button>

            <a
              href="#contact"
              onClick={() => {
                sound.playClick();
                onNavigateToContact();
              }}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#17171A] hover:bg-[#1E1E23] border border-[#26262B] hover:border-[#3E3E44] text-[#EDEDED] font-mono text-xs tracking-wider transition-colors"
            >
              <span>CONTACT ME</span>
            </a>

            <a
              href="/Sanjay_GS_Resume.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#17171A] border border-[#26262B] hover:border-[#3E3E44] text-[#8C8C93] hover:text-[#EDEDED] text-xs font-mono transition-colors"
              title="Download Sanjay G S Resume"
            >
              <Download size={13} />
              <span>RESUME</span>
            </a>
          </div>

          {/* Direct Icon Links: EMAIL, LINKEDIN, GITHUB (Neutral Lucide Icons) */}
          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono text-[#8C8C93]">
            <a
              href={`mailto:${personalData.contact.email}`}
              onClick={() => sound.playClick()}
              className="flex items-center gap-1.5 hover:text-[#EDEDED] transition-colors"
            >
              <Mail size={14} />
              <span>EMAIL</span>
            </a>

            <a
              href={personalData.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="flex items-center gap-1.5 hover:text-[#EDEDED] transition-colors"
            >
              <LinkedinIcon size={14} />
              <span>LINKEDIN</span>
            </a>

            <a
              href={personalData.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="flex items-center gap-1.5 hover:text-[#EDEDED] transition-colors"
            >
              <GithubIcon size={14} />
              <span>GITHUB</span>
            </a>
          </div>
        </div>

        {/* Right Column: Interactive Subtle Visual Panel (Clean Neutral) */}
        <div className="lg:col-span-5">
          <div className="bg-[#17171A] border border-[#26262B] p-5 font-mono text-xs space-y-4">
            <div className="flex items-center justify-between pb-2.5 border-b border-[#26262B] text-[11px] text-[#8C8C93]">
              <span>GEOMETRIC_CORE</span>
              <span className="text-[#5C5C64]">NEURAL_ACTIVE</span>
            </div>

            {/* Subtle Interactive 3D Canvas */}
            <div className="h-64 sm:h-72 w-full bg-[#121214] border border-[#26262B] overflow-hidden relative">
              <NeuralDataCore />
              <div className="absolute bottom-2 left-3 text-[10px] text-[#5C5C64]">
                Interactive 3D Tensor Topology
              </div>
            </div>

            {/* Micro Telemetry Grid (Neutral) */}
            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <div className="p-2 bg-[#121214] border border-[#26262B]">
                <div className="text-[#5C5C64]">PRIMARY ALGORITHM</div>
                <div className="text-[#EDEDED] font-semibold mt-0.5">HEURISTIC SEARCH</div>
              </div>
              <div className="p-2 bg-[#121214] border border-[#26262B]">
                <div className="text-[#5C5C64]">PIPELINE</div>
                <div className="text-[#EDEDED] font-semibold mt-0.5">AGENTIC + GEOSPATIAL</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
