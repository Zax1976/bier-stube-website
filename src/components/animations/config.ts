// Animation configuration and constants for Bier Stube
import { Variants, Transition } from 'framer-motion';

// OSU Brand Colors
export const OSU_COLORS = {
  scarlet: '#BB0000',
  gray: '#666666',
  white: '#FFFFFF',
  black: '#000000',
  lightGray: '#F5F5F5'
} as const;

// Animation Timing Constants
export const TIMING = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  verySlow: 0.8,
  pageTransition: 0.6
} as const;

// Easing Curves
export const EASINGS = {
  smooth: [0.25, 0.1, 0.25, 1],
  spring: [0.6, 0.05, 0.2, 0.9],
  bounce: [0.68, -0.55, 0.265, 1.55],
  gentle: [0.25, 0.46, 0.45, 0.94]
} as const;

// Spring Configurations
export const SPRINGS = {
  gentle: {
    type: "spring" as const,
    stiffness: 100,
    damping: 15,
    mass: 1
  },
  bouncy: {
    type: "spring" as const,
    stiffness: 400,
    damping: 17,
    mass: 1
  },
  snappy: {
    type: "spring" as const,
    stiffness: 500,
    damping: 30,
    mass: 1
  },
  wobbly: {
    type: "spring" as const,
    stiffness: 180,
    damping: 12,
    mass: 1
  }
} as const;

// Common Animation Variants
export const COMMON_VARIANTS = {
  // Fade animations
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 }
  },
  
  fadeInDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  },
  
  fadeInLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  },
  
  fadeInRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 }
  },
  
  // Scale animations
  scaleIn: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 }
  },
  
  scaleInCenter: {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0, opacity: 0 }
  },
  
  // Slide animations
  slideInUp: {
    initial: { y: "100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "100%", opacity: 0 }
  },
  
  slideInDown: {
    initial: { y: "-100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "-100%", opacity: 0 }
  },
  
  slideInLeft: {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 }
  },
  
  slideInRight: {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 }
  }
} as const;

// Stagger Configuration
export const STAGGER_CONFIG = {
  container: {
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  },
  
  fastContainer: {
    animate: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  },
  
  slowContainer: {
    animate: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }
} as const;

// Hover Effects
export const HOVER_EFFECTS = {
  lift: {
    y: -8,
    transition: { duration: TIMING.fast, ease: EASINGS.smooth }
  },
  
  scale: {
    scale: 1.05,
    transition: { duration: TIMING.fast, ease: EASINGS.smooth }
  },
  
  scaleDown: {
    scale: 0.95,
    transition: { duration: TIMING.fast, ease: EASINGS.smooth }
  },
  
  colorShift: {
    color: OSU_COLORS.scarlet,
    transition: { duration: TIMING.fast }
  },
  
  vintage: {
    scale: 1.02,
    filter: "sepia(0.3) contrast(1.1)",
    transition: { duration: TIMING.normal, ease: EASINGS.smooth }
  }
} as const;

// OSU-themed vintage animations
export const VINTAGE_EFFECTS = {
  oldPaper: {
    filter: "sepia(0.2) contrast(1.1) brightness(1.1)",
    transition: { duration: TIMING.slow }
  },
  
  goldGlow: {
    boxShadow: `0 0 20px ${OSU_COLORS.scarlet}40`,
    transition: { duration: TIMING.normal }
  },
  
  pennantWave: {
    rotateZ: [0, 2, -2, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
} as const;

// Reduced Motion Configuration
export const REDUCED_MOTION_CONFIG = {
  initial: false,
  animate: false,
  transition: { duration: 0 }
} as const;

// Utility function to check for reduced motion preference
export const shouldReduceMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Animation duration multiplier based on user preference
export const getAnimationConfig = (config: any) => {
  if (shouldReduceMotion()) {
    return REDUCED_MOTION_CONFIG;
  }
  return config;
};

// Page transition variants
export const PAGE_TRANSITIONS = {
  slideLeft: {
    initial: { x: '100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '-100%', opacity: 0 }
  },
  
  slideRight: {
    initial: { x: '-100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '100%', opacity: 0 }
  },
  
  fadeScale: {
    initial: { scale: 0.95, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 1.05, opacity: 0 }
  },
  
  vintage: {
    initial: { 
      opacity: 0, 
      scale: 0.98,
      filter: "sepia(0.8) brightness(0.8)"
    },
    animate: { 
      opacity: 1, 
      scale: 1,
      filter: "sepia(0) brightness(1)"
    },
    exit: { 
      opacity: 0, 
      scale: 1.02,
      filter: "sepia(0.8) brightness(0.8)"
    }
  }
} as const;

export default {
  OSU_COLORS,
  TIMING,
  EASINGS,
  SPRINGS,
  COMMON_VARIANTS,
  STAGGER_CONFIG,
  HOVER_EFFECTS,
  VINTAGE_EFFECTS,
  PAGE_TRANSITIONS,
  shouldReduceMotion,
  getAnimationConfig
};