// src/components/sections/ExperienceSection.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { 
  FiCalendar, FiBriefcase, FiExternalLink, FiGithub, FiFilm, 
  FiChevronRight, FiCode, FiBox, FiAward, FiStar, FiCpu,
  FiMonitor, FiSmartphone, FiGlobe, FiLayers
} from 'react-icons/fi';

const ExperienceSection = ({ experiences, retroEffects, accentColors, isGameDev, projects = [] }) => {
  const [hoveredTech, setHoveredTech] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(null);

  if (!experiences || experiences.length === 0) {
    return null;
  }

  // Refined professional color palette with emerald green
  const theme = {
    border: 'border-slate-200 dark:border-slate-800',
    textMuted: 'text-slate-500 dark:text-slate-400',
    accent: 'text-emerald-600 dark:text-emerald-400',
    accentBg: 'bg-emerald-500',
    accentLight: 'bg-emerald-50 dark:bg-emerald-950/30',
    bgSubtle: 'bg-slate-50/50 dark:bg-slate-900/50'
  };

  // Get relevant projects based on tech stack
  const getRelevantProjects = (tech) => {
    if (!projects || projects.length === 0) return [];
    
    return projects.filter(project => 
      project.tech.some(t => tech.includes(t)) || 
      project.tech.some(t => t.toLowerCase().includes('unity') && isGameDev)
    ).slice(0, 2); // Show max 2 relevant projects
  };

  // Get tech category icon
  const getTechIcon = (tech) => {
    if (tech.includes('Unity') || tech.includes('C#')) return <FiBox className="text-emerald-500" />;
    if (tech.includes('React') || tech.includes('TypeScript')) return <FiCode className="text-emerald-500" />;
    if (tech.includes('Node') || tech.includes('Express')) return <FiCpu className="text-emerald-500" />;
    if (tech.includes('MongoDB') || tech.includes('MySQL')) return <FiLayers className="text-emerald-500" />;
    if (tech.includes('WebGL') || tech.includes('Photon')) return <FiMonitor className="text-emerald-500" />;
    return <FiGlobe className="text-emerald-500" />;
  };

  return (
    <section className="py-24 w-full border-t border-slate-100 dark:border-slate-900" id="experience">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* Section Header with Interactive Elements */}
        <motion.div 
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-slate-100 dark:border-slate-800"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col gap-2">
            <motion.div 
              className="flex items-center gap-3 text-emerald-500 font-mono text-sm tracking-widest uppercase"
              whileHover={{ x: 5 }}
            >
              <FiBriefcase className="animate-pulse" />
              <span>Professional Journey</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-sans font-bold tracking-tight text-slate-900 dark:text-white">
              Experience<span className="text-emerald-500">.</span>
            </h2>
          </div>

          <motion.div 
            className="hidden md:flex items-center gap-4 mt-4 md:mt-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {/* Stats Badge */}
            <motion.div 
              className="flex items-center gap-2 font-mono text-xs"
              whileHover={{ scale: 1.05 }}
            >
              <span className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-l-md text-slate-600 dark:text-slate-400">
                total_positions
              </span>
              <span className="px-3 py-1.5 bg-emerald-500 text-white rounded-r-md font-bold">
                {experiences.length}
              </span>
            </motion.div>

            {/* Tech Stack Counter */}
            <motion.div 
              className="flex items-center gap-1"
              whileHover={{ scale: 1.05 }}
            >
              <FiCode className="text-emerald-500" />
              <span className="text-xs text-slate-500">
                {experiences.reduce((acc, exp) => acc + (exp.tech?.length || 0), 0)} technologies
              </span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Experience Timeline */}
        <div className="relative">
          {/* Centralized Timeline Line with gradient */}
          <motion.div 
            className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-emerald-500/20 to-transparent md:-translate-x-1/2 hidden md:block"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          />

          <div className="space-y-12">
            {experiences.map((exp, index) => {
              const relevantProjects = getRelevantProjects(exp.tech);
              const isExpanded = expandedIndex === index;
              
              return (
                <motion.div
                  key={index}
                  className={`relative flex flex-col md:flex-row items-center gap-8 ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Timeline Node with Pulse Animation */}
                  <motion.div 
                    className="absolute left-0 md:left-1/2 w-4 h-4 z-10 hidden md:block md:-translate-x-1/2"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-50" />
                      <div className="relative w-4 h-4 bg-white dark:bg-slate-900 border-2 border-emerald-500 rounded-full shadow-lg" />
                    </div>
                  </motion.div>

                  {/* Content Side */}
                  <div className="w-full md:w-1/2">
                    <motion.div 
                      className="group p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/50 hover:border-emerald-500/50 transition-all duration-300 relative overflow-hidden cursor-pointer"
                      whileHover={{ y: -8, boxShadow: '0 20px 40px -15px rgba(16, 185, 129, 0.2)' }}
                      onClick={() => setExpandedIndex(isExpanded ? null : index)}
                    >
                      {/* Animated Background Pattern */}
                      <motion.div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-100"
                        initial={false}
                        animate={{
                          background: isExpanded 
                            ? 'radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.1), transparent 50%)'
                            : 'none'
                        }}
                      />
                      
                      {/* Floating Tech Icons Background */}
                      {exp.tech?.map((tech, i) => (
                        <motion.div
                          key={i}
                          className="absolute opacity-[0.02] text-4xl"
                          style={{
                            top: `${(i * 20) % 80}%`,
                            left: `${(i * 30) % 80}%`,
                            rotate: i * 45
                          }}
                          animate={{
                            y: [0, -10, 0],
                            rotate: [i * 45, i * 45 + 10, i * 45]
                          }}
                          transition={{
                            duration: 5 + i,
                            repeat: Infinity,
                            delay: i * 0.5
                          }}
                        >
                          {getTechIcon(tech)}
                        </motion.div>
                      ))}
                      
                      <div className="relative z-10">
                        {/* Header with Interactive Elements */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                          <motion.div 
                            className="flex-1"
                            whileHover={{ x: 5 }}
                          >
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors flex items-center gap-2">
                              {exp.role}
                              <FiChevronRight className={`text-emerald-500 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                            </h3>
                            <p className="text-emerald-600 dark:text-emerald-400 font-medium mt-1 flex items-center gap-2">
                              <FiBriefcase className="text-xs" />
                              {exp.company}
                            </p>
                          </motion.div>
                          
                          <motion.div 
                            className="flex items-center gap-2 text-xs font-mono py-1.5 px-3 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-500 border border-slate-200 dark:border-slate-800"
                            whileHover={{ scale: 1.05, backgroundColor: 'rgba(16, 185, 129, 0.1)' }}
                          >
                            <FiCalendar className="text-emerald-500" />
                            {exp.period}
                          </motion.div>
                        </div>

                        {/* Description with Interactive Bullets */}
                        <ul className="space-y-4 mb-6">
                          {exp.description.map((desc, i) => (
                            <motion.li 
                              key={i} 
                              className="flex items-start gap-3 group/item"
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: i * 0.1 }}
                              whileHover={{ x: 5 }}
                            >
                              <motion.span 
                                className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"
                                whileHover={{ scale: 1.5, backgroundColor: '#10b981' }}
                              />
                              <span className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                                {desc}
                              </span>
                            </motion.li>
                          ))}
                        </ul>

                        {/* Expanded Content - Projects Section */}
                        <AnimatePresence>
                          {isExpanded && relevantProjects.length > 0 && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                                <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4 flex items-center gap-2">
                                  <FiAward className="text-emerald-500" />
                                  Featured Projects from this Role
                                </h4>
                                
                                <div className="grid gap-4">
                                  {relevantProjects.map((project, i) => (
                                    <motion.div
                                      key={project.id}
                                      className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: i * 0.1 }}
                                      whileHover={{ x: 5, borderColor: '#10b981' }}
                                    >
                                      <div className="flex items-start justify-between mb-2">
                                        <h5 className="font-semibold text-slate-800 dark:text-slate-200">
                                          {project.title}
                                        </h5>
                                        <div className="flex items-center gap-1">
                                          {project.links?.github && (
                                            <motion.a
                                              href={project.links.github}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="p-1.5 text-slate-500 hover:text-emerald-500 transition-colors"
                                              whileHover={{ scale: 1.1 }}
                                              onClick={(e) => e.stopPropagation()}
                                            >
                                              <FiGithub size={14} />
                                            </motion.a>
                                          )}
                                          {project.links?.live && (
                                            <motion.a
                                              href={project.links.live}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="p-1.5 text-slate-500 hover:text-emerald-500 transition-colors"
                                              whileHover={{ scale: 1.1 }}
                                              onClick={(e) => e.stopPropagation()}
                                            >
                                              <FiExternalLink size={14} />
                                            </motion.a>
                                          )}
                                          {project.links?.video && (
                                            <motion.a
                                              href={project.links.video}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="p-1.5 text-slate-500 hover:text-emerald-500 transition-colors"
                                              whileHover={{ scale: 1.1 }}
                                              onClick={(e) => e.stopPropagation()}
                                            >
                                              <FiFilm size={14} />
                                            </motion.a>
                                          )}
                                        </div>
                                      </div>
                                      <p className="text-xs text-slate-500 mb-2">
                                        {project.shortDescription}
                                      </p>
                                      <div className="flex flex-wrap gap-1">
                                        {project.tech.slice(0, 3).map(t => (
                                          <span key={t} className="text-[10px] px-2 py-0.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full">
                                            {t}
                                          </span>
                                        ))}
                                        {project.tech.length > 3 && (
                                          <span className="text-[10px] px-2 py-0.5 bg-slate-200 dark:bg-slate-800 rounded-full">
                                            +{project.tech.length - 3}
                                          </span>
                                        )}
                                      </div>
                                    </motion.div>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Interactive Tech Stack */}
                        {exp.tech && exp.tech.length > 0 && (
                          <div className="pt-6 border-t border-slate-100 dark:border-slate-900">
                            <div className="flex items-center gap-2 mb-3">
                              <FiCode className="text-emerald-500" />
                              <span className="text-xs font-mono text-slate-400">TECH_STACK</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {exp.tech.map((tech, i) => (
                                <motion.div
                                  key={i}
                                  className="relative"
                                  onHoverStart={() => setHoveredTech(tech)}
                                  onHoverEnd={() => setHoveredTech(null)}
                                  whileHover={{ scale: 1.05, y: -2 }}
                                >
                                  <span className="px-2.5 py-1 text-[11px] font-mono font-semibold uppercase tracking-wider bg-slate-100 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 rounded border border-slate-200 dark:border-slate-700/50 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all duration-300 flex items-center gap-1">
                                    {getTechIcon(tech)}
                                    {tech}
                                  </span>
                                  
                                  {/* Tooltip on hover */}
                                  <AnimatePresence>
                                    {hoveredTech === tech && (
                                      <motion.div
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 5 }}
                                        className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-slate-900 text-white text-[10px] rounded whitespace-nowrap z-20"
                                      >
                                        {isGameDev ? 'Game Dev Tool' : 'Web Technology'}
                                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Quick Stats */}
                        <div className="mt-4 flex items-center gap-4 text-[10px] text-slate-400">
                          <div className="flex items-center gap-1">
                            <FiStar className="text-emerald-500" />
                            <span>{exp.tech?.length || 0} technologies</span>
                          </div>
                          {relevantProjects.length > 0 && (
                            <div className="flex items-center gap-1">
                              <FiBox className="text-emerald-500" />
                              <span>{relevantProjects.length} related projects</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Expand/Collapse Indicator */}
                      <motion.div 
                        className="absolute bottom-4 right-4 text-emerald-500/50 text-xs font-mono"
                        animate={{ opacity: isExpanded ? 1 : 0.5 }}
                      >
                        {isExpanded ? 'click to collapse' : 'click to expand'}
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Empty Side for Spacing on Desktop */}
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Footer with Interactive Elements */}
        
      </div>
    </section>
  );
};

export default ExperienceSection;