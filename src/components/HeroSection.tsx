import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { HeroContent } from './types';

interface HeroSectionProps {
  content?: HeroContent;
  logoSrc?: string;
  backgroundImage?: string;
  className?: string;
}

const defaultContent: HeroContent = {
  title: "Welcome Back to Bier Stube",
  subtitle: "Columbus's Authentic German Beer Hall Returns to King Avenue",
  ctaText: "Explore Our Story",
  ctaLink: "/story"
};

const HeroSection: React.FC<HeroSectionProps> = ({
  content = defaultContent,
  logoSrc = '/images.jpg',
  backgroundImage,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [windowHeight, setWindowHeight] = useState(0);

  // Parallax scroll effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  // Smooth spring animations
  const smoothBackgroundY = useSpring(backgroundY, { stiffness: 400, damping: 90 });
  const smoothTextY = useSpring(textY, { stiffness: 400, damping: 90 });

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.2,
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8, y: -30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
        delay: 0.2
      }
    }
  };

  const ctaVariants = {
    hover: {
      scale: 1.05,
      backgroundColor: "#991b1b",
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.95
    }
  };

  // Scroll indicator animation
  const scrollIndicatorVariants = {
    animate: {
      y: [0, 10, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative min-h-screen flex items-center justify-center overflow-hidden ${className}`}
      style={{ height: windowHeight }}
    >
      {/* Background Image with Parallax */}
      <motion.div
        style={{ y: smoothBackgroundY }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        {backgroundImage ? (
          <img
            src={backgroundImage}
            alt="Bier Stube Interior"
            className="w-full h-full object-cover scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-red-900 via-red-800 to-gray-900 scale-110">
            {/* Overlay pattern for vintage feel */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpolygon fill-rule='evenodd' points='50 0 60 40 100 50 60 60 50 100 40 60 0 50 40 40'/%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: '50px 50px'
              }}
            ></div>
          </div>
        )}
      </motion.div>

      {/* Main Content */}
      <motion.div
        style={{ y: smoothTextY, opacity }}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
      >
        {/* Logo */}
        <motion.div
          variants={logoVariants}
          className="mb-8"
        >
          <img
            src={logoSrc}
            alt="Bier Stube Logo"
            className="h-32 sm:h-40 lg:h-48 w-auto mx-auto drop-shadow-2xl"
          />
        </motion.div>

        {/* Main Title */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight"
        >
          <span className="block">{content.title.split(' ').slice(0, 3).join(' ')}</span>
          <span className="block text-red-400 drop-shadow-lg">
            {content.title.split(' ').slice(3).join(' ')}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-xl sm:text-2xl lg:text-3xl text-gray-200 mb-8 font-light leading-relaxed max-w-4xl mx-auto"
        >
          {content.subtitle}
        </motion.p>

        {/* Vintage Divider */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center mb-8"
        >
          <div className="h-px bg-gradient-to-r from-transparent via-red-400 to-transparent w-32"></div>
          <div className="mx-4 text-red-400 text-2xl">★</div>
          <div className="h-px bg-gradient-to-r from-transparent via-red-400 to-transparent w-32"></div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.a
            href={content.ctaLink}
            variants={ctaVariants}
            whileHover="hover"
            whileTap="tap"
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full text-lg font-bold shadow-2xl transition-all duration-300 min-w-[200px]"
          >
            {content.ctaText}
          </motion.a>
          
          <motion.a
            href="/events?category=game_day"
            variants={ctaVariants}
            whileHover={{
              scale: 1.05,
              borderColor: "#BB0000",
              color: "#BB0000",
              transition: { duration: 0.2 }
            }}
            whileTap="tap"
            className="border-2 border-white text-white hover:border-red-500 hover:text-red-500 px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 min-w-[200px]"
          >
            Game Day Events
          </motion.a>
        </motion.div>

        {/* OSU Pride Badge */}
        <motion.div
          variants={itemVariants}
          className="mt-12"
        >
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 text-white">
            <span className="text-red-400 font-bold mr-2">★</span>
            <span className="text-sm font-semibold">Proudly Supporting Ohio State Since 1965</span>
            <span className="text-red-400 font-bold ml-2">★</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        variants={scrollIndicatorVariants}
        animate="animate"
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="flex flex-col items-center text-white/70">
          <span className="text-sm mb-2 font-medium">Scroll to explore</span>
          <motion.div
            className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
          >
            <motion.div
              className="w-1 h-3 bg-white/70 rounded-full mt-2"
              animate={{
                y: [0, 12, 0],
                opacity: [1, 0.3, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Background Elements for Depth */}
      <div className="absolute inset-0 z-10">
        {/* Floating particles/stars effect */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;