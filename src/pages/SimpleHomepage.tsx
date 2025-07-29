import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../assets/images/images.jpg';

const Homepage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-scarlet to-scarlet-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <img 
            src={logoImage} 
            alt="Bier Stube Logo" 
            className="h-32 w-32 rounded-full object-cover mx-auto mb-8 shadow-2xl"
          />
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">
            Bier Stube
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Columbus's beloved dive bar is reopening at 234 King Avenue! 
            60 years of tradition meets modern comfort.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/merch" 
              className="bg-white text-scarlet px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
            >
              Shop Merch
            </Link>
            <Link 
              to="/events" 
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-scarlet transition-colors"
            >
              Game Day Specials
            </Link>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">
              Welcome Back to Bier Stube
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              After nearly 60 years on High Street, we're excited to bring our 
              legendary atmosphere to a new home at 234 King Avenue. Same great 
              beer, same Buckeye spirit, new location!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-4xl mb-4">🍺</div>
              <h3 className="text-xl font-bold mb-2">Great Beer</h3>
              <p className="text-gray-600">
                German imports, local favorites, and game day specials
              </p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-4xl mb-4">🏈</div>
              <h3 className="text-xl font-bold mb-2">Buckeye Pride</h3>
              <p className="text-gray-600">
                The ultimate destination for OSU game day celebrations
              </p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-4xl mb-4">🎵</div>
              <h3 className="text-xl font-bold mb-2">Live Music</h3>
              <p className="text-gray-600">
                Local bands, karaoke nights, and classic jukebox hits
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">
              Shop Bier Stube Merchandise
            </h2>
            <p className="text-xl text-gray-600">
              Show your Bier Stube pride with our classic merchandise
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Classic T-Shirt</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Bier Stube Classic Tee</h3>
                <p className="text-gray-600 mb-4">Black t-shirt with vintage logo</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-scarlet">$19.99</span>
                  <button className="btn-primary">Add to Cart</button>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Pint Glass</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Official Pint Glass</h3>
                <p className="text-gray-600 mb-4">16oz glass with etched logo</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-scarlet">$12.99</span>
                  <button className="btn-primary">Add to Cart</button>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Sticker Pack</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Vintage Sticker Pack</h3>
                <p className="text-gray-600 mb-4">Set of 5 vintage-style stickers</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-scarlet">$5.99</span>
                  <button className="btn-primary">Add to Cart</button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Link to="/merch" className="btn-secondary">
              View All Merchandise
            </Link>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-serif font-bold text-gray-900 mb-8">
            Find Us at Our New Location
          </h2>
          <div className="bg-gray-100 p-8 rounded-lg inline-block">
            <h3 className="text-2xl font-bold text-scarlet mb-4">234 King Avenue</h3>
            <p className="text-xl text-gray-700 mb-4">Columbus, OH 43201</p>
            <p className="text-gray-600">
              <strong>Hours:</strong><br />
              Mon-Thu: 4PM - 12AM<br />
              Fri-Sat: 2PM - 2AM<br />
              Sun: 12PM - 12AM<br />
              <span className="text-scarlet font-semibold">Game Days: Extended Hours</span>
            </p>
          </div>
          <div className="mt-8">
            <Link to="/contact" className="btn-primary">
              Get Directions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;