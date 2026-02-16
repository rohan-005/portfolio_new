// src/components/sections/CVSection.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const CVSection = ({ cvFile, retroEffects, currentProfile }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSpeed, setDownloadSpeed] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const [pulseEffect, setPulseEffect] = useState(false);
  const [currentCvFile, setCurrentCvFile] = useState(cvFile);
  const sectionRef = useRef(null);
  
  // Update CV file based on profile
  useEffect(() => {
    if (currentProfile === 'profile1') {
      setCurrentCvFile('/data/gamedeveloper-1.pdf');
    } else {
      setCurrentCvFile('/data/rohancv.pdf');
    }
  }, [currentProfile]);

  // Simulate realistic download with varying speed
  const handleDownload = async (e) => {
    e.preventDefault();
    setIsDownloading(true);
    setPulseEffect(true);
    
    let progress = 0;
    const speeds = [15, 25, 18, 32, 22, 28, 35, 30, 25, 20];
    let speedIndex = 0;
    
    while (progress < 100) {
      const increment = Math.floor(Math.random() * 8) + 5;
      progress = Math.min(progress + increment, 100);
      setDownloadProgress(progress);
      
      // Simulate fluctuating download speed
      setDownloadSpeed(speeds[speedIndex % speeds.length]);
      speedIndex++;
      
      // Dynamic delay based on progress (slows down near completion)
      const delay = progress > 80 ? 80 : progress > 50 ? 60 : 40;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    
    // Trigger actual download
    const link = document.createElement('a');
    link.href = currentCvFile;
    link.download = 'rohancv.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Success animation and reset
    setTimeout(() => {
      setIsDownloading(false);
      setDownloadProgress(0);
      setDownloadSpeed(0);
      setPulseEffect(false);
    }, 800);
  };

  // Auto-pulse effect every 10 seconds to draw attention
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDownloading && !isHovered) {
        setPulseEffect(true);
        setTimeout(() => setPulseEffect(false), 1000);
      }
    }, 10000);
    
    return () => clearInterval(interval);
  }, [isDownloading, isHovered]);

  return (
    <section 
      ref={sectionRef}
      className="py-20 relative overflow-hidden"
    >
      {/* Enhanced animated background particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-green-500 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
              scale: 0
            }}
            animate={{
              y: [null, -50, 0],
              x: [null, (Math.random() - 0.5) * 20, 0],
              scale: [0, 1.5, 0],
              opacity: [0, 0.8, 0]
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Binary rain effect */}
        {retroEffects && [...Array(10)].map((_, i) => (
          <motion.div
            key={`binary-${i}`}
            className="absolute text-green-500/10 text-xs font-mono"
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: -100 
            }}
            animate={{ y: '100vh' }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5
            }}
          >
            {Array.from({ length: 20 }, () => Math.round(Math.random())).join('')}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        {/* Header with typing effect */}
        <motion.div 
          className="flex items-center mb-12"
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            className="relative"
            whileHover={{ scale: 1.1 }}
          >
            <span className="text-green-500 mr-2 text-4xl">#</span>
            {pulseEffect && (
              <motion.div
                className="absolute -inset-4 bg-green-500/20 rounded-full"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 1 }}
              />
            )}
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl font-mono font-bold flex items-center">
            <motion.span
              animate={{ 
                color: pulseEffect ? ['#22c55e', '#ffffff', '#22c55e'] : '#22c55e'
              }}
              transition={{ duration: 1 }}
            >
              resume
            </motion.span>
            {retroEffects && (
              <motion.span 
                className="terminal-cursor ml-2 text-green-500"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                _
              </motion.span>
            )}
          </h2>
        </motion.div>

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          onHoverStart={() => {
            setIsHovered(true);
            setShowTooltip(true);
          }}
          onHoverEnd={() => {
            setIsHovered(false);
            setShowTooltip(false);
          }}
          className="relative"
        >
          {/* Main card with enhanced design */}
          <div className={`
            bg-gradient-to-br from-green-500/10 to-green-500/5 
            dark:from-green-950/50 dark:to-black/80 
            p-8 md:p-12 rounded-2xl pixel-border text-center 
            relative overflow-hidden group backdrop-blur-sm
            ${pulseEffect ? 'ring-4 ring-green-500/30' : ''}
          `}>
            
            {/* Animated gradient border */}
            <motion.div 
              className="absolute inset-0 rounded-2xl"
              animate={{
                background: isHovered 
                  ? 'radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.2), transparent 70%)'
                  : 'radial-gradient(circle at 50% 50%, transparent, transparent)'
              }}
              transition={{ duration: 0.5 }}
            />

            {/* Enhanced background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div 
                className="absolute inset-0" 
                style={{
                  backgroundImage: `
                    radial-gradient(circle at 2px 2px, green 1px, transparent 0),
                    linear-gradient(45deg, transparent 75%, rgba(34, 197, 94, 0.1) 75%)
                  `,
                  backgroundSize: '40px 40px, 80px 80px'
                }} 
              />
            </div>

            {/* Floating elements */}
            <motion.div 
              className="absolute top-10 left-10 text-2xl opacity-20 hidden md:block"
              animate={{ 
                rotate: [0, 10, -10, 0],
                y: [0, -5, 5, 0]
              }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              💼
            </motion.div>
            
            <motion.div 
              className="absolute bottom-10 right-10 text-2xl opacity-20 hidden md:block"
              animate={{ 
                rotate: [0, -10, 10, 0],
                y: [0, 5, -5, 0]
              }}
              transition={{ duration: 5, repeat: Infinity, delay: 2 }}
            >
              🎓
            </motion.div>

            {/* Enhanced document icon with 3D effect */}
            <motion.div 
              animate={{ 
                y: [0, -15, 0],
                rotateY: [0, 180, 360],
              }}
              transition={{ 
                y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                rotateY: { duration: 10, repeat: Infinity, ease: "linear" }
              }}
              className="relative z-10 inline-block"
              style={{ perspective: '1000px' }}
            >
              <motion.div 
                className="text-8xl mb-8 relative cursor-pointer"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setPulseEffect(true)}
              >
                <span className="relative z-10">📄</span>
                
                {/* Glowing rings */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={`ring-${i}`}
                    className="absolute inset-0 border-2 border-green-500 rounded-xl"
                    animate={{
                      scale: [1, 1.5 + i * 0.3, 1],
                      opacity: [0.5, 0, 0.5],
                      rotate: [0, 45, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: "easeOut"
                    }}
                  />
                ))}
                
                {/* Floating badges */}
                <motion.div 
                  className="absolute -top-4 -right-4 text-3xl"
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  ⭐
                </motion.div>
                
                <motion.div 
                  className="absolute -bottom-4 -left-4 text-2xl"
                  animate={{ 
                    rotate: [360, 0],
                    scale: [1, 0.8, 1]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  📌
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.h3 
              className="text-3xl font-bold font-mono mb-4 relative z-10"
              animate={{ scale: pulseEffect ? [1, 1.05, 1] : 1 }}
              transition={{ duration: 0.5 }}
            >
              Download my CV
              <motion.span
                className="inline-block ml-2"
                animate={{ 
                  rotate: [0, 20, -20, 0],
                  x: [0, 5, -5, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                📎
              </motion.span>
            </motion.h3>
            
            <motion.p 
              className="text-gray-600 dark:text-gray-400 mb-8 relative z-10 max-w-2xl mx-auto"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Get a detailed overview of my experience, skills, and projects.
              <motion.span 
                className="block mt-3 text-green-500 font-medium"
                initial={{ opacity: 0.5 }}
                whileHover={{ opacity: 1, scale: 1.05 }}
              >
                Ready to explore? Click the button below! 👇
              </motion.span>
            </motion.p>

            {/* Enhanced download section */}
            <div className="relative max-w-sm mx-auto">
              {/* Download speed indicator */}
              {isDownloading && (
                <motion.div 
                  className="absolute -top-12 left-0 right-0 flex justify-between items-center bg-green-500/10 rounded-full px-4 py-2"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                >
                  <span className="text-green-500 font-mono text-sm">
                    ⬇️ {downloadSpeed} MB/s
                  </span>
                  <span className="text-green-500 font-mono text-sm">
                    {downloadProgress}%
                  </span>
                </motion.div>
              )}

              {/* Progress bar with enhanced visuals */}
              {isDownloading && (
                <motion.div 
                  className="absolute -bottom-12 left-0 right-0 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                >
                  <motion.div 
                    className="h-full bg-gradient-to-r from-green-500 to-green-400"
                    initial={{ width: 0 }}
                    animate={{ width: `${downloadProgress}%` }}
                    transition={{ duration: 0.1 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  </motion.div>
                </motion.div>
              )}
              
              <motion.a
                href={currentCvFile}
                onClick={handleDownload}
                download
                className="relative inline-flex items-center justify-center w-full px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-mono overflow-hidden group shadow-lg hover:shadow-green-500/30"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 20px 30px -10px rgba(34, 197, 94, 0.5)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Animated background */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-700"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{ opacity: 0.3 }}
                />
                
                {/* Button content */}
                <span className="relative z-10 flex items-center">
                  <motion.span
                    animate={{ 
                      rotate: isDownloading ? 360 : isHovered ? [0, 15, -15, 0] : 0,
                      scale: isDownloading ? [1, 1.2, 1] : 1
                    }}
                    transition={{ duration: isDownloading ? 0.5 : 0.3 }}
                    className="text-xl"
                  >
                    {isDownloading ? '⏳' : '📥'}
                  </motion.span>
                  
                  <div className="ml-3 flex flex-col items-start">
                    <span className="font-bold">
                      {isDownloading ? 'Downloading...' : 'Download CV'}
                    </span>
                    {!isDownloading && (
                      <span className="text-xs text-green-200">
                        PDF • 2.4 MB
                      </span>
                    )}
                  </div>
                </span>

                {/* Ripple effect on click */}
                {pulseEffect && !isDownloading && (
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ scale: 0, opacity: 0.5 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                )}
              </motion.a>
            </div>

            {/* Enhanced file info */}
            <motion.div 
              className="mt-8 flex justify-center items-center space-x-4 text-sm text-gray-500 dark:text-gray-500 font-mono"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                PDF
              </span>
              <span>•</span>
              <span className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                2.4 MB
              </span>
              <span>•</span>
              <span className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                Updated March 2024
              </span>
            </motion.div>

            {/* Quick preview chips */}
            <motion.div 
              className="mt-8 flex flex-wrap justify-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {['Experience', 'Education', 'Skills', 'Projects', 'Achievements'].map((item, index) => (
                <motion.span
                  key={item}
                  className="px-3 py-1 bg-green-500/10 rounded-full text-xs text-green-500 font-mono cursor-default"
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(34, 197, 94, 0.2)' }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  #{item}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* Enhanced hover info cards */}
          <AnimatePresence>
            {isHovered && (
              <>
                <motion.div 
                  className="absolute -top-6 -left-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-2xl border-2 border-green-500 hidden md:block"
                  initial={{ opacity: 0, scale: 0.8, x: -20, y: -20, rotate: -5 }}
                  animate={{ opacity: 1, scale: 1, x: 0, y: 0, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", damping: 12 }}
                  whileHover={{ scale: 1.05, rotate: 1 }}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">✨</span>
                    {/* <div>
                      <div className="font-bold">5+ years</div>
                      <div className="text-xs text-gray-500">experience</div>
                    </div> */}
                  </div>
                </motion.div>
                
                <motion.div 
                  className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-2xl border-2 border-green-500 hidden md:block"
                  initial={{ opacity: 0, scale: 0.8, x: 20, y: 20, rotate: 5 }}
                  animate={{ opacity: 1, scale: 1, x: 0, y: 0, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", damping: 12, delay: 0.1 }}
                  whileHover={{ scale: 1.05, rotate: -1 }}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">🚀</span>
                    <div>
                      <div className="font-bold">20+ projects</div>
                      <div className="text-xs text-gray-500">completed</div>
                    </div>
                  </div>
                </motion.div>

                {/* Tooltip */}
                <motion.div
                  className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: showTooltip ? 1 : 0, y: showTooltip ? 0 : 10 }}
                  exit={{ opacity: 0 }}
                >
                  👆 Click to download my CV!
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default CVSection;