import React, { useState } from 'react';
import { achievementsData } from '../../data/achievements';
import type { AchievementItem } from '../../data/achievements';
import { AchievementCard } from '../achievements/AchievementCard';
import { X } from 'lucide-react';
import { sound } from '../../utils/audio';

export const AchievementsSection: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<AchievementItem | null>(null);
  const [sessionRevealed, setSessionRevealed] = useState<Set<string>>(new Set());

  const handleSelect = (item: AchievementItem) => {
    // Add to session revealed set so it permanently stays in color for this session
    setSessionRevealed((prev) => new Set([...prev, item.id]));
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    sound.playClick();
    setSelectedItem(null);
  };

  return (
    <section id="achievements" className="py-16 sm:py-20 border-t border-[#26262B]">
      {/* Top Technical Hierarchy (Clean Neutral) */}
      <div className="mb-8">
        <div className="text-xs font-mono text-[#8C8C93] mb-1">
          // SYS.ACHIEVEMENT_STREAM
        </div>
        <h2 className="text-2xl sm:text-3xl font-sans font-bold text-[#EDEDED] tracking-tight">
          ACHIEVEMENTS
        </h2>
      </div>

      {/* Horizontal Organized Achievement Cards on Desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {achievementsData.map((item) => (
          <AchievementCard
            key={item.id}
            item={item}
            isSessionRevealed={sessionRevealed.has(item.id)}
            onSelect={handleSelect}
          />
        ))}
      </div>

      {/* Enlarged Certificate Lightbox Modal (Clean Dark Neutral) */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-xs transition-opacity"
            onClick={handleCloseModal}
          />
          <div className="relative w-full max-w-2xl bg-[#17171A] border border-[#26262B] p-6 font-mono text-xs z-10 space-y-4 rounded-xs shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#26262B]">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#EDEDED]">{selectedItem.indexTag}</span>
                <span className="text-[#5C5C64]">•</span>
                <span className="text-[#8C8C93]">{selectedItem.organization}</span>
              </div>
              <button
                onClick={handleCloseModal}
                className="text-[#8C8C93] hover:text-[#EDEDED] p-1 transition-colors"
                aria-label="Close record"
              >
                <X size={16} />
              </button>
            </div>

            {/* Enlarged Full Color Image */}
            <div className="w-full h-64 sm:h-80 bg-[#121214] border border-[#26262B] overflow-hidden flex items-center justify-center relative rounded-xs">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
                className="w-full h-full object-contain"
                style={{ filter: 'grayscale(0%)' }}
              />
              <div className="absolute inset-0 -z-10 flex flex-col items-center justify-center text-center p-4">
                <span className="text-[10px] text-[#5C5C64] uppercase mb-1">
                  OFFICIAL CERTIFICATE ASSET
                </span>
                <span className="text-[#EDEDED] font-semibold text-sm">
                  {selectedItem.title}
                </span>
                <span className="text-xs text-[#8C8C93] mt-1">
                  {selectedItem.organization} — {selectedItem.date}
                </span>
              </div>
            </div>

            {/* Description & Metadata */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between text-xs">
                <h4 className="text-base font-sans font-bold text-[#EDEDED]">
                  {selectedItem.title}
                </h4>
                <span className="text-[10px] px-2 py-0.5 bg-[#121214] border border-[#26262B] text-[#EDEDED] rounded-xs font-semibold">
                  {selectedItem.category}
                </span>
              </div>

              <div className="text-xs text-[#8C8C93] font-sans leading-relaxed">
                {selectedItem.description}
              </div>

              <div className="pt-3 border-t border-[#26262B] flex items-center justify-between text-[11px] text-[#5C5C64]">
                <span className="text-[#22C55E] font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                  VALIDATION: VERIFIED RECORD
                </span>
                <span className="text-[#8C8C93]">YEAR: {selectedItem.date}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
