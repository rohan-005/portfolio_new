/* eslint-disable no-unused-vars */
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import SocialLinks from "../SocialLinks";

const HeroSection = ({
  hero,
  name,
  retroEffects,
  isGameDev,
  about,
  social,
}) => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [terminalHistory, setTerminalHistory] = useState([]);
  const timeoutRef = useRef(null);
  const terminalRef = useRef(null);

  // Mouse Parallax for the terminal
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const moveX = (clientX - window.innerWidth / 2) / 25;
    const moveY = (clientY - window.innerHeight / 2) / 25;
    mouseX.set(moveX);
    mouseY.set(moveY);
  };

  const terminalCommands = [
    { cmd: "whoami", output: name },
    { cmd: "pwd", output: "/home/developer" },
    { cmd: "ls -la", output: "README.md  projects/  skills/" },
    { cmd: "git status", output: "✨ Ready to collaborate" },
  ];

  useEffect(() => {
    const role = hero.typingRoles[currentRoleIndex];
    let charIndex = 0;
    setDisplayText("");

    const type = () => {
      if (charIndex <= role.length) {
        setDisplayText(role.slice(0, charIndex));
        charIndex++;
        timeoutRef.current = setTimeout(type, 80);
      } else {
        timeoutRef.current = setTimeout(() => {
          setCurrentRoleIndex((prev) => (prev + 1) % hero.typingRoles.length);
        }, 1800);
      }
    };
    type();
    return () => clearTimeout(timeoutRef.current);
  }, [currentRoleIndex, hero.typingRoles]);

  // Add to terminal history when typing completes
  useEffect(() => {
    if (displayText && displayText === hero.typingRoles[currentRoleIndex]) {
      setTerminalHistory((prev) => [
        ...prev.slice(-3),
        `$ ./role --${displayText.toLowerCase().replace(/\s+/g, "-")}`,
      ]);
    }
  }, [displayText, currentRoleIndex, hero.typingRoles]);

  return (
    <section
      onMouseMove={handleMouseMove}
      className="w-full min-h-screen flex items-center relative py-20 overflow-hidden bg-gradient-to-br from-slate-50 to-white dark:from-black dark:to-black transition-colors duration-500"
    >
      {/* Dynamic Background - Enhanced contrast */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,200,150,0.1)_0%,transparent_70%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(0,255,200,0.15)_0%,transparent_70%)]" />

      <div className="absolute inset-0 bg-black/40 [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]" />
      {/* Floating particles - Subtle */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-emerald-400/20 dark:bg-emerald-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 7,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="w-full px-6 md:px-12 lg:px-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          {/* LEFT SIDE: Enhanced Content with Better Typography */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5 space-y-8"
          >
            {/* Status badge - More prominent */}
            <motion.div
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 shadow-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-sm font-medium tracking-wide text-emerald-700 dark:text-emerald-300">
                OPEN TO WORK • 2026
              </span>
            </motion.div>

            {/* Name with Premium Font Stack */}
            <h1 className="space-y-2">
              <span className="block text-lg font-mono tracking-[0.3em] text-emerald-600 dark:text-emerald-400">
                HELLO, I'M
              </span>
              <span
                className="block  font-black dark:font-white dark:bg-gradient-to-br dark:from-white dark:via-slate-200 dark:to-slate-400 dark:bg-clip-text"
                style={{
                  fontFamily:
                    "'Clash Display', 'Poppins', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontSize: "clamp(3.5rem, 10vw, 5.5rem)",
                  // lineHeight: 1,
                  // letterSpacing: '-0.02em',
                  // background: 'linear-gradient(135deg, #0A0A0A 0%, #2D2D2D 50%, #0A0A0A 100%)',
                  // WebkitBackgroundClip: 'text',
                  // WebkitTextFillColor: 'transparent',
                  // backgroundClip: 'text',
                }}
              >
                {name}
              </span>
            </h1>

            {/* Dynamic Role Display */}
            {/* <div className="flex items-center gap-3 text-xl font-mono text-slate-600 dark:text-slate-300 bg-white/50 dark:bg-black/30 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-emerald-500 font-bold">$</span>
              <span className="text-amber-600 dark:text-amber-400">./current-role</span>
              <span className="text-slate-700 dark:text-slate-200 font-semibold">{displayText}</span>
              <motion.span
                className="w-1 h-7 bg-emerald-500"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            </div> */}

            {/* About - Enhanced readability */}
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed border-l-4 border-emerald-500 pl-6 bg-gradient-to-r from-emerald-50/50 to-transparent dark:from-emerald-950/20 py-3 rounded-r-lg">
              {about || hero.subtitle}
            </p>

            {/* Focus Areas - Enhanced with better visibility */}
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="bg-white dark:bg-slate-900/50 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <h3 className="text-sm font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-3">
                  Core Focus
                </h3>
                <ul className="space-y-2">
                  <li className="text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                    React & Next.js
                  </li>
                  <li className="text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                    WebGL & Three.js
                  </li>
                  <li className="text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                    Framer Motion
                  </li>
                </ul>
              </div>
              <div className="bg-white dark:bg-slate-900/50 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <h3 className="text-sm font-black uppercase tracking-widest text-purple-600 dark:text-purple-400 mb-3">
                  Philosophy
                </h3>
                <ul className="space-y-2">
                  <li className="text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                    Clean Code
                  </li>
                  <li className="text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                    Performance
                  </li>
                  <li className="text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                    UX First
                  </li>
                </ul>
              </div>
            </div>

            {/* Social Links */}
            <div className="-ml-40">
              <SocialLinks social={social} retroEffects={retroEffects} />
            </div>
          </motion.div>

          {/* RIGHT SIDE: Terminal - Static without hover effect */}
          <motion.div
            // style={{ x: springX, y: springY }}
            className="lg:col-span-7 relative flex items-center justify-center"
          >
            <motion.div
              ref={terminalRef}
              className="w-full max-w-2xl font-mono bg-slate-900 text-slate-100 p-8 rounded-2xl border border-slate-800 shadow-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {/* Terminal Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  </div>
                  <span className="text-sm text-slate-500">
                    developer@portfolio:~/terminal
                  </span>
                </div>
                <div className="flex gap-2 text-xs">
                  <span className="px-2 py-1 bg-slate-800 rounded text-slate-400">
                    zsh
                  </span>
                  <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-full">
                    ● active
                  </span>
                </div>
              </div>

              {/* Terminal Body - Enhanced Content */}
              <div className="space-y-5">
                {/* Welcome Message */}
                <div className="text-emerald-400 mb-4 font-mono bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                  <span className="text-slate-500">┌──(</span>Welcome to
                  Portfolio v3.0<span className="text-slate-500">)──[~]</span>
                </div>

                {/* Terminal History */}
                {terminalHistory.map((cmd, i) => (
                  <div key={i} className="text-slate-400 text-sm font-mono">
                    <span className="text-emerald-500">$</span> {cmd}
                  </div>
                ))}

                {/* Current Typing Line */}
                <div className="flex items-center gap-3 text-base bg-slate-800 p-4 rounded-lg border border-slate-700">
                  <span className="text-emerald-500 font-bold text-xl">➜</span>
                  <span className="text-amber-400 font-mono">
                    ~/development
                  </span>
                  <span className="text-slate-200 font-medium">
                    {displayText}
                  </span>
                  <motion.span
                    className="w-2 h-6 bg-emerald-500"
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                </div>

                {/* Quick Stats Grid - Enhanced */}
                {/* <div className="grid grid-cols-3 gap-3 mt-4">
                  <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                    <span className="text-xs text-slate-500 block mb-1">PROJECTS</span>
                    <span className="text-2xl font-bold text-emerald-400">24+</span>
                    <span className="text-xs text-slate-600 block mt-1">completed</span>
                  </div>
                  <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                    <span className="text-xs text-slate-500 block mb-1">EXPERIENCE</span>
                    <span className="text-2xl font-bold text-amber-400">5+</span>
                    <span className="text-xs text-slate-600 block mt-1">years</span>
                  </div>
                  <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                    <span className="text-xs text-slate-500 block mb-1">SATISFACTION</span>
                    <span className="text-2xl font-bold text-purple-400">100%</span>
                    <span className="text-xs text-slate-600 block mt-1">clients</span>
                  </div>
                </div> */}

                {/* Available Commands - Interactive but without hover effect */}
                <div className="mt-6">
                  <div className="text-xs text-slate-500 mb-3 flex items-center gap-2">
                    <span className="w-1 h-1 bg-emerald-500 rounded-full"></span>
                    AVAILABLE COMMANDS:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {terminalCommands.map((cmd, i) => (
                      <button
                        key={i}
                        className="px-4 py-2 bg-slate-800 rounded-lg text-sm text-slate-300 border border-slate-700 cursor-pointer transition-colors hover:border-emerald-500 hover:text-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                        onClick={() => alert(`${cmd.cmd} → ${cmd.output}`)}
                      >
                        <span className="text-emerald-500">$</span> {cmd.cmd}
                      </button>
                    ))}
                  </div>
                </div>

                {/* System Info - Enhanced */}
                <div className="mt-6 pt-4 border-t border-slate-800 grid grid-cols-2 gap-4 text-sm text-slate-400">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                    <span>
                      System: <span className="text-slate-300">Online</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                    <span>
                      Uptime: <span className="text-slate-300">99.9%</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    <span>
                      Load: <span className="text-slate-300">Optimal</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-rose-500 rounded-full"></span>
                    <span>
                      Status: <span className="text-slate-300">Ready</span>
                    </span>
                  </div>
                </div>

                {/* Bottom Prompt */}
                <div className="text-sm text-slate-600 mt-4 flex items-center gap-2">
                  <span className="text-emerald-500">❯</span>
                  <span>Type 'help' for available commands...</span>
                  <span className="text-slate-700">|</span>
                  <span className="text-emerald-500/50">_</span>
                </div>
              </div>
            </motion.div>

            {/* Terminal Label - Static */}
            <div className="absolute -top-4 -right-4 bg-slate-900 text-emerald-400 text-xs px-4 py-2 rounded-full border border-emerald-500/30 font-mono shadow-lg">
              ⚡ interactive terminal
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator - Enhanced */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer"
        onClick={() =>
          window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
        }
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-emerald-500 via-emerald-500/30 to-transparent" />
        <span className="text-xs font-mono uppercase tracking-[0.25em] text-slate-500">
          EXPLORE
        </span>
        <div className="w-4 h-4 border-b-2 border-r-2 border-slate-400 rotate-45 animate-bounce" />
      </div>

      {/* Add font link in your HTML head */}
      <link
        href="https://api.fontshare.com/v2/css?f[]=clash-display@200,300,400,500,600,700&display=swap"
        rel="stylesheet"
      />
    </section>
  );
};

export default HeroSection;
