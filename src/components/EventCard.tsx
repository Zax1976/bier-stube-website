import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EventItem } from './types';

interface EventCardProps {
  event: EventItem;
  onRSVP?: (event: EventItem) => void;
  onShareEvent?: (event: EventItem) => void;
  variant?: 'default' | 'featured' | 'compact';
  className?: string;
}

const EventCard: React.FC<EventCardProps> = ({
  event,
  onRSVP,
  onShareEvent,
  variant = 'default',
  className = ''
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  // Parse date for display
  const eventDate = new Date(event.date);
  const month = eventDate.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
  const day = eventDate.getDate();
  const dayOfWeek = eventDate.toLocaleDateString('en-US', { weekday: 'long' });

  // Get category styling
  const getCategoryStyle = () => {
    switch (event.category) {
      case 'game_day':
        return {
          bg: 'bg-red-600',
          text: 'text-white',
          badge: 'bg-red-500',
          icon: '🏈',
          label: 'Game Day'
        };
      case 'live_music':
        return {
          bg: 'bg-purple-600',
          text: 'text-white',
          badge: 'bg-purple-500',
          icon: '🎵',
          label: 'Live Music'
        };
      case 'holiday':
        return {
          bg: 'bg-green-600',
          text: 'text-white',
          badge: 'bg-green-500',
          icon: '🎉',
          label: 'Holiday'
        };
      case 'special':
        return {
          bg: 'bg-yellow-600',
          text: 'text-white',
          badge: 'bg-yellow-500',
          icon: '⭐',
          label: 'Special Event'
        };
      default:
        return {
          bg: 'bg-gray-600',
          text: 'text-white',
          badge: 'bg-gray-500',
          icon: '📅',
          label: 'Event'
        };
    }
  };

  const categoryStyle = getCategoryStyle();

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    hover: {
      y: -5,
      scale: 1.02,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const flipVariants = {
    front: {
      rotateY: 0,
      transition: { duration: 0.6, ease: "easeInOut" }
    },
    back: {
      rotateY: 180,
      transition: { duration: 0.6, ease: "easeInOut" }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  };

  const handleRSVP = () => {
    if (onRSVP) {
      onRSVP(event);
    }
  };

  const handleShare = () => {
    if (onShareEvent) {
      onShareEvent(event);
    }
  };

  // Check if event is today or upcoming
  const isToday = eventDate.toDateString() === new Date().toDateString();
  const isUpcoming = eventDate > new Date();
  const isPast = eventDate < new Date();

  if (variant === 'compact') {
    return (
      <motion.div
        variants={cardVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        className={`bg-white rounded-lg shadow-md p-4 border-l-4 ${categoryStyle.bg.replace('bg-', 'border-')} ${className}`}
      >
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <div className={`${categoryStyle.bg} ${categoryStyle.text} rounded-lg p-3 text-center`}>
              <div className="text-xs font-bold">{month}</div>
              <div className="text-xl font-bold">{day}</div>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-gray-900 truncate">{event.name}</h3>
            <p className="text-sm text-gray-600">{event.time}</p>
            <p className="text-sm text-gray-500 truncate">{event.description}</p>
          </div>
          <div className="flex-shrink-0">
            <span className={`${categoryStyle.badge} text-white px-2 py-1 rounded-full text-xs font-semibold`}>
              {categoryStyle.label}
            </span>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`relative perspective-1000 ${className}`}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        variants={flipVariants}
        animate={isFlipped ? 'back' : 'front'}
        className="relative w-full h-full preserve-3d"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front of Card */}
        <div 
          className="absolute inset-0 w-full backface-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full">
            {/* Event Image/Background */}
            <div className={`relative h-48 ${categoryStyle.bg} overflow-hidden`}>
              {event.image ? (
                <img
                  src={event.image}
                  alt={event.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-6xl opacity-20">
                    {categoryStyle.icon}
                  </div>
                </div>
              )}
              
              {/* Overlay with quick actions */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    variants={overlayVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="absolute inset-0 bg-black/50 flex items-center justify-center"
                  >
                    <div className="flex space-x-3">
                      <motion.button
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        onClick={() => setIsFlipped(true)}
                        className="bg-white text-gray-800 px-4 py-2 rounded-full font-semibold text-sm shadow-lg"
                      >
                        Details
                      </motion.button>
                      {isUpcoming && (
                        <motion.button
                          variants={buttonVariants}
                          whileHover="hover"
                          whileTap="tap"
                          onClick={handleRSVP}
                          className={`${categoryStyle.bg} ${categoryStyle.text} px-4 py-2 rounded-full font-semibold text-sm shadow-lg`}
                        >
                          RSVP
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Date Badge */}
              <div className="absolute top-4 left-4 bg-white rounded-lg p-3 text-center shadow-lg">
                <div className="text-xs font-bold text-gray-600">{month}</div>
                <div className="text-2xl font-bold text-gray-900">{day}</div>
              </div>

              {/* Category Badge */}
              <div className={`absolute top-4 right-4 ${categoryStyle.badge} text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg`}>
                {categoryStyle.icon} {categoryStyle.label}
              </div>

              {/* Status Badge */}
              {isToday && (
                <div className="absolute bottom-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
                  TODAY
                </div>
              )}
              {isPast && (
                <div className="absolute bottom-4 left-4 bg-gray-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                  PAST EVENT
                </div>
              )}
            </div>

            {/* Event Info */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                {event.name}
              </h3>
              
              <div className="flex items-center text-gray-600 mb-2">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">{dayOfWeek}, {event.date}</span>
              </div>

              <div className="flex items-center text-gray-600 mb-4">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">{event.time}</span>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {event.description}
              </p>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                {isUpcoming && (
                  <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={handleRSVP}
                    className={`flex-1 ${categoryStyle.bg} ${categoryStyle.text} py-2 px-4 rounded-md font-semibold text-sm transition-colors duration-200`}
                  >
                    RSVP Now
                  </motion.button>
                )}
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={handleShare}
                  className="border-2 border-gray-300 text-gray-700 hover:border-red-500 hover:text-red-500 py-2 px-4 rounded-md font-semibold text-sm transition-colors duration-200"
                >
                  Share
                </motion.button>
              </div>

              {/* Pricing */}
              {event.ticketPrice && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Ticket Price:</span>
                    <span className="text-lg font-bold text-red-600">
                      ${event.ticketPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Back of Card */}
        <div 
          className="absolute inset-0 w-full backface-hidden"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full">
            <div className={`${categoryStyle.bg} ${categoryStyle.text} p-6`}>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">{event.name}</h3>
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => setIsFlipped(false)}
                  className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </motion.button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Event Details</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {event.description}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">When & Where</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><strong>Date:</strong> {dayOfWeek}, {event.date}</p>
                    <p><strong>Time:</strong> {event.time}</p>
                    <p><strong>Location:</strong> {event.location || 'Bier Stube - 234 King Ave, Columbus, OH'}</p>
                  </div>
                </div>

                {event.category === 'game_day' && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Game Day Specials</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• $2 off all draft beers during the game</li>
                      <li>• Free appetizers at halftime</li>
                      <li>• Buckeye spirit prizes and giveaways</li>
                      <li>• Reserved seating for season ticket holders</li>
                    </ul>
                  </div>
                )}

                {event.ticketPrice && (
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-900">Ticket Price:</span>
                      <span className="text-xl font-bold text-red-600">
                        ${event.ticketPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}

                <div className="pt-4 space-y-3">
                  {isUpcoming && (
                    <motion.button
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      onClick={handleRSVP}
                      className={`w-full ${categoryStyle.bg} ${categoryStyle.text} py-3 px-4 rounded-md font-semibold transition-colors duration-200`}
                    >
                      Reserve Your Spot
                    </motion.button>
                  )}
                  <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={handleShare}
                    className="w-full border-2 border-gray-300 text-gray-700 hover:border-red-500 hover:text-red-500 py-3 px-4 rounded-md font-semibold transition-colors duration-200"
                  >
                    Share This Event
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EventCard;