// src/components/sections/AboutSection.jsx
import { motion } from 'framer-motion';

const AboutSection = ({ about, retroEffects }) => {
  return (
    <section className="py-20 relative">
      <div className="flex items-center mb-12">
        <h2 className="text-3xl md:text-4xl font-mono font-bold flex items-center">
          <span className="text-royal-blue-500 mr-2">$</span>
          about_me
          {retroEffects && <span className="terminal-cursor ml-2 text-royal-blue-500">_</span>}
        </h2>
        
        {/* Doodle */}
        <div className="ml-4 text-royal-blue-500/30">
          <svg width="40" height="20" viewBox="0 0 100 50">
            <path d="M10,25 L90,25 M30,10 L70,40" stroke="rgba(0, 0, 0, 1)" strokeWidth="2" />
          </svg>
        </div>
      </div>

      <motion.div 
        className="grid md:grid-cols-2 gap-12 items-start"
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative">
          <div className="pixel-border p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 font-mono">
              {about}
            </p>
            
            {/* Retro console decoration */}
            <div className="mt-4 flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="border-l-4 border-royal-blue-500 pl-6">
            <h3 className="text-xl font-bold font-mono mb-2">Current Focus</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Final year Computer Science student passionate about creating 
              impactful digital experiences through code and creativity.
            </p>
          </div>
          
          <div className="border-l-4 border-royal-blue-500 pl-6">
            <h3 className="text-xl font-bold font-mono mb-2">Approach</h3>
            <p className="text-gray-600 dark:text-gray-400">
              I believe in clean, maintainable code and intuitive user experiences. 
              Whether it's game mechanics or web applications, I focus on the details 
              that matter.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;