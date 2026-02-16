// src/components/CursorEffect.jsx
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const CursorEffect = ({ variant, mousePosition }) => {
  const [trail, setTrail] = useState([]);
  
  useEffect(() => {
    const updateTrail = () => {
      setTrail(prev => [...prev.slice(-8), { x: mousePosition.x, y: mousePosition.y }]);
    };
    
    const interval = setInterval(updateTrail, 50);
    return () => clearInterval(interval);
  }, [mousePosition]);

  const variants = {
    default: {
      width: 20,
      height: 20,
      backgroundColor: 'rgba(0,0,0,0.8)',
      mixBlendMode: 'difference'
    },
    button: {
      width: 40,
      height: 40,
      backgroundColor: 'rgba(255,255,255,0.9)',
      mixBlendMode: 'difference'
    },
    link: {
      width: 60,
      height: 60,
      border: '2px solid black',
      backgroundColor: 'transparent',
    },
    basketball: {
      width: 80,
      height: 80,
      backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'black\' strokeWidth=\'2\'%3E%3Ccircle cx=\'12\' cy=\'12\' r=\'10\'/%3E%3Cpath d=\'M12 2 L12 22 M2 12 L22 12 M5 5 L19 19 M5 19 L19 5\'/%3E%3C/svg%3E")',
      backgroundSize: 'contain',
      backgroundColor: 'transparent',
    }
  };

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
        animate={{
          x: mousePosition.x - (variants[variant]?.width / 2 || 10),
          y: mousePosition.y - (variants[variant]?.height / 2 || 10),
          ...variants[variant]
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />

      {/* Trail effect */}
      {trail.map((pos, i) => (
        <motion.div
          key={i}
          className="fixed w-1 h-1 bg-black dark:bg-white rounded-full pointer-events-none z-[9998] opacity-20"
          style={{
            left: pos.x,
            top: pos.y,
            scale: 1 - (i * 0.1)
          }}
        />
      ))}

      {/* PS5 controller style buttons for cursor interaction */}
      <motion.div
        className="fixed bottom-4 left-4 flex gap-2 pointer-events-none z-[9997]"
        animate={{ opacity: 0.5 }}
      >
        <div className="w-2 h-2 bg-black dark:bg-white rounded-full" />
        <div className="w-2 h-2 bg-black dark:bg-white rounded-full" />
        <div className="w-2 h-2 bg-black dark:bg-white rounded-full" />
        <div className="w-2 h-2 bg-black dark:bg-white rounded-full" />
      </motion.div>
    </>
  );
};

export default CursorEffect;