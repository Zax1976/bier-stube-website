# Bier Stube Animation System

A comprehensive animation system built with Framer Motion, designed specifically for the Bier Stube website with OSU branding and vintage German beer hall aesthetics.

## Features

- **Scroll-based animations** with Intersection Observer
- **Page transitions** with vintage effects
- **Interactive hover states** with OSU theming
- **Parallax scrolling** for depth and immersion
- **Loading animations** with German beer hall motifs
- **Timeline animations** for storytelling
- **Accessibility support** with reduced motion preferences
- **Performance optimized** for mobile devices

## Quick Start

```tsx
import { 
  ScrollReveal, 
  AnimatedButton, 
  ParallaxBackground,
  BeerMugLoader 
} from '@/components/animations';

// Basic scroll reveal
<ScrollReveal variant="fadeInUp">
  <h1>Welcome to Bier Stube</h1>
</ScrollReveal>

// OSU-themed button
<AnimatedButton variant="osu">Go Bucks!</AnimatedButton>

// Parallax hero section
<ParallaxBackground className="h-screen">
  <YourHeroContent />
</ParallaxBackground>
```

## Components Overview

### 1. ScrollReveal System

Intersection Observer-based animations for elements entering the viewport.

```tsx
import { ScrollReveal, ScrollRevealText, ScrollRevealGrid, ScrollRevealSection } from '@/components/animations';

// Basic reveal
<ScrollReveal variant="fadeInUp" delay={0.2}>
  <div>Content appears with fade up animation</div>
</ScrollReveal>

// Animated text with word splitting
<ScrollRevealText 
  text="Authentic German Beer Hall Experience"
  splitBy="word"
  stagger={0.1}
  variant="fadeInLeft"
/>

// Grid with staggered animation
<ScrollRevealGrid columns={3} stagger={0.15}>
  {products.map(product => <ProductCard key={product.id} {...product} />)}
</ScrollRevealGrid>

// Complete section with decorative elements
<ScrollRevealSection
  title="Our Story"
  subtitle="Six decades of authentic German hospitality"
  showDecorator={true}
  decoratorColor="#BB0000"
>
  <YourContent />
</ScrollRevealSection>
```

### 2. Page Transitions

Smooth transitions between routes with vintage effects.

```tsx
import { PageTransition, LoadingTransition, ModalTransition } from '@/components/animations';

// Route transitions
<PageTransition
  transitionKey={router.pathname}
  variant="vintage"
  duration={0.6}
>
  <YourPageContent />
</PageTransition>

// Loading states
<LoadingTransition isLoading={loading}>
  <YourContent />
</LoadingTransition>

// Modal animations
<ModalTransition
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
>
  <YourModalContent />
</ModalTransition>
```

### 3. Interactive Hovers

Enhanced hover effects for better user engagement.

```tsx
import { ProductCardHover, AnimatedButton, AnimatedIcon, MagneticHover } from '@/components/animations';

// Enhanced product cards with OSU theming
<ProductCardHover isOSUThemed={true}>
  <div className="bg-white p-6 rounded-lg">
    <YourProductContent />
  </div>
</ProductCardHover>

// Themed buttons
<AnimatedButton variant="osu" size="lg">
  Go Buckeyes!
</AnimatedButton>

<AnimatedButton variant="vintage">
  Traditional Style
</AnimatedButton>

// Interactive icons
<AnimatedIcon effect="bounce" trigger="hover">
  <BeerIcon />
</AnimatedIcon>

// Magnetic attraction effect
<MagneticHover strength={15}>
  <div>Element follows mouse movement</div>
</MagneticHover>
```

### 4. Parallax Effects

Create depth and immersion with scrolling parallax.

```tsx
import { Parallax, ParallaxBackground, ParallaxLayers, ScrollProgress } from '@/components/animations';

// Background parallax
<ParallaxBackground
  imageUrl="/images/beer-hall.jpg"
  speed={0.5}
  overlay={true}
  overlayColor="rgba(0, 0, 0, 0.4)"
>
  <YourHeroContent />
</ParallaxBackground>

// Multi-layer parallax
<ParallaxLayers
  layers={[
    { content: <BackgroundImage />, speed: 0.2, zIndex: 1 },
    { content: <MiddleContent />, speed: 0.5, zIndex: 2 },
    { content: <ForegroundText />, speed: 0.8, zIndex: 3 }
  ]}
/>

// Scroll progress indicator
<ScrollProgress color="#BB0000" thickness={4} />
```

### 5. Loading Animations

German beer hall themed loading states.

```tsx
import { 
  BeerMugLoader, 
  BierStubeSpinner, 
  SkeletonCard, 
  TypewriterText,
  ProgressBar 
} from '@/components/animations';

// Beer mug filling animation
<BeerMugLoader size={80} />

// OSU-themed spinner
<BierStubeSpinner size="lg" color="#BB0000" />

// Skeleton screens
<SkeletonCard variant="product" />
<SkeletonGrid count={6} columns={3} variant="event" />

// Typewriter text effect
<TypewriterText 
  text="Welcome to Bier Stube!"
  speed={50}
  cursor={true}
/>

// Progress indicators
<ProgressBar 
  progress={75} 
  label="Loading Menu Items"
  color="#BB0000"
/>
```

### 6. Timeline Animations

Perfect for storytelling and history sections.

```tsx
import { OurStoryTimeline, AnimatedCounter, MilestoneShowcase } from '@/components/animations';

// Complete timeline for Our Story page
<OurStoryTimeline />

// Animated counters
<AnimatedCounter 
  end={60} 
  suffix="+" 
  duration={2}
  className="text-4xl font-bold text-red-600"
/>

// Milestone statistics
<MilestoneShowcase 
  milestones={[
    { number: 60, label: "Years of Service", suffix: "+" },
    { number: 50000, label: "Happy Customers", suffix: "+" },
    { number: 1965, label: "Established" }
  ]}
/>
```

## Configuration

The animation system uses a centralized configuration for consistency:

```tsx
import { OSU_COLORS, TIMING, SPRINGS, COMMON_VARIANTS } from '@/components/animations';

// OSU Brand Colors
OSU_COLORS.scarlet    // #BB0000
OSU_COLORS.gray       // #666666
OSU_COLORS.white      // #FFFFFF

// Animation Timings
TIMING.fast           // 0.2s
TIMING.normal         // 0.3s
TIMING.slow           // 0.5s

// Spring Configurations
SPRINGS.gentle        // Soft, natural movement
SPRINGS.bouncy        // Playful bounce effect
SPRINGS.snappy        // Quick, responsive feel

// Pre-built Variants
COMMON_VARIANTS.fadeInUp
COMMON_VARIANTS.scaleIn
COMMON_VARIANTS.slideInLeft
```

## Accessibility

The system automatically respects user preferences:

```tsx
import { shouldReduceMotion, getAnimationConfig } from '@/components/animations';

// Check user's motion preference
if (shouldReduceMotion()) {
  // Provide static alternative
}

// Get appropriate animation config
const config = getAnimationConfig(myAnimationConfig);
```

## Performance Optimization

- **Mobile-first approach** with optimized transitions
- **Automatic cleanup** of animation listeners
- **Reduced motion support** for accessibility
- **Intersection Observer** for efficient scroll detection
- **Spring physics** for natural, performant animations

## Integration Examples

### Homepage Hero Section

```tsx
import { ParallaxBackground, ScrollRevealText, FloatingElements } from '@/components/animations';

export const Hero = () => (
  <ParallaxBackground 
    imageUrl="/images/beer-hall-interior.jpg"
    className="h-screen flex items-center justify-center"
  >
    <div className="text-center text-white">
      <ScrollRevealText
        text="Welcome Back to Bier Stube"
        className="text-6xl font-bold mb-4"
        splitBy="word"
        stagger={0.1}
      />
      <ScrollRevealText
        text="Columbus's Authentic German Beer Hall Returns"
        className="text-2xl"
        delay={0.5}
      />
    </div>
    <FloatingElements />
  </ParallaxBackground>
);
```

### Product Grid

```tsx
import { ScrollRevealGrid, ProductCardHover } from '@/components/animations';

export const ProductGrid = ({ products }) => (
  <ScrollRevealGrid columns={3} stagger={0.1}>
    {products.map(product => (
      <ProductCardHover 
        key={product.id} 
        isOSUThemed={product.name.includes('Ohio')}
      >
        <ProductCard {...product} />
      </ProductCardHover>
    ))}
  </ScrollRevealGrid>
);
```

### Loading Page

```tsx
import { FullPageLoader } from '@/components/animations';

export const LoadingPage = ({ progress }) => (
  <FullPageLoader
    title="Loading Bier Stube..."
    subtitle="Preparing your authentic German experience"
    showProgress={true}
    progress={progress}
  />
);
```

## Best Practices

1. **Use sparingly** - Don't animate everything
2. **Respect user preferences** - Always check for reduced motion
3. **Maintain brand consistency** - Use OSU colors and vintage aesthetics
4. **Optimize for mobile** - Test on various devices
5. **Progressive enhancement** - Ensure fallbacks for no-JS scenarios
6. **Performance first** - Use `will-change` and `transform` properties

## Browser Support

- **Modern browsers** with ES6+ support
- **iOS Safari 12+**
- **Chrome 60+**
- **Firefox 55+**
- **Edge 79+**

## Dependencies

- `framer-motion ^10.16.0`
- `react ^18.0.0`
- `typescript ^5.0.0`

---

Built with ❤️ for the Bier Stube community and Buckeye nation!