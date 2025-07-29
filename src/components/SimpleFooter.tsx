import React from 'react';
import { Link } from 'react-router-dom';

interface FooterProps {
  logoSrc: string;
}

export const Footer: React.FC<FooterProps> = ({ logoSrc }) => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src={logoSrc} 
                alt="Bier Stube Logo" 
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <h3 className="text-2xl font-serif font-bold text-scarlet">
                  Bier Stube
                </h3>
                <p className="text-gray-400">Since 1965</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Columbus's beloved dive bar, now reopening at 234 King Avenue. 
              Experience 60 years of tradition with OSU game day specials, 
              German beer, and community spirit.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-scarlet transition-colors">
                Facebook
              </a>
              <a href="#" className="text-gray-400 hover:text-scarlet transition-colors">
                Instagram
              </a>
              <a href="#" className="text-gray-400 hover:text-scarlet transition-colors">
                Twitter
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link to="/" className="block text-gray-300 hover:text-white transition-colors">
                Home
              </Link>
              <Link to="/story" className="block text-gray-300 hover:text-white transition-colors">
                Our Story
              </Link>
              <Link to="/merch" className="block text-gray-300 hover:text-white transition-colors">
                Merch Store
              </Link>
              <Link to="/events" className="block text-gray-300 hover:text-white transition-colors">
                Events
              </Link>
              <Link to="/contact" className="block text-gray-300 hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Visit Us</h4>
            <div className="space-y-2 text-gray-300">
              <p>234 King Avenue</p>
              <p>Columbus, OH 43201</p>
              <p className="mt-4">
                <span className="text-scarlet font-semibold">Hours:</span><br />
                Mon-Thu: 4PM - 12AM<br />
                Fri-Sat: 2PM - 2AM<br />
                Sun: 12PM - 12AM<br />
                <span className="text-yellow-400">Game Days: Extended Hours</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 Bier Stube Columbus. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm mt-2 md:mt-0">
            🏈 <span className="text-scarlet font-semibold">Go Bucks!</span> 🍺
          </p>
        </div>
      </div>
    </footer>
  );
};