// src/components/ProfileShell.jsx
import { motion } from "framer-motion";
import { lazy, Suspense, useEffect, useRef } from "react";

const HeroSection = lazy(() => import("./sections/HeroSection"));
const ExperienceSection = lazy(() => import("./sections/ExperienceSection"));
const ProjectsSection = lazy(() => import("./sections/ProjectsSection"));
const SkillsSection = lazy(() => import("./sections/SkillsSection"));
const CVSection = lazy(() => import("./sections/CVSection"));
const ContactSection = lazy(() => import("./sections/ContactSection"));
const SocialLinks = lazy(() => import("./SocialLinks"));
const LoadingSpinner = lazy(() => import("./LoadingSpinner"));

const ProfileShell = ({
  profileData,
  personData,
  theme,
  retroEffects,
  isActive,
}) => {
  const sectionRef = useRef(null);
  const isGameDev = profileData.id === "game";

  // Check if sections have data
  const hasExperience =
    profileData.experience && profileData.experience.length > 0;
  const hasProjects = profileData.projects && profileData.projects.length > 0;
  const hasSkills =
    profileData.skills && Object.keys(profileData.skills).length > 0;
  const hasCV = profileData.cvFile;

  const accentColors = isGameDev
    ? {
        primary: "green-500",
        secondary: "game-green-500",
        gradient: "from-green-500 via-game-green-500 to-green-600",
        light: "green-100",
        dark: "green-900",
      }
    : {
        primary: "royal-blue-500",
        secondary: "terminal-green-500",
        gradient: "from-royal-blue-500 via-terminal-green-500 to-green-500",
        light: "blue-100",
        dark: "blue-900",
      };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [profileData.id]);

  const sectionVariants = {
    hidden: { opacity: 0, y: 60, rotateX: -15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: {
      opacity: 0,
      y: -60,
      rotateX: 15,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      ref={sectionRef}
      className={`min-h-screen bg-white dark:bg-black relative ${
        isActive ? "animate-profile-switch" : ""
      }`}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Animated background gradient */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br ${accentColors.gradient} opacity-[0.02]`}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 2, -2, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
      </div>

      {/* Main content - full width container */}
      <div className="w-full relative z-10">
        <Suspense fallback={<LoadingSpinner />}>
          {/* Hero Section - Always visible */}
          <motion.div variants={sectionVariants} custom={0} className="w-full">
            <HeroSection
              hero={profileData.hero}
              name={personData.name}
              retroEffects={retroEffects}
              accentColors={accentColors}
              isGameDev={isGameDev}
              about={profileData.about}
              social={personData.social}
            />
          </motion.div>

          {/* Experience Section - Only render if has experience */}
          {hasExperience && (
            <motion.div
              variants={sectionVariants}
              custom={1}
              transition={{ delay: 0.1 }}
              className="w-full px-6 md:px-12 lg:px-16 max-w-7xl mx-auto"
            >
              <ExperienceSection
                experiences={profileData.experience}
                retroEffects={retroEffects}
                accentColors={accentColors}
                isGameDev={isGameDev}
              />
            </motion.div>
          )}

          {/* Projects Section - Only render if has projects */}
          {hasProjects && (
            <motion.div
              variants={sectionVariants}
              custom={2}
              transition={{ delay: 0.2 }}
              className="w-full px-6 md:px-12 lg:px-16 max-w-7xl mx-auto"
            >
              <ProjectsSection
                projects={profileData.projects}
                retroEffects={retroEffects}
                accentColors={accentColors}
                isGameDev={isGameDev}
              />
            </motion.div>
          )}

          {/* Skills Section - Only render if has skills */}
          {hasSkills && (
            <motion.div
              variants={sectionVariants}
              custom={3}
              transition={{ delay: 0.3 }}
              className="w-full px-6 md:px-12 lg:px-16 max-w-7xl mx-auto"
            >
              <SkillsSection
                skills={profileData.skills}
                profileType={profileData.id}
                retroEffects={retroEffects}
                accentColors={accentColors}
                isGameDev={isGameDev}
              />
            </motion.div>
          )}

          {/* CV Section - Only render if has CV file */}
          {hasCV && (
            <motion.div
              variants={sectionVariants}
              custom={4}
              transition={{ delay: 0.4 }}
              className="w-full px-6 md:px-12 lg:px-16 max-w-7xl mx-auto"
            >
              <CVSection
                cvFile={profileData.cvFile}
                retroEffects={retroEffects}
                accentColors={accentColors}
                isGameDev={isGameDev}
              />
            </motion.div>
          )}

          {/* Contact Section - Always visible */}
          <motion.div
            variants={sectionVariants}
            custom={5}
            transition={{ delay: 0.5 }}
            className="w-full px-6 md:px-12 lg:px-16 max-w-7xl mx-auto"
          >
            <ContactSection
              email={personData.email}
              retroEffects={retroEffects}
              accentColors={accentColors}
              isGameDev={isGameDev}
            />
          </motion.div>
          <SocialLinks 
              social={personData.social}
              retroEffects={retroEffects}
              accentColors={accentColors}
            />
        </Suspense>
      </div>
    </motion.div>
  );
};

export default ProfileShell;





