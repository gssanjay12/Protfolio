import React from 'react';

export const OrcaMarineVisual: React.FC = () => {
  return (
    <div className="relative w-full h-44 bg-[#121214] rounded overflow-hidden border border-[#26262B] flex items-center justify-center p-2 font-mono select-none">
      {/* Subtle coordinate grid lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="marineGrid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#8C8C93" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#marineGrid)" />
      </svg>

      {/* Technical Schematic Contours & Vectors */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 160">
        {/* Coastal shoreline vector */}
        <path
          d="M 20 0 Q 60 50 40 100 T 80 160"
          fill="none"
          stroke="#5C5C64"
          strokeWidth="1"
          strokeDasharray="4 2"
        />

        {/* Ocean Depth Bathymetry Contours */}
        <path
          d="M 60 10 Q 120 70 90 150"
          fill="none"
          stroke="#3E3E44"
          strokeWidth="0.8"
          strokeDasharray="2 3"
        />

        {/* Potential Fishing Zone Cluster (Subtle Green) */}
        <circle cx="170" cy="55" r="14" fill="none" stroke="#22C55E" strokeWidth="1" />
        <circle cx="170" cy="55" r="2.5" fill="#22C55E" />
        <text x="188" y="58" fill="#EDEDED" fontSize="8" fontFamily="monospace">
          RECOMMENDED_ZONE [PFZ]
        </text>

        {/* Dynamic Safe Navigation Corridor */}
        <path
          d="M 50 130 Q 110 110 170 55"
          fill="none"
          stroke="#8C8C93"
          strokeWidth="1.5"
          strokeDasharray="4 2"
        />

        {/* Vessel Marker */}
        <polygon points="50,126 54,134 46,134" fill="#EDEDED" />
        <text x="36" y="146" fill="#8C8C93" fontSize="7" fontFamily="monospace">
          SAFE_ROUTE_VECTOR
        </text>

        {/* Hazard Advisory Area */}
        <circle cx="230" cy="110" r="12" fill="none" stroke="#5C5C64" strokeWidth="1" strokeDasharray="2 2" />
        <text x="185" y="130" fill="#8C8C93" fontSize="7" fontFamily="monospace">
          HAZARD_AWARENESS
        </text>
      </svg>

      {/* Telemetry tags */}
      <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-[#17171A] border border-[#26262B] text-[9px] text-[#8C8C93]">
        OCEANIC &amp; SATELLITE FEEDS
      </div>

      <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-[#17171A] border border-[#26262B] text-[9px] text-[#EDEDED] flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
        <span>INTELLIGENCE_ACTIVE</span>
      </div>
    </div>
  );
};

export const ClassSyncVisual: React.FC = () => {
  return (
    <div className="relative w-full h-44 bg-[#121214] rounded overflow-hidden border border-[#26262B] p-3 font-mono flex flex-col justify-between select-none">
      <div className="flex items-center justify-between text-[10px]">
        <span className="text-[#EDEDED]">
          ACADEMIC_WORKFLOW_ENGINE
        </span>
        <span className="px-1.5 py-0.5 bg-[#17171A] text-[#22C55E] border border-[#26262B] text-[9px]">
          COORDINATION_OK
        </span>
      </div>

      <div className="grid grid-cols-4 gap-1.5 my-2">
        {[
          { room: 'SECTION_A', task: 'WORKFLOW_1', status: 'SYNCED' },
          { room: 'LAB_01', task: 'STUDENT_SYNC', status: 'OK' },
          { room: 'CLASS_B', task: 'FACULTY_MAP', status: 'SYNCED' },
          { room: 'LECTURE_C', task: 'RESOURCE_ALLOC', status: 'OK' },
          { room: 'SEMINAR', task: 'COORDINATION', status: 'ACTIVE' },
          { room: 'COMP_LAB', task: 'TIMETABLE_GEN', status: 'OK' },
          { room: 'STUDY_HALL', task: 'ATTENDANCE_MOD', status: 'SYNCED' },
          { room: 'ACADEMIC_04', task: 'SYSTEM_ROUTER', status: 'OK' },
        ].map((slot, i) => (
          <div key={i} className="p-1.5 bg-[#17171A] border border-[#26262B] text-[9px]">
            <div className="text-[#EDEDED] font-semibold truncate">{slot.room}</div>
            <div className="text-[#5C5C64] truncate">{slot.task}</div>
            <div className="mt-0.5 text-[8px] text-[#8C8C93]">{slot.status}</div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center text-[9px] text-[#5C5C64] border-t border-[#26262B] pt-1.5">
        <span>MODULE: CONSTRAINT_SOLVER</span>
        <span className="text-[#EDEDED]">AUTOMATED WORKFLOW</span>
      </div>
    </div>
  );
};

export const OrthopedicVisual: React.FC = () => {
  return (
    <div className="relative w-full h-44 bg-[#121214] rounded overflow-hidden border border-[#26262B] p-3 font-mono flex flex-col justify-between select-none">
      <div className="flex items-center justify-between text-[10px]">
        <span className="text-[#EDEDED]">
          MEDICAL_VISION // RADIOLOGICAL_ANALYSIS
        </span>
        <span className="px-1.5 py-0.5 bg-[#17171A] text-[#22C55E] border border-[#26262B] text-[9px]">
          INFERENCE_READY
        </span>
      </div>

      {/* SVG Stylized Bone & Joint Contour Schematic */}
      <div className="relative w-full h-24 flex items-center justify-center">
        <svg viewBox="0 0 240 90" className="w-full h-full">
          {/* Subtle Scan Grid */}
          <line x1="20" y1="20" x2="220" y2="20" stroke="#1E1E24" strokeWidth="0.5" />
          <line x1="20" y1="45" x2="220" y2="45" stroke="#1E1E24" strokeWidth="0.5" />
          <line x1="20" y1="70" x2="220" y2="70" stroke="#1E1E24" strokeWidth="0.5" />

          {/* Bone structure vector outline */}
          <path
            d="M 60 15 Q 75 45 65 75 Q 85 80 120 78 Q 125 50 115 18 Z"
            fill="none"
            stroke="#8C8C93"
            strokeWidth="1.2"
          />

          {/* Articulation Joint Contour */}
          <path
            d="M 125 22 Q 155 45 145 72 Q 170 75 190 70 Q 185 45 175 20 Z"
            fill="none"
            stroke="#5C5C64"
            strokeWidth="1"
            strokeDasharray="3 2"
          />

          {/* Region of Interest Bounding Box (Subtle Green) */}
          <rect
            x="95"
            y="26"
            width="55"
            height="40"
            fill="none"
            stroke="#22C55E"
            strokeWidth="1"
            strokeDasharray="2 2"
          />
          <circle cx="122" cy="46" r="2" fill="#22C55E" />
          <text x="100" y="36" fill="#22C55E" fontSize="7">
            ROI: JOINT_ALIGNMENT
          </text>
          <text x="100" y="60" fill="#EDEDED" fontSize="6">
            STRUCTURAL_AXIS
          </text>

          {/* Reference Alignment Axis */}
          <line x1="90" y1="46" x2="155" y2="46" stroke="#3E3E44" strokeWidth="0.8" strokeDasharray="1 2" />
        </svg>
      </div>

      <div className="flex justify-between items-center text-[9px] text-[#5C5C64] border-t border-[#26262B] pt-1.5">
        <span>INPUT: MEDICAL_IMAGERY</span>
        <span className="text-[#EDEDED]">COMPUTER_VISION_PIPELINE</span>
      </div>
    </div>
  );
};
