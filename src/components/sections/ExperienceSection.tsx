import React from 'react';
import { experienceData } from '../../data/experience';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-16 sm:py-20 border-t border-[#26262B]">
      {/* Top Technical Hierarchy (Clean Neutral) */}
      <div className="mb-8">
        <div className="text-xs font-mono text-[#8C8C93] mb-1">
          // SYS.MODULE_INIT
        </div>
        <h2 className="text-2xl sm:text-3xl font-sans font-bold text-[#EDEDED] tracking-tight">
          WORK EXPERIENCE
        </h2>
      </div>

      {/* Vertical Timeline with single green indicator on current */}
      <div className="relative pl-6 sm:pl-8 border-l border-[#26262B] space-y-8">
        {experienceData.map((item, idx) => (
          <div key={item.id} className="relative">
            {/* Timeline Node */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#0E0E10] border border-[#26262B] flex items-center justify-center">
              {idx === 0 && <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />}
            </div>

            {/* Experience Card */}
            <div className="p-6 bg-[#17171A] border border-[#26262B] hover:border-[#3E3E44] transition-colors space-y-4 rounded-xs">
              {/* Header: Date & Organization */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#26262B] text-xs font-mono text-[#8C8C93]">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-[#EDEDED] tracking-wider">{item.period}</span>
                  <span className="text-[#5C5C64]">•</span>
                  <span className="text-[#EDEDED] font-medium">{item.organization}</span>
                </div>
                <span className="text-[11px] text-[#5C5C64]">{item.location}</span>
              </div>

              {/* Role */}
              <div>
                <div className="text-[10px] font-mono text-[#5C5C64] uppercase tracking-wider font-semibold">
                  ROLE SPECIFICATION
                </div>
                <h3 className="text-xl font-sans font-bold text-[#EDEDED] mt-0.5">
                  {item.role.toUpperCase()}
                </h3>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#8C8C93] leading-relaxed font-sans">
                {item.summary}
              </p>

              {/* Key Deliverables */}
              <div className="space-y-1.5 pt-1">
                <div className="text-[10px] font-mono text-[#5C5C64] uppercase tracking-wider font-semibold">
                  KEY DELIVERABLES
                </div>
                <ul className="space-y-1 text-xs text-[#EDEDED] font-sans">
                  {item.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#8C8C93] font-mono">•</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Tags (Clean Neutral) */}
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#26262B]">
                {item.techTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-[#121214] border border-[#26262B] text-[10px] font-mono text-[#8C8C93] rounded-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
