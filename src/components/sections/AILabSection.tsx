import React, { useState } from 'react';
import { aiLabExperiments } from '../../data/ailab';
import { Play } from 'lucide-react';
import { sound } from '../../utils/audio';

export const AILabSection: React.FC = () => {
  const [nirVal, setNirVal] = useState(0.72);
  const [redVal, setRedVal] = useState(0.18);
  const ndvi = (nirVal - redVal) / (nirVal + redVal);

  const [activeStep, setActiveStep] = useState(0);
  const [isSimulatingAgent, setIsSimulatingAgent] = useState(false);

  const runAgentSimulation = () => {
    sound.playClick();
    setIsSimulatingAgent(true);
    setActiveStep(1);
    setTimeout(() => {
      setActiveStep(2);
      setTimeout(() => {
        setActiveStep(3);
        setIsSimulatingAgent(false);
      }, 500);
    }, 500);
  };

  return (
    <section id="ailab" className="py-16 sm:py-20 border-t border-[#2A2A2E]">
      {/* Two-tier section header */}
      <div className="mb-8">
        <div className="text-xs font-mono text-[#8C8C93] mb-1">
          // AI.LAB
        </div>
        <h2 className="text-2xl sm:text-3xl font-sans font-bold text-[#EDEDED] tracking-tight">
          AI LAB
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
        {/* Module 1: Autonomous Multi-Agent Task Graph */}
        <div className="p-6 bg-[#17171A] border border-[#2A2A2E] flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#2A2A2E] text-xs font-mono text-[#8C8C93]">
              <span>LAB_MOD_01 // AGENTIC AI</span>
              <span>STATE_GRAPH</span>
            </div>

            <h3 className="text-lg font-sans font-bold text-[#EDEDED] mt-3">
              Autonomous Multi-Agent Task Graph
            </h3>
            <p className="text-xs text-[#8C8C93] font-sans mt-1">
              Hierarchical orchestration coordinating satellite ingestion, bathymetric filtering, and weather route synthesis.
            </p>

            <div className="my-4 p-4 bg-[#121214] border border-[#2A2A2E] space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#8C8C93] text-[11px]">DISPATCHER:</span>
                <button
                  onClick={runAgentSimulation}
                  disabled={isSimulatingAgent}
                  className="flex items-center gap-1.5 px-3 py-1 bg-[#EDEDED] hover:bg-white text-black text-[11px] font-semibold disabled:opacity-50 transition-colors"
                >
                  <Play size={10} />
                  <span>{isSimulatingAgent ? 'RUNNING...' : 'TRIGGER AGENTS'}</span>
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center pt-2">
                <div
                  className={`p-2 border transition-colors ${
                    activeStep >= 1 ? 'border-[#22C55E] text-[#EDEDED]' : 'border-[#2A2A2E] text-[#5C5C64]'
                  }`}
                >
                  <div className="text-[10px]">STEP 01</div>
                  <div className="text-xs font-semibold mt-0.5 truncate">Weather Ingest</div>
                </div>

                <div
                  className={`p-2 border transition-colors ${
                    activeStep >= 2 ? 'border-[#22C55E] text-[#EDEDED]' : 'border-[#2A2A2E] text-[#5C5C64]'
                  }`}
                >
                  <div className="text-[10px]">STEP 02</div>
                  <div className="text-xs font-semibold mt-0.5 truncate">PFZ Cluster</div>
                </div>

                <div
                  className={`p-2 border transition-colors ${
                    activeStep >= 3 ? 'border-[#22C55E] text-[#EDEDED]' : 'border-[#2A2A2E] text-[#5C5C64]'
                  }`}
                >
                  <div className="text-[10px]">STEP 03</div>
                  <div className="text-xs font-semibold mt-0.5 truncate">Route Plan</div>
                </div>
              </div>

              <div className="text-[10px] text-[#5C5C64] pt-1">
                {activeStep === 3
                  ? 'Consensus reached in 42ms with 98.4% confidence.'
                  : 'Ready to dispatch.'}
              </div>
            </div>
          </div>

          <div className="text-[11px] font-mono text-[#5C5C64] border-t border-[#2A2A2E] pt-2 flex justify-between">
            <span>FALLBACK: OFFLINE CACHE</span>
            <span>LATENCY: 42ms</span>
          </div>
        </div>

        {/* Module 2: Sentinel-2 NDVI Spectrum Analyzer */}
        <div className="p-6 bg-[#17171A] border border-[#2A2A2E] flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#2A2A2E] text-xs font-mono text-[#8C8C93]">
              <span>LAB_MOD_02 // GEOSPATIAL AI</span>
              <span>SENTINEL-2</span>
            </div>

            <h3 className="text-lg font-sans font-bold text-[#EDEDED] mt-3">
              NDVI Mathematical Band Simulator
            </h3>
            <p className="text-xs text-[#8C8C93] font-sans mt-1">
              Live calculation of normalized difference vegetation index: (NIR - Red) / (NIR + Red)
            </p>

            <div className="my-4 p-4 bg-[#121214] border border-[#2A2A2E] space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#8C8C93]">NIR (Band 8):</span>
                <span className="text-[#EDEDED] font-semibold">{nirVal.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.02"
                value={nirVal}
                onChange={(e) => setNirVal(parseFloat(e.target.value))}
                className="w-full cursor-pointer accent-[#8C8C93]"
              />

              <div className="flex items-center justify-between pt-1">
                <span className="text-[#8C8C93]">RED (Band 4):</span>
                <span className="text-[#EDEDED] font-semibold">{redVal.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.8"
                step="0.02"
                value={redVal}
                onChange={(e) => setRedVal(parseFloat(e.target.value))}
                className="w-full cursor-pointer accent-[#8C8C93]"
              />

              <div className="p-2.5 bg-[#17171A] border border-[#2A2A2E] mt-2 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-[#5C5C64]">COMPUTED NDVI:</div>
                  <div className="text-base font-semibold text-[#EDEDED]">
                    {ndvi >= 0 ? `+${ndvi.toFixed(3)}` : ndvi.toFixed(3)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-[#5C5C64]">CROP STATUS:</div>
                  <div className="text-xs text-[#EDEDED]">
                    {ndvi > 0.6
                      ? 'DENSE CANOPY'
                      : ndvi > 0.3
                      ? 'MODERATE BIOMASS'
                      : ndvi > 0.1
                      ? 'WATER STRESS'
                      : 'BARE SOIL'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-[11px] font-mono text-[#5C5C64] border-t border-[#2A2A2E] pt-2 flex justify-between">
            <span>RESOLUTION: 10m/px</span>
            <span>SPECTRAL_RATIO</span>
          </div>
        </div>
      </div>

      {/* Grid of Other Experiments */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {aiLabExperiments.slice(2).map((exp) => (
          <div
            key={exp.id}
            className="p-4 bg-[#17171A] border border-[#2A2A2E] flex flex-col justify-between font-mono"
          >
            <div>
              <div className="flex items-center justify-between text-[10px] text-[#5C5C64] pb-2 border-b border-[#2A2A2E]">
                <span>{exp.code}</span>
                <span>{exp.category}</span>
              </div>

              <h4 className="text-xs font-sans font-bold text-[#EDEDED] mt-2 mb-1">
                {exp.title}
              </h4>
              <p className="text-[11px] text-[#8C8C93] font-sans leading-relaxed">
                {exp.description}
              </p>

              <div className="mt-3 space-y-1 text-[10px]">
                {exp.parameters.slice(0, 2).map((p, i) => (
                  <div key={i} className="flex justify-between text-[#5C5C64]">
                    <span>{p.name}:</span>
                    <span className="text-[#EDEDED]">{p.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-2 border-t border-[#2A2A2E] text-[10px] text-[#8C8C93]">
              STATUS: {exp.status}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
