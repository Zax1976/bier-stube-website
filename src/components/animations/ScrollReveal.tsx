import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { COMMON_VARIANTS, SPRINGS, TIMING, shouldReduceMotion } from './config';

interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: keyof typeof COMMON_VARIANTS;
  customVariants?: Variants;
  delay?: number;
  duration?: number;
  threshold?: number;
  triggerOnce?: boolean;
  stagger?: number;
  spring?: keyof typeof SPRINGS;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  variant = 'fadeInUp',
  customVariants,
  delay = 0,
  duration = TIMING.normal,
  threshold = 0.1,
  triggerOnce = true,
  stagger = 0,
  spring,
  className = '',
  as: Component = 'div'
}) => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { 
    threshold, 
    triggerOnce,
    margin: "-50px 0px -50px 0px"
  });

  // Use custom variants or predefined ones
  const variants = customVariants || COMMON_VARIANTS[variant];
  
  // Build transition config
  const transition = spring 
    ? SPRINGS[spring]
    : { duration, delay, ease: [0.25, 0.1, 0.25, 1] };

  // Handle reduced motion
  const animationProps = shouldReduceMotion() 
    ? { initial: false }
    : {
        initial: "initial",
        animate: isInView ? "animate" : "initial",
        variants,
        transition
      };

  return React.createElement(
    motion[Component as keyof typeof motion] as any,
    {
      ref,
      className,
      ...animationProps
    },
    children
  );
};

// Specialized components for common use cases
export const ScrollRevealText: React.FC<Omit<ScrollRevealProps, 'as'> & { 
  text: string;
  splitBy?: 'word' | 'character';
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
}> = ({ 
  text, 
  splitBy = 'word',
  stagger = 0.05,
  variant = 'fadeInUp',
  as: Component = 'p',
  className = '',
  ...rest 
}) => {
  const words = splitBy === 'word' ? text.split(' ') : text.split('');
  
  const containerVariants: Variants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: stagger,
        delayChildren: 0.1
      }
    }
  };

  const childVariants = COMMON_VARIANTS[variant];

  if (shouldReduceMotion()) {
    return React.createElement(
      Component,
      { className },
      text
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-50px" }}
      className={className}
    >
      {words.map((item, index) => (
        <motion.span
          key={index}
          variants={childVariants}
          style={{ display: 'inline-block', marginRight: splitBy === 'word' ? '0.25em' : '0' }}
        >
          {item}
          {splitBy === 'word' && index < words.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </motion.div>
  );
};

// Grid/List reveal with stagger effect
export const ScrollRevealGrid: React.FC<{
  children: React.ReactNode;
  stagger?: number;
  columns?: number;
  className?: string;
  variant?: keyof typeof COMMON_VARIANTS;
}> = ({ 
  children, 
  stagger = 0.1, 
  columns = 3,
  className = '',
  variant = 'fadeInUp'
}) => {
  const containerVariants: Variants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: stagger,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = COMMON_VARIANTS[variant];

  if (shouldReduceMotion()) {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-${columns} gap-6 ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-100px" }}
      className={`grid grid-cols-1 md:grid-cols-${columns} gap-6 ${className}`}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

// Section reveal with decorative elements
export const ScrollRevealSection: React.FC<{
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  showDecorator?: boolean;
  decoratorColor?: string;
  className?: string;
  variant?: keyof typeof COMMON_VARIANTS;
}> = ({
  children,
  title,
  subtitle,
  showDecorator = true,
  decoratorColor = '#BB0000',
  className = '',
  variant = 'fadeInUp'
}) => {
  const sectionVariants: Variants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = COMMON_VARIANTS[variant];

  const decoratorVariants: Variants = {
    initial: { scaleX: 0, opacity: 0 },
    animate: {
      scaleX: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: 0.3,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  if (shouldReduceMotion()) {
    return (
      <section className={`py-16 ${className}`}>
        {title && (
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
            {subtitle && <p className="text-xl text-gray-600">{subtitle}</p>}
            {showDecorator && (
              <div className="flex items-center justify-center mt-6">
                <div className="h-px bg-gray-300 w-16"></div>
                <div className="mx-4 text-2xl" style={{ color: decoratorColor }}>★</div>
                <div className="h-px bg-gray-300 w-16"></div>
              </div>
            )}
          </div>
        )}
        <div>{children}</div>
      </section>
    );
  }

  return (
    <motion.section
      variants={sectionVariants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-100px" }}
      className={`py-16 ${className}`}
    >
      {title && (
        <motion.div variants={itemVariants} className="text-center mb-12">
          <motion.h2 
            variants={itemVariants}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            {title}
          </motion.h2>
          {subtitle && (
            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-600"
            >
              {subtitle}
            </motion.p>
          )}
          {showDecorator && (
            <motion.div 
              variants={itemVariants}
              className="flex items-center justify-center mt-6"
            >
              <motion.div 
                variants={decoratorVariants}
                className="h-px w-16 origin-center"
                style={{ backgroundColor: decoratorColor + '50' }}
              />
              <motion.div 
                variants={itemVariants}
                className="mx-4 text-2xl"
                style={{ color: decoratorColor }}
              >
                ★
              </motion.div>
              <motion.div 
                variants={decoratorVariants}
                className="h-px w-16 origin-center"
                style={{ backgroundColor: decoratorColor + '50' }}
              />
            </motion.div>
          )}
        </motion.div>
      )}
      <motion.div variants={itemVariants}>
        {children}
      </motion.div>
    </motion.section>
  );
};

// Custom hook for scroll-based animations
export const useScrollReveal = (options: {
  threshold?: number;
  triggerOnce?: boolean;
  margin?: string;
} = {}) => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, {
    threshold: options.threshold || 0.1,
    triggerOnce: options.triggerOnce !== false,
    margin: options.margin || "-50px 0px -50px 0px"
  });

  return { ref, isInView };
};

export default ScrollReveal;