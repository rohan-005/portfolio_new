/* eslint-disable no-unused-vars */
import React, { useState, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import SocialLinks from "./SocialLinks";

/* -----------------------------------------
   Enhanced Floating Doodles (Theme Aware)
------------------------------------------ */
const FloatingDoodles = ({ mouseX, mouseY, isHovered }) => {
  const spring = { stiffness: 40, damping: 25 };
  const fastSpring = { stiffness: 60, damping: 20 };

  // Main movement transforms
  const x1 = useSpring(useTransform(mouseX, [0, 1200], [-25, 25]), spring);
  const y1 = useSpring(useTransform(mouseY, [0, 800], [-25, 25]), spring);

  const x2 = useSpring(useTransform(mouseX, [0, 1200], [30, -30]), spring);
  const y2 = useSpring(useTransform(mouseY, [0, 800], [30, -30]), spring);

  const x3 = useSpring(useTransform(mouseX, [0, 1200], [-15, 15]), fastSpring);
  const y3 = useSpring(useTransform(mouseY, [0, 800], [15, -15]), fastSpring);

  const x4 = useSpring(useTransform(mouseX, [0, 1200], [20, -20]), spring);
  const y4 = useSpring(useTransform(mouseY, [0, 800], [-20, 20]), spring);

  const x5 = useSpring(useTransform(mouseX, [0, 1200], [-10, 10]), fastSpring);
  const y5 = useSpring(useTransform(mouseY, [0, 800], [10, -10]), fastSpring);

  const x6 = useSpring(useTransform(mouseX, [0, 1200], [40, -40]), { stiffness: 30, damping: 30 });
  const y6 = useSpring(useTransform(mouseY, [0, 800], [-40, 40]), { stiffness: 30, damping: 30 });

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30 dark:opacity-20">
      {/* Gaming Controller */}
      <motion.svg
        style={{ x: x1, y: y1 }}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        className="absolute top-[15%] left-[10%] w-16 sm:w-20 md:w-24 lg:w-32 text-black dark:text-white"
      >
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <path d="M6 12h12" />
        <circle cx="9" cy="10" r="1" fill="currentColor" />
        <circle cx="15" cy="10" r="1" fill="currentColor" />
      </motion.svg>

      {/* Code Brackets */}
      <motion.svg
        style={{ x: x2, y: y2 }}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        className="absolute bottom-[20%] right-[15%] w-20 sm:w-24 md:w-28 text-black dark:text-white"
      >
        <path d="M8 4L4 8L8 12M16 4L20 8L16 12" />
        <path d="M12 2L12 22" strokeDasharray="2 2" />
      </motion.svg>

      {/* Circle Accent */}
      <motion.div
        style={{ x: y1, y: x2 }}
        className="absolute bottom-[10%] left-[20%] w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full border border-current text-black dark:text-white"
      />

      {/* Floating Code Snippet */}
      <motion.div
        style={{ x: x3, y: y3 }}
        className="absolute top-[30%] right-[20%] text-[8px] sm:text-[10px] md:text-xs font-mono text-black/30 dark:text-white/30 hidden sm:block"
      >
        <div>{'<div>'}</div>
        <div className="ml-1 sm:ml-2">{'<h1>'}</div>
        <div className="ml-2 sm:ml-4">{'Hello'}</div>
        <div className="ml-1 sm:ml-2">{'</h1>'}</div>
        <div>{'</div>'}</div>
      </motion.div>

      {/* Binary Rain Effect */}
      <motion.div
        style={{ x: x4, y: y4 }}
        className="absolute left-[30%] top-[40%] text-[6px] sm:text-[8px] md:text-xs font-mono text-black/20 dark:text-white/20 hidden md:block"
      >
        <div>0101 1010</div>
        <div>1100 0011</div>
        <div>1010 0101</div>
      </motion.div>

      {/* Pixel Art Heart */}
      <motion.svg
        style={{ x: x5, y: y5 }}
        viewBox="0 0 24 24"
        fill="currentColor"
        className="absolute bottom-[30%] left-[15%] w-10 sm:w-12 md:w-14 lg:w-16 text-black/20 dark:text-white/20"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </motion.svg>

      {/* Game Controller Buttons */}
      <motion.div
        style={{ x: x6, y: y6 }}
        className="absolute top-[60%] right-[10%] flex space-x-0.5 sm:space-x-1"
      >
        <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 rounded-full bg-black/30 dark:bg-white/30" />
        <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 rounded-full bg-black/30 dark:bg-white/30" />
        <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 rounded-full bg-black/30 dark:bg-white/30" />
        <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 rounded-full bg-black/30 dark:bg-white/30" />
      </motion.div>

      {/* Floating Keyboard Key */}
      <motion.div
        style={{ x: x1, y: y2 }}
        className="absolute top-[20%] right-[30%] w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 border border-current text-black/20 dark:text-white/20 rounded flex items-center justify-center text-[8px] sm:text-[10px] md:text-xs"
      >
        ⌘
      </motion.div>

      {/* Mouse Cursor Trail */}
      <motion.div
        style={{ x: x3, y: y4 }}
        className="absolute bottom-[40%] left-[25%] w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 hidden lg:block"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-full h-full text-black/20 dark:text-white/20">
          <path d="M3 3L7 7M3 3L3 9M3 3L9 3" strokeWidth="1.5" />
        </svg>
      </motion.div>

      {/* Geometric Shapes */}
      <motion.div
        style={{ x: x5, y: y6 }}
        className="absolute top-[70%] left-[5%] w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16"
      >
        <div className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 border-2 border-current text-black/20 dark:text-white/20 rotate-45 absolute top-0 left-0" />
        <div className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 border-2 border-current text-black/20 dark:text-white/20 rounded-full absolute bottom-0 right-0" />
      </motion.div>

      {/* Joystick */}
      <motion.svg
        style={{ x: x2, y: x3 }}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="absolute top-[45%] left-[5%] w-14 sm:w-16 md:w-18 lg:w-20 text-black/20 dark:text-white/20"
      >
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
        <path d="M12 4L12 8M12 16L12 20M4 12L8 12M16 12L20 12" />
      </motion.svg>

      {/* Database Icon */}
      <motion.svg
        style={{ x: y2, y: x4 }}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="absolute bottom-[15%] left-[40%] w-12 sm:w-14 md:w-16 text-black/20 dark:text-white/20"
      >
        <ellipse cx="12" cy="6" rx="8" ry="2" />
        <path d="M4 6v12c0 2 4 3 8 3s8-1 8-3V6" />
        <path d="M4 12c0 2 4 3 8 3s8-1 8-3" />
      </motion.svg>

      {/* Sound Waves */}
      <motion.div
        style={{ x: x6, y: y1 }}
        className="absolute top-[10%] right-[5%] flex items-end space-x-0.5 sm:space-x-1"
      >
        {[4, 8, 12, 16, 12, 8, 4].map((height, i) => (
          <motion.div
            key={i}
            className="w-0.5 sm:w-1 bg-current text-black/20 dark:text-white/20"
            animate={{
              height: [height, height * 1.5, height],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.1,
            }}
            style={{ height: height * 0.5 }} // Scaled down for mobile
          />
        ))}
      </motion.div>

      {/* Loading Spinner */}
      <motion.div
        style={{ x: x3, y: y5 }}
        className="absolute bottom-[25%] right-[25%] w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 border-2 border-current border-t-transparent rounded-full text-black/20 dark:text-white/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />

      {/* Cursor */}
      <motion.svg
        style={{ x: x4, y: y3 }}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="absolute top-[55%] left-[35%] w-6 sm:w-7 md:w-8 text-black/20 dark:text-white/20 hidden lg:block"
      >
        <path d="M3 3L10 10M3 3L3 8M3 3L8 3" />
        <path d="M21 21L14 14M21 21L21 16M21 21L16 21" />
      </motion.svg>

      {/* Sparkles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-current text-black/30 dark:text-white/30 rounded-full"
          style={{
            top: `${20 + i * 15}%`,
            left: `${60 + i * 8}%`,
            x: useTransform(mouseX, [0, 1200], [-10, 10]),
            y: useTransform(mouseY, [0, 800], [-10, 10]),
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}
    </div>
  );
};

/* -----------------------------------------
   Profile Card with Enhanced Effects
------------------------------------------ */
const ProfileCard = ({ isHovered, label, subtext, index }) => {
  return (
    <motion.div
      animate={{ y: isHovered ? -10 : 0 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="relative px-4 sm:px-6 md:px-8"
    >
      {/* REMOVED: Animated background gradient on hover */}

      {/* Particle effects on hover - kept as it's subtle */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-emerald-500 rounded-full"
              initial={{ 
                x: 0, 
                y: 0,
                opacity: 1 
              }}
              animate={{ 
                x: Math.random() * 100 - 50,
                y: Math.random() * 100 - 50,
                opacity: 0,
                scale: 0
              }}
              transition={{ 
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2
              }}
              style={{
                left: '50%',
                top: '50%',
              }}
            />
          ))}
        </div>
      )}

      {/* Index with decorative elements */}
      <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
        <motion.div
          animate={{ 
            width: isHovered ? 30 : 15,
            backgroundColor: isHovered ? '#10B981' : 'currentColor' // Emerald-500
          }}
          className="h-px w-4 sm:w-auto"
        />
        <motion.span
          animate={{
            textShadow: isHovered ? "0 0 10px #10B981" : "none",
          }}
          className="text-[10px] sm:text-xs font-mono tracking-[0.2em] sm:tracking-[0.3em] text-black/40 dark:text-white/40"
        >
          {String(index).padStart(2, "0")}
        </motion.span>
        <motion.div
          animate={{ 
            width: isHovered ? 30 : 15,
            backgroundColor: isHovered ? '#059669' : 'currentColor' // Emerald-600
          }}
          className="h-px w-4 sm:w-auto"
        />
      </div>

      {/* Title with gradient animation */}
      <motion.h2
        animate={{
          color: isHovered ? '#10B981' : 'currentColor',
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ type: "spring", stiffness: 300 }}
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight mb-3 sm:mb-4 text-black dark:text-white relative z-10"
      >
        {label}
      </motion.h2>

      {/* Subtext with animated underline */}
      <motion.p
        animate={{ 
          opacity: isHovered ? 1 : 0.4,
          x: isHovered ? 5 : 0,
        }}
        className="text-[10px] sm:text-xs md:text-sm font-mono max-w-[200px] sm:max-w-[250px] md:max-w-[300px] text-black/60 dark:text-white/60 relative z-10"
      >
        {subtext}
      </motion.p>

      {/* Animated decorative line - changed to green gradient */}
      <motion.div
        animate={{ 
          width: isHovered ? "80px" : "20px",
        }}
        transition={{ duration: 0.3 }}
        className="h-px mt-4 sm:mt-6 md:mt-8 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 relative z-10"
      />

      {/* Corner brackets */}
      <motion.div
        className="absolute -top-4 sm:-top-6 -left-4 sm:-left-6 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
        animate={{ opacity: isHovered ? 1 : 0.3 }}
      >
        <div className="absolute top-0 left-0 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 border-t-2 border-l-2 border-current" />
      </motion.div>
      <motion.div
        className="absolute -bottom-4 sm:-bottom-6 -right-4 sm:-right-6 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
        animate={{ opacity: isHovered ? 1 : 0.3 }}
      >
        <div className="absolute bottom-0 right-0 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 border-b-2 border-r-2 border-current" />
      </motion.div>
    </motion.div>
  );
};

/* -----------------------------------------
   Main Landing Split
------------------------------------------ */
const LandingSplit = ({ profiles, onSelect }) => {
  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  /* Mouse Tracking */
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const mouseX = useSpring(rawX, { stiffness: 30, damping: 30 });
  const mouseY = useSpring(rawY, { stiffness: 30, damping: 30 });

  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    rawX.set(x);
    rawY.set(y);
    setMousePosition({ x, y });
  };

  const handleSelect = (side) => {
    setSelected(side);

    setTimeout(() => {
      onSelect(
        side === "left" ? "gameDeveloper" : "fullStackDeveloper"
      );
    }, 200);
  };

  // Prepare social links object for SocialLinks component
  const socialLinks = {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    twitter: "https://twitter.com/yourusername",
    website: "https://yourwebsite.com",
    discord: "https://discord.gg/yourinvite",
    unity: "https://learn.unity.com/u/yourusername"
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="
        relative h-screen w-full overflow-hidden
        bg-neutral-100 dark:bg-neutral-950
        transition-colors duration-500
      "
    >
      {/* Interactive Mouse Glow - changed to green */}
      <motion.div
        className="absolute pointer-events-none w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-r from-emerald-500/10 via-green-500/10 to-teal-500/10 blur-3xl"
        animate={{
          x: mousePosition.x - 96,
          y: mousePosition.y - 96,
        }}
        transition={{ type: "spring", stiffness: 30, damping: 20 }}
      />

      {/* Floating Background Elements */}
      <FloatingDoodles mouseX={mouseX} mouseY={mouseY} isHovered={hovered} />

      {/* Gradient Orbs - changed to green */}
      <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Grid Pattern */}
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
        backgroundSize: '20px 20px sm:30px 30px md:40px 40px',
        opacity: 0.03,
      }} />

      {/* LEFT PANEL */}
      <motion.div
        className="absolute left-0 top-0 h-full w-1/2"
        animate={{
          width: selected === "right" ? "0%" : "50%",
          x: selected === "right" ? "-50%" : "0%",
        }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          onMouseEnter={() => setHovered("left")}
          onMouseLeave={() => setHovered(null)}
          onClick={() => handleSelect("left")}
          className="relative h-full w-full flex items-center justify-center cursor-pointer overflow-hidden"
        >
          {/* Panel-specific gradient - changed to green */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent" />
          
          <ProfileCard
            isHovered={hovered === "left"}
            label={profiles.gameDeveloper.label}
            subtext="Interactive systems & immersive experiences"
            index={1}
          />
        </div>
      </motion.div>

      {/* RIGHT PANEL */}
      <motion.div
        className="absolute right-0 top-0 h-full w-1/2"
        animate={{
          width: selected === "left" ? "0%" : "50%",
          x: selected === "left" ? "50%" : "0%",
        }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          onMouseEnter={() => setHovered("right")}
          onMouseLeave={() => setHovered(null)}
          onClick={() => handleSelect("right")}
          className="relative h-full w-full flex items-center justify-center cursor-pointer overflow-hidden"
        >
          {/* Panel-specific gradient - changed to green */}
          <div className="absolute inset-0 bg-gradient-to-tl from-green-500/5 to-transparent" />
          
          <ProfileCard
            isHovered={hovered === "right"}
            label={profiles.fullStackDeveloper.label}
            subtext="Scalable architecture & production systems"
            index={2}
          />
        </div>
      </motion.div>

      {/* Center Divider with animated gradient - changed to green */}
      <motion.div
        animate={{ opacity: selected ? 0 : 1 }}
        transition={{ duration: 0.4 }}
        className="absolute left-1/2 top-0 h-full w-px"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500 to-transparent animate-pulse" />
      </motion.div>

      {/* Bottom Section with Social Links */}
      <motion.div
        className="absolute bottom-4 sm:bottom-6 md:bottom-8  -translate-x-1/2 flex flex-col items-center space-y-4 sm:space-y-5 md:space-y-6 z-20 w-full max-w-md px-4"
        animate={{ opacity: selected ? 0 : 1, y: selected ? 20 : 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Decorative line - changed to green gradient */}
        <motion.div
          animate={{ width: hovered ? 150 : 50 }}
          className="h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent w-12 sm:w-auto"
        />

        {/* Instruction Text with glow - changed to green */}
        <motion.div
          animate={{ 
            textShadow: hovered ? "0 0 10px #10B981" : "none",
          }}
          className="text-xs sm:text-sm md:text-base lg:text-[20px] font-mono tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em] text-black/40 dark:text-white/30 text-center"
        >
          {hovered ? "✦ CLICK TO ENTER ✦" : "SELECT PROFILE"}
        </motion.div>

        {/* Social Links - Using the imported component */}
        <SocialLinks social={socialLinks} />

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 1 }}
          className="text-[6px] sm:text-[7px] md:text-[8px] font-mono text-black/30 dark:text-white/20 text-center"
        >
          © 2026 ROHAN 
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LandingSplit;