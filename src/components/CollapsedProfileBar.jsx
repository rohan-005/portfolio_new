/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from "framer-motion";

const CollapsedProfileBar = ({ profile, onSwap, retroEffects, isSwitching }) => {
  // Darker, more refined color palette
  const profileColors =
    profile.id === "game"
      ? {
          bg: "bg-zinc-950", 
          hoverBg: "bg-zinc-900",
          accent: "text-indigo-400",
          icon: "🎮",
          border: "border-zinc-800",
          glow: "shadow-indigo-500/20"
        }
      : {
          bg: "bg-neutral-950",
          hoverBg: "bg-neutral-900",
          accent: "text-emerald-400",
          icon: "💻",
          border: "border-neutral-800",
          glow: "shadow-emerald-500/20"
        };

  // Doodle variants for floating animation
  const doodleVariants = {
    animate: (i) => ({
      y: [0, -10, 0],
      rotate: [0, 10, -10, 0],
      transition: {
        duration: 3 + i,
        repeat: Infinity,
        ease: "easeInOut",
      },
    }),
  };

  // Profile change indicator variants
  const changeIndicatorVariants = {
    initial: { scale: 0, opacity: 0, x: -20 },
    animate: { scale: 1, opacity: 1, x: 0 },
    exit: { scale: 0, opacity: 0, x: 20 }
  };

  return (
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{
        width: 80, // Slightly wider for bigger text
        opacity: 1,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
      }}
      exit={{ width: 0, opacity: 0 }}
      whileHover={{ width: 110 }}
      className={`relative h-full ${profileColors.bg} cursor-pointer overflow-hidden group border-r ${profileColors.border} transition-colors duration-500 ${profileColors.glow} hover:shadow-lg`}
      onClick={onSwap}
    >
      {/* Background Mesh/Doodle Layer - Enhanced */}
      <div className="absolute inset-0 opacity-200 pointer-events-none">
        <svg className="w-full h-full">
          <motion.circle cx="20%" cy="10%" r="2" fill="currentColor" className={profileColors.accent} custom={1} variants={doodleVariants} animate="animate" />
          <motion.circle cx="70%" cy="30%" r="1.5" fill="currentColor" className={profileColors.accent} custom={2} variants={doodleVariants} animate="animate" />
          <motion.path d="M10 80 L20 90 M20 80 L10 90" stroke="currentColor" strokeWidth="1" className={profileColors.accent} custom={3} variants={doodleVariants} animate="animate" />
          <motion.path d="M40 40 Q 50 30 60 40" fill="none" stroke="currentColor" strokeWidth="1" className={profileColors.accent} custom={4} variants={doodleVariants} animate="animate" />
          <motion.path d="M60 70 Q 65 65 70 70" fill="none" stroke="currentColor" strokeWidth="1" className={profileColors.accent} custom={5} variants={doodleVariants} animate="animate" />
        </svg>
      </div>

      {/* Profile Change Indicator - Small Floating Element */}
      {/* <AnimatePresence>
        {!isSwitching && (
          <motion.div
            variants={changeIndicatorVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute top-4 left-1/2 -translate-x-1/2 z-30"
          >
            <motion.div
              animate={{ 
                y: [0, -3, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className={`text-[8px] font-mono tracking-wider ${profileColors.accent} bg-black/30 px-1.5 py-0.5 rounded-full border border-current/30 backdrop-blur-sm whitespace-nowrap`}
            >
              ↻ CHANGE
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence> */}

      {/* Hover Highlight Overlay */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />

      {/* Icon with Enhanced Effects */}
      <div className="absolute top-14 left-1/2 -translate-x-1/2 z-20">
        <motion.div 
          className="text-3xl filter grayscale group-hover:grayscale-0 transition-all duration-300 relative"
          animate={{ 
            y: isSwitching ? [0, -5, 0] : 0,
            scale: isSwitching ? [1, 1.1, 1] : 1
          }}
        >
          {profileColors.icon}
          {/* Subtle glow effect */}
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className={`absolute inset-0 blur-md ${profileColors.accent} opacity-20`}
            style={{ content: profileColors.icon }}
          />
        </motion.div>
        {isSwitching && (
           <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="absolute inset-0 rounded-full border border-current opacity-50"
           />
        )}
      </div>

      {/* Interactive Vertical Label - Bigger Text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="transform -rotate-90 whitespace-nowrap font-mono text-sm tracking-[0.25em] font-bold">
          <AnimatePresence mode="wait">
            <motion.div
              key={profile.id + isSwitching}
              className="flex space-x-1.5"
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {(isSwitching ? "SWITCHING" : profile.label).toUpperCase().split("").map((char, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    visible: { 
                      opacity: 1, 
                      y: 0, 
                      transition: { delay: i * 0.05, ease: "easeOut" } 
                    },
                    exit: { opacity: 0, y: -15, transition: { duration: 0.1 } }
                  }}
                  className="text-zinc-500 group-hover:text-zinc-300 transition-colors duration-300"
                >
                  {char}
                </motion.span>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Enhanced Bottom Status Element */}
      <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-3">
        {/* Mini progress bar or status */}
        <div className="w-8 h-[1px] bg-gradient-to-r from-transparent via-zinc-600 to-transparent" />
        
        {isSwitching ? (
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className={`w-1 h-1 rounded-full ${profileColors.accent} bg-current`}
                animate={{ 
                  opacity: [0.2, 1, 0.2],
                  scale: [1, 1.2, 1]
                }}
                transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.2 }}
              />
            ))}
          </div>
        ) : (
          <motion.div 
            className="w-4 h-[2px] bg-zinc-700 group-hover:w-8 group-hover:bg-zinc-500 transition-all duration-500" 
          />
        )}

        {/* Profile type indicator dot */}
        <motion.div 
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className={`w-1 h-1 rounded-full ${profileColors.accent} bg-current`}
        />
      </div>

      {/* Corner Accents */}
      <div className="absolute top-2 right-2 w-1 h-1 border-t border-r border-zinc-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-2 left-2 w-1 h-1 border-b border-l border-zinc-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
};

export default CollapsedProfileBar;