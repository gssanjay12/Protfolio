import React from 'react';
import { GsLogo } from '../icons/GsLogo';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 sm:py-20 border-t border-[#26262B]">
      {/* Top Technical Hierarchy (Clean Neutral) */}
      <div className="mb-8">
        <div className="text-xs font-mono text-[#8C8C93] mb-1">
          // SYS.MODULE_INIT
        </div>
        <h2 className="text-2xl sm:text-3xl font-sans font-bold text-[#EDEDED] tracking-tight">
          ABOUT ME
        </h2>
        <p className="mt-2 text-sm sm:text-base text-[#8C8C93] font-sans max-w-3xl leading-relaxed">
          I&apos;m a B.Tech Artificial Intelligence &amp; Data Science student focused on Machine Learning, Artificial Intelligence, Data Science and intelligent applications.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Large Profile Panel */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 bg-[#17171A] border border-[#26262B] hover:border-[#3E3E44] transition-colors">
            {/* Panel Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#26262B] text-[11px] font-mono text-[#8C8C93]">
              <span>PROFILE SPECIFICATION</span>
              <span className="text-[#5C5C64]">SGS-2026</span>
            </div>

            {/* GS / Profile Mark */}
            <div className="pt-4 flex items-center gap-4">
              <div className="w-16 h-16 bg-[#121214] border border-[#26262B] flex items-center justify-center rounded-xs">
                <GsLogo size={36} active={true} />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-sans font-bold text-[#EDEDED] tracking-tight">
                  SANJAY G S
                </h3>
                <div className="text-xs font-mono text-[#8C8C93] mt-0.5">
                  B.Tech AI &amp; Data Science
                </div>
              </div>
            </div>

            {/* Focus Domains (Clean Neutral Badges) */}
            <div className="pt-5 space-y-2 font-mono text-xs">
              <div className="text-[10px] text-[#5C5C64] uppercase tracking-wider font-semibold">
                FOCUS DOMAINS
              </div>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2.5 py-1 bg-[#121214] text-[#EDEDED] border border-[#26262B] rounded-xs font-medium">
                  AI
                </span>
                <span className="px-2.5 py-1 bg-[#121214] text-[#EDEDED] border border-[#26262B] rounded-xs font-medium">
                  Machine Learning
                </span>
                <span className="px-2.5 py-1 bg-[#121214] text-[#EDEDED] border border-[#26262B] rounded-xs font-medium">
                  Data Science
                </span>
              </div>
            </div>

            {/* Metadata Footer */}
            <div className="pt-4 mt-4 border-t border-[#26262B] space-y-1.5 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-[#5C5C64]">DEGREE:</span>
                <span className="text-[#EDEDED]">B.Tech AI &amp; Data Science</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5C5C64]">STATUS:</span>
                <span className="text-[#EDEDED] font-medium">UNDERGRADUATE SCHOLAR</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5C5C64]">LOCATION:</span>
                <span className="text-[#EDEDED]">INDIA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Narrative Panel + Sub-Panels */}
        <div className="lg:col-span-7 space-y-5">
          {/* Narrative Text Panel */}
          <div className="p-6 bg-[#17171A] border border-[#26262B] space-y-3 font-sans">
            <div className="text-[11px] font-mono text-[#5C5C64] uppercase tracking-wider pb-2 border-b border-[#26262B]">
              ENGINEERING PHILOSOPHY
            </div>
            <p className="text-sm text-[#EDEDED] leading-relaxed">
              My core engineering focus centers on developing dependable, practical intelligent systems. I enjoy working at the intersection of machine learning, data science, and applied artificial intelligence—transforming complex datasets into useful software and intuitive interfaces.
            </p>
            <p className="text-xs sm:text-sm text-[#8C8C93] leading-relaxed">
              From building marine decision-support tools and computer vision models to academic workflow optimization, my approach emphasizes clean code, analytical rigor, and thoughtful software design.
            </p>
          </div>

          {/* Side Sub-Panels: CURRENT FOCUS & INTERESTS (Clean Neutral) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
            {/* CURRENT FOCUS Panel */}
            <div className="p-5 bg-[#17171A] border border-[#26262B] hover:border-[#3E3E44] transition-colors">
              <div className="text-[11px] text-[#EDEDED] font-semibold mb-3 pb-2 border-b border-[#26262B] flex items-center justify-between">
                <span>CURRENT FOCUS</span>
                <span className="text-[9px] text-[#8C8C93]">ACTIVE</span>
              </div>
              <ul className="space-y-2 text-[#8C8C93]">
                {[
                  'Machine Learning',
                  'Agentic AI',
                  'Geospatial AI',
                  'AI Applications',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#8C8C93] rounded-xs" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* INTERESTS Panel */}
            <div className="p-5 bg-[#17171A] border border-[#26262B] hover:border-[#3E3E44] transition-colors">
              <div className="text-[11px] text-[#EDEDED] font-semibold mb-3 pb-2 border-b border-[#26262B] flex items-center justify-between">
                <span>INTERESTS</span>
                <span className="text-[9px] text-[#5C5C64]">DOMAINS</span>
              </div>
              <ul className="space-y-2 text-[#8C8C93]">
                {[
                  'Artificial Intelligence',
                  'Data Visualization',
                  'Software Development',
                  'Creative Technology',
                ].map((interest) => (
                  <li key={interest} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#5C5C64] rounded-xs" />
                    <span>{interest}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
