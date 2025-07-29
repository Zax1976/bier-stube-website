import React from 'react';
import { motion, Variants } from 'framer-motion';
import { OSU_COLORS, SPRINGS, shouldReduceMotion } from './config';

// Basic spinner with OSU branding
export const BierStubeSpinner: React.FC<{
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}> = ({ 
  size = 'md', 
  color = OSU_COLORS.scarlet,
  className = '' 
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'w-6 h-6';
      case 'md': return 'w-12 h-12';
      case 'lg': return 'w-16 h-16';
      default: return 'w-12 h-12';
    }
  };

  if (shouldReduceMotion()) {
    return (
      <div className={`${getSizeClasses()} rounded-full border-4 border-gray-200 ${className}`}>
        <div 
          className="w-full h-full rounded-full border-4 border-transparent border-t-current"
          style={{ color }}
        />
      </div>
    );
  }

  return (
    <motion.div
      className={`${getSizeClasses()} ${className}`}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      <div 
        className="w-full h-full rounded-full border-4 border-transparent border-t-current"
        style={{ color }}
      />
    </motion.div>
  );
};

// Vintage beer mug loading animation
export const BeerMugLoader: React.FC<{
  size?: number;
  className?: string;
}> = ({ size = 60, className = '' }) => {
  const fillVariants: Variants = {
    empty: { scaleY: 0 },
    filling: {
      scaleY: [0, 1, 0.9, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const foamVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: [0, 1, 0.8, 1],
      y: [10, 0, -2, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1
      }
    }
  };

  if (shouldReduceMotion()) {
    return (
      <div className={`inline-block ${className}`} style={{ width: size, height: size }}>
        <svg viewBox="0 0 60 80" className="w-full h-full">
          <rect x="10" y="20" width="30" height="50" fill={OSU_COLORS.gray} stroke="#333" strokeWidth="2" rx="2" />
          <rect x="12" y="40" width="26" height="28" fill="#FFB000" />
          <ellipse cx="25" cy="38" rx="13" ry="3" fill="#FFFFFF" />
          <path d="M40 30 Q50 30 50 40 Q50 50 40 50" fill="none" stroke="#333" strokeWidth="2" />
        </svg>
      </div>
    );
  }

  return (
    <div className={`inline-block ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 60 80" className="w-full h-full">
        {/* Mug outline */}
        <rect 
          x="10" y="20" width="30" height="50" 
          fill="none" 
          stroke="#333" 
          strokeWidth="2" 
          rx="2" 
        />
        
        {/* Beer fill */}
        <motion.rect
          x="12" y="40" width="26" height="28"
          fill="#FFB000"
          variants={fillVariants}
          initial="empty"
          animate="filling"
          style={{ originY: 1 }}
        />
        
        {/* Foam */}
        <motion.ellipse
          cx="25" cy="38" rx="13" ry="3"
          fill="#FFFFFF"
          variants={foamVariants}
          initial="hidden"
          animate="visible"
        />
        
        {/* Handle */}
        <path 
          d="M40 30 Q50 30 50 40 Q50 50 40 50" 
          fill="none" 
          stroke="#333" 
          strokeWidth="2" 
        />
      </svg>
    </div>
  );
};

// Skeleton screens for different content types
export const SkeletonCard: React.FC<{
  variant?: 'product' | 'event' | 'text';
  className?: string;
}> = ({ variant = 'product', className = '' }) => {
  const shimmerVariants: Variants = {
    animate: {
      x: ['-100%', '100%'],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const Shimmer = () => {
    if (shouldReduceMotion()) {
      return <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />;
    }

    return (
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        variants={shimmerVariants}
        animate="animate"
      />
    );
  };

  const renderSkeleton = () => {
    switch (variant) {
      case 'product':
        return (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="relative h-64 bg-gray-200 overflow-hidden">
              <Shimmer />
            </div>
            <div className="p-6 space-y-4">
              <div className="relative h-4 bg-gray-200 rounded overflow-hidden">
                <Shimmer />
              </div>
              <div className="relative h-6 bg-gray-200 rounded overflow-hidden">
                <Shimmer />
              </div>
              <div className="space-y-2">
                <div className="relative h-4 bg-gray-200 rounded overflow-hidden w-3/4">
                  <Shimmer />
                </div>
                <div className="relative h-4 bg-gray-200 rounded overflow-hidden w-1/2">
                  <Shimmer />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="relative h-8 w-20 bg-gray-200 rounded overflow-hidden">
                  <Shimmer />
                </div>
                <div className="relative h-10 w-32 bg-gray-200 rounded-md overflow-hidden">
                  <Shimmer />
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'event':
        return (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="relative h-48 bg-gray-200 overflow-hidden">
              <Shimmer />
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center space-x-4">
                <div className="relative w-12 h-12 bg-gray-200 rounded-lg overflow-hidden">
                  <Shimmer />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="relative h-6 bg-gray-200 rounded overflow-hidden">
                    <Shimmer />
                  </div>
                  <div className="relative h-4 bg-gray-200 rounded overflow-hidden w-3/4">
                    <Shimmer />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="relative h-4 bg-gray-200 rounded overflow-hidden">
                  <Shimmer />
                </div>
                <div className="relative h-4 bg-gray-200 rounded overflow-hidden w-5/6">
                  <Shimmer />
                </div>
              </div>
              <div className="relative h-10 bg-gray-200 rounded-md overflow-hidden">
                <Shimmer />
              </div>
            </div>
          </div>
        );
      
      case 'text':
        return (
          <div className="space-y-4">
            <div className="relative h-8 bg-gray-200 rounded overflow-hidden">
              <Shimmer />
            </div>
            <div className="space-y-2">
              <div className="relative h-4 bg-gray-200 rounded overflow-hidden">
                <Shimmer />
              </div>
              <div className="relative h-4 bg-gray-200 rounded overflow-hidden w-5/6">
                <Shimmer />
              </div>
              <div className="relative h-4 bg-gray-200 rounded overflow-hidden w-3/4">
                <Shimmer />
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className={`animate-pulse ${className}`}>
      {renderSkeleton()}
    </div>
  );
};

// Grid skeleton
export const SkeletonGrid: React.FC<{
  count?: number;
  columns?: number;
  variant?: 'product' | 'event' | 'text';
  className?: string;
}> = ({ 
  count = 6, 
  columns = 3, 
  variant = 'product',
  className = '' 
}) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-${columns} gap-6 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} variant={variant} />
      ))}
    </div>
  );
};

// Pulsing dots loader
export const PulsingDots: React.FC<{
  count?: number;
  color?: string;
  size?: number;
  className?: string;
}> = ({ 
  count = 3, 
  color = OSU_COLORS.scarlet,
  size = 8,
  className = '' 
}) => {
  const dotVariants: Variants = {
    animate: (i: number) => ({
      scale: [1, 1.5, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        delay: i * 0.2,
        ease: "easeInOut"
      }
    })
  };

  if (shouldReduceMotion()) {
    return (
      <div className={`flex space-x-2 ${className}`}>
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="rounded-full"
            style={{ 
              width: size, 
              height: size, 
              backgroundColor: color 
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={`flex space-x-2 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="rounded-full"
          style={{ 
            width: size, 
            height: size, 
            backgroundColor: color 
          }}
          variants={dotVariants}
          animate="animate"
          custom={i}
        />
      ))}
    </div>
  );
};

// Progress bar with OSU styling
export const ProgressBar: React.FC<{
  progress: number;
  label?: string;
  showPercentage?: boolean;
  color?: string;
  className?: string;
}> = ({ 
  progress, 
  label,
  showPercentage = true,
  color = OSU_COLORS.scarlet,
  className = '' 
}) => {
  const progressVariants: Variants = {
    initial: { width: '0%' },
    animate: {
      width: `${Math.min(Math.max(progress, 0), 100)}%`,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  if (shouldReduceMotion()) {
    return (
      <div className={`w-full ${className}`}>
        {label && (
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">{label}</span>
            {showPercentage && (
              <span className="text-sm text-gray-500">{Math.round(progress)}%</span>
            )}
          </div>
        )}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="h-2 rounded-full transition-all duration-300"
            style={{ 
              backgroundColor: color,
              width: `${Math.min(Math.max(progress, 0), 100)}%`
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          {showPercentage && (
            <motion.span 
              className="text-sm text-gray-500"
              key={progress}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {Math.round(progress)}%
            </motion.span>
          )}
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <motion.div
          className="h-2 rounded-full"
          style={{ backgroundColor: color }}
          variants={progressVariants}
          initial="initial"
          animate="animate"
        />
      </div>
    </div>
  );
};

// Typewriter effect
export const TypewriterText: React.FC<{
  text: string;
  speed?: number;
  delay?: number;
  cursor?: boolean;
  className?: string;
}> = ({ 
  text, 
  speed = 50,
  delay = 0,
  cursor = true,
  className = '' 
}) => {
  const [displayText, setDisplayText] = React.useState('');
  const [showCursor, setShowCursor] = React.useState(true);

  React.useEffect(() => {
    if (shouldReduceMotion()) {
      setDisplayText(text);
      setShowCursor(false);
      return;
    }

    const timeout = setTimeout(() => {
      let i = 0;
      const timer = setInterval(() => {
        if (i < text.length) {
          setDisplayText(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(timer);
          if (cursor) {
            setInterval(() => {
              setShowCursor(prev => !prev);
            }, 500);
          } else {
            setShowCursor(false);
          }
        }
      }, speed);

      return () => clearInterval(timer);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, speed, delay, cursor]);

  return (
    <span className={className}>
      {displayText}
      {cursor && showCursor && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
          className="ml-1"
        >
          |
        </motion.span>
      )}
    </span>
  );
};

// Full page loader
export const FullPageLoader: React.FC<{
  title?: string;
  subtitle?: string;
  showProgress?: boolean;
  progress?: number;
}> = ({ 
  title = "Loading Bier Stube...",
  subtitle = "Preparing your authentic German experience",
  showProgress = false,
  progress = 0
}) => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-red-900 via-red-800 to-gray-900 flex items-center justify-center z-50">
      <div className="text-center text-white max-w-md px-6">
        <div className="mb-8">
          <BeerMugLoader size={80} />
        </div>
        
        <TypewriterText 
          text={title}
          className="text-2xl font-bold mb-4"
          speed={100}
        />
        
        <p className="text-gray-300 mb-8">
          {subtitle}
        </p>
        
        {showProgress && (
          <ProgressBar 
            progress={progress}
            color={OSU_COLORS.white}
            className="mb-8"
          />
        )}
        
        <div className="flex items-center justify-center space-x-2 text-gray-400">
          <span className="text-sm">★</span>
          <span className="text-xs font-medium">Est. 1965</span>
          <span className="text-sm">★</span>
        </div>
      </div>
      
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpolygon fill-rule='evenodd' points='50 0 60 40 100 50 60 60 50 100 40 60 0 50 40 40'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '50px 50px'
        }}
      />
    </div>
  );
};

export {
  BierStubeSpinner,
  BeerMugLoader,
  SkeletonCard,
  SkeletonGrid,
  PulsingDots,
  ProgressBar,
  TypewriterText,
  FullPageLoader
};