// src/components/ProjectCard.jsx
import { motion } from "framer-motion";
import { useState } from "react";
import { Tooltip } from "@material-tailwind/react";

const ProjectCard = ({
  project,
  index,
  retroEffects,
  isGameDev
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Theme colors (Orange for Game, Green for Fullstack)
  const colors = isGameDev
    ? {
        text: "text-orange-500",
        border: "border-orange-500",
        bgSoft: "bg-orange-500/10",
        borderSoft: "border-orange-500/20",
        gradient: "from-orange-500/20 via-transparent to-transparent",
        glow: "shadow-orange-500/10",
        badge: "text-orange-600 bg-orange-50 dark:bg-orange-500/10 dark:text-orange-400",
        button: "bg-orange-500 hover:bg-orange-600",
        icon: "text-orange-500",
        hoverGlow: "group-hover:shadow-orange-500/20",
        hoverBorder: "group-hover:border-orange-500/30"
      }
    : {
        text: "text-emerald-500",
        border: "border-emerald-500",
        bgSoft: "bg-emerald-500/10",
        borderSoft: "border-emerald-500/20",
        gradient: "from-emerald-500/20 via-transparent to-transparent",
        glow: "shadow-emerald-500/10",
        badge: "text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 dark:text-emerald-400",
        button: "bg-emerald-500 hover:bg-emerald-600",
        icon: "text-emerald-500",
        hoverGlow: "group-hover:shadow-emerald-500/20",
        hoverBorder: "group-hover:border-emerald-500/30"
      };

  const handleImageError = () => setImageError(true);

  const imageSrc = imageError
    ? `https://via.placeholder.com/600x400/1a1a1a/ffffff?text=${encodeURIComponent(
        project.title
      )}`
    : project.media.cover;

  return (
    <motion.article
      initial={{ y: 32, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.2 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`group relative w-full max-w-[26rem] overflow-hidden rounded-2xl
                 bg-white dark:bg-gray-900 shadow-lg
                 transition-all duration-300 flex flex-col h-full
                 hover:shadow-2xl ${colors.hoverGlow} ${colors.hoverBorder}
                 border border-gray-200/70 dark:border-gray-800`}
    >
      {/* Animated gradient overlay on hover */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className={`absolute inset-0 rounded-2xl pointer-events-none
                    bg-gradient-to-br ${colors.gradient}`}
      />

      {/* Card Header with Image */}
      <div className="relative h-48 overflow-hidden rounded-t-2xl bg-gray-100 dark:bg-gray-800">
        <motion.img
          src={project.media.cover}
          alt={project.title}
          loading="lazy"
          onError={handleImageError}
          className="w-full h-full object-cover"
          animate={{ 
            scale: isHovered ? 1.08 : 1,
          }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Gradient Overlay with hover effect */}
        <motion.div 
          animate={{ opacity: isHovered ? 0.6 : 0.4 }}
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
        />

        {/* Category Badge with hover effect */}
        {/* <motion.div
          animate={{ 
            y: isHovered ? 0 : -2,
            opacity: isHovered ? 1 : 0.9
          }}
          className="absolute top-4 left-4"
        >
          <span className={`px-3 py-1.5 text-xs font-semibold tracking-wide
                          rounded-full shadow-lg ${colors.badge}
                          backdrop-blur-sm bg-opacity-90`}>
            {isGameDev ? "🎮 GAME DEV" : "💻 FULL STACK"}
          </span>
        </motion.div> */}

        {/* New: View Project overlay on image hover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-black/40 flex items-center justify-center"
        >
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: isHovered ? 1 : 0.8, opacity: isHovered ? 1 : 0 }}
            transition={{ delay: 0.1 }}
            className="px-4 py-2 bg-white dark:bg-gray-900 rounded-full
                       text-sm font-semibold text-gray-900 dark:text-white
                       shadow-xl"
          >
            View Project
          </motion.span>
        </motion.div>
      </div>

      {/* Card Body */}
      <div className="p-6 flex flex-col flex-grow relative z-10">
        {/* Title and Rating Section */}
        <div className="mb-3 flex items-center justify-between">
          <motion.h3 
            animate={{ x: isHovered ? 2 : 0 }}
            className="text-xl font-semibold tracking-tight
                       text-gray-900 dark:text-white line-clamp-1
                       group-hover:text-emerald-500 transition-colors duration-300"
            title={project.title}
          >
            {project.title}
          </motion.h3>
          
          {/* Project Complexity/Difficulty Rating with hover effect */}
          {/* <motion.div 
            animate={{ scale: isHovered ? 1.1 : 1 }}
            className="flex items-center gap-1 bg-gray-50 dark:bg-gray-800/50 
                       px-2 py-1 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4 text-yellow-500"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
              {project.complexity || '4.5'}
            </span>
          </motion.div> */}
        </div>

        {/* Description with subtle hover effect */}
        <motion.p
          animate={{ opacity: isHovered ? 1 : 0.9 }}
          className="text-sm leading-relaxed text-gray-600 dark:text-gray-400 
                     mb-6 line-clamp-3 min-h-[4.5rem]"
          title={project.shortDescription}
        >
          {project.shortDescription}
        </motion.p>

        {/* Tech Stack Section */}
        <div className="mb-6">
          <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-500 
                       uppercase tracking-wider mb-3">
            Technologies Used
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.tech.slice(0, 4).map((tech, i) => (
              <Tooltip key={i} content={tech}>
                <motion.span
                  whileHover={{ 
                    scale: 1.05,
                    y: -2,
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full
                            cursor-default transition-all duration-200
                            ${colors.bgSoft} ${colors.text}
                            border ${colors.borderSoft}
                            hover:shadow-md ${colors.glow}
                            hover:border-opacity-50`}
                >
                  {tech}
                </motion.span>
              </Tooltip>
            ))}

            {project.tech.length > 4 && (
              <Tooltip content={`${project.tech.length - 4} more technologies`}>
                <motion.span
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-3 py-1.5 text-xs font-medium rounded-full
                           bg-gray-100 dark:bg-gray-800
                           text-gray-600 dark:text-gray-400
                           border border-gray-200 dark:border-gray-700
                           cursor-default hover:shadow-md transition-all"
                >
                  +{project.tech.length - 4}
                </motion.span>
              </Tooltip>
            )}
          </div>
        </div>

        {/* Key Features Section */}
        {project.features && project.features.length > 0 && (
          <div className="mb-6">
            <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-500 
                         uppercase tracking-wider mb-3">
              Key Features
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.features.slice(0, 3).map((feature, i) => (
                <Tooltip key={i} content={feature.name}>
                  <motion.span
                    whileHover={{ 
                      scale: 1.1,
                      rotate: [0, -5, 5, -5, 0],
                      transition: { duration: 0.3 }
                    }}
                    className="cursor-default rounded-full 
                             border border-gray-200 dark:border-gray-700
                             bg-gray-50 dark:bg-gray-800/50
                             p-2 text-gray-600 dark:text-gray-400
                             transition-all hover:border-gray-300 
                             dark:hover:border-gray-600 hover:bg-gray-100 
                             dark:hover:bg-gray-800"
                  >
                    <span className="text-sm">{feature.icon}</span>
                  </motion.span>
                </Tooltip>
              ))}
              {project.features.length > 3 && (
                <Tooltip content={`${project.features.length - 3} more features`}>
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="cursor-default rounded-full 
                             border border-gray-200 dark:border-gray-700
                             bg-gray-50 dark:bg-gray-800/50
                             px-3 py-2 text-xs font-medium
                             text-gray-600 dark:text-gray-400
                             hover:shadow-md transition-all"
                  >
                    +{project.features.length - 3}
                  </motion.span>
                </Tooltip>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Card Footer */}
      <div className="p-6 pt-0 mt-auto relative z-10">
        <div className="flex items-center gap-3">
          {project.links.github && (
            <motion.a
              whileHover={{ 
                scale: 1.03,
                backgroundColor: "#1f2937",
              }}
              whileTap={{ scale: 0.98 }}
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2
                       px-4 py-2.5 text-sm font-semibold rounded-lg
                       bg-gray-900 dark:bg-gray-700
                       text-white hover:bg-gray-800 dark:hover:bg-gray-600
                       transition-all duration-200 shadow-md hover:shadow-lg
                       relative overflow-hidden group/btn"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Button hover effect */}
              <motion.span
                className="absolute inset-0 bg-white/10"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <svg className="w-4 h-4 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.447-1.27.098-2.646 0 0 .84-.269 2.75 1.025.8-.223 1.65-.334 2.5-.334.85 0 1.7.111 2.5.334 1.91-1.294 2.75-1.025 2.75-1.025.545 1.376.201 2.393.099 2.646.64.698 1.03 1.591 1.03 2.682 0 3.841-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              <span className="relative z-10">Code</span>
            </motion.a>
          )}

          {project.links.live && (
            <motion.a
              whileHover={{ 
                scale: 1.03,
              }}
              whileTap={{ scale: 0.98 }}
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-1 inline-flex items-center justify-center gap-2
                       px-4 py-2.5 text-sm font-semibold rounded-lg
                       text-white shadow-md hover:shadow-lg
                       transition-all duration-200 ${colors.button}
                       relative overflow-hidden group/btn`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Button hover effect */}
              <motion.span
                className="absolute inset-0 bg-white/20"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <svg className="w-4 h-4 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5V7l6.5 4.5L11 16.5z" />
              </svg>
              <span className="relative z-10">Live Link</span>
            </motion.a>
          )}
        </div>
      </div>

      {/* Bottom shine effect on hover */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0.6 : 0 }}
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r 
                   from-transparent via-white/50 to-transparent"
      />
    </motion.article>
  );
};

export default ProjectCard;