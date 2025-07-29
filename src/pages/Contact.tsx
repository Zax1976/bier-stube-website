import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Header, Footer, ContactForm, BRAND_COLORS, type ContactFormData } from '../components';

interface LocationInfo {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

interface HoursInfo {
  day: string;
  hours: string;
  isSpecial?: boolean;
}

const Contact: React.FC = () => {
  const [selectedInquiryType, setSelectedInquiryType] = useState<string>('general');
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  const location: LocationInfo = {
    address: '234 King Ave',
    city: 'Columbus',
    state: 'OH',
    zipCode: '43201',
    phone: '(614) 123-4567',
    email: 'info@bierstubecolumbus.com',
    coordinates: {
      lat: 39.9612,
      lng: -82.9988
    }
  };

  const hours: HoursInfo[] = [
    { day: 'Monday', hours: '4:00 PM - 11:00 PM' },
    { day: 'Tuesday', hours: '4:00 PM - 11:00 PM' },
    { day: 'Wednesday', hours: '4:00 PM - 11:00 PM' },
    { day: 'Thursday', hours: '4:00 PM - 11:00 PM' },
    { day: 'Friday', hours: '2:00 PM - 12:00 AM' },
    { day: 'Saturday', hours: '2:00 PM - 12:00 AM' },
    { day: 'Sunday', hours: '12:00 PM - 10:00 PM' },
    { day: 'Game Days', hours: 'Special Extended Hours', isSpecial: true }
  ];

  const inquiryTypes = [
    { value: 'general', label: 'General Information', icon: '💬' },
    { value: 'reservations', label: 'Table Reservations', icon: '🪑' },
    { value: 'private_event', label: 'Private Events', icon: '🎉' },
    { value: 'game_day', label: 'Game Day Reservations', icon: '🏈' },
    { value: 'catering', label: 'Catering Services', icon: '🍽️' },
    { value: 'feedback', label: 'Feedback', icon: '📝' }
  ];

  const socialLinks = [
    {
      name: 'Facebook',
      href: 'https://facebook.com/bierstubecolumbus',
      icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
      color: 'hover:text-blue-600'
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/bierstubecolumbus',
      icon: 'M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-2.504 0-4.534-2.03-4.534-4.535s2.03-4.534 4.534-4.534 4.535 2.029 4.535 4.534-2.031 4.535-4.535 4.535zm7.568 0c-2.504 0-4.534-2.03-4.534-4.535s2.03-4.534 4.534-4.534 4.535 2.029 4.535 4.534-2.031 4.535-4.535 4.535z',
      color: 'hover:text-pink-600'
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/bierstubecolumbus',
      icon: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z',
      color: 'hover:text-blue-400'
    }
  ];

  useEffect(() => {
    // Check URL params for inquiry type
    const urlParams = new URLSearchParams(window.location.search);
    const inquiryParam = urlParams.get('inquiry');
    if (inquiryParam && inquiryTypes.some(type => type.value === inquiryParam)) {
      setSelectedInquiryType(inquiryParam);
    }
  }, []);

  const handleFormSubmit = async (formData: ContactFormData) => {
    try {
      // In production, integrate with email service or backend API
      console.log('Contact form submitted:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      alert('Thank you for your message! We\'ll get back to you soon.');
      
      return true;
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error sending your message. Please try again.');
      return false;
    }
  };

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

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
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
        <motion.div
          style={{ y: backgroundY }}
          className="absolute inset-0 opacity-20"
        >
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </motion.div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold mb-4">
              Visit Us
            </h1>
            <p className="text-xl sm:text-2xl text-red-100 mb-8 max-w-3xl mx-auto">
              Find us at our new King Avenue location. We're excited to welcome you 
              back to Columbus's authentic German beer hall experience.
            </p>
            
            {/* Quick Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center"
              >
                <div className="text-3xl mb-2">📍</div>
                <div className="font-semibold">Address</div>
                <div className="text-red-200 text-sm">
                  {location.address}<br />
                  {location.city}, {location.state} {location.zipCode}
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-center"
              >
                <div className="text-3xl mb-2">📞</div>
                <div className="font-semibold">Phone</div>
                <div className="text-red-200 text-sm">{location.phone}</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center"
              >
                <div className="text-3xl mb-2">📧</div>
                <div className="font-semibold">Email</div>
                <div className="text-red-200 text-sm">{location.email}</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <motion.main
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.section variants={sectionVariants}>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">
                Get In Touch
              </h2>
              
              {/* Inquiry Type Selector */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  What can we help you with?
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {inquiryTypes.map((type) => (
                    <motion.button
                      key={type.value}
                      onClick={() => setSelectedInquiryType(type.value)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex flex-col items-center p-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                        selectedInquiryType === type.value
                          ? 'bg-red-100 text-red-700 border-2 border-red-300'
                          : 'bg-gray-50 text-gray-700 border-2 border-transparent hover:bg-gray-100'
                      }`}
                    >
                      <div className="text-xl mb-1">{type.icon}</div>
                      <div className="text-center leading-tight">{type.label}</div>
                    </motion.button>
                  ))}
                </div>
              </div>

              <ContactForm
                onSubmit={handleFormSubmit}
                defaultSubject={inquiryTypes.find(t => t.value === selectedInquiryType)?.label}
                showEventInquiry={selectedInquiryType === 'private_event'}
              />
            </div>
          </motion.section>

          {/* Location Info & Hours */}
          <motion.section variants={sectionVariants} className="space-y-8">
            {/* Hours */}
            <motion.div variants={cardVariants} className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">
                Hours of Operation
              </h3>
              
              <div className="space-y-3">
                {hours.map((hour, index) => (
                  <motion.div
                    key={hour.day}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex justify-between items-center py-2 ${
                      hour.isSpecial 
                        ? 'border-t border-gray-200 pt-4 mt-4 text-red-600 font-semibold' 
                        : ''
                    }`}
                  >
                    <span className="font-medium">{hour.day}</span>
                    <span className={hour.isSpecial ? 'text-red-600' : 'text-gray-600'}>
                      {hour.hours}
                    </span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mt-6 p-4 bg-red-50 rounded-lg"
              >
                <div className="flex items-start space-x-3">
                  <div className="text-red-600 text-xl">🏈</div>
                  <div>
                    <h4 className="font-semibold text-red-900 mb-1">Game Day Hours</h4>
                    <p className="text-red-700 text-sm">
                      We open early and stay late for all Ohio State games. 
                      Check our events page or call ahead for specific game day hours.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Social Media */}
            <motion.div variants={cardVariants} className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">
                Follow Us
              </h3>
              
              <p className="text-gray-600 mb-6">
                Stay connected with us on social media for the latest updates, 
                game day specials, and event announcements.
              </p>

              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full text-gray-600 transition-colors duration-200 ${social.color}`}
                    aria-label={social.name}
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d={social.icon} />
                    </svg>
                  </motion.a>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <motion.a
                  href="tel:+16141234567"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center p-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  Call Now
                </motion.a>
                
                <motion.a
                  href={`mailto:${location.email}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center p-3 border-2 border-red-600 text-red-600 rounded-lg font-semibold hover:bg-red-600 hover:text-white transition-colors duration-200"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  Email Us
                </motion.a>
              </div>
            </motion.div>

            {/* Directions */}
            <motion.div variants={cardVariants} className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">
                Directions & Parking
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="text-red-600 text-xl mt-1">🚗</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">By Car</h4>
                    <p className="text-gray-600 text-sm">
                      Located on King Avenue near the OSU campus. Street parking available, 
                      plus nearby public parking lots.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="text-red-600 text-xl mt-1">🚌</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Public Transit</h4>
                    <p className="text-gray-600 text-sm">
                      Accessible via COTA bus routes. Multiple bus stops within walking distance.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="text-red-600 text-xl mt-1">🚶</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Walking</h4>
                    <p className="text-gray-600 text-sm">
                      Easy walking distance from OSU campus and downtown Columbus.
                    </p>
                  </div>
                </div>
              </div>

              <motion.a
                href={`https://maps.google.com/?q=${encodeURIComponent(`${location.address}, ${location.city}, ${location.state} ${location.zipCode}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-6 flex items-center justify-center w-full p-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                Get Directions
              </motion.a>
            </motion.div>
          </motion.section>
        </div>

        {/* Map Section (Placeholder) */}
        <motion.section
          variants={sectionVariants}
          className="mt-16 bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="aspect-w-16 aspect-h-9 bg-gray-200 flex items-center justify-center">
            <div className="text-center p-8">
              <div className="text-6xl text-gray-400 mb-4">🗺️</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">Interactive Map</h3>
              <p className="text-gray-500 mb-6">
                In production, integrate with Google Maps or similar mapping service
                to show our exact location and nearby landmarks.
              </p>
              <motion.a
                href={`https://maps.google.com/?q=${encodeURIComponent(`${location.address}, ${location.city}, ${location.state} ${location.zipCode}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-bold transition-colors duration-200"
              >
                View on Google Maps
                <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </motion.a>
            </div>
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          variants={sectionVariants}
          className="mt-16 text-center bg-gradient-to-r from-red-600 to-red-800 text-white rounded-2xl p-12"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Visit?</h2>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            We can't wait to welcome you to our new King Avenue location. 
            Come experience the authentic German beer hall atmosphere that Columbus has missed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="/events?category=game_day"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-red-600 px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-100 transition-colors duration-200"
            >
              Reserve for Game Day
            </motion.a>
            <motion.a
              href="/merch"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-white text-white hover:bg-white hover:text-red-600 px-8 py-4 rounded-full text-lg font-bold transition-all duration-200"
            >
              Shop Merchandise
            </motion.a>
          </div>
        </motion.section>
      </motion.main>

      <Footer />
    </div>
  );
};

export default Contact;