import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [hovered, setHovered] = useState(false);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Snappy, robotic physics
  const springConfig = { damping: 25, stiffness: 400, mass: 0.2 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('interactive')
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Horizontal Crosshair Line */}
      <motion.div
        className="fixed pointer-events-none z-[100] bg-tech-cyan/30 h-[1px] w-full top-0 left-0"
        style={{ translateY: cursorY }}
      />
      {/* Vertical Crosshair Line */}
      <motion.div
        className="fixed pointer-events-none z-[100] bg-tech-cyan/30 w-[1px] h-full top-0 left-0"
        style={{ translateX: cursorX }}
      />

      {/* Main Reticle */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[101] flex items-center justify-center"
        style={{
          translateX: cursorX,
          translateY: cursorY,
          x: -24,
          y: -24,
          width: 48,
          height: 48
        }}
      >
          {/* Rotating Data Ring */}
          <motion.div 
            className="absolute inset-0 border border-tech-cyan rounded-full border-dashed"
            animate={{ rotate: 360, scale: hovered ? 1.5 : 1 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Inner Dot */}
          <motion.div 
             className="w-1 h-1 bg-white"
             animate={{ scale: hovered ? 2 : 1 }}
          />

          {/* Data Tag */}
          <motion.div 
            className="absolute top-full left-full mt-2 ml-2 bg-tech-dim/80 text-tech-cyan text-[8px] font-mono px-1 whitespace-nowrap overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
             COORD: T-800
          </motion.div>
      </motion.div>
    </>
  );
};

export default CustomCursor;