import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  logoSrc: string;
}

export const Header: React.FC<HeaderProps> = ({ logoSrc }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src={logoSrc} 
              alt="Bier Stube Logo" 
              className="h-12 w-12 rounded-full object-cover"
            />
            <div>
              <h1 className="text-2xl font-serif font-bold text-scarlet">
                Bier Stube
              </h1>
              <p className="text-sm text-grey">Columbus, Ohio</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className="text-grey hover:text-scarlet transition-colors font-medium"
            >
              Home
            </Link>
            <Link 
              to="/story" 
              className="text-grey hover:text-scarlet transition-colors font-medium"
            >
              Our Story
            </Link>
            <Link 
              to="/merch" 
              className="text-grey hover:text-scarlet transition-colors font-medium"
            >
              Merch Store
            </Link>
            <Link 
              to="/events" 
              className="text-grey hover:text-scarlet transition-colors font-medium"
            >
              Events
            </Link>
            <Link 
              to="/contact" 
              className="text-grey hover:text-scarlet transition-colors font-medium"
            >
              Contact
            </Link>
          </nav>

          {/* Game Day CTA */}
          <div className="hidden md:block">
            <Link 
              to="/events" 
              className="btn-primary"
            >
              Game Day Specials
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-6 h-6 flex flex-col justify-center">
              <span className={`block h-0.5 bg-scarlet mb-1 transition-all ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`block h-0.5 bg-scarlet mb-1 transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block h-0.5 bg-scarlet transition-all ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <nav className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="text-grey hover:text-scarlet transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/story" 
                className="text-grey hover:text-scarlet transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Our Story
              </Link>
              <Link 
                to="/merch" 
                className="text-grey hover:text-scarlet transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Merch Store
              </Link>
              <Link 
                to="/events" 
                className="text-grey hover:text-scarlet transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Events
              </Link>
              <Link 
                to="/contact" 
                className="text-grey hover:text-scarlet transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link 
                to="/events" 
                className="btn-primary mt-4 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Game Day Specials
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};