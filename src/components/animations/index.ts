// Animation system exports for Bier Stube
export * from './config';

// Core animation components
export { default as ScrollReveal, ScrollRevealText, ScrollRevealGrid, ScrollRevealSection, useScrollReveal } from './ScrollReveal';
export { default as PageTransition, LoadingTransition, RouteTransitions, ModalTransition, DrawerTransition } from './PageTransitions';
export { HoverWrapper, ProductCardHover, AnimatedButton, AnimatedIcon, MagneticHover } from './InteractiveHovers';
export { default as Parallax, ParallaxBackground, ParallaxLayers, ParallaxText, FloatingElements, ScrollProgress, useParallax } from './Parallax';
export { BierStubeSpinner, BeerMugLoader, SkeletonCard, SkeletonGrid, PulsingDots, ProgressBar, TypewriterText, FullPageLoader } from './LoadingAnimations';
export { Timeline, TimelineItem, OurStoryTimeline, AnimatedCounter, MilestoneShowcase } from './TimelineAnimations';

// Re-export common Framer Motion components and hooks for convenience
export { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from 'framer-motion';

// Animation configuration constants
export {
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
} from './config';