import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const MouseTrailer: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      ref={cursorRef}
      className="pointer-events-none fixed inset-0 z-50"
      style={{ x: springX, y: springY }}
    >
      <div className="relative -left-4 -top-4">
        <div className="absolute h-8 w-8 rounded-full border border-purple-500 opacity-50" />
        <div className="absolute h-2 w-2 rounded-full bg-purple-500 blur-[2px]" />
      </div>
    </motion.div>
  );
};

export default MouseTrailer;