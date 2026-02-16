/* eslint-disable no-unused-vars */
// src/components/sections/ContactSection.jsx
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";

const ContactSection = ({ email, retroEffects }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [serverError, setServerError] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [focusedField, setFocusedField] = useState(null);
  const [touchedFields, setTouchedFields] = useState({});
  
  const formRef = useRef(null);
  const messageRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.style.height = 'auto';
      messageRef.current.style.height = messageRef.current.scrollHeight + 'px';
    }
  }, [formData.message]);

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setServerError("");

    const validationErrors = validate();
    if (Object.keys(validationErrors).length !== 0) {
      setErrors(validationErrors);
      
      // Shake form on error
      if (formRef.current) {
        formRef.current.classList.add('shake');
        setTimeout(() => formRef.current?.classList.remove('shake'), 500);
      }
      return;
    }

    setIsSending(true);

    emailjs
      .send(
        "service_rqqgcjq",
        "template_vcczbnb",
        {
          name: formData.name,
          email: formData.email,
          message: formData.message
        },
        "TASXWRDBxS5N39b1y"
      )
      .then(
        () => {
          setIsSending(false);
          setIsSubmitted(true);
          setFormData({ name: "", email: "", message: "" });
          setCharCount(0);
          setTouchedFields({});

          setTimeout(() => setIsSubmitted(false), 5000);
        },
        (error) => {
          console.error(error);
          setIsSending(false);
          setServerError("Oops! Something went wrong. Please try again.");
        }
      );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'message') {
      setCharCount(value.length);
    }

    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }

    // Mark field as touched
    if (!touchedFields[name]) {
      setTouchedFields(prev => ({
        ...prev,
        [name]: true
      }));
    }
  };

  const handleBlur = (field) => {
    setFocusedField(null);
    
    // Validate on blur for touched fields
    if (touchedFields[field]) {
      const validationErrors = validate();
      if (validationErrors[field]) {
        setErrors(prev => ({
          ...prev,
          [field]: validationErrors[field]
        }));
      }
    }
  };

  // Fixed animation variants without currentColor
  const inputVariants = {
    focused: { scale: 1.02, borderColor: '#22c55e', boxShadow: '0 0 0 3px rgba(34, 197, 94, 0.1)' },
    blurred: { scale: 1, borderColor: '#e5e7eb', boxShadow: '0 0 0 0px rgba(34, 197, 94, 0)' },
    error: { borderColor: '#ef4444', boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.1)' }
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        {/* <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-green-500/5" /> */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 border border-green-500/10 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
              scale: 0
            }}
            animate={{
              scale: [0, 2, 0],
              opacity: [0, 0.5, 0],
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <motion.div 
          className="flex items-center mb-12"
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-mono font-bold flex items-center">
            <motion.span 
              className="text-green-500 mr-2"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              $
            </motion.span>
            contact_me
            {retroEffects && (
              <motion.span 
                className="terminal-cursor ml-2 text-green-500"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                _
              </motion.span>
            )}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left column - Contact info */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h3 
              className="text-2xl font-bold font-mono mb-6 flex items-center"
              animate={{ x: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <span className="text-green-500 mr-2">💬</span>
              Get in touch
            </motion.h3>
            
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              I'm always interested in hearing about new opportunities,
              collaborations, or just having a chat about tech and games.
            </p>

            {/* Contact methods */}
            <div className="space-y-4">
              <motion.div 
                className="flex items-center space-x-4 group"
                whileHover={{ x: 10 }}
              >
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                  <svg
                    className="w-6 h-6 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-500">Email</p>
                  <a
                    href={`mailto:${email}`}
                    className="font-mono hover:text-green-500 transition-colors relative group"
                  >
                    {email}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-500 group-hover:w-full transition-all duration-300" />
                  </a>
                </div>
              </motion.div>

              {/* Social links */}
              

              {/* Availability badge */}
              <motion.div 
                className="mt-8 p-4 bg-green-500/10 rounded-lg border border-green-500/30"
                animate={{ 
                  boxShadow: ['0 0 0px rgba(34,197,94,0)', '0 0 20px rgba(34,197,94,0.3)', '0 0 0px rgba(34,197,94,0)']
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="flex items-center space-x-3">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  <span className="font-mono text-sm text-green-500">Available for opportunities</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right column - Contact form */}
          <motion.div
            ref={formRef}
            initial={{ x: 30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-mono mb-2 text-gray-700 dark:text-gray-300 flex justify-between"
                >
                  <span>Name</span>
                  {touchedFields.name && !errors.name && formData.name && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-green-500"
                    >
                      ✓ Valid
                    </motion.span>
                  )}
                </label>
                <motion.input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => handleBlur('name')}
                  variants={inputVariants}
                  animate={
                    errors.name ? 'error' : 
                    focusedField === 'name' ? 'focused' : 'blurred'
                  }
                  transition={{ type: "spring", damping: 15 }}
                  className={`w-full px-4 py-3 bg-white dark:bg-gray-900 border-2 rounded-lg font-mono focus:outline-none transition-all
                    ${errors.name 
                      ? 'border-red-500' 
                      : focusedField === 'name' 
                        ? 'border-green-500' 
                        : 'border-gray-300 dark:border-gray-700'
                    }`}
                />
                <AnimatePresence>
                  {errors.name && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-1 text-sm text-red-500 flex items-center"
                    >
                      <span className="mr-1">⚠️</span>
                      {errors.name}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Email field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-mono mb-2 text-gray-700 dark:text-gray-300 flex justify-between"
                >
                  <span>Email</span>
                  {touchedFields.email && !errors.email && formData.email && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-green-500"
                    >
                      ✓ Valid
                    </motion.span>
                  )}
                </label>
                <motion.input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => handleBlur('email')}
                  variants={inputVariants}
                  animate={
                    errors.email ? 'error' : 
                    focusedField === 'email' ? 'focused' : 'blurred'
                  }
                  transition={{ type: "spring", damping: 15 }}
                  className={`w-full px-4 py-3 bg-white dark:bg-gray-900 border-2 rounded-lg font-mono focus:outline-none transition-all
                    ${errors.email 
                      ? 'border-red-500' 
                      : focusedField === 'email' 
                        ? 'border-green-500' 
                        : 'border-gray-300 dark:border-gray-700'
                    }`}
                />
                <AnimatePresence>
                  {errors.email && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-1 text-sm text-red-500 flex items-center"
                    >
                      <span className="mr-1">⚠️</span>
                      {errors.email}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Message field */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-mono mb-2 text-gray-700 dark:text-gray-300 flex justify-between"
                >
                  <span>Message</span>
                  <span className={`text-xs ${charCount < 10 ? 'text-red-500' : 'text-green-500'}`}>
                    {charCount}/500
                  </span>
                </label>
                <motion.textarea
                  ref={messageRef}
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => handleBlur('message')}
                  variants={inputVariants}
                  animate={
                    errors.message ? 'error' : 
                    focusedField === 'message' ? 'focused' : 'blurred'
                  }
                  transition={{ type: "spring", damping: 15 }}
                  className={`w-full px-4 py-3 bg-white dark:bg-gray-900 border-2 rounded-lg font-mono focus:outline-none transition-all resize-none
                    ${errors.message 
                      ? 'border-red-500' 
                      : focusedField === 'message' 
                        ? 'border-green-500' 
                        : 'border-gray-300 dark:border-gray-700'
                    }`}
                  maxLength="500"
                />
                <AnimatePresence>
                  {errors.message && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-1 text-sm text-red-500 flex items-center"
                    >
                      <span className="mr-1">⚠️</span>
                      {errors.message}
                    </motion.p>
                  )}
                </AnimatePresence>
                
                {/* Character count progress bar */}
                <div className="mt-2 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-green-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${(charCount / 500) * 100}%` }}
                    transition={{ type: "spring" }}
                  />
                </div>
              </div>

              {/* Server error */}
              <AnimatePresence>
                {serverError && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="p-4 border-2 border-red-500 text-red-500 rounded-lg font-mono flex items-center"
                  >
                    <span className="mr-2 text-xl">⚠️</span>
                    {serverError}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit button */}
              <motion.button
                type="submit"
                disabled={isSending}
                className="relative w-full px-6 py-4 bg-green-500 text-white rounded-lg font-mono overflow-hidden group disabled:opacity-60"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Button background animation */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-400"
                  animate={{
                    x: ['0%', '100%', '0%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{
                    backgroundSize: '200% 100%'
                  }}
                />
                
                {/* Button content */}
                <span className="relative z-10 flex items-center justify-center">
                  {isSending ? (
                    <>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="mr-2"
                      >
                        ⏳
                      </motion.span>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <motion.span
                        className="ml-2 inline-block"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </>
                  )}
                </span>
              </motion.button>

              {/* Success message */}
              <AnimatePresence>
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.9 }}
                    className="p-4 bg-green-500/10 border-2 border-green-500 rounded-lg text-green-700 dark:text-green-400 font-mono flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="mr-2 text-xl"
                      >
                        ✨
                      </motion.span>
                      Message sent successfully!
                    </div>
                    <motion.button
                      onClick={() => setIsSubmitted(false)}
                      className="text-green-500 hover:text-green-600"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      ✕
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Add shake animation keyframes to your global CSS */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
          }
          .shake {
            animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
          }
        `
      }} />
    </section>
  );
};

export default ContactSection;