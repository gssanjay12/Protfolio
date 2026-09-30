import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { achievementsData } from '../../data/achievements';
import type { AchievementItem } from '../../data/achievements';
import { Award, ExternalLink, X, CheckCircle2, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { sound } from '../../utils/audio';

export const CreativeAchievementsSection: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<AchievementItem | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleOpen = (item: AchievementItem) => {
    sound.playClick();
    setSelectedItem(item);
    setActiveImageIndex(0);
  };

  const handleClose = () => {
    sound.playClick();
    setSelectedItem(null);
  };

  const handleNextImage = () => {
    if (!selectedItem?.images) return;
    sound.playClick();
    setActiveImageIndex((prev) => (prev + 1) % selectedItem.images!.length);
  };

  const handlePrevImage = () => {
    if (!selectedItem?.images) return;
    sound.playClick();
    setActiveImageIndex((prev) => (prev - 1 + selectedItem.images!.length) % selectedItem.images!.length);
  };

  return (
    <section id="achievements" className="relative w-full py-28 sm:py-36 px-6 sm:px-10 lg:px-16 overflow-hidden">
      {/* Background Ambient Divider Line */}
      <div className="w-full max-w-7xl mx-auto border-t border-white/10 mb-20 sm:mb-28" />

      <div className="w-full max-w-7xl mx-auto">
        {/* Editorial Section Header */}
        <div className="mb-20 sm:mb-28 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="font-mono text-xs text-[#71717A] tracking-widest uppercase mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#CCFF00]" />
              <span>05 // HONORS &amp; RECOGNITION</span>
            </div>
            <h2 className="font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-tightest uppercase text-[#F4F4F6] leading-[0.9]">
              PROVEN<br />
              <span className="text-stroke text-stroke-hover">EXCELLENCE.</span>
            </h2>
          </div>

          <p className="max-w-md text-base sm:text-lg text-[#A1A1AA] font-sans font-light leading-relaxed">
            Verified competitive hackathons, innovation awards, and demonstrated technical milestones with official photographic proof.
          </p>
        </div>

        {/* 3 Editorial Highlight Panels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {achievementsData.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.15 }}
              onClick={() => handleOpen(item)}
              data-cursor="pointer"
              className="p-7 sm:p-9 rounded-3xl bg-[#0F0F14]/80 border border-white/10 hover:border-white/25 transition-all flex flex-col justify-between group cursor-pointer"
            >
              <div>
                {/* Header Tag */}
                <div className="flex items-center justify-between pb-5 border-b border-white/10">
                  <span className="font-display font-extrabold text-3xl sm:text-4xl text-[#71717A] group-hover:text-[#CCFF00] transition-colors">
                    0{idx + 1}
                  </span>
                  <div className="flex items-center gap-2">
                    {item.images && item.images.length > 1 && (
                      <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#CCFF00]/15 border border-[#CCFF00]/30 text-[10px] font-mono font-semibold text-[#CCFF00]">
                        <ImageIcon size={11} />
                        <span>{item.images.length} PHOTOS</span>
                      </span>
                    )}
                    <span className="px-3 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono font-semibold text-[#F4F4F6]">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Image Preview Window (if item has images) */}
                {item.image && (
                  <div className="mt-5 w-full h-44 rounded-2xl overflow-hidden bg-black/40 border border-white/10 relative group-hover:border-white/25 transition-colors">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F14] via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-2.5 left-3 text-[10px] font-mono text-[#E4E4E7] font-semibold flex items-center gap-1.5">
                      <Award size={12} className="text-[#CCFF00]" />
                      <span>CLICK TO INSPECT RECORD</span>
                    </div>
                  </div>
                )}

                <div className="mt-6">
                  <div className="font-mono text-xs text-[#71717A]">
                    {item.organization} — {item.date}
                  </div>
                  <h3 className="font-display font-extrabold text-xl sm:text-2xl text-[#F4F4F6] mt-1.5 uppercase group-hover:text-white transition-colors leading-tight">
                    {item.title}
                  </h3>
                  <div className="font-mono text-xs text-[#CCFF00] mt-1">
                    {item.subtitle}
                  </div>
                </div>

                <p className="mt-4 text-xs sm:text-sm text-[#A1A1AA] font-sans leading-relaxed line-clamp-3">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs text-[#71717A] group-hover:text-[#F4F4F6] transition-colors">
                <span>VIEW OFFICIAL RECORD</span>
                <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal Inspector for Full Credential & Image Gallery */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
              onClick={handleClose}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-3xl bg-[#0F0F14] border border-white/15 p-6 sm:p-8 rounded-3xl shadow-2xl z-10 space-y-6 my-auto max-h-[92vh] overflow-y-auto"
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2 font-mono text-xs text-[#A1A1AA]">
                  <Award size={16} className="text-[#CCFF00]" />
                  <span className="font-bold text-[#F4F4F6]">{selectedItem.title}</span>
                  <span className="hidden sm:inline text-[#71717A]">•</span>
                  <span className="hidden sm:inline text-[#CCFF00] font-semibold">{selectedItem.subtitle}</span>
                </div>
                <button
                  onClick={handleClose}
                  className="p-1.5 rounded-full bg-white/5 hover:bg-white/15 text-white transition-colors"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Gallery Image Display with Prev/Next Controls */}
              {(() => {
                const currentImages = selectedItem.images && selectedItem.images.length > 0
                  ? selectedItem.images
                  : [selectedItem.image];
                const activeSrc = currentImages[activeImageIndex] || currentImages[0];

                return (
                  <div className="space-y-4">
                    {/* Main Image Frame */}
                    <div className="w-full h-72 sm:h-96 bg-[#070709] border border-white/10 rounded-2xl overflow-hidden flex items-center justify-center p-2 relative group">
                      <img
                        key={activeSrc}
                        src={activeSrc}
                        alt={`${selectedItem.title} - View ${activeImageIndex + 1}`}
                        className="w-full h-full object-contain rounded-xl"
                      />

                      {/* Navigation Arrows (if multiple images) */}
                      {currentImages.length > 1 && (
                        <>
                          <button
                            onClick={handlePrevImage}
                            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 transition-all opacity-80 hover:opacity-100"
                            aria-label="Previous image"
                          >
                            <ChevronLeft size={20} />
                          </button>
                          <button
                            onClick={handleNextImage}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 transition-all opacity-80 hover:opacity-100"
                            aria-label="Next image"
                          >
                            <ChevronRight size={20} />
                          </button>
                        </>
                      )}

                      {/* Image Counter Badge */}
                      {currentImages.length > 1 && (
                        <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/80 border border-white/20 text-[11px] font-mono text-white backdrop-blur-sm">
                          {activeImageIndex + 1} / {currentImages.length}
                        </div>
                      )}
                    </div>

                    {/* Thumbnail Switcher Tabs (if multiple images) */}
                    {currentImages.length > 1 && (
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        {currentImages.map((imgSrc, i) => {
                          const getLabel = () => {
                            if (imgSrc.includes('award')) return '01 // CERTIFICATE';
                            if (imgSrc.includes('ceremony')) return '02 // CEREMONY ON-STAGE';
                            if (imgSrc.includes('completion')) return '01 // COMPLETION CERTIFICATE';
                            if (imgSrc.includes('star-performer')) return '02 // STAR PERFORMER';
                            if (imgSrc.includes('lor')) return '03 // LETTER OF RECOMMENDATION';
                            return `0${i + 1} // VIEW ${i + 1}`;
                          };

                          return (
                            <button
                              key={imgSrc}
                              onClick={() => {
                                sound.playClick();
                                setActiveImageIndex(i);
                              }}
                              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl font-mono text-[11px] sm:text-xs transition-all border ${
                                activeImageIndex === i
                                  ? 'bg-white/15 border-[#CCFF00] text-[#CCFF00] font-bold shadow-[0_0_12px_rgba(204,255,0,0.2)]'
                                  : 'bg-white/5 border-white/10 text-[#A1A1AA] hover:text-white hover:bg-white/10'
                              }`}
                            >
                              <ImageIcon size={13} />
                              <span>{getLabel()}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* Description & Technical Metadata */}
              <div className="space-y-3 pt-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="text-xl font-display font-bold text-[#F4F4F6]">
                    {selectedItem.title}
                  </h4>
                  <span className="text-xs px-3 py-1 rounded-full bg-[#CCFF00]/10 border border-[#CCFF00]/30 text-[#CCFF00] font-mono font-semibold">
                    {selectedItem.category}
                  </span>
                </div>

                <p className="text-sm text-[#D4D4D8] font-sans leading-relaxed">
                  {selectedItem.description}
                </p>

                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-[#71717A]">
                  <span className="text-[#CCFF00] flex items-center gap-1.5 font-medium">
                    <CheckCircle2 size={15} />
                    OFFICIAL RECORD VERIFIED • TECHSPARTA&apos; 2K26
                  </span>
                  <span>{selectedItem.organization} ({selectedItem.date})</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
