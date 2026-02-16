// src/components/sections/ProjectsSection.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { useState, lazy, Suspense, useMemo } from 'react';

const ProjectCard = lazy(() => import('../ProjectCard'));

const ProjectsSection = ({ projects, retroEffects }) => {
  const [filter, setFilter] = useState('all');
  const [hoveredProject, setHoveredProject] = useState(null);
  
  // Extract unique technologies from all projects
  const allTechnologies = useMemo(() => {
    const techSet = new Set();
    projects.forEach(project => {
      project.technologies?.forEach(tech => techSet.add(tech));
    });
    return ['all', ...Array.from(techSet)];
  }, [projects]);

  // Filter projects based on selected technology
  const filteredProjects = useMemo(() => {
    if (filter === 'all') return projects;
    return projects.filter(project => 
      project.technologies?.includes(filter)
    );
  }, [projects, filter]);

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 animate-pulse-slow" />
      
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
        <motion.h2 
          className="text-3xl md:text-4xl font-mono font-bold flex items-center"
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.span 
            className="text-green-500 mr-2"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            #
          </motion.span>
          projects
          {retroEffects && (
            <motion.span 
              className="terminal-cursor ml-2 text-green-500"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              _
            </motion.span>
          )}
        </motion.h2>

        {/* Interactive filter chips */}
        <motion.div 
          className="flex flex-wrap gap-2 mt-4 md:mt-0"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          {allTechnologies.map((tech, index) => (
            <motion.button
              key={tech}
              onClick={() => setFilter(tech)}
              className={`px-4 py-2 rounded-lg font-mono text-sm transition-all relative overflow-hidden group
                ${filter === tech 
                  ? 'bg-green-500 text-white shadow-lg shadow-green-500/30' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-900/30'
                }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              {/* Animated background on hover */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.5 }}
              />
              <span className="relative z-10">
                {tech}
                {filter === tech && (
                  <motion.span 
                    className="ml-2 inline-block"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring" }}
                  >
                    ✓
                  </motion.span>
                )}
              </span>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Project count indicator */}
      <motion.div 
        className="mb-6 text-green-500 font-mono text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        key={filteredProjects.length}
      >
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring" }}
          className="inline-block bg-green-500/10 px-3 py-1 rounded-full"
        >
          {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found
        </motion.span>
      </motion.div>

      {/* Projects grid with staggered animation */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="wait">
          <Suspense fallback={
            <div className="col-span-full text-center py-20">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full mx-auto"
              />
            </div>
          }>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -50 }}
                transition={{ 
                  duration: 0.4,
                  delay: index * 0.1,
                  type: "spring",
                  damping: 15
                }}
                onHoverStart={() => setHoveredProject(project.id)}
                onHoverEnd={() => setHoveredProject(null)}
                whileHover={{ y: -10 }}
              >
                <ProjectCard 
                  project={project} 
                  index={index}
                  retroEffects={retroEffects}
                  isHovered={hoveredProject === project.id}
                />
              </motion.div>
            ))}
          </Suspense>
        </AnimatePresence>
      </div>

      {/* Empty state */}
      {filteredProjects.length === 0 && (
        <motion.div 
          className="text-center py-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-gray-600 dark:text-gray-400 font-mono">
            No projects found with {filter} technology
          </p>
          <motion.button
            onClick={() => setFilter('all')}
            className="mt-4 px-6 py-3 bg-green-500 text-white rounded-lg font-mono hover:bg-green-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Clear filter
          </motion.button>
        </motion.div>
      )}
    </section>
  );
};

export default ProjectsSection;