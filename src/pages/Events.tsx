import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Header, 
  Footer, 
  EventCard, 
  BRAND_COLORS,
  type EventItem 
} from '../components';
import { dbService } from '../firebase/database';
import { Event, EventCategory, EventFilters } from '../firebase/types';

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  events: Event[];
}

const Events: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | 'all'>('all');
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('list');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([]);

  const categories: { value: EventCategory | 'all', label: string, icon: string, color: string }[] = [
    { value: 'all', label: 'All Events', icon: '📅', color: 'bg-gray-600' },
    { value: 'game_day', label: 'Game Day', icon: '🏈', color: 'bg-red-600' },
    { value: 'live_music', label: 'Live Music', icon: '🎵', color: 'bg-purple-600' },
    { value: 'holiday', label: 'Holidays', icon: '🎉', color: 'bg-green-600' },
    { value: 'special', label: 'Special Events', icon: '⭐', color: 'bg-yellow-600' },
    { value: 'private', label: 'Private Events', icon: '🥂', color: 'bg-indigo-600' }
  ];

  const gameDay_specials = [
    {
      title: "Draft Beer Specials",
      description: "$2 off all draft beers during the game",
      icon: "🍺"
    },
    {
      title: "Victory Shots",
      description: "Free shots for everyone when OSU scores a touchdown",
      icon: "🥃"
    },
    {
      title: "Halftime Appetizers",
      description: "Complimentary appetizers served at halftime",
      icon: "🥨"
    },
    {
      title: "Reserved Seating",
      description: "Priority seating for season ticket holders",
      icon: "💺"
    },
    {
      title: "Buckeye Bingo",
      description: "Win prizes with our game day bingo cards",
      icon: "🎯"
    },
    {
      title: "Group Discounts",
      description: "Special rates for groups of 8 or more",
      icon: "👥"
    }
  ];

  useEffect(() => {
    loadEvents();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [events, selectedCategory]);

  useEffect(() => {
    if (viewMode === 'calendar') {
      generateCalendar();
    }
  }, [currentDate, events, viewMode]);

  const loadEvents = async () => {
    try {
      setIsLoading(true);
      const response = await dbService.getEvents({}, 1, 50);
      setEvents(response.data);
    } catch (error) {
      console.error('Error loading events:', error);
      // Set mock data for development
      setEvents([]);
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...events];

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(event => event.category === selectedCategory);
    }

    // Sort by date
    filtered.sort((a, b) => a.startDate.toMillis() - b.startDate.toMillis());

    setFilteredEvents(filtered);
  };

  const generateCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days: CalendarDay[] = [];
    const currentDateObj = new Date();
    
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      
      const dayEvents = events.filter(event => {
        const eventDate = event.startDate.toDate();
        return (
          eventDate.getDate() === date.getDate() &&
          eventDate.getMonth() === date.getMonth() &&
          eventDate.getFullYear() === date.getFullYear()
        );
      });
      
      days.push({
        date,
        isCurrentMonth: date.getMonth() === month,
        isToday: (
          date.getDate() === currentDateObj.getDate() &&
          date.getMonth() === currentDateObj.getMonth() &&
          date.getFullYear() === currentDateObj.getFullYear()
        ),
        events: dayEvents
      });
    }
    
    setCalendarDays(days);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + (direction === 'next' ? 1 : -1));
    setCurrentDate(newDate);
  };

  const handleRSVP = (event: EventItem) => {
    console.log('RSVP for event:', event);
    // Handle RSVP logic
  };

  const handleShareEvent = (event: EventItem) => {
    console.log('Share event:', event);
    // Handle sharing logic
  };

  // Convert Firebase Event to EventItem
  const convertEvent = (event: Event): EventItem => ({
    id: event.id,
    name: event.title,
    date: event.startDate.toDate().toLocaleDateString(),
    time: event.startTime,
    category: event.category,
    description: event.description,
    image: event.images?.[0],
    ticketPrice: event.ticketPrice,
    location: event.location.name
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const eventVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-900 via-red-800 to-gray-900 text-white py-16 lg:py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold mb-4">
              Events & Game Day
            </h1>
            <p className="text-xl sm:text-2xl text-red-100 mb-8 max-w-3xl mx-auto">
              Join us for live music, OSU game day celebrations, and special events. 
              Experience the authentic German beer hall atmosphere.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {[
                { icon: "🏈", label: "Game Day Specials", value: "Every OSU Game" },
                { icon: "🎵", label: "Live Music", value: "Weekly Shows" },
                { icon: "🎉", label: "Special Events", value: "Year Round" },
                { icon: "🥂", label: "Private Events", value: "Available" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="font-semibold text-sm">{stat.value}</div>
                  <div className="text-red-200 text-xs">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Controls */}
      <section className="bg-white border-b border-gray-200 sticky top-16 z-30 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Category Filters */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-2 lg:pb-0">
              {categories.map((category) => (
                <motion.button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors duration-200 ${
                    selectedCategory === category.value
                      ? `${category.color} text-white`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span>{category.icon}</span>
                  <span>{category.label}</span>
                </motion.button>
              ))}
            </div>

            {/* View Toggle */}
            <div className="flex items-center space-x-2 bg-gray-100 rounded-full p-1">
              <motion.button
                onClick={() => setViewMode('list')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
                  viewMode === 'list'
                    ? 'bg-white text-red-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                List View
              </motion.button>
              <motion.button
                onClick={() => setViewMode('calendar')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
                  viewMode === 'calendar'
                    ? 'bg-white text-red-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Calendar
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Game Day Specials Banner */}
        {selectedCategory === 'all' || selectedCategory === 'game_day' ? (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 bg-gradient-to-r from-red-600 to-red-800 rounded-2xl p-8 text-white"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">🏈 Game Day Specials</h2>
              <p className="text-xl text-red-100">
                Every Ohio State game is a celebration at Bier Stube! 
                Join fellow Buckeyes for unbeatable specials and electric atmosphere.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gameDay_specials.map((special, index) => (
                <motion.div
                  key={special.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center"
                >
                  <div className="text-3xl mb-3">{special.icon}</div>
                  <h3 className="text-lg font-bold mb-2">{special.title}</h3>
                  <p className="text-red-100 text-sm">{special.description}</p>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-8">
              <motion.a
                href="/contact?inquiry=game_day"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center bg-white text-red-600 px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-100 transition-colors duration-200"
              >
                Reserve Game Day Table
                <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </motion.a>
            </div>
          </motion.section>
        ) : null}

        {/* Events Content */}
        <AnimatePresence mode="wait">
          {viewMode === 'list' ? (
            <motion.div
              key="list"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedCategory === 'all' ? 'All Events' : categories.find(c => c.value === selectedCategory)?.label}
                  <span className="text-gray-500 text-lg ml-2">({filteredEvents.length})</span>
                </h2>
              </div>

              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-white rounded-xl shadow-lg h-96 animate-pulse">
                      <div className="h-48 bg-gray-200 rounded-t-xl"></div>
                      <div className="p-6 space-y-4">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredEvents.length > 0 ? (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {filteredEvents.map((event, index) => (
                    <motion.div
                      key={event.id}
                      variants={eventVariants}
                      transition={{ delay: index * 0.05 }}
                    >
                      <EventCard
                        event={convertEvent(event)}
                        onRSVP={handleRSVP}
                        onShareEvent={handleShareEvent}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-16"
                >
                  <div className="text-6xl text-gray-300 mb-4">📅</div>
                  <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Events Found</h3>
                  <p className="text-gray-500 mb-6">
                    {selectedCategory === 'all' 
                      ? "No events are currently scheduled. Check back soon!"
                      : `No ${categories.find(c => c.value === selectedCategory)?.label.toLowerCase()} events are currently scheduled.`
                    }
                  </p>
                  <motion.a
                    href="/contact?inquiry=events"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center text-red-600 hover:text-red-700 font-semibold"
                  >
                    Contact us about hosting an event
                    <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </motion.a>
                </motion.div>
              )}
            </motion.div>
          ) : (
            /* Calendar View */
            <motion.div
              key="calendar"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </h2>
                <div className="flex items-center space-x-2">
                  <motion.button
                    onClick={() => navigateMonth('prev')}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </motion.button>
                  <motion.button
                    onClick={() => navigateMonth('next')}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </motion.button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="p-2 text-center text-sm font-semibold text-gray-500">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedDate(day.date)}
                    className={`relative p-2 h-20 cursor-pointer transition-colors duration-200 ${
                      day.isCurrentMonth 
                        ? 'bg-white hover:bg-gray-50' 
                        : 'bg-gray-50 text-gray-400'
                    } ${
                      day.isToday 
                        ? 'bg-red-50 border-2 border-red-200' 
                        : 'border border-gray-200'
                    } ${
                      selectedDate && 
                      selectedDate.getDate() === day.date.getDate() &&
                      selectedDate.getMonth() === day.date.getMonth()
                        ? 'bg-red-100 border-red-300'
                        : ''
                    }`}
                  >
                    <div className="text-sm font-medium">
                      {day.date.getDate()}
                    </div>
                    {day.events.length > 0 && (
                      <div className="absolute bottom-1 left-1 right-1">
                        <div className="grid grid-cols-3 gap-1">
                          {day.events.slice(0, 3).map((event, eventIndex) => {
                            const category = categories.find(c => c.value === event.category);
                            return (
                              <div
                                key={eventIndex}
                                className={`h-1 rounded-full ${category?.color || 'bg-gray-400'}`}
                              />
                            );
                          })}
                        </div>
                        {day.events.length > 3 && (
                          <div className="text-xs text-gray-500 text-center mt-1">
                            +{day.events.length - 3} more
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Selected Date Events */}
              {selectedDate && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-gray-50 rounded-lg"
                >
                  <h3 className="text-lg font-bold mb-4">
                    Events for {selectedDate.toLocaleDateString()}
                  </h3>
                  {calendarDays
                    .find(day => 
                      day.date.getDate() === selectedDate.getDate() &&
                      day.date.getMonth() === selectedDate.getMonth()
                    )?.events.length ? (
                    <div className="space-y-3">
                      {calendarDays
                        .find(day => 
                          day.date.getDate() === selectedDate.getDate() &&
                          day.date.getMonth() === selectedDate.getMonth()
                        )?.events.map((event) => (
                          <div key={event.id} className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                            <div className={`w-3 h-3 rounded-full ${categories.find(c => c.value === event.category)?.color || 'bg-gray-400'}`}></div>
                            <div className="flex-1">
                              <h4 className="font-semibold">{event.title}</h4>
                              <p className="text-sm text-gray-600">{event.startTime}</p>
                            </div>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No events scheduled for this date.</p>
                  )}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center bg-gray-900 text-white rounded-2xl p-12"
        >
          <h2 className="text-3xl font-bold mb-4">Host Your Event at Bier Stube</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Looking to host a private event, corporate gathering, or celebration? 
            Our authentic German beer hall provides the perfect atmosphere for any occasion.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="/contact?inquiry=private_event"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full text-lg font-bold transition-colors duration-200"
            >
              Plan Your Event
            </motion.a>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-red-400 text-red-400 hover:bg-red-400 hover:text-white px-8 py-4 rounded-full text-lg font-bold transition-all duration-200"
            >
              Get More Info
            </motion.a>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
};

export default Events;