// src/components/SocialLinks.jsx
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaGlobe, FaDiscord, FaUnity } from 'react-icons/fa';

const SocialLinks = ({ social, retroEffects }) => {
  const socialIcons = {
    github: {
      icon: <FaGithub className="w-5 h-5" />,
      label: 'GitHub'
    },
    linkedin: {
      icon: <FaLinkedin className="w-5 h-5" />,
      label: 'LinkedIn'
    },
    twitter: {
      icon: <FaTwitter className="w-5 h-5" />,
      label: 'Twitter'
    },
    website: {
      icon: <FaGlobe className="w-5 h-5" />,
      label: 'Website'
    },
    discord: {
      icon: <FaDiscord className="w-5 h-5" />,
      label: 'Discord'
    },
    unity: {
      icon: <FaUnity className="w-5 h-5" />,
      label: 'Unity'
    }
  };

  return (
    <section className="py-12 border-t border-gray-200 dark:border-gray-800">
      <div className="flex flex-col items-center">
        <div className="flex space-x-6">
          {Object.entries(social).map(([key, url]) => (
            <motion.a
              key={key}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group"
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-gray-700 dark:text-gray-300 group-hover:text-royal-blue-500 group-hover:bg-royal-blue-500/10 transition-all">
                {socialIcons[key]?.icon}
              </div>
              
              {/* Tooltip */}
              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {socialIcons[key]?.label}
              </span>
            </motion.a>
          ))}
        </div>
        
        {/* <p className="mt-8 text-sm text-gray-500 dark:text-gray-500 font-mono">
          © {new Date().getFullYear()} Rohan Dhanerwal. All rights reserved.
        </p> */} 
      </div>
    </section>
  );
};

export default SocialLinks;