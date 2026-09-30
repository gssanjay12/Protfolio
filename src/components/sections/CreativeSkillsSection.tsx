import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { skillsData } from '../../data/skills';
import { sound } from '../../utils/audio';

export const CreativeSkillsSection: React.FC = () => {
  const [activeSkill, setActiveSkill] = useState<{ name: string; context: string } | null>(null);

  return (
    <section id="skills" className="relative w-full py-28 sm:py-36 px-6 sm:px-10 lg:px-16 overflow-hidden">
      {/* Background Ambient Divider Line */}
      <div className="w-full max-w-7xl mx-auto border-t border-white/10 mb-20 sm:mb-28" />

      <div className="w-full max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-20 sm:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="font-mono text-xs text-[#71717A] tracking-widest uppercase mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#CCFF00]" />
              <span>03 // CAPABILITIES &amp; STACK</span>
            </div>
            <h2 className="font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-tightest uppercase text-[#F4F4F6] leading-[0.9]">
              THE<br />
              <span className="text-stroke text-stroke-hover">TOOLKIT.</span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-base sm:text-lg text-[#A1A1AA] font-sans font-light leading-relaxed">
              Typography-driven technical competency matrix. Hover any capability to inspect architectural application context.
            </p>
            {activeSkill ? (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 rounded-lg bg-white/5 border border-[#CCFF00]/40 font-mono text-xs text-[#CCFF00]"
              >
                <span className="font-bold">{activeSkill.name}:</span> {activeSkill.context}
              </motion.div>
            ) : (
              <div className="mt-4 p-3 rounded-lg bg-white/5 border border-white/5 font-mono text-xs text-[#71717A]">
                Hover a skill to view application scope.
              </div>
            )}
          </div>
        </div>

        {/* 4 Typography-Based Editorial Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {skillsData.map((category, catIdx) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: catIdx * 0.1 }}
              className="p-8 sm:p-10 rounded-3xl bg-[#0F0F14]/70 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs font-mono text-[#71717A]">
                  <span>0{catIdx + 1} // {category.systemTag}</span>
                  <span className="text-[#A1A1AA]">{category.items.length} TECHNOLOGIES</span>
                </div>

                <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#F4F4F6] mt-4 uppercase">
                  {category.category}
                </h3>
                <p className="text-xs sm:text-sm text-[#71717A] font-sans mt-1">
                  {category.description}
                </p>

                {/* Typography Cloud */}
                <div className="flex flex-wrap gap-2.5 mt-8">
                  {category.items.map((item) => (
                    <button
                      key={item.name}
                      onMouseEnter={() => {
                        sound.playClick();
                        setActiveSkill(item);
                      }}
                      onMouseLeave={() => setActiveSkill(null)}
                      data-cursor="pointer"
                      className="px-4 py-2.5 rounded-full bg-white/5 hover:bg-white text-xs sm:text-sm font-mono text-[#D4D4D8] hover:text-black border border-white/10 hover:border-white transition-all transform hover:scale-105 active:scale-95"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-[#71717A]">
                <span>LEVEL: PRODUCTION / RESEARCH</span>
                <span className="text-[#CCFF00]">READY</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
