import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Header, 
  Footer, 
  HeroSection, 
  ProductCard, 
  EventCard,
  BRAND_COLORS,
  type ProductItem,
  type EventItem,
  type HeroContent 
} from '../components';
import { dbService } from '../firebase/database';
import { Product, Event } from '../firebase/types';

interface NewsletterFormData {
  email: string;
  firstName?: string;
}

const Homepage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newsletterForm, setNewsletterForm] = useState<NewsletterFormData>({ email: '' });
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Parallax scroll effects
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  useEffect(() => {
    loadHomePageData();
  }, []);

  const loadHomePageData = async () => {
    try {
      setIsLoading(true);
      
      // Load featured products
      const productsResponse = await dbService.getProducts({ featured: true }, 1, 6);
      setFeaturedProducts(productsResponse.data);

      // Load upcoming events
      const eventsResponse = await dbService.getEvents({ 
        startDate: new Date(),
        featured: true 
      }, 1, 3);
      setUpcomingEvents(eventsResponse.data);

    } catch (error) {
      console.error('Error loading homepage data:', error);
      // Set fallback data for development
      setFeaturedProducts([]);
      setUpcomingEvents([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterForm.email) return;

    setNewsletterStatus('loading');
    
    try {
      // In production, integrate with email service (Mailchimp, SendGrid, etc.)
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      setNewsletterStatus('success');
      setNewsletterForm({ email: '' });
      
      setTimeout(() => setNewsletterStatus('idle'), 3000);
    } catch (error) {
      console.error('Newsletter signup error:', error);
      setNewsletterStatus('error');
      setTimeout(() => setNewsletterStatus('idle'), 3000);
    }
  };

  const heroContent: HeroContent = {
    title: "Welcome Back to Bier Stube",
    subtitle: "Columbus's Authentic German Beer Hall Returns to King Avenue",
    ctaText: "Explore Our Story",
    ctaLink: "/story"
  };

  // Convert Firebase types to component types
  const convertProduct = (product: Product): ProductItem => ({
    id: product.id,
    category: product.category,
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock,
    available: product.isActive && product.stock > 0,
    sizes: product.variants?.map(v => v.value) || [],
    image: product.images?.[0]?.url
  });

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
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <HeroSection content={heroContent} />

      {/* Main Content */}
      <motion.main
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative"
      >
        {/* Featured Products Section */}
        <motion.section
          variants={sectionVariants}
          className="py-16 lg:py-24 bg-gray-50"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-3xl lg:text-4xl font-serif font-bold text-gray-900 mb-4"
              >
                Featured Merchandise
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-gray-600 max-w-2xl mx-auto"
              >
                Show your Buckeye pride with authentic Bier Stube merchandise. 
                From vintage-inspired apparel to collectible drinkware.
              </motion.p>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl shadow-lg h-96 animate-pulse">
                    <div className="h-64 bg-gray-200 rounded-t-xl"></div>
                    <div className="p-6 space-y-4">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ProductCard
                      product={convertProduct(product)}
                      onAddToCart={(product, quantity, size) => {
                        console.log('Add to cart:', product, quantity, size);
                        // Handle cart addition
                      }}
                      onQuickView={(product) => {
                        console.log('Quick view:', product);
                        // Handle quick view modal
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center mt-12"
            >
              <motion.a
                href="/merch"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full text-lg font-bold shadow-lg transition-colors duration-200"
              >
                Shop All Merchandise
                <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </motion.a>
            </motion.div>
          </div>
        </motion.section>

        {/* Upcoming Events Section */}
        <motion.section
          variants={sectionVariants}
          className="py-16 lg:py-24 bg-white"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-3xl lg:text-4xl font-serif font-bold text-gray-900 mb-4"
              >
                Upcoming Events
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-gray-600 max-w-2xl mx-auto"
              >
                Join us for live music, OSU game day celebrations, and special events. 
                Experience the authentic German beer hall atmosphere.
              </motion.p>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(3)].map((_, i) => (
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
            ) : upcomingEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {upcomingEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <EventCard
                      event={convertEvent(event)}
                      onRSVP={(event) => {
                        console.log('RSVP for:', event);
                        // Handle RSVP
                      }}
                      onShareEvent={(event) => {
                        console.log('Share event:', event);
                        // Handle sharing
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center py-12"
              >
                <div className="text-6xl text-gray-300 mb-4">📅</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Events Scheduled</h3>
                <p className="text-gray-500 mb-6">Check back soon for upcoming events and celebrations!</p>
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center text-red-600 hover:text-red-700 font-semibold"
                >
                  Contact us about private events
                  <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </motion.a>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center mt-12"
            >
              <motion.a
                href="/events"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full text-lg font-bold shadow-lg transition-colors duration-200"
              >
                View All Events
                <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </motion.a>
            </motion.div>
          </div>
        </motion.section>

        {/* Newsletter Section */}
        <motion.section
          variants={sectionVariants}
          className="py-16 lg:py-24 bg-red-600 text-white relative overflow-hidden"
        >
          {/* Background Pattern */}
          <motion.div
            style={{ y: backgroundY }}
            className="absolute inset-0 opacity-10"
          >
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }}></div>
          </motion.div>

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-4">
                Stay Connected with Bier Stube
              </h2>
              <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
                Get the latest updates on events, game day specials, and exclusive offers. 
                Join our community of Buckeye fans!
              </p>
            </motion.div>

            <motion.form
              onSubmit={handleNewsletterSubmit}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-md mx-auto"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={newsletterForm.email}
                  onChange={(e) => setNewsletterForm({ ...newsletterForm, email: e.target.value })}
                  required
                  className="flex-1 px-4 py-3 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/20"
                />
                <motion.button
                  type="submit"
                  disabled={newsletterStatus === 'loading'}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-red-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {newsletterStatus === 'loading' ? 'Subscribing...' : 'Subscribe'}
                </motion.button>
              </div>

              {/* Status Messages */}
              {newsletterStatus === 'success' && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 text-green-200 font-semibold"
                >
                  ✓ Successfully subscribed! Welcome to the Bier Stube family.
                </motion.p>
              )}
              {newsletterStatus === 'error' && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 text-red-200 font-semibold"
                >
                  ✗ Something went wrong. Please try again.
                </motion.p>
              )}
            </motion.form>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6 text-sm text-red-200"
            >
              We respect your privacy. Unsubscribe at any time.
            </motion.p>

            {/* OSU Pride Elements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-12 flex items-center justify-center space-x-4"
            >
              <div className="text-2xl">🏈</div>
              <span className="text-lg font-semibold">Go Buckeyes!</span>
              <div className="text-2xl">🌰</div>
            </motion.div>
          </div>
        </motion.section>

        {/* Location Teaser Section */}
        <motion.section
          variants={sectionVariants}
          className="py-16 lg:py-24 bg-gray-900 text-white"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-6">
                  Find Us on King Avenue
                </h2>
                <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                  Located in the heart of Columbus, our new location brings the authentic 
                  German beer hall experience to King Avenue. Join us for great food, 
                  cold beer, and Buckeye game day excitement.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <svg className="w-6 h-6 text-red-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-lg">234 King Ave, Columbus, OH 43201</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-6 h-6 text-red-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <span className="text-lg">Open Daily | Game Day Hours</span>
                  </div>
                </div>
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full text-lg font-bold shadow-lg transition-colors duration-200"
                >
                  Visit Us Today
                  <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </motion.a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="bg-red-600/20 rounded-2xl p-8 backdrop-blur-sm border border-red-400/30">
                  <h3 className="text-2xl font-bold mb-6 text-center">Hours</h3>
                  <div className="space-y-3 text-center">
                    <div className="flex justify-between">
                      <span className="font-semibold">Monday - Thursday</span>
                      <span>4PM - 11PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Friday - Saturday</span>
                      <span>2PM - 12AM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Sunday</span>
                      <span>12PM - 10PM</span>
                    </div>
                    <div className="border-t border-red-400/30 pt-3 mt-4">
                      <div className="flex justify-between text-red-300">
                        <span className="font-bold">Game Days</span>
                        <span className="font-bold">Special Hours</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </motion.main>

      <Footer />
    </div>
  );
};

export default Homepage;