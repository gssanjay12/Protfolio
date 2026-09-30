import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download, Mail, Sparkles } from 'lucide-react';
import { CreativeHeroCanvas } from '../three/CreativeHeroCanvas';
import { sound } from '../../utils/audio';

interface CreativeHeroProps {
  onExploreWork: () => void;
  onContact: () => void;
}

export const CreativeHero: React.FC<CreativeHeroProps> = ({
  onExploreWork,
  onContact,
}) => {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between pt-28 sm:pt-36 pb-12 px-6 sm:px-10 lg:px-16 overflow-hidden">
      {/* Background 3D Generative Canvas with Atmospheric Vignette */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <CreativeHeroCanvas />
        {/* Cinematic Vignette Gradients for Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-transparent to-[#070709]/80 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070709] via-[#070709]/70 to-transparent pointer-events-none lg:w-3/5" />
      </div>

      {/* Top Editorial Metadata Ticker */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-[#A1A1AA] border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <span className="px-2 py-0.5 rounded-full bg-white/10 text-white font-semibold text-[10px]">
            PORTFOLIO 2026
          </span>
          <span className="text-[#71717A]">•</span>
          <span>SANJAY G S</span>
          <span className="text-[#71717A]">•</span>
          <span className="text-[#CCFF00]">AVAILABLE FOR ROLES</span>
        </div>

        <div className="hidden sm:flex items-center gap-4 text-[#71717A]">
          <span>LOCATION: INDIA</span>
          <span>SPECIALIZATION: B.TECH AI &amp; DS</span>
        </div>
      </div>

      {/* Main Hero Visual Statement */}
      <div className="relative z-10 w-full max-w-7xl mx-auto my-auto py-12 lg:py-20">
        <div className="max-w-4xl">
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#F4F4F6] mb-6 backdrop-blur-sm"
          >
            <Sparkles size={12} className="text-[#FF4D30]" />
            <span>CREATIVE AI ENGINEERING &amp; DATA SYSTEMS</span>
          </motion.div>

          {/* MASSIVE HEADLINE (Adobe MAX Inspired Oversized Scale) */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display font-extrabold text-5xl sm:text-7xl md:text-8xl xl:text-9xl tracking-tightest leading-[0.9] text-[#F4F4F6] uppercase select-none"
          >
            <span className="block">AI &amp; DATA</span>
            <span className="block text-gradient-coral">SCIENCE</span>
            <span className="block text-stroke text-stroke-hover transition-colors duration-500">
              ENGINEER.
            </span>
          </motion.h1>

          {/* Editorial Sub-Statement */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline"
          >
            <p className="md:col-span-8 text-lg sm:text-2xl font-sans font-light text-[#D4D4D8] leading-relaxed">
              Building intelligent systems, products and experiences where deep AI meets real-world problems.
            </p>

            <div className="md:col-span-4 font-mono text-xs text-[#71717A] space-y-1">
              <div>// FOCUS DOMAINS</div>
              <div className="text-[#A1A1AA]">Machine Learning • Agentic AI</div>
              <div className="text-[#A1A1AA]">Computer Vision • Deep Neural Nets</div>
            </div>
          </motion.div>

          {/* Action Button Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 sm:mt-12 flex flex-wrap items-center gap-4"
          >
            <button
              onClick={() => {
                sound.playClick();
                onExploreWork();
              }}
              data-cursor="pointer"
              className="flex items-center gap-3 px-7 py-4 rounded-full bg-[#F4F4F6] hover:bg-white text-black font-display font-bold text-sm tracking-wider uppercase transition-all transform hover:scale-[1.02] shadow-[0_0_24px_rgba(255,255,255,0.2)] group"
            >
              <span>EXPLORE SELECTED WORK</span>
              <ArrowDown size={16} className="text-black group-hover:translate-y-1 transition-transform" />
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onContact();
              }}
              data-cursor="pointer"
              className="flex items-center gap-2 px-6 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 text-[#F4F4F6] font-mono text-xs tracking-wider transition-all backdrop-blur-sm"
            >
              <Mail size={14} className="text-[#CCFF00]" />
              <span>LET&apos;S TALK</span>
            </button>

            <a
              href="/Sanjay_GS_Resume.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              data-cursor="pointer"
              className="flex items-center gap-2 px-5 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-[#A1A1AA] hover:text-[#F4F4F6] font-mono text-xs tracking-wider transition-all"
              title="Download Sanjay G S Resume"
            >
              <Download size={13} />
              <span>CV / RESUME</span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Bottom Editorial Telemetry Banner */}
      <div className="relative z-10 w-full max-w-7xl mx-auto pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-[#71717A]">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00]" />
            <span className="text-[#A1A1AA]">CORE ENGINE:</span>
            <span className="text-[#F4F4F6]">PYTORCH + AGENTIC</span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <span className="text-[#A1A1AA]">SPECIALTY:</span>
            <span className="text-[#F4F4F6]">MARINELAB / CONSTRAINT AI</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[10px] tracking-widest uppercase">SCROLL TO DISCOVER</span>
          <div className="w-8 h-[1px] bg-white/20" />
          <span className="text-[#CCFF00]">01 // 05</span>
        </div>
      </div>
    </section>
  );
};
