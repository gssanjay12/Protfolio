import React, { useState } from 'react';
import type { AchievementItem } from '../../data/achievements';
import { ArrowRight, Award } from 'lucide-react';
import { sound } from '../../utils/audio';

interface AchievementCardProps {
  item: AchievementItem;
  isSessionRevealed: boolean;
  onSelect: (item: AchievementItem) => void;
}

export const AchievementCard: React.FC<AchievementCardProps> = ({
  item,
  isSessionRevealed,
  onSelect,
}) => {
  const [imgError, setImgError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isColor = isSessionRevealed || isHovered;

  const handleClick = () => {
    sound.playClick();
    onSelect(item);
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group cursor-pointer bg-[#17171A] border border-[#26262B] hover:border-[#3E3E44] p-4 flex flex-col justify-between transition-colors font-mono select-none rounded-xs"
    >
      <div>
        {/* Top Code Header: ACHV-001 (Clean Neutral) */}
        <div className="flex items-center justify-between text-[11px] pb-2.5 border-b border-[#26262B]">
          <span className="font-bold text-[#EDEDED]">{item.indexTag}</span>
          <span className="text-[10px] text-[#5C5C64]">{item.date}</span>
        </div>

        {/* Real Image Container with Smooth 600ms Grayscale-to-Color Transition */}
        <div className="my-3 w-full h-36 bg-[#121214] border border-[#26262B] overflow-hidden flex items-center justify-center relative rounded-xs">
          {!imgError ? (
            <img
              src={item.image}
              alt={item.title}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover transition-all ease-out"
              style={{
                filter: isColor ? 'grayscale(0%)' : 'grayscale(100%)',
                transform: isColor ? 'scale(1.03)' : 'scale(1)',
                transitionDuration: '600ms',
              }}
            />
          ) : (
            <div className="w-full h-full p-3 flex flex-col items-center justify-center text-center font-mono text-[#8C8C93] bg-[#121214]">
              <Award size={18} className="text-[#8C8C93] mb-1" />
              <span className="text-[9px] text-[#5C5C64] uppercase mb-1">
                CERTIFICATE ASSET
              </span>
              <span className="text-[#EDEDED] font-semibold text-[11px] line-clamp-1">
                {item.subtitle}
              </span>
              <span className="text-[9px] text-[#5C5C64] truncate max-w-full mt-1">
                {item.image}
              </span>
            </div>
          )}
        </div>

        {/* Status & Title Information Block (Clean Neutral) */}
        <div className="pt-2 border-t border-[#26262B] space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[9px] px-2 py-0.5 bg-[#121214] border border-[#26262B] text-[#8C8C93] rounded-xs font-semibold">
              STATUS: {item.category}
            </span>
          </div>

          <h4 className="text-xs sm:text-sm font-sans font-bold text-[#EDEDED] leading-snug line-clamp-2 pt-1">
            {item.title}
          </h4>

          <div className="text-[11px] text-[#8C8C93] truncate">
            {item.subtitle}
          </div>
        </div>
      </div>

      {/* Action Footer: VIEW RECORD → */}
      <div className="pt-3 mt-3 border-t border-[#26262B] flex items-center justify-between text-xs text-[#8C8C93] group-hover:text-[#EDEDED] transition-colors">
        <span className="text-[10px] text-[#5C5C64]">{item.organization}</span>
        <div className="flex items-center gap-1 text-[11px] font-medium text-[#EDEDED]">
          <span>VIEW RECORD</span>
          <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform text-[#8C8C93] group-hover:text-[#EDEDED]" />
        </div>
      </div>
    </div>
  );
};
