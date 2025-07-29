import React from 'react';
import { motion } from 'framer-motion';

interface FooterProps {
  logoSrc?: string;
  className?: string;
}

interface SocialLink {
  name: string;
  href: string;
  icon: string;
}

const socialLinks: SocialLink[] = [
  {
    name: 'Facebook',
    href: '#',
    icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z'
  },
  {
    name: 'Instagram',
    href: '#',
    icon: 'M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-2.504 0-4.534-2.03-4.534-4.535s2.03-4.534 4.534-4.534 4.535 2.029 4.535 4.534-2.031 4.535-4.535 4.535zm7.568 0c-2.504 0-4.534-2.03-4.534-4.535s2.03-4.534 4.534-4.534 4.535 2.029 4.535 4.534-2.031 4.535-4.535 4.535z'
  },
  {
    name: 'Twitter',
    href: '#',
    icon: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z'
  }
];

const Footer: React.FC<FooterProps> = ({ 
  logoSrc = '/images.jpg',
  className = ''
}) => {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className={`bg-gray-900 text-white relative overflow-hidden ${className}`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-transparent"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23BB0000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Logo and Brand Section */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <div className="flex flex-col items-center lg:items-start space-y-4">
              <motion.img
                whileHover={{ scale: 1.05 }}
                src={logoSrc}
                alt="Bier Stube Logo"
                className="h-20 w-auto object-contain"
              />
              <p className="text-gray-300 text-center lg:text-left text-sm leading-relaxed">
                Columbus's authentic German beer hall, proudly serving the community since 1965. 
                Now reopening at our new location on King Avenue.
              </p>
            </div>
          </motion.div>

          {/* Location & Hours */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <h3 className="text-lg font-bold text-red-400 mb-4 font-serif">Visit Us</h3>
            <div className="space-y-3">
              <div>
                <p className="font-semibold">Address:</p>
                <p className="text-gray-300 text-sm">
                  234 King Ave<br />
                  Columbus, OH 43201
                </p>
              </div>
              <div>
                <p className="font-semibold">Hours:</p>
                <div className="text-gray-300 text-sm space-y-1">
                  <p>Mon-Thu: 4PM - 11PM</p>
                  <p>Fri-Sat: 2PM - 12AM</p>
                  <p>Sun: 12PM - 10PM</p>
                  <p className="text-red-400 font-semibold">Game Days: Special Hours</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <h3 className="text-lg font-bold text-red-400 mb-4 font-serif">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: 'Our Story', href: '/story' },
                { name: 'Merchandise', href: '/merch' },
                { name: 'Events Calendar', href: '/events' },
                { name: 'Game Day Specials', href: '/events?category=game_day' },
                { name: 'Contact Us', href: '/contact' },
                { name: 'Private Events', href: '/contact?inquiry=private' }
              ].map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 5, color: '#BB0000' }}
                    className="text-gray-300 hover:text-red-400 text-sm transition-colors duration-200"
                  >
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact & Social */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <h3 className="text-lg font-bold text-red-400 mb-4 font-serif">Connect</h3>
            <div className="space-y-4">
              <div>
                <p className="font-semibold">Phone:</p>
                <motion.a
                  href="tel:+16141234567"
                  whileHover={{ color: '#BB0000' }}
                  className="text-gray-300 hover:text-red-400 text-sm transition-colors duration-200"
                >
                  (614) 123-4567
                </motion.a>
              </div>
              <div>
                <p className="font-semibold">Email:</p>
                <motion.a
                  href="mailto:info@bierstubecolumbus.com"
                  whileHover={{ color: '#BB0000' }}
                  className="text-gray-300 hover:text-red-400 text-sm transition-colors duration-200"
                >
                  info@bierstubecolumbus.com
                </motion.a>
              </div>
              
              {/* Social Media */}
              <div>
                <p className="font-semibold mb-3">Follow Us:</p>
                <div className="flex space-x-4">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      whileHover={{ scale: 1.2, color: '#BB0000' }}
                      whileTap={{ scale: 0.9 }}
                      className="text-gray-400 hover:text-red-400 transition-colors duration-200"
                      aria-label={social.name}
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d={social.icon} />
                      </svg>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          variants={itemVariants}
          className="mt-12 pt-8 border-t border-gray-700"
        >
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="text-center lg:text-left">
              <p className="text-gray-400 text-sm">
                © {currentYear} Bier Stube Columbus. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Proudly supporting Ohio State Buckeyes since 1965
              </p>
            </div>
            
            <div className="flex space-x-6 text-xs">
              <motion.a
                href="/privacy"
                whileHover={{ color: '#BB0000' }}
                className="text-gray-400 hover:text-red-400 transition-colors duration-200"
              >
                Privacy Policy
              </motion.a>
              <motion.a
                href="/terms"
                whileHover={{ color: '#BB0000' }}
                className="text-gray-400 hover:text-red-400 transition-colors duration-200"
              >
                Terms of Service
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* OSU Pride Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-red-500 to-red-600"></div>
    </motion.footer>
  );
};

export default Footer;