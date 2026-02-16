import { motion, AnimatePresence } from 'framer-motion';

const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className="fixed bottom-6 right-6 z-50 p-3 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden"
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === 'light' ? (
          <motion.div
            key="sun"
            initial={{ y: 30, rotation: -40, opacity: 0 }}
            animate={{ y: 0, rotation: 0, opacity: 1 }}
            exit={{ y: -30, rotation: 40, opacity: 0 }}
            transition={{ duration: 0.3, ease: "backOut" }}
          >
            {/* Detailed Sun Icon */}
            <svg className="w-6 h-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707m12.728 0A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="rgba(255, 255, 255, 1)" />
              <circle cx="12" cy="12" r="4" fill="currentColor" />
            </svg>
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ y: 30, rotation: 40, opacity: 0 }}
            animate={{ y: 0, rotation: 0, opacity: 1 }}
            exit={{ y: -30, rotation: -40, opacity: 0 }}
            transition={{ duration: 0.3, ease: "backOut" }}
          >
            {/* Detailed Moon Icon */}
            <svg className="w-6 h-6 text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default ThemeToggle;