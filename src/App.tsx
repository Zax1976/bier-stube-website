import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/SimpleFooter';
import Homepage from './pages/SimpleHomepage';
import logoImage from './assets/images/images.jpg';

// Simple page components for now
const OurStory = () => (
  <div className="min-h-screen py-20">
    <div className="max-w-7xl mx-auto px-4 text-center">
      <h1 className="text-4xl font-serif font-bold text-scarlet mb-8">Our Story</h1>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        For nearly 60 years, Bier Stube has been Columbus's beloved dive bar. 
        Originally located at 1497 N. High Street near Ohio State University, 
        we've been serving the community with great beer, live music, and 
        unforgettable game day experiences since 1965.
      </p>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-6">
        Now we're excited to begin a new chapter at 234 King Avenue, bringing 
        the same legendary atmosphere and Buckeye spirit to our new home.
      </p>
    </div>
  </div>
);

const MerchStore = () => (
  <div className="min-h-screen py-20">
    <div className="max-w-7xl mx-auto px-4 text-center">
      <h1 className="text-4xl font-serif font-bold text-scarlet mb-8">Merch Store</h1>
      <p className="text-xl text-gray-600 mb-8">
        Show your Bier Stube pride with our official merchandise!
      </p>
      <div className="bg-gray-100 p-8 rounded-lg">
        <p className="text-lg text-gray-700">
          🚧 Store coming soon! Check back for t-shirts, glasses, and more.
        </p>
      </div>
    </div>
  </div>
);

const Events = () => (
  <div className="min-h-screen py-20">
    <div className="max-w-7xl mx-auto px-4 text-center">
      <h1 className="text-4xl font-serif font-bold text-scarlet mb-8">Events & Game Day</h1>
      <div className="bg-scarlet text-white p-8 rounded-lg mb-8">
        <h2 className="text-2xl font-bold mb-4">🏈 OSU Game Day Specials</h2>
        <p className="text-lg">
          Join us for every Buckeye game with special pricing on beer, 
          food specials, and the best game day atmosphere in Columbus!
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Live Music</h3>
          <p>Local bands every Friday and Saturday night</p>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Trivia Night</h3>
          <p>Test your knowledge every Wednesday at 7PM</p>
        </div>
      </div>
    </div>
  </div>
);

const Contact = () => (
  <div className="min-h-screen py-20">
    <div className="max-w-7xl mx-auto px-4 text-center">
      <h1 className="text-4xl font-serif font-bold text-scarlet mb-8">Contact & Visit</h1>
      <div className="bg-gray-100 p-8 rounded-lg inline-block">
        <h2 className="text-2xl font-bold text-scarlet mb-4">234 King Avenue</h2>
        <p className="text-xl text-gray-700 mb-4">Columbus, OH 43201</p>
        <div className="text-left">
          <p className="text-gray-600 mb-4">
            <strong>Hours:</strong><br />
            Monday - Thursday: 4PM - 12AM<br />
            Friday - Saturday: 2PM - 2AM<br />
            Sunday: 12PM - 12AM<br />
            <span className="text-scarlet font-semibold">Game Days: Extended Hours</span>
          </p>
          <p className="text-gray-600">
            <strong>Phone:</strong> Coming Soon<br />
            <strong>Email:</strong> info@bierstube.com
          </p>
        </div>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="App min-h-screen flex flex-col bg-white">
        <Header logoSrc={logoImage} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/story" element={<OurStory />} />
            <Route path="/merch" element={<MerchStore />} />
            <Route path="/events" element={<Events />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer logoSrc={logoImage} />
      </div>
    </Router>
  );
}

export default App;