import React from 'react';
import { motion } from 'framer-motion';
import { experienceData } from '../../data/experience';
import { MapPin, CheckCircle2 } from 'lucide-react';

export const CreativeExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="relative w-full py-28 sm:py-36 px-6 sm:px-10 lg:px-16 overflow-hidden">
      {/* Background Ambient Divider Line */}
      <div className="w-full max-w-7xl mx-auto border-t border-white/10 mb-20 sm:mb-28" />

      <div className="w-full max-w-7xl mx-auto">
        {/* Editorial Section Header */}
        <div className="mb-20 sm:mb-28 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="font-mono text-xs text-[#71717A] tracking-widest uppercase mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF4D30]" />
              <span>04 // TRAJECTORY &amp; CAREER</span>
            </div>
            <h2 className="font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-tightest uppercase text-[#F4F4F6] leading-[0.9]">
              TIMELINE &amp;<br />
              <span className="text-gradient-coral">EXPERIENCE.</span>
            </h2>
          </div>

          <p className="max-w-md text-base sm:text-lg text-[#A1A1AA] font-sans font-light leading-relaxed">
            Real-world data science engineering internships and academic excellence in artificial intelligence.
          </p>
        </div>

        {/* Visual Editorial Timeline */}
        <div className="space-y-20 sm:space-y-28">
          {experienceData.map((item, idx) => {
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start border-t border-white/10 pt-10"
              >
                {/* Left Column: Responsive Year Typography & Location */}
                <div className="lg:col-span-4 min-w-0 space-y-3">
                  <div className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#F4F4F6] tracking-tight leading-tight break-words">
                    {item.year}
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#A1A1AA]">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white font-semibold">
                      {item.badge}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin size={12} />
                      {item.location}
                    </span>
                  </div>
                </div>

                {/* Right Column: Editorial Role, Org & Deliverables */}
                <div className="lg:col-span-8 min-w-0 space-y-5">
                  <div>
                    <div className="text-xs font-mono text-[#71717A] uppercase tracking-wider">
                      ORGANIZATION: <span className="text-[#F4F4F6] font-semibold">{item.organization}</span>
                    </div>
                    <h3 className="font-display font-bold text-2xl sm:text-4xl text-[#F4F4F6] mt-1">
                      {item.role}
                    </h3>
                  </div>

                  <p className="text-base sm:text-lg text-[#A1A1AA] font-sans leading-relaxed">
                    {item.summary}
                  </p>

                  {/* Highlights Bullet Array */}
                  <div className="space-y-2.5 pt-2">
                    <div className="text-xs font-mono text-[#71717A] uppercase tracking-wider">
                      KEY DELIVERABLES &amp; INITIATIVES:
                    </div>
                    <ul className="space-y-2">
                      {item.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-[#D4D4D8] font-sans">
                          <CheckCircle2 size={16} className="text-[#CCFF00] shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 pt-3">
                    {item.techTags.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#A1A1AA]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
