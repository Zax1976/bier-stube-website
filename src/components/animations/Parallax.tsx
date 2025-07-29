import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { shouldReduceMotion, OSU_COLORS } from './config';

interface ParallaxProps {
  children: React.ReactNode;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
  style?: React.CSSProperties;
}

const Parallax: React.FC<ParallaxProps> = ({
  children,
  speed = 0.5,
  direction = 'up',
  className = '',
  style = {}
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const getTransform = () => {
    const moveAmount = speed * 100;
    switch (direction) {
      case 'up':
        return useTransform(scrollYProgress, [0, 1], [moveAmount, -moveAmount]);
      case 'down':
        return useTransform(scrollYProgress, [0, 1], [-moveAmount, moveAmount]);
      case 'left':
        return useTransform(scrollYProgress, [0, 1], [moveAmount, -moveAmount]);
      case 'right':
        return useTransform(scrollYProgress, [0, 1], [-moveAmount, moveAmount]);
      default:
        return useTransform(scrollYProgress, [0, 1], [moveAmount, -moveAmount]);
    }
  };

  const transform = getTransform();
  const smoothTransform = useSpring(transform, { stiffness: 100, damping: 30, restDelta: 0.001 });

  if (shouldReduceMotion()) {
    return (
      <div ref={ref} className={className} style={style}>
        {children}
      </div>
    );
  }

  const motionStyle = direction === 'left' || direction === 'right'
    ? { x: smoothTransform }
    : { y: smoothTransform };

  return (
    <div ref={ref} className={className} style={style}>
      <motion.div style={motionStyle}>
        {children}
      </motion.div>
    </div>
  );
};

// Background Parallax with OSU theming
export const ParallaxBackground: React.FC<{
  imageUrl?: string;
  overlay?: boolean;
  overlayColor?: string;
  speed?: number;
  className?: string;
  children?: React.ReactNode;
}> = ({
  imageUrl,
  overlay = true,
  overlayColor = 'rgba(0, 0, 0, 0.4)',
  speed = 0.3,
  className = '',
  children
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, -speed * 100]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  if (shouldReduceMotion()) {
    return (
      <div ref={ref} className={`relative ${className}`}>
        {imageUrl && (
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
        )}
        {overlay && (
          <div className="absolute inset-0" style={{ backgroundColor: overlayColor }} />
        )}
        {children && <div className="relative z-10">{children}</div>}
      </div>
    );
  }

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ y: smoothY, scale: 1.1 }}
      >
        {imageUrl ? (
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
        ) : (
          <div 
            className="w-full h-full bg-gradient-to-br from-red-900 via-red-800 to-gray-900"
          >
            {/* Vintage pattern overlay */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpolygon fill-rule='evenodd' points='50 0 60 40 100 50 60 60 50 100 40 60 0 50 40 40'/%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: '50px 50px'
              }}
            />
          </div>
        )}
      </motion.div>
      
      {overlay && (
        <div className="absolute inset-0 z-5" style={{ backgroundColor: overlayColor }} />
      )}
      
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
};

// Multi-layer parallax for depth
export const ParallaxLayers: React.FC<{
  layers: Array<{
    content: React.ReactNode;
    speed: number;
    zIndex?: number;
    className?: string;
  }>;
  className?: string;
}> = ({ layers, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  if (shouldReduceMotion()) {
    return (
      <div ref={ref} className={`relative ${className}`}>
        {layers.map((layer, index) => (
          <div
            key={index}
            className={`absolute inset-0 ${layer.className || ''}`}
            style={{ zIndex: layer.zIndex || index }}
          >
            {layer.content}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className={`relative ${className}`}>
      {layers.map((layer, index) => {
        const y = useTransform(scrollYProgress, [0, 1], [layer.speed * 100, -layer.speed * 100]);
        const smoothY = useSpring(y, { stiffness: 100, damping: 30 });
        
        return (
          <motion.div
            key={index}
            className={`absolute inset-0 will-change-transform ${layer.className || ''}`}
            style={{ 
              y: smoothY, 
              zIndex: layer.zIndex || index 
            }}
          >
            {layer.content}
          </motion.div>
        );
      })}
    </div>
  );
};

// Text parallax with vintage effects
export const ParallaxText: React.FC<{
  children: React.ReactNode;
  speed?: number;
  vintage?: boolean;
  className?: string;
}> = ({
  children,
  speed = 0.2,
  vintage = false,
  className = ''
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [speed * 50, -speed * 50]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  // Vintage effect transforms
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.6, 1, 1, 0.6]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  if (shouldReduceMotion()) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={`will-change-transform ${className}`}
      style={{
        y: smoothY,
        ...(vintage && {
          opacity,
          scale,
          filter: "sepia(0.1) contrast(1.1)"
        })
      }}
    >
      {children}
    </motion.div>
  );
};

// Floating elements parallax
export const FloatingElements: React.FC<{
  elements?: Array<{
    content: React.ReactNode;
    speed: number;
    initialX: number;
    initialY: number;
    scale?: number;
  }>;
  className?: string;
}> = ({ elements, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const defaultElements = [
    {
      content: <div className="w-2 h-2 bg-white/30 rounded-full" />,
      speed: 0.2,
      initialX: 10,
      initialY: 20,
      scale: 1
    },
    {
      content: <div className="w-1 h-1 bg-red-400/40 rounded-full" />,
      speed: 0.4,
      initialX: 80,
      initialY: 30,
      scale: 1.5
    },
    {
      content: <div className="w-3 h-3 bg-yellow-400/20 rounded-full" />,
      speed: 0.1,
      initialX: 60,
      initialY: 70,
      scale: 0.8
    },
    {
      content: (
        <div 
          className="text-white/10 text-2xl"
          style={{ fontFamily: 'serif' }}
        >
          ★
        </div>
      ),
      speed: 0.3,
      initialX: 90,
      initialY: 50,
      scale: 1
    }
  ];

  const elementsToRender = elements || defaultElements;

  if (shouldReduceMotion()) {
    return (
      <div ref={ref} className={`absolute inset-0 pointer-events-none ${className}`}>
        {elementsToRender.map((element, index) => (
          <div
            key={index}
            className="absolute"
            style={{
              left: `${element.initialX}%`,
              top: `${element.initialY}%`,
              transform: `scale(${element.scale || 1})`
            }}
          >
            {element.content}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className={`absolute inset-0 pointer-events-none ${className}`}>
      {elementsToRender.map((element, index) => {
        const y = useTransform(scrollYProgress, [0, 1], [element.speed * 100, -element.speed * 100]);
        const smoothY = useSpring(y, { stiffness: 100, damping: 30 });
        
        return (
          <motion.div
            key={index}
            className="absolute will-change-transform"
            style={{
              left: `${element.initialX}%`,
              top: `${element.initialY}%`,
              y: smoothY,
              scale: element.scale || 1
            }}
          >
            {element.content}
          </motion.div>
        );
      })}
    </div>
  );
};

// Scroll progress indicator
export const ScrollProgress: React.FC<{
  className?: string;
  color?: string;
  thickness?: number;
}> = ({
  className = '',
  color = OSU_COLORS.scarlet,
  thickness = 4
}) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  if (shouldReduceMotion()) {
    return null;
  }

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 origin-left z-50 ${className}`}
      style={{
        scaleX,
        height: thickness,
        backgroundColor: color
      }}
    />
  );
};

// Custom hook for parallax values
export const useParallax = (offset: number = 300) => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return { ref, y: smoothY, progress: scrollYProgress };
};

export default Parallax;