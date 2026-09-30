import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'project' | 'image'>('default');
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for cursor follow
  const springX = useSpring(mouseX, { damping: 28, stiffness: 450 });
  const springY = useSpring(mouseY, { damping: 28, stiffness: 450 });

  useEffect(() => {
    // Detect touch device
    const checkTouch = () => {
      return (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches
      );
    };

    if (checkTouch()) {
      setIsTouchDevice(true);
      return;
    }
    setIsTouchDevice(false);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check hovered element
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const projectCard = target.closest('[data-cursor="project"]');
      const imageEl = target.closest('[data-cursor="image"]') || target.tagName === 'IMG';
      const isClickable =
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('[data-cursor="pointer"]');

      if (projectCard) {
        setCursorType('project');
      } else if (imageEl && !isClickable) {
        setCursorType('image');
      } else if (isClickable) {
        setCursorType('pointer');
      } else {
        setCursorType('default');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Primary Cursor Dot / Badge */}
      <motion.div
        className="fixed top-0 left-0 flex items-center justify-center pointer-events-none"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        {cursorType === 'default' && (
          <div className="w-2.5 h-2.5 bg-[#EDEDED] rounded-full shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
        )}

        {cursorType === 'pointer' && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-7 h-7 rounded-full border border-[#22C55E]/80 bg-[#22C55E]/10 flex items-center justify-center"
          >
            <div className="w-1.5 h-1.5 bg-[#22C55E] rounded-full" />
          </motion.div>
        )}

        {cursorType === 'project' && (
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="px-2.5 py-1 rounded bg-[#0E0E10]/90 border border-[#22C55E]/80 text-[#EDEDED] font-mono text-[9px] font-bold tracking-widest uppercase shadow-lg flex items-center gap-1"
          >
            <span>VIEW</span>
            <span className="text-[#22C55E]">→</span>
          </motion.div>
        )}

        {cursorType === 'image' && (
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-8 h-8 rounded-full border border-white/60 bg-black/40 backdrop-blur-xs flex items-center justify-center font-mono text-[8px] text-white"
          >
            ZOOM
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
