// src/components/RetroOverlayLayer.jsx
import { motion } from 'framer-motion';

const RetroOverlayLayer = ({ enabled }) => {
  if (!enabled) return null;

  return (
    <>
      {/* Scanline Overlay */}
      <div className="fixed inset-0 pointer-events-none z-40 opacity-10">
        <div className="w-full h-full bg-gradient-to-b from-transparent via-royal-blue-500/5 to-transparent animate-scanline" />
      </div>
      
      {/* CRT Flicker */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-40"
        animate={{ opacity: [0, 0.02, 0] }}
        transition={{ duration: 0.1, repeat: Infinity, repeatType: 'reverse' }}
      >
        <div className="w-full h-full bg-white" />
      </motion.div>
      
      {/* Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] bg-repeat noise-overlay" />
      
      {/* Pixel Grid */}
      <div className="fixed inset-0 pointer-events-none z-30 bg-pixel-grid dark:bg-pixel-grid-dark bg-grid opacity-[0.02]" />
    </>
  );
};

export default RetroOverlayLayer;