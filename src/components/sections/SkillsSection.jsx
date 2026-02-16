// src/components/sections/SkillsSection.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';

const SkillsSection = ({ skills, profileType, retroEffects }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); 
  const [expandedCategories, setExpandedCategories] = useState({});

  const skillCategories = useMemo(() => {
    if (profileType === 'game') {
      return [
        { id: 'core', title: 'Core Skills', skills: skills.core || [], icon: '🎮' },
        { id: 'tools', title: 'Tools', skills: skills.tools || [], icon: '🛠️' },
        { id: 'engines', title: 'Engines', skills: skills.engines || [], icon: '⚙️' }
      ];
    }
    return [
      { id: 'frontend', title: 'Frontend', skills: skills.frontend || [], icon: '🎨' },
      { id: 'backend', title: 'Backend', skills: skills.backend || [], icon: '⚡' },
      { id: 'databases', title: 'Databases', skills: skills.databases || [], icon: '🗄️' },
      { id: 'devops', title: 'DevOps', skills: skills.devops || [], icon: '🚀' }
    ];
  }, [skills, profileType]);

  const filteredCategories = useMemo(() => {
    return skillCategories
      .map(category => ({
        ...category,
        skills: category.skills.filter(skill =>
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        )
      }))
      .filter(category => 
        (activeCategory === 'all' || category.id === activeCategory) &&
        category.skills.length > 0
      );
  }, [skillCategories, searchTerm, activeCategory]);

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  return (
    <section className="py-20 relative overflow-hidden group/section">
      {/* 1. Added: Interactive Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      {/* 2. Added: Retro Scanline Effect (CSS Injection) */}
      <style>{`
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .retro-scanline {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent, rgba(34, 197, 94, 0.05), transparent);
          height: 10px;
          animation: scanline 8s linear infinite;
          pointer-events: none;
          z-index: 50;
        }
        .skill-card-glow:hover {
          box-shadow: 0 0 20px rgba(34, 197, 94, 0.2);
          border-color: rgba(34, 197, 94, 0.8) !important;
        }
      `}</style>
      
      {retroEffects && <div className="retro-scanline" />}

      <div className="relative z-10 container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-mono font-bold flex items-center"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            {/* Added: Glitch Effect to $ sign */}
            <motion.span 
              className="text-green-500 mr-2 inline-block"
              animate={{ 
                skewX: [0, -20, 20, 0],
                x: [0, -2, 2, 0]
              }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
            >
              $
            </motion.span>
            skills_&_tools
            {retroEffects && (
              <motion.span 
                className="ml-2 w-3 h-8 bg-green-500 inline-block"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            )}
          </motion.h2>

          {/* Controls */}
          <div className="flex gap-3 mt-6 md:mt-0">
            <motion.div className="relative group/search">
              <input
                type="text"
                placeholder="Search skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 pl-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-2 border-green-500/30 rounded-lg font-mono text-sm focus:border-green-500 focus:outline-none transition-all w-full md:w-64"
              />
              <span className="absolute left-3 top-2.5 text-green-500 group-focus-within/search:scale-125 transition-transform">🔍</span>
            </motion.div>

            <motion.button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="p-2 bg-white dark:bg-gray-800 border-2 border-green-500/30 rounded-lg hover:border-green-500 transition-all shadow-sm"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              {viewMode === 'grid' ? '📋' : '📊'}
            </motion.button>
          </div>
        </div>

        {/* Category filters */}
        <motion.div className="flex flex-wrap gap-3 mb-12">
          {['all', ...skillCategories.map(c => c.id)].map((id) => {
            const category = skillCategories.find(c => c.id === id);
            const isActive = activeCategory === id;
            return (
              <motion.button
                key={id}
                onClick={() => setActiveCategory(id)}
                className={`px-5 py-2 rounded-full font-mono text-sm transition-all border-2 
                  ${isActive 
                    ? 'bg-green-500 border-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.4)]' 
                    : 'bg-transparent border-gray-300 dark:border-gray-700 hover:border-green-500/50'
                  }`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {id === 'all' ? 'All' : `${category?.icon} ${category?.title}`}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Skills display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode + activeCategory + searchTerm}
            className={viewMode === 'grid' 
              ? `grid ${profileType === 'game' ? 'md:grid-cols-3' : 'md:grid-cols-4'} gap-8`
              : 'max-w-4xl mx-auto space-y-4'
            }
          >
            {filteredCategories.map((category) => (
              <motion.div key={category.id} layout className="relative">
                <motion.div
                  onClick={() => viewMode === 'list' && toggleCategory(category.id)}
                  className={`flex items-center justify-between mb-6 ${viewMode === 'list' ? 'p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl cursor-pointer hover:bg-green-50 dark:hover:bg-green-900/10 transition-colors' : ''}`}
                >
                  <h3 className="text-xl font-bold font-mono flex items-center gap-3">
                    <span className="p-2 bg-green-500/10 rounded-lg">{category.icon}</span>
                    {category.title}
                  </h3>
                  {viewMode === 'list' && <span>{expandedCategories[category.id] ? '−' : '+'}</span>}
                </motion.div>

                <AnimatePresence>
                  {(viewMode === 'grid' || expandedCategories[category.id]) && (
                    <motion.div 
                      className={viewMode === 'grid' ? 'flex flex-wrap gap-3' : 'grid grid-cols-2 md:grid-cols-4 gap-3 pb-4'}
                    >
                      {category.skills.map((skill, index) => (
                        <motion.div
                          key={skill}
                          layout
                          whileHover={{ scale: 1.05, y: -5 }}
                          className="skill-card-glow relative group bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-xl p-3 transition-all"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <span className="font-mono text-sm font-semibold">{skill}</span>
                            {/* Animated Bit-bar */}
                            <div className="flex gap-0.5">
                              {[1, 2, 3].map((bit) => (
                                <motion.div
                                  key={bit}
                                  className="w-1.5 h-3 bg-green-500/20 rounded-full overflow-hidden"
                                >
                                  <motion.div 
                                    className="w-full bg-green-500"
                                    animate={{ height: ['0%', '100%', '0%'] }}
                                    transition={{ 
                                      duration: 1.5, 
                                      repeat: Infinity, 
                                      delay: index * 0.1 + bit * 0.2 
                                    }}
                                  />
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          {/* Tooltip Overlay */}
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-green-500/5 transition-opacity rounded-xl pointer-events-none" />
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {filteredCategories.length === 0 && (
          <motion.div className="text-center py-20 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl">
            <div className="text-5xl mb-4 text-green-500/50">404_SKILL_NOT_FOUND</div>
            <p className="font-mono opacity-60 mb-6">No data matches your query.</p>
            <button onClick={() => {setSearchTerm(''); setActiveCategory('all');}} className="text-green-500 font-mono hover:underline">
              {'>'} RESET_FILTERS
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default SkillsSection;