import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// ==========================================
// 01 — ORCA: Marine Intelligence & Oceanic Radar
// ==========================================
export const CreativeOrcaVisual: React.FC = () => {
  const [pulseAngle, setPulseAngle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseAngle((prev) => (prev + 2) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[360px] sm:h-[440px] bg-[#090C10] rounded-2xl overflow-hidden border border-cyan-500/20 group select-none flex items-center justify-center p-6">
      {/* Deep Ocean Bathymetric Ambient Glow */}
      <div className="absolute inset-0 bg-radial from-cyan-950/40 via-transparent to-transparent pointer-events-none" />

      {/* Coordinate Grid Background */}
      <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="orcaGrid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#38BDF8" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#orcaGrid)" />
      </svg>

      {/* Radar Circular Grid */}
      <div className="relative w-[280px] sm:w-[340px] h-[280px] sm:h-[340px] rounded-full border border-cyan-500/20 flex items-center justify-center">
        <div className="w-3/4 h-3/4 rounded-full border border-cyan-500/15" />
        <div className="w-1/2 h-1/2 rounded-full border border-cyan-500/25" />
        <div className="w-1/4 h-1/4 rounded-full border border-cyan-500/35" />

        {/* Crosshair Axes */}
        <div className="absolute inset-x-0 top-1/2 h-[1px] bg-cyan-500/20" />
        <div className="absolute inset-y-0 left-1/2 w-[1px] bg-cyan-500/20" />

        {/* Rotating Radar Sweep Beam */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: `conic-gradient(from ${pulseAngle}deg, rgba(6, 182, 212, 0.4) 0deg, transparent 60deg, transparent 360deg)`,
          }}
        />

        {/* Dynamic Bathymetric Shoreline & Contours */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 340 340">
          {/* Coastal Vector */}
          <path
            d="M 40 20 Q 90 90 70 180 T 130 320"
            fill="none"
            stroke="#0284C7"
            strokeWidth="1.5"
            strokeDasharray="6 3"
          />
          {/* Depth Contours */}
          <path
            d="M 90 30 Q 150 120 120 220 T 180 320"
            fill="none"
            stroke="#0369A1"
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity="0.6"
          />

          {/* Potential Fishing Zone (PFZ) Target Point */}
          <circle cx="210" cy="110" r="16" fill="rgba(34, 197, 94, 0.15)" stroke="#22C55E" strokeWidth="1.5" />
          <circle cx="210" cy="110" r="4" fill="#22C55E" className="animate-ping" />
          <circle cx="210" cy="110" r="3" fill="#22C55E" />
          <text x="232" y="114" fill="#E4E4E7" fontSize="10" fontFamily="monospace" fontWeight="bold">
            ZONE: PFZ-ALPHA
          </text>
          <text x="232" y="126" fill="#22C55E" fontSize="8" fontFamily="monospace">
            CHL-A CONC: 1.42 mg/m³
          </text>

          {/* Navigational Vessel Corridor */}
          <path
            d="M 80 260 Q 140 220 210 110"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="2"
            strokeDasharray="5 3"
          />
          {/* Vessel Icon */}
          <polygon points="80,252 86,268 74,268" fill="#F4F4F6" />
          <text x="60" y="284" fill="#94A3B8" fontSize="8" fontFamily="monospace">
            VESSEL LAT 11.24°N
          </text>

          {/* Hazard Alert Perimeter */}
          <circle cx="270" cy="230" r="18" fill="rgba(239, 68, 68, 0.1)" stroke="#EF4444" strokeWidth="1" strokeDasharray="3 3" />
          <text x="220" y="260" fill="#EF4444" fontSize="8" fontFamily="monospace">
            ! HIGH SWELL ADVISORY
          </text>
        </svg>
      </div>

      {/* Overlay Telemetry HUD */}
      <div className="absolute top-4 left-4 flex flex-col gap-1 font-mono text-[10px] text-cyan-400">
        <span className="px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-800/60 font-semibold tracking-wider">
          SATELLITE OCEANIC FEED: INCOIS / MODIS
        </span>
        <span className="text-cyan-200/70 text-[9px]">SST: 28.6°C | BATHYMETRY: 42m</span>
      </div>

      <div className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-1 rounded bg-[#0B131C] border border-cyan-500/30 text-[10px] font-mono text-[#F4F4F6]">
        <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
        <span>AGENTIC ROUTE: OPTIMIZED</span>
      </div>
    </div>
  );
};

// ==========================================
// 02 — CLASSSYNC: Interconnected Academic Matrix
// ==========================================
export const CreativeClassSyncVisual: React.FC = () => {
  const [activeSlot, setActiveSlot] = useState(2);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlot((prev) => (prev + 1) % 6);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const nodes = [
    { title: 'ROOM_COORD', desc: 'Space Allocation', tag: 'SYNCED', color: '#8B5CF6' },
    { title: 'FACULTY_MAP', desc: 'Availability Tree', tag: 'RESOLVED', color: '#EC4899' },
    { title: 'HEURISTIC_AI', desc: 'Constraint Engine', tag: 'OPTIMAL', color: '#CCFF00' },
    { title: 'TIMETABLE_GEN', desc: 'Collision Zero', tag: 'VALIDATED', color: '#38BDF8' },
    { title: 'STUDENT_ROSTER', desc: 'Elective Distribution', tag: 'ACTIVE', color: '#F59E0B' },
    { title: 'AUDITORIUM_01', desc: 'Large Lecture Hall', tag: 'LOCKED', color: '#10B981' },
  ];

  return (
    <div className="relative w-full h-[360px] sm:h-[440px] bg-[#0E0C14] rounded-2xl overflow-hidden border border-purple-500/20 group select-none p-6 flex flex-col justify-between">
      {/* Ambient Violet Wave Glow */}
      <div className="absolute inset-0 bg-radial from-purple-900/25 via-transparent to-transparent pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10 flex items-center justify-between pb-3 border-b border-purple-500/20 font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#CCFF00]" />
          <span className="text-[#F4F4F6] font-bold tracking-wider">CONSTRAINT_SOLVER_v2.4</span>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/40 text-[#CCFF00] text-[10px] font-semibold">
          1ST PLACE INNOVATION
        </span>
      </div>

      {/* Matrix Node Graph */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 gap-3 my-auto">
        {nodes.map((node, i) => {
          const isActive = activeSlot === i;
          return (
            <motion.div
              key={node.title}
              animate={{
                scale: isActive ? 1.03 : 1,
                borderColor: isActive ? node.color : 'rgba(255,255,255,0.08)',
              }}
              transition={{ duration: 0.3 }}
              className="p-3.5 rounded-xl bg-[#14121D]/90 border font-mono transition-all"
            >
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-bold text-[#F4F4F6]">{node.title}</span>
                <span
                  className="px-1.5 py-0.2 rounded text-[8px] font-semibold"
                  style={{ backgroundColor: `${node.color}20`, color: node.color }}
                >
                  {node.tag}
                </span>
              </div>
              <div className="text-[10px] text-[#A1A1AA] mt-1 truncate">{node.desc}</div>
              <div className="mt-3 flex items-center gap-1.5">
                <div
                  className="w-1.5 h-1.5 rounded-full animate-ping"
                  style={{ backgroundColor: node.color }}
                />
                <div className="text-[8px] text-[#71717A]">
                  EFFICIENCY: 99.4%
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Live Pulse Engine */}
      <div className="relative z-10 flex items-center justify-between pt-3 border-t border-purple-500/20 font-mono text-[10px] text-[#A1A1AA]">
        <span>ACTIVE NODES: 6 / CONFLICTS: 0</span>
        <span className="text-[#CCFF00] font-semibold">AUTOMATED SYNCHRONIZATION</span>
      </div>
    </div>
  );
};

// ==========================================
// 03 — ORTHOPEDIC AI: Radiological Vision Matrix
// ==========================================
export const CreativeOrthopedicVisual: React.FC = () => {
  return (
    <div className="relative w-full h-[360px] sm:h-[440px] bg-[#0A0B0E] rounded-2xl overflow-hidden border border-amber-500/20 group select-none p-6 flex flex-col justify-between">
      {/* Medical Scan Grid Overlay */}
      <div className="absolute inset-0 bg-radial from-amber-950/20 via-transparent to-transparent pointer-events-none" />

      {/* Top Radiological Header */}
      <div className="relative z-10 flex items-center justify-between pb-3 border-b border-white/10 font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          <span className="text-[#F4F4F6] font-bold tracking-wider">PYTORCH_VISION_PIPELINE</span>
        </div>
        <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[#A1A1AA] text-[10px]">
          BATCH [1, 3, 512, 512]
        </span>
      </div>

      {/* Central Anatomical Joint Contour with Laser Scan Line */}
      <div className="relative w-full h-56 flex items-center justify-center overflow-hidden">
        {/* Animated Vertical Scan Line */}
        <motion.div
          animate={{ y: [-100, 100, -100] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
          className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_12px_#F59E0B] z-20 pointer-events-none"
        />

        <svg viewBox="0 0 300 160" className="w-full h-full max-w-sm">
          {/* Subtle Grid Lines */}
          <line x1="20" y1="40" x2="280" y2="40" stroke="#1E2028" strokeWidth="0.5" />
          <line x1="20" y1="80" x2="280" y2="80" stroke="#1E2028" strokeWidth="0.5" />
          <line x1="20" y1="120" x2="280" y2="120" stroke="#1E2028" strokeWidth="0.5" />

          {/* Femoral Bone Outline */}
          <path
            d="M 90 20 Q 110 60 95 100 Q 120 110 165 105 Q 170 65 160 25 Z"
            fill="none"
            stroke="#94A3B8"
            strokeWidth="1.8"
          />

          {/* Tibial Joint Interface */}
          <path
            d="M 95 115 Q 125 140 165 115 Q 185 145 155 155 Q 115 155 85 135 Z"
            fill="none"
            stroke="#64748B"
            strokeWidth="1.4"
            strokeDasharray="4 3"
          />

          {/* Region Of Interest (ROI) Bounding Box */}
          <rect
            x="110"
            y="70"
            width="80"
            height="55"
            fill="rgba(245, 158, 11, 0.08)"
            stroke="#F59E0B"
            strokeWidth="1.5"
            strokeDasharray="4 2"
          />
          <circle cx="150" cy="98" r="3" fill="#F59E0B" />
          <text x="116" y="84" fill="#F59E0B" fontSize="8" fontFamily="monospace" fontWeight="bold">
            ROI: JOINT_ALIGNMENT
          </text>
          <text x="116" y="96" fill="#F4F4F6" fontSize="7" fontFamily="monospace">
            CONFIDENCE: 98.4%
          </text>
          <text x="116" y="118" fill="#A1A1AA" fontSize="6" fontFamily="monospace">
            DEEP FEATURE MAP [OK]
          </text>
        </svg>
      </div>

      {/* Bottom Inference Diagnostic Strip */}
      <div className="relative z-10 flex items-center justify-between pt-3 border-t border-white/10 font-mono text-[10px] text-[#A1A1AA]">
        <span>TASK: STRUCTURAL CLASSIFICATION</span>
        <span className="text-amber-400 font-semibold">INFERENCE SPEED: 24ms</span>
      </div>
    </div>
  );
};
