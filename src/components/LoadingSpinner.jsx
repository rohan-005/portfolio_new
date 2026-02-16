// src/components/LoadingSpinner.jsx
import { motion } from 'framer-motion';

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-black">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="w-12 h-12 border-4 border-royal-blue-500 border-t-transparent rounded-full"
      />
    </div>
  );
};

export default LoadingSpinner;