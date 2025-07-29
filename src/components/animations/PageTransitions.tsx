import React from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { PAGE_TRANSITIONS, TIMING, shouldReduceMotion, OSU_COLORS } from './config';

interface PageTransitionProps {
  children: React.ReactNode;
  transitionKey: string;
  variant?: keyof typeof PAGE_TRANSITIONS;
  duration?: number;
  className?: string;
}

const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  transitionKey,
  variant = 'fadeScale',
  duration = TIMING.pageTransition,
  className = ''
}) => {
  const variants = PAGE_TRANSITIONS[variant];
  
  // Handle reduced motion
  if (shouldReduceMotion()) {
    return <div className={className}>{children}</div>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={transitionKey}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        transition={{ duration, ease: [0.25, 0.1, 0.25, 1] }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// Loading transition with OSU branding
export const LoadingTransition: React.FC<{
  isLoading: boolean;
  children: React.ReactNode;
  loadingComponent?: React.ReactNode;
}> = ({
  isLoading,
  children,
  loadingComponent
}) => {
  const loadingVariants: Variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { 
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.3 }
    }
  };

  const contentVariants: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { delay: 0.2, duration: 0.5 }
    }
  };

  const DefaultLoader = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1]
        }}
        transition={{
          rotate: { duration: 2, repeat: Infinity, ease: "linear" },
          scale: { duration: 1, repeat: Infinity, ease: "easeInOut" }
        }}
        className="relative mb-8"
      >
        <div 
          className="w-16 h-16 rounded-full border-4 border-transparent"
          style={{ 
            borderTopColor: OSU_COLORS.scarlet,
            borderRightColor: OSU_COLORS.gray + '30'
          }}
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <span className="text-2xl font-bold" style={{ color: OSU_COLORS.scarlet }}>B</span>
        </div>
      </motion.div>
      
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="text-center"
      >
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Loading Bier Stube...</h3>
        <p className="text-gray-600">Preparing your authentic German experience</p>
      </motion.div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center space-x-2 text-gray-400"
        >
          <span className="text-sm">★</span>
          <span className="text-xs font-medium">Est. 1965</span>
          <span className="text-sm">★</span>
        </motion.div>
      </div>
    </div>
  );

  if (shouldReduceMotion()) {
    return isLoading ? (loadingComponent || <DefaultLoader />) : <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loading"
          variants={loadingVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {loadingComponent || <DefaultLoader />}
        </motion.div>
      ) : (
        <motion.div
          key="content"
          variants={contentVariants}
          initial="initial"
          animate="animate"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Route-specific transitions
export const RouteTransitions = {
  // Home page with vintage fade
  home: {
    initial: { 
      opacity: 0, 
      scale: 0.98,
      filter: "sepia(0.5) brightness(0.9)"
    },
    animate: { 
      opacity: 1, 
      scale: 1,
      filter: "sepia(0) brightness(1)",
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
    },
    exit: { 
      opacity: 0, 
      scale: 1.02,
      filter: "sepia(0.3) brightness(0.95)",
      transition: { duration: 0.4 }
    }
  },

  // Menu/Merch with slide from right
  menu: {
    initial: { x: "100%", opacity: 0 },
    animate: { 
      x: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
    },
    exit: { 
      x: "-100%", 
      opacity: 0,
      transition: { duration: 0.4 }
    }
  },

  // Events with bounce effect
  events: {
    initial: { y: 50, opacity: 0, scale: 0.95 },
    animate: { 
      y: 0, 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 20,
        mass: 1
      }
    },
    exit: { 
      y: -50, 
      opacity: 0, 
      scale: 0.95,
      transition: { duration: 0.3 }
    }
  },

  // Story page with book-like flip
  story: {
    initial: { rotateY: -15, opacity: 0, x: -50 },
    animate: { 
      rotateY: 0, 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
    },
    exit: { 
      rotateY: 15, 
      opacity: 0, 
      x: 50,
      transition: { duration: 0.5 }
    }
  },

  // Contact with gentle slide up
  contact: {
    initial: { y: 30, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1]
      }
    },
    exit: { 
      y: -30, 
      opacity: 0,
      transition: { duration: 0.4 }
    }
  }
};

// Modal/Overlay transitions
export const ModalTransition: React.FC<{
  isOpen: boolean;
  children: React.ReactNode;
  onClose?: () => void;
  className?: string;
}> = ({
  isOpen,
  children,
  onClose,
  className = ''
}) => {
  const overlayVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants: Variants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8, 
      y: 50 
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: { duration: 0.2 }
    }
  };

  if (shouldReduceMotion()) {
    return isOpen ? (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className={className}>{children}</div>
      </div>
    ) : null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={overlayVariants}
        >
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={onClose}
            variants={overlayVariants}
          />
          <motion.div
            className={`relative z-10 ${className}`}
            variants={modalVariants}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Drawer/Sidebar transitions
export const DrawerTransition: React.FC<{
  isOpen: boolean;
  children: React.ReactNode;
  direction?: 'left' | 'right' | 'top' | 'bottom';
  className?: string;
}> = ({
  isOpen,
  children,
  direction = 'right',
  className = ''
}) => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'left': return { x: '-100%' };
      case 'right': return { x: '100%' };
      case 'top': return { y: '-100%' };
      case 'bottom': return { y: '100%' };
      default: return { x: '100%' };
    }
  };

  const drawerVariants: Variants = {
    closed: {
      ...getInitialPosition(),
      opacity: 0,
      transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }
    },
    open: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
    }
  };

  if (shouldReduceMotion()) {
    return isOpen ? <div className={className}>{children}</div> : null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="closed"
          animate="open"
          exit="closed"
          variants={drawerVariants}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageTransition;