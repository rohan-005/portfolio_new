// src/App.jsx
import { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import portfolioData from './data/portfolio.json';
import LandingSplit from './components/LandingSplit';
import ProfileShell from './components/ProfileShell';
import CollapsedProfileBar from './components/CollapsedProfileBar';
import ThemeToggle from './components/ThemeToggle';
import RetroOverlayLayer from './components/RetroOverlayLayer';
import LoadingSpinner from './components/LoadingSpinner';

const SEO = lazy(() => import('./components/SEO'));

function App() {
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isSwitching, setIsSwitching] = useState(false);
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleProfileSelect = (profileId) => {
    setSelectedProfile(profileId);
  };

  const handleSwapProfile = () => {
    setIsSwitching(true);
    
    // Add haptic feedback if available
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(50);
    }
    
    setTimeout(() => {
      setSelectedProfile(prev => 
        prev === 'gameDeveloper' ? 'fullStackDeveloper' : 'gameDeveloper'
      );
      setTimeout(() => {
        setIsSwitching(false);
      }, 100);
    }, 200);
  };

  const pageVariants = {
    initial: { opacity: 0, scale: 0.98 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.98,
      transition: {
        duration: 0.4
      }
    }
  };

  return (
    <HelmetProvider>
      <Suspense fallback={<LoadingSpinner />}>
        <SEO person={portfolioData.person} />
      </Suspense>
      
      <div className={`min-h-screen ${theme} transition-colors duration-300 overflow-hidden`}>
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        {/* <RetroOverlayLayer enabled={portfolioData.theme.allowRetroEffects} /> */}
        
        <AnimatePresence mode="wait">
          {!selectedProfile ? (
            <motion.div
              key="landing"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="h-screen"
            >
              <LandingSplit 
                profiles={portfolioData.profiles}
                onSelect={handleProfileSelect}
                retroEffects={portfolioData.theme.allowRetroEffects}
              />
            </motion.div>
          ) : (
            <motion.div
              key="profile"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex h-screen overflow-hidden"
            >
              <motion.div
                initial={{ width: '100%', x: selectedProfile === 'gameDeveloper' ? -100 : 100 }}
                animate={{ 
                  width: 'calc(100% - 80px)',
                  x: 0,
                  transition: {
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.2
                  }
                }}
                exit={{ width: '100%', opacity: 0 }}
                className="h-full overflow-y-auto relative"
              >
                {isSwitching && (
                  <motion.div 
                    className="absolute inset-0 z-50 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className={`absolute inset-0 ${
                      selectedProfile === 'gameDeveloper' 
                        ? 'bg-gradient-to-r from-game-green-500/20 via-green-500/20 to-transparent' 
                        : 'bg-gradient-to-l from-royal-blue-500/20 via-terminal-green-500/20 to-transparent'
                    }`} />
                  </motion.div>
                )}
                
                <motion.div
                  key={selectedProfile}
                  initial={{ 
                    opacity: 0,
                    y: 50,
                    rotateX: -10,
                    scale: 0.95
                  }}
                  animate={{ 
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    scale: 1,
                    transition: {
                      type: "spring",
                      damping: 20,
                      stiffness: 100,
                      delay: 0.3
                    }
                  }}
                  exit={{ 
                    opacity: 0,
                    y: -50,
                    rotateX: 10,
                    scale: 0.95
                  }}
                  className="h-full"
                >
                  <ProfileShell 
                    profileData={portfolioData.profiles[selectedProfile]}
                    personData={portfolioData.person}
                    theme={portfolioData.theme}
                    retroEffects={portfolioData.theme.allowRetroEffects}
                    isActive={!isSwitching}
                  />
                </motion.div>
              </motion.div>
              
              <CollapsedProfileBar 
                profile={selectedProfile === 'gameDeveloper' ? 
                  portfolioData.profiles.fullStackDeveloper : 
                  portfolioData.profiles.gameDeveloper
                }
                onSwap={handleSwapProfile}
                retroEffects={portfolioData.theme.allowRetroEffects}
                isSwitching={isSwitching}
              />
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="noise-overlay" />
      </div>
    </HelmetProvider>
  );
}

export default App;