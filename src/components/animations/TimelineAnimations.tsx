import React, { useRef } from 'react';
import { motion, useScroll, useTransform, Variants, useInView } from 'framer-motion';
import { OSU_COLORS, SPRINGS, shouldReduceMotion } from './config';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  image?: string;
  isHighlight?: boolean;
  category?: 'founding' | 'expansion' | 'renovation' | 'milestone' | 'osu';
}

interface TimelineProps {
  events: TimelineEvent[];
  className?: string;
}

const Timeline: React.FC<TimelineProps> = ({ events, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  if (shouldReduceMotion()) {
    return (
      <div ref={containerRef} className={`relative ${className}`}>
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gray-300" />
        <div className="space-y-12">
          {events.map((event, index) => (
            <TimelineItem key={index} event={event} index={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Timeline line background */}
      <div className="absolute left-8 top-0 bottom-0 w-1 bg-gray-200 rounded-full" />
      
      {/* Animated timeline line */}
      <motion.div
        className="absolute left-8 top-0 w-1 rounded-full origin-top"
        style={{ 
          height: lineHeight,
          background: `linear-gradient(to bottom, ${OSU_COLORS.scarlet}, ${OSU_COLORS.gray})`
        }}
      />

      {/* Timeline events */}
      <div className="space-y-12">
        {events.map((event, index) => (
          <TimelineItem key={index} event={event} index={index} />
        ))}
      </div>
    </div>
  );
};

const TimelineItem: React.FC<{
  event: TimelineEvent;
  index: number;
}> = ({ event, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { threshold: 0.3, margin: "-100px" });
  const isLeft = index % 2 === 0;

  const getCategoryColor = () => {
    switch (event.category) {
      case 'founding': return '#8B4513';
      case 'expansion': return '#2563EB';
      case 'renovation': return '#059669';
      case 'milestone': return '#DC2626';
      case 'osu': return OSU_COLORS.scarlet;
      default: return OSU_COLORS.gray;
    }
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      x: isLeft ? -50 : 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
        delay: 0.2
      }
    }
  };

  const dotVariants: Variants = {
    hidden: { scale: 0, backgroundColor: '#D1D5DB' },
    visible: {
      scale: 1,
      backgroundColor: getCategoryColor(),
      transition: {
        ...SPRINGS.bouncy,
        delay: 0.4
      }
    }
  };

  const yearVariants: Variants = {
    hidden: { 
      opacity: 0,
      y: 20,
      rotateX: -90
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.5,
        delay: 0.6,
        ...SPRINGS.gentle
      }
    }
  };

  if (shouldReduceMotion()) {
    return (
      <div ref={ref} className="relative flex items-center">
        <div className="absolute left-8 w-4 h-4 rounded-full border-4 border-white shadow-lg transform -translate-x-1/2"
             style={{ backgroundColor: getCategoryColor() }} />
        
        <div className={`ml-20 ${isLeft ? 'text-left' : 'text-right'}`}>
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md">
            <div className="text-2xl font-bold mb-2" style={{ color: getCategoryColor() }}>
              {event.year}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">{event.title}</h3>
            <p className="text-gray-600 leading-relaxed">{event.description}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className="relative flex items-center"
      variants={itemVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* Timeline dot */}
      <motion.div
        className="absolute left-8 w-4 h-4 rounded-full border-4 border-white shadow-lg transform -translate-x-1/2 z-10"
        variants={dotVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      />

      {/* Year badge */}
      <motion.div
        className="absolute left-8 transform -translate-x-1/2 -translate-y-12 z-20"
        variants={yearVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div 
          className="bg-white border-2 rounded-full px-3 py-1 text-sm font-bold text-white shadow-lg"
          style={{ 
            backgroundColor: getCategoryColor(),
            borderColor: getCategoryColor()
          }}
        >
          {event.year}
        </div>
      </motion.div>

      {/* Content card */}
      <motion.div
        className={`ml-20 ${isLeft ? 'text-left' : 'text-right'}`}
        whileHover={{ scale: 1.02, y: -5 }}
        transition={{ duration: 0.2 }}
      >
        <div className={`bg-white rounded-lg shadow-lg p-6 max-w-md relative ${
          event.isHighlight ? 'ring-2 ring-offset-2' : ''
        }`}
        style={{ 
          ringColor: event.isHighlight ? getCategoryColor() : undefined
        }}>
          {/* Card arrow */}
          <div
            className="absolute top-6 w-4 h-4 rotate-45 bg-white border shadow-lg"
            style={{
              left: isLeft ? '-8px' : undefined,
              right: isLeft ? undefined : '-8px',
              borderColor: 'transparent transparent #E5E7EB #E5E7EB'
            }}
          />
          
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            {event.title}
          </h3>
          
          <p className="text-gray-600 leading-relaxed mb-4">
            {event.description}
          </p>

          {/* Category badge */}
          {event.category && (
            <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white"
                 style={{ backgroundColor: getCategoryColor() + '20', color: getCategoryColor() }}>
              {event.category === 'osu' && '🏈 '}
              {event.category === 'founding' && '🏛️ '}
              {event.category === 'expansion' && '📈 '}
              {event.category === 'renovation' && '🔨 '}
              {event.category === 'milestone' && '⭐ '}
              {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
            </div>
          )}

          {/* Highlight decoration for special events */}
          {event.isHighlight && (
            <motion.div
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
              style={{ backgroundColor: getCategoryColor() }}
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              ★
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

// Animated section for Our Story page
export const OurStoryTimeline: React.FC<{
  className?: string;
}> = ({ className = '' }) => {
  const events: TimelineEvent[] = [
    {
      year: '1965',
      title: 'The Beginning',
      description: 'Bier Stube opens its doors on King Avenue, bringing authentic German beer culture to Columbus.',
      category: 'founding',
      isHighlight: true
    },
    {
      year: '1970',
      title: 'OSU Partnership',
      description: 'Becomes the unofficial home for Ohio State Buckeyes fans, hosting watch parties and celebrations.',
      category: 'osu',
      isHighlight: true
    },
    {
      year: '1985',
      title: 'First Expansion',
      description: 'Added the beer garden and expanded seating to accommodate growing popularity.',
      category: 'expansion'
    },
    {
      year: '1995',
      title: 'Kitchen Renovation',
      description: 'Major kitchen upgrade allows for expanded authentic German menu options.',
      category: 'renovation'
    },
    {
      year: '2000',
      title: 'Y2K Celebration',
      description: 'Hosted one of Columbus\'s most memorable New Year\'s Eve celebrations.',
      category: 'milestone'
    },
    {
      year: '2010',
      title: 'Modern Upgrades',
      description: 'Technology improvements while maintaining authentic German atmosphere.',
      category: 'renovation'
    },
    {
      year: '2015',
      title: '50th Anniversary',
      description: 'Celebrated half a century of serving Columbus with a month-long festival.',
      category: 'milestone',
      isHighlight: true
    },
    {
      year: '2020',
      title: 'Pandemic Adaptation',
      description: 'Successfully adapted to serve the community through challenging times.',
      category: 'milestone'
    },
    {
      year: '2025',
      title: 'Grand Reopening',
      description: 'Returning to King Avenue with renewed commitment to authentic German hospitality.',
      category: 'milestone',
      isHighlight: true
    }
  ];

  return (
    <div className={`py-16 ${className}`}>
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Six Decades of Tradition
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From humble beginnings to Columbus institution, follow our journey 
            through the years of serving authentic German hospitality.
          </p>
          
          {/* Decorative divider */}
          <motion.div
            className="flex items-center justify-center mt-8"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="h-px bg-gray-300 w-16"></div>
            <div className="mx-4 text-2xl" style={{ color: OSU_COLORS.scarlet }}>★</div>
            <div className="h-px bg-gray-300 w-16"></div>
          </motion.div>
        </motion.div>

        <Timeline events={events} />
      </div>
    </div>
  );
};

// Animated counter for stats/milestones
export const AnimatedCounter: React.FC<{
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}> = ({ 
  end, 
  duration = 2, 
  suffix = '', 
  prefix = '',
  className = '' 
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { threshold: 0.5, once: true });
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!isInView || shouldReduceMotion()) {
      setCount(end);
      return;
    }

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOutCubic * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

// Milestone showcase
export const MilestoneShowcase: React.FC<{
  milestones: Array<{
    number: number;
    label: string;
    suffix?: string;
    prefix?: string;
  }>;
  className?: string;
}> = ({ milestones, className = '' }) => {
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  return (
    <motion.div
      className={`grid grid-cols-2 md:grid-cols-4 gap-8 ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {milestones.map((milestone, index) => (
        <motion.div
          key={index}
          className="text-center"
          variants={itemVariants}
        >
          <div className="text-4xl md:text-5xl font-bold mb-2" style={{ color: OSU_COLORS.scarlet }}>
            <AnimatedCounter
              end={milestone.number}
              suffix={milestone.suffix}
              prefix={milestone.prefix}
            />
          </div>
          <div className="text-gray-600 font-medium">
            {milestone.label}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export {
  Timeline,
  TimelineItem,
  OurStoryTimeline,
  AnimatedCounter,
  MilestoneShowcase
};