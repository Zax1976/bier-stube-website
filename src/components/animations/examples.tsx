import React, { useState } from 'react';
import {
  ScrollReveal,
  ScrollRevealText,
  ScrollRevealGrid,
  ScrollRevealSection,
  PageTransition,
  LoadingTransition,
  ModalTransition,
  ProductCardHover,
  AnimatedButton,
  AnimatedIcon,
  MagneticHover,
  Parallax,
  ParallaxBackground,
  FloatingElements,
  ScrollProgress,
  BierStubeSpinner,
  BeerMugLoader,
  SkeletonCard,
  SkeletonGrid,
  PulsingDots,
  ProgressBar,
  TypewriterText,
  FullPageLoader,
  OurStoryTimeline,
  AnimatedCounter,
  MilestoneShowcase,
  OSU_COLORS
} from './index';

// Example: Basic ScrollReveal Usage
export const ScrollRevealExample: React.FC = () => {
  return (
    <div className="space-y-12 p-8">
      {/* Basic fade in up */}
      <ScrollReveal variant="fadeInUp">
        <h2 className="text-3xl font-bold text-gray-900">Welcome to Bier Stube</h2>
      </ScrollReveal>

      {/* Staggered text animation */}
      <ScrollRevealText 
        text="Authentic German Beer Hall Experience"
        splitBy="word"
        className="text-2xl text-gray-700"
        variant="fadeInLeft"
        stagger={0.1}
      />

      {/* Product grid with stagger */}
      <ScrollRevealGrid columns={3} stagger={0.15}>
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="font-semibold mb-2">Product {i}</h3>
            <p className="text-gray-600">Sample product description</p>
          </div>
        ))}
      </ScrollRevealGrid>

      {/* Section with decorative elements */}
      <ScrollRevealSection
        title="Our Story"
        subtitle="Six decades of authentic German hospitality"
        showDecorator={true}
        decoratorColor={OSU_COLORS.scarlet}
      >
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          Since 1965, Bier Stube has been Columbus's premier destination for 
          authentic German beer, food, and atmosphere.
        </p>
      </ScrollRevealSection>
    </div>
  );
};

// Example: Page Transitions
export const PageTransitionExample: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const pages = {
    home: <div className="p-8 text-center"><h1>Home Page</h1></div>,
    about: <div className="p-8 text-center"><h1>About Page</h1></div>,
    menu: <div className="p-8 text-center"><h1>Menu Page</h1></div>
  };

  return (
    <div>
      <nav className="flex space-x-4 p-4 bg-gray-100">
        {Object.keys(pages).map(page => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className="px-4 py-2 bg-red-600 text-white rounded capitalize"
          >
            {page}
          </button>
        ))}
      </nav>

      <PageTransition
        key={currentPage}
        transitionKey={currentPage}
        variant="vintage"
        className="min-h-96"
      >
        {pages[currentPage as keyof typeof pages]}
      </PageTransition>
    </div>
  );
};

// Example: Interactive Hovers
export const InteractiveHoverExample: React.FC = () => {
  return (
    <div className="space-y-8 p-8">
      {/* Enhanced product card */}
      <ProductCardHover isOSUThemed={true}>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <img src="/api/placeholder/300/200" alt="OSU Merchandise" className="w-full h-40 object-cover rounded mb-4" />
          <h3 className="text-xl font-semibold mb-2">Buckeye Pride T-Shirt</h3>
          <p className="text-gray-600 mb-4">Show your Buckeye spirit with this vintage-style tee</p>
          <div className="text-2xl font-bold text-red-600">$24.99</div>
        </div>
      </ProductCardHover>

      {/* Button variations */}
      <div className="flex flex-wrap gap-4">
        <AnimatedButton variant="primary">Primary Button</AnimatedButton>
        <AnimatedButton variant="osu">Go Bucks!</AnimatedButton>
        <AnimatedButton variant="vintage">Vintage Style</AnimatedButton>
        <AnimatedButton variant="outline">Outline</AnimatedButton>
      </div>

      {/* Animated icons */}
      <div className="flex space-x-8">
        <AnimatedIcon effect="bounce" trigger="hover">
          <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white text-xl">🍺</div>
        </AnimatedIcon>
        <AnimatedIcon effect="spin" trigger="click">
          <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-white text-xl">⚙️</div>
        </AnimatedIcon>
        <AnimatedIcon effect="vintage" trigger="hover">
          <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center text-white text-xl">★</div>
        </AnimatedIcon>
      </div>

      {/* Magnetic hover effect */}
      <MagneticHover strength={15} className="inline-block">
        <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 rounded-lg text-white text-center">
          <h3 className="text-xl font-bold">Magnetic Hover Effect</h3>
          <p>Move your mouse around this card</p>
        </div>
      </MagneticHover>
    </div>
  );
};

// Example: Parallax Effects
export const ParallaxExample: React.FC = () => {
  return (
    <div>
      <ScrollProgress />
      
      {/* Hero section with parallax background */}
      <ParallaxBackground
        imageUrl="/api/placeholder/1920/1080"
        className="h-screen flex items-center justify-center"
      >
        <div className="text-center text-white">
          <h1 className="text-6xl font-bold mb-4">Bier Stube</h1>
          <p className="text-2xl">Authentic German Experience</p>
        </div>
        <FloatingElements />
      </ParallaxBackground>

      {/* Content sections with text parallax */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <Parallax speed={0.3} direction="up">
            <h2 className="text-4xl font-bold text-center mb-8">Our Heritage</h2>
          </Parallax>
          <p className="text-lg text-gray-700 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
            tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>

      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <Parallax speed={0.2} direction="down">
            <h2 className="text-4xl font-bold text-center mb-8">Our Commitment</h2>
          </Parallax>
          <p className="text-lg text-gray-700 leading-relaxed">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
            nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
      </div>
    </div>
  );
};

// Example: Loading Animations
export const LoadingExample: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setIsLoading(false);
          clearInterval(timer);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-8 p-8">
      {/* Various spinners */}
      <div className="flex items-center space-x-8">
        <BierStubeSpinner size="sm" />
        <BierStubeSpinner size="md" />
        <BierStubeSpinner size="lg" />
        <BeerMugLoader size={80} />
      </div>

      {/* Progress indicators */}
      <div className="space-y-4">
        <ProgressBar progress={75} label="Loading Menu Items" />
        <PulsingDots count={3} color={OSU_COLORS.scarlet} />
      </div>

      {/* Typewriter effect */}
      <TypewriterText 
        text="Welcome to Bier Stube - Your Authentic German Experience Awaits!"
        speed={50}
        className="text-2xl font-bold text-gray-800"
      />

      {/* Loading transition */}
      <LoadingTransition isLoading={isLoading}>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Content Loaded!</h3>
          <p>This content appears after loading is complete.</p>
        </div>
      </LoadingTransition>

      {/* Skeleton screens */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SkeletonCard variant="product" />
        <SkeletonCard variant="event" />
      </div>
    </div>
  );
};

// Example: Timeline and Story
export const TimelineExample: React.FC = () => {
  const milestones = [
    { number: 60, label: "Years of Service", suffix: "+" },
    { number: 50000, label: "Happy Customers", suffix: "+" },
    { number: 500, label: "Events Hosted", suffix: "+" },
    { number: 1965, label: "Established" }
  ];

  return (
    <div className="space-y-16 p-8">
      {/* Milestone showcase */}
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-12">By the Numbers</h2>
        <MilestoneShowcase milestones={milestones} />
      </div>

      {/* Individual counter example */}
      <div className="text-center">
        <div className="text-6xl font-bold text-red-600 mb-4">
          <AnimatedCounter end={1965} />
        </div>
        <p className="text-xl text-gray-600">Year Established</p>
      </div>

      {/* Full timeline */}
      <OurStoryTimeline />
    </div>
  );
};

// Example: Modal Integration
export const ModalExample: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-8">
      <AnimatedButton 
        variant="osu" 
        onClick={() => setIsModalOpen(true)}
      >
        Open Modal
      </AnimatedButton>

      <ModalTransition
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full mx-4"
      >
        <h2 className="text-2xl font-bold mb-4">Modal Content</h2>
        <p className="text-gray-600 mb-6">
          This modal uses smooth entrance and exit animations.
        </p>
        <div className="flex justify-end space-x-4">
          <AnimatedButton 
            variant="outline" 
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </AnimatedButton>
          <AnimatedButton 
            variant="primary" 
            onClick={() => setIsModalOpen(false)}
          >
            Confirm
          </AnimatedButton>
        </div>
      </ModalTransition>
    </div>
  );
};

// Complete showcase component
export const AnimationShowcase: React.FC = () => {
  const [activeExample, setActiveExample] = useState('scroll');

  const examples = {
    scroll: <ScrollRevealExample />,
    transitions: <PageTransitionExample />,
    hovers: <InteractiveHoverExample />,
    parallax: <ParallaxExample />,
    loading: <LoadingExample />,
    timeline: <TimelineExample />,
    modal: <ModalExample />
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold text-gray-900">Bier Stube Animation System</h1>
          <p className="text-gray-600 mt-2">Comprehensive animation components and examples</p>
        </div>
      </header>

      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-1 overflow-x-auto py-2">
            {Object.keys(examples).map(key => (
              <button
                key={key}
                onClick={() => setActiveExample(key)}
                className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
                  activeExample === key
                    ? 'bg-red-600 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main>
        <PageTransition
          key={activeExample}
          transitionKey={activeExample}
          variant="fadeScale"
        >
          {examples[activeExample as keyof typeof examples]}
        </PageTransition>
      </main>
    </div>
  );
};

export default AnimationShowcase;