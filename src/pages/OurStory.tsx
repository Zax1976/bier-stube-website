import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Header, Footer, BRAND_COLORS } from '../components';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: string;
  image?: string;
}

const OurStory: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const parallaxY = useSpring(backgroundY, { stiffness: 400, damping: 90 });

  const timelineEvents: TimelineEvent[] = [
    {
      year: "1965",
      title: "The Beginning",
      description: "Bier Stube first opened its doors in Columbus, becoming the city's premier German beer hall. Founded by German immigrant Hans Mueller, it quickly became a gathering place for the local community.",
      icon: "🍺",
    },
    {
      year: "1970s",
      title: "OSU Partnership",
      description: "The bar became the unofficial headquarters for Ohio State Buckeyes fans. Game day traditions were born, including our famous bratwurst specials and victory celebrations.",
      icon: "🏈",
    },
    {
      year: "1980s",
      title: "Cultural Hub",
      description: "Expanded to include live music performances, traditional German festivals, and Oktoberfest celebrations that drew visitors from across Ohio.",
      icon: "🎵",
    },
    {
      year: "1990s",
      title: "Community Cornerstone",
      description: "Became deeply rooted in Columbus culture, hosting charity events, family celebrations, and maintaining authentic German traditions for three generations.",
      icon: "🏘️",
    },
    {
      year: "2000s",
      title: "Legacy Building",
      description: "Survived economic challenges while maintaining its authentic atmosphere. Became a must-visit destination for tourists and a beloved local institution.",
      icon: "⭐",
    },
    {
      year: "2020",
      title: "Temporary Closure",
      description: "Due to unforeseen circumstances, Bier Stube closed its original location. The community rallied together, sharing memories and hoping for its return.",
      icon: "🔒",
    },
    {
      year: "2024",
      title: "New Chapter",
      description: "Reopening at our new King Avenue location, bringing back the authentic German beer hall experience with modern amenities while preserving our cherished traditions.",
      icon: "🎉",
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const timelineVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-red-900 via-red-800 to-gray-900">
        {/* Background Pattern */}
        <motion.div
          style={{ y: parallaxY }}
          className="absolute inset-0 opacity-20"
        >
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpolygon fill-rule='evenodd' points='50 0 60 40 100 50 60 60 50 100 40 60 0 50 40 40'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '100px 100px'
          }}></div>
        </motion.div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight">
              <span className="block">Our Story</span>
              <span className="block text-red-400 drop-shadow-lg">Since 1965</span>
            </h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl sm:text-2xl lg:text-3xl text-gray-200 mb-8 font-light leading-relaxed max-w-4xl mx-auto"
            >
              A legacy of authentic German hospitality, Buckeye pride, 
              and community traditions spanning nearly six decades
            </motion.p>

            {/* Vintage Divider */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex items-center justify-center mb-8"
            >
              <div className="h-px bg-gradient-to-r from-transparent via-red-400 to-transparent w-32"></div>
              <div className="mx-4 text-red-400 text-3xl">🍺</div>
              <div className="h-px bg-gradient-to-r from-transparent via-red-400 to-transparent w-32"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3"
            >
              <span className="text-red-400 font-bold mr-2">★</span>
              <span className="text-sm font-semibold">Columbus's Authentic German Beer Hall</span>
              <span className="text-red-400 font-bold ml-2">★</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center text-white/70">
            <span className="text-sm mb-2 font-medium">Discover our journey</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-1 h-3 bg-white/70 rounded-full mt-2"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Main Content */}
      <motion.main
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Timeline Section */}
        <motion.section
          variants={sectionVariants}
          className="py-16 lg:py-24 bg-gray-50"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-gray-900 mb-4">
                Our Journey Through Time
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                From humble beginnings to becoming Columbus's most beloved German beer hall, 
                discover the milestones that shaped our legacy.
              </p>
            </motion.div>

            {/* Timeline */}
            <div className="relative">
              {/* Central Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-0.5 w-1 h-full bg-gradient-to-b from-red-600 via-red-500 to-red-600 hidden lg:block"></div>

              <div className="space-y-16">
                {timelineEvents.map((event, index) => (
                  <motion.div
                    key={event.year}
                    variants={timelineVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: index * 0.2 }}
                    className={`relative flex items-center ${
                      index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                    } flex-col lg:space-y-0 space-y-8`}
                  >
                    {/* Timeline Node */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white border-4 border-red-600 rounded-full flex items-center justify-center text-2xl shadow-lg z-10 hidden lg:flex">
                      {event.icon}
                    </div>

                    {/* Content Card */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className={`w-full lg:w-5/12 ${
                        index % 2 === 0 ? 'lg:text-right lg:pr-16' : 'lg:text-left lg:pl-16'
                      } text-center lg:text-left`}
                    >
                      <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-red-600">
                        <div className="flex items-center justify-center lg:hidden w-16 h-16 bg-red-600 text-white rounded-full text-2xl mx-auto mb-6">
                          {event.icon}
                        </div>
                        
                        <div className="text-3xl font-bold text-red-600 mb-2">
                          {event.year}
                        </div>
                        
                        <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">
                          {event.title}
                        </h3>
                        
                        <p className="text-gray-600 leading-relaxed">
                          {event.description}
                        </p>
                      </div>
                    </motion.div>

                    {/* Spacer for desktop layout */}
                    <div className="hidden lg:block w-5/12"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Legacy Section */}
        <motion.section
          variants={sectionVariants}
          className="py-16 lg:py-24 bg-white"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl lg:text-4xl font-serif font-bold text-gray-900 mb-6">
                  A Legacy of Tradition
                </h2>
                
                <div className="space-y-6 text-gray-600 leading-relaxed">
                  <p className="text-lg">
                    For nearly sixty years, Bier Stube has been more than just a bar – 
                    it's been the heart of Columbus's German-American community and a 
                    second home for Ohio State fans.
                  </p>
                  
                  <p>
                    Our authentic German recipes, traditional brewing methods, and 
                    warm hospitality have created countless memories for families, 
                    friends, and visitors from around the world.
                  </p>
                  
                  <p>
                    Through three generations of ownership and countless Ohio State 
                    victories, we've maintained our commitment to quality, community, 
                    and the authentic German beer hall experience.
                  </p>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-2 gap-6 mt-8">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="text-center p-4 bg-red-50 rounded-lg"
                  >
                    <div className="text-3xl font-bold text-red-600 mb-1">59</div>
                    <div className="text-sm font-semibold text-gray-700">Years of Service</div>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="text-center p-4 bg-red-50 rounded-lg"
                  >
                    <div className="text-3xl font-bold text-red-600 mb-1">3</div>
                    <div className="text-sm font-semibold text-gray-700">Generations</div>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-2xl p-8 text-white">
                  <h3 className="text-2xl font-serif font-bold mb-6">Our Values</h3>
                  
                  <div className="space-y-4">
                    {[
                      { icon: "🍺", title: "Authentic Experience", desc: "Traditional German recipes and brewing methods" },
                      { icon: "🏈", title: "Buckeye Pride", desc: "Supporting OSU and Columbus community since 1965" },
                      { icon: "👥", title: "Family Atmosphere", desc: "Welcoming space for all ages and backgrounds" },
                      { icon: "🎵", title: "Cultural Heritage", desc: "Preserving German traditions and customs" }
                    ].map((value, index) => (
                      <motion.div
                        key={value.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start space-x-4"
                      >
                        <div className="text-2xl">{value.icon}</div>
                        <div>
                          <h4 className="font-semibold mb-1">{value.title}</h4>
                          <p className="text-red-100 text-sm">{value.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* New Chapter Section */}
        <motion.section
          variants={sectionVariants}
          className="py-16 lg:py-24 bg-gray-900 text-white relative overflow-hidden"
        >
          {/* Background Elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-transparent"></div>
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23BB0000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
          </div>

          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-6">
                The Next Chapter Begins
              </h2>
              
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                After a brief hiatus, we're excited to return to Columbus with a new location 
                on King Avenue. Our new home combines the authentic charm you remember with 
                modern amenities and expanded offerings.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {[
                  {
                    icon: "🏢",
                    title: "New Location",
                    desc: "Spacious venue on King Avenue with authentic German décor"
                  },
                  {
                    icon: "🍴",
                    title: "Enhanced Menu",
                    desc: "Traditional favorites plus new authentic German dishes"
                  },
                  {
                    icon: "🎉",
                    title: "Events & Music",
                    desc: "Live music, private events, and enhanced game day experience"
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="text-center"
                  >
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-bold mb-2 text-red-400">{feature.title}</h3>
                    <p className="text-gray-400">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full text-lg font-bold shadow-lg transition-colors duration-200"
                >
                  Visit Our New Location
                </motion.a>
                
                <motion.a
                  href="/events"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-red-400 text-red-400 hover:bg-red-400 hover:text-white px-8 py-4 rounded-full text-lg font-bold transition-all duration-200"
                >
                  See Upcoming Events
                </motion.a>
              </motion.div>

              {/* Community Message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mt-12 p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-red-400/20"
              >
                <p className="text-lg italic text-gray-300 leading-relaxed">
                  "Thank you to our loyal community for your patience and support. 
                  We can't wait to welcome you back home to Bier Stube – where traditions 
                  continue and new memories are made."
                </p>
                <p className="text-red-400 font-semibold mt-4">— The Bier Stube Family</p>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </motion.main>

      <Footer />
    </div>
  );
};

export default OurStory;