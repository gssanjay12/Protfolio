import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export const CreativeAboutSection: React.FC = () => {
  const pillars = [
    { num: '01', title: 'AI & DATA SCIENCE', desc: 'Predictive modeling, statistical inference, and large-scale exploratory data analysis.' },
    { num: '02', title: 'MACHINE LEARNING', desc: 'Supervised & unsupervised pipelines, algorithmic classification, and regression engines.' },
    { num: '03', title: 'DEEP LEARNING', desc: 'Tensor network architectures, PyTorch pipelines, and computer vision classification.' },
    { num: '04', title: 'SOFTWARE DEVELOPMENT', desc: 'FastAPI backends, performant React interfaces, and clean modular codebases.' },
    { num: '05', title: 'CREATIVE TECHNOLOGY', desc: 'Immersive WebGL data visualization, 3D interactive graphics, and generative interfaces.' },
  ];

  return (
    <section id="about" className="relative w-full py-28 sm:py-36 px-6 sm:px-10 lg:px-16 overflow-hidden">
      {/* Background Ambient Divider Line */}
      <div className="w-full max-w-7xl mx-auto border-t border-white/10 mb-20 sm:mb-28" />

      <div className="w-full max-w-7xl mx-auto">
        {/* Editorial Section Tag */}
        <div className="font-mono text-xs text-[#71717A] tracking-widest uppercase mb-6 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
          <span>02 // PROFILE &amp; ETHOS</span>
        </div>

        {/* Large Statement (As requested in prompt) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl"
        >
          <h2 className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tightest uppercase text-[#F4F4F6] leading-[1.0]">
            &ldquo;I BUILD INTELLIGENT SYSTEMS WHERE <span className="text-gradient-violet">AI MEETS</span> REAL-WORLD PROBLEMS.&rdquo;
          </h2>
        </motion.div>

        {/* Editorial Multi-column Narrative with Asymmetric Spacing */}
        <div className="mt-16 sm:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Deep Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-6 space-y-6 text-base sm:text-lg font-sans text-[#A1A1AA] leading-relaxed"
          >
            <p className="text-xl sm:text-2xl text-[#F4F4F6] font-light leading-snug">
              I am an undergraduate scholar pursuing a B.Tech in Artificial Intelligence &amp; Data Science, driven by transforming theoretical ML into resilient, mission-critical software.
            </p>

            <p>
              Whether orchestrating marine intelligence for ocean navigation in <strong className="text-[#F4F4F6] font-medium">ORCA</strong>, solving complex multi-variable constraints for academic scheduling in <strong className="text-[#F4F4F6] font-medium">ClassSync</strong>, or detecting orthopedic conditions with deep vision pipelines, my work balances mathematical rigor with elegant system architecture.
            </p>

            <p>
              I believe software in the AI era should not feel like static dashboards. It should be intuitive, responsive, and visually compelling—turning complex data into actionable clarity.
            </p>

            {/* Quick Dossier Metadata Table */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-2 gap-4 font-mono text-xs">
              <div>
                <span className="text-[#71717A] block text-[10px] uppercase">STATUS</span>
                <span className="text-[#CCFF00] font-semibold flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00]" />
                  ACTIVE SCHOLAR
                </span>
              </div>
              <div>
                <span className="text-[#71717A] block text-[10px] uppercase">DEGREE</span>
                <span className="text-[#F4F4F6] font-medium mt-0.5 block">B.Tech AI &amp; Data Science</span>
              </div>
              <div>
                <span className="text-[#71717A] block text-[10px] uppercase">TIMELINE</span>
                <span className="text-[#F4F4F6] font-medium mt-0.5 block">2025 — 2029</span>
              </div>
              <div>
                <span className="text-[#71717A] block text-[10px] uppercase">LOCATION</span>
                <span className="text-[#F4F4F6] font-medium mt-0.5 block">India</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 5 Pillars of Practice */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6 space-y-4"
          >
            <div className="font-mono text-xs text-[#71717A] uppercase tracking-wider mb-2">
              // CORE DOMAINS OF PRACTICE
            </div>

            {pillars.map((pillar) => (
              <div
                key={pillar.num}
                className="p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#71717A] group-hover:text-[#8B5CF6] transition-colors">
                    {pillar.num}
                  </span>
                  <Sparkles size={14} className="text-[#71717A] group-hover:text-[#CCFF00] transition-colors" />
                </div>
                <h4 className="font-display font-bold text-lg sm:text-xl text-[#F4F4F6] mt-2 group-hover:text-white transition-colors">
                  {pillar.title}
                </h4>
                <p className="mt-1 text-xs sm:text-sm text-[#A1A1AA] font-sans">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
