import React, { useState } from 'react';
import { motion, Variants, MotionProps } from 'framer-motion';
import { HOVER_EFFECTS, VINTAGE_EFFECTS, OSU_COLORS, SPRINGS, shouldReduceMotion } from './config';

interface HoverWrapperProps {
  children: React.ReactNode;
  effect?: keyof typeof HOVER_EFFECTS;
  customHover?: any;
  disabled?: boolean;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  onClick?: () => void;
}

const HoverWrapper: React.FC<HoverWrapperProps> = ({
  children,
  effect = 'lift',
  customHover,
  disabled = false,
  className = '',
  as: Component = 'div',
  onClick
}) => {
  const hoverEffect = customHover || HOVER_EFFECTS[effect];
  
  const animationProps = shouldReduceMotion() || disabled
    ? {}
    : { whileHover: hoverEffect, whileTap: { scale: 0.98 } };

  return React.createElement(
    motion[Component as keyof typeof motion] as any,
    {
      className,
      onClick,
      ...animationProps
    },
    children
  );
};

// Enhanced Product Card Hover
export const ProductCardHover: React.FC<{
  children: React.ReactNode;
  isOSUThemed?: boolean;
  className?: string;
}> = ({ children, isOSUThemed = false, className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);

  const cardVariants: Variants = {
    rest: {
      scale: 1,
      y: 0,
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }
    },
    hover: {
      scale: 1.03,
      y: -8,
      boxShadow: isOSUThemed 
        ? `0 20px 25px -5px rgba(187, 0, 0, 0.2), 0 10px 10px -5px rgba(187, 0, 0, 0.1)`
        : `0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.1)`,
      transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }
    }
  };

  // Vintage glow effect for OSU-themed items
  const glowVariants: Variants = {
    rest: { 
      opacity: 0,
      scale: 0.8
    },
    hover: {
      opacity: isOSUThemed ? 0.3 : 0,
      scale: 1.1,
      transition: { duration: 0.4 }
    }
  };

  if (shouldReduceMotion()) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={`relative ${className}`}
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={cardVariants}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Glow effect for OSU items */}
      {isOSUThemed && (
        <motion.div
          className="absolute -inset-2 rounded-xl blur-lg"
          style={{ backgroundColor: OSU_COLORS.scarlet }}
          variants={glowVariants}
          initial="rest"
          animate={isHovered ? "hover" : "rest"}
        />
      )}
      
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Vintage corner accents */}
      {isOSUThemed && isHovered && (
        <>
          <motion.div
            className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2"
            style={{ borderColor: OSU_COLORS.scarlet }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, ...SPRINGS.bouncy }}
          />
          <motion.div
            className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2"
            style={{ borderColor: OSU_COLORS.scarlet }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, ...SPRINGS.bouncy }}
          />
          <motion.div
            className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2"
            style={{ borderColor: OSU_COLORS.scarlet }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, ...SPRINGS.bouncy }}
          />
          <motion.div
            className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2"
            style={{ borderColor: OSU_COLORS.scarlet }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25, ...SPRINGS.bouncy }}
          />
        </>
      )}
    </motion.div>
  );
};

// Enhanced Button Hover Effects
export const AnimatedButton: React.FC<{
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'osu' | 'vintage';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  className = ''
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-red-600 text-white border-2 border-red-600';
      case 'secondary':
        return 'bg-gray-600 text-white border-2 border-gray-600';
      case 'outline':
        return 'bg-transparent text-gray-800 border-2 border-gray-300';
      case 'osu':
        return `text-white border-2 border-red-600`;
      case 'vintage':
        return 'bg-yellow-100 text-gray-800 border-2 border-yellow-600';
      default:
        return 'bg-red-600 text-white border-2 border-red-600';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'px-4 py-2 text-sm';
      case 'md':
        return 'px-6 py-3 text-base';
      case 'lg':
        return 'px-8 py-4 text-lg';
      default:
        return 'px-6 py-3 text-base';
    }
  };

  const buttonVariants: Variants = {
    rest: {
      scale: 1,
      backgroundColor: variant === 'osu' ? OSU_COLORS.scarlet : undefined,
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }
    },
    hover: {
      scale: 1.05,
      backgroundColor: variant === 'osu' ? '#990000' : undefined,
      boxShadow: variant === 'osu' 
        ? "0 8px 25px rgba(187, 0, 0, 0.3)"
        : "0 8px 25px rgba(0, 0, 0, 0.15)",
      transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }
    },
    press: {
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  // Ripple effect for OSU variant
  const rippleVariants: Variants = {
    rest: { scale: 0, opacity: 0 },
    press: {
      scale: 4,
      opacity: [0.3, 0],
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  if (shouldReduceMotion() || disabled) {
    return (
      <button
        className={`rounded-lg font-semibold transition-colors duration-200 ${getVariantStyles()} ${getSizeStyles()} ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        } ${className}`}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }

  return (
    <motion.button
      className={`relative overflow-hidden rounded-lg font-semibold ${getVariantStyles()} ${getSizeStyles()} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
      variants={buttonVariants}
      initial="rest"
      whileHover={disabled ? undefined : "hover"}
      whileTap={disabled ? undefined : "press"}
      onClick={onClick}
      disabled={disabled}
      onTapStart={() => setIsPressed(true)}
      onTap={() => setIsPressed(false)}
      onTapCancel={() => setIsPressed(false)}
    >
      {/* Ripple effect for OSU variant */}
      {variant === 'osu' && isPressed && (
        <motion.div
          className="absolute inset-0 rounded-full bg-white/20"
          variants={rippleVariants}
          initial="rest"
          animate="press"
          style={{ originX: 0.5, originY: 0.5 }}
        />
      )}
      
      {/* Vintage texture overlay */}
      {variant === 'vintage' && (
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M0 0h60v60H0z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '30px 30px'
          }}
        />
      )}
      
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

// Interactive Icon Hover
export const AnimatedIcon: React.FC<{
  children: React.ReactNode;
  effect?: 'spin' | 'bounce' | 'pulse' | 'shake' | 'vintage';
  trigger?: 'hover' | 'click' | 'auto';
  className?: string;
}> = ({
  children,
  effect = 'bounce',
  trigger = 'hover',
  className = ''
}) => {
  const [isTriggered, setIsTriggered] = useState(false);

  const getEffectVariants = (): Variants => {
    switch (effect) {
      case 'spin':
        return {
          rest: { rotate: 0 },
          active: { 
            rotate: 360,
            transition: { duration: 0.6, ease: "easeInOut" }
          }
        };
      case 'bounce':
        return {
          rest: { y: 0 },
          active: { 
            y: [-5, 0, -3, 0],
            transition: { duration: 0.5, ease: "easeInOut" }
          }
        };
      case 'pulse':
        return {
          rest: { scale: 1 },
          active: { 
            scale: [1, 1.2, 1],
            transition: { duration: 0.4, ease: "easeInOut" }
          }
        };
      case 'shake':
        return {
          rest: { x: 0 },
          active: { 
            x: [-2, 2, -2, 2, 0],
            transition: { duration: 0.3 }
          }
        };
      case 'vintage':
        return {
          rest: { 
            scale: 1,
            filter: "sepia(0) hue-rotate(0deg)"
          },
          active: { 
            scale: 1.1,
            filter: "sepia(0.3) hue-rotate(10deg)",
            transition: { duration: 0.3 }
          }
        };
      default:
        return {
          rest: { y: 0 },
          active: { y: -5 }
        };
    }
  };

  const variants = getEffectVariants();

  if (shouldReduceMotion()) {
    return <div className={className}>{children}</div>;
  }

  const motionProps: MotionProps = {
    className,
    variants,
    initial: "rest",
    animate: (trigger === 'auto' || isTriggered) ? "active" : "rest"
  };

  if (trigger === 'hover') {
    motionProps.whileHover = "active";
  } else if (trigger === 'click') {
    motionProps.whileTap = "active";
    motionProps.onTap = () => setIsTriggered(!isTriggered);
  }

  return (
    <motion.div {...motionProps}>
      {children}
    </motion.div>
  );
};

// Magnetic hover effect for special elements
export const MagneticHover: React.FC<{
  children: React.ReactNode;
  strength?: number;
  className?: string;
}> = ({ children, strength = 20, className = '' }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) / (rect.width / 2);
    const deltaY = (e.clientY - centerY) / (rect.height / 2);
    
    setMousePosition({
      x: deltaX * strength,
      y: deltaY * strength
    });
  };

  if (shouldReduceMotion()) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      animate={{
        x: isHovered ? mousePosition.x : 0,
        y: isHovered ? mousePosition.y : 0
      }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
};

export {
  HoverWrapper,
  HOVER_EFFECTS,
  VINTAGE_EFFECTS
};