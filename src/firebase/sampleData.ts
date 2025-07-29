// Sample Data for Bier Stube Firebase Collections
import { Timestamp } from 'firebase/firestore';
import { Product, Event, ProductCategory, EventCategory } from './types';

// Sample Products Data
export const sampleProducts: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>[] = [
  // Apparel
  {
    name: 'Bier Stube Classic T-Shirt',
    description: 'Black cotton t-shirt with vintage Bier Stube logo. Comfortable fit perfect for game day or casual wear. Made from 100% premium cotton.',
    category: 'apparel' as ProductCategory,
    price: 19.99,
    compareAtPrice: 24.99,
    images: [
      {
        id: '1',
        url: '/images/products/classic-tshirt-black.jpg',
        alt: 'Bier Stube Classic Black T-Shirt',
        order: 0,
        isMain: true
      },
      {
        id: '2',
        url: '/images/products/classic-tshirt-back.jpg',
        alt: 'Bier Stube T-Shirt Back View',
        order: 1,
        isMain: false
      }
    ],
    variants: [
      {
        id: 'size-s',
        name: 'Size',
        value: 'Small',
        stock: 15,
        sku: 'BS-TSHIRT-BLK-S'
      },
      {
        id: 'size-m',
        name: 'Size',
        value: 'Medium',
        stock: 25,
        sku: 'BS-TSHIRT-BLK-M'
      },
      {
        id: 'size-l',
        name: 'Size',
        value: 'Large',
        stock: 30,
        sku: 'BS-TSHIRT-BLK-L'
      },
      {
        id: 'size-xl',
        name: 'Size',
        value: 'X-Large',
        stock: 20,
        sku: 'BS-TSHIRT-BLK-XL'
      },
      {
        id: 'size-xxl',
        name: 'Size',
        value: 'XX-Large',
        stock: 10,
        sku: 'BS-TSHIRT-BLK-XXL'
      }
    ],
    stock: 100,
    sku: 'BS-TSHIRT-BLK',
    isActive: true,
    isFeatured: true,
    tags: ['apparel', 'tshirt', 'classic', 'cotton', 'game-day'],
    seoTitle: 'Bier Stube Classic T-Shirt - Official Merchandise',
    seoDescription: 'Show your Bier Stube pride with our classic black t-shirt featuring the vintage logo. Perfect for OSU game days.',
    weight: 0.3
  },
  
  {
    name: 'OSU Game Day Hoodie',
    description: 'Premium pullover hoodie in scarlet red with embroidered Bier Stube logo. Perfect for cold Columbus game days. Features kangaroo pocket and adjustable drawstring hood.',
    category: 'apparel' as ProductCategory,
    price: 44.99,
    compareAtPrice: 54.99,
    images: [
      {
        id: '1',
        url: '/images/products/gameday-hoodie-red.jpg',
        alt: 'OSU Game Day Hoodie in Scarlet Red',
        order: 0,
        isMain: true
      }
    ],
    variants: [
      {
        id: 'size-s',
        name: 'Size',
        value: 'Small',
        stock: 8,
        sku: 'BS-HOODIE-RED-S'
      },
      {
        id: 'size-m',
        name: 'Size',
        value: 'Medium',
        stock: 12,
        sku: 'BS-HOODIE-RED-M'
      },
      {
        id: 'size-l',
        name: 'Size',
        value: 'Large',
        stock: 15,
        sku: 'BS-HOODIE-RED-L'
      },
      {
        id: 'size-xl',
        name: 'Size',
        value: 'X-Large',
        stock: 10,
        sku: 'BS-HOODIE-RED-XL'
      }
    ],
    stock: 45,
    sku: 'BS-HOODIE-RED',
    isActive: true,
    isFeatured: true,
    tags: ['apparel', 'hoodie', 'gameday', 'osu', 'warm'],
    seoTitle: 'OSU Game Day Hoodie - Bier Stube Official Merchandise',
    seoDescription: 'Stay warm during OSU games with our premium game day hoodie in Buckeye scarlet.',
    weight: 0.8
  },

  // Drinkware
  {
    name: 'Bier Stube Pint Glass',
    description: 'Official 16oz pint glass with etched Bier Stube logo. Perfect for enjoying your favorite beer at home. Dishwasher safe and durable construction.',
    category: 'drinkware' as ProductCategory,
    price: 12.99,
    images: [
      {
        id: '1',
        url: '/images/products/pint-glass.jpg',
        alt: 'Bier Stube 16oz Pint Glass',
        order: 0,
        isMain: true
      }
    ],
    stock: 75,
    sku: 'BS-GLASS-PINT',
    isActive: true,
    isFeatured: false,
    tags: ['drinkware', 'glass', 'beer', 'pint', 'etched'],
    seoTitle: 'Bier Stube Pint Glass - 16oz Official Glassware',
    seoDescription: 'Enjoy your beer like a true regular with our official etched pint glass.',
    weight: 0.4
  },

  {
    name: 'German Beer Stein - 1 Liter',
    description: 'Authentic German-style ceramic beer stein with traditional pewter lid. Features hand-painted Bier Stube crest and "Prost!" inscription. Perfect for Oktoberfest celebrations.',
    category: 'drinkware' as ProductCategory,
    price: 39.99,
    images: [
      {
        id: '1',
        url: '/images/products/beer-stein-1l.jpg',
        alt: '1 Liter German Beer Stein',
        order: 0,
        isMain: true
      }
    ],
    stock: 25,
    sku: 'BS-STEIN-1L',
    isActive: true,
    isFeatured: true,
    tags: ['drinkware', 'stein', 'german', 'ceramic', 'oktoberfest', 'authentic'],
    seoTitle: 'German Beer Stein 1L - Authentic Oktoberfest Drinkware',
    seoDescription: 'Celebrate like you are in Munich with our authentic 1-liter German beer stein.',
    weight: 1.2
  },

  // Accessories
  {
    name: 'Vintage Sticker Pack',
    description: 'Set of 5 weather-resistant vinyl stickers featuring vintage Bier Stube designs. Perfect for laptops, water bottles, or car bumpers. Each pack includes different retro-inspired designs.',
    category: 'accessories' as ProductCategory,
    price: 5.99,
    images: [
      {
        id: '1',
        url: '/images/products/sticker-pack-vintage.jpg',
        alt: 'Vintage Bier Stube Sticker Pack',
        order: 0,
        isMain: true
      }
    ],
    stock: 150,
    sku: 'BS-STICKERS-VINTAGE',
    isActive: true,
    isFeatured: false,
    tags: ['accessories', 'stickers', 'vintage', 'vinyl', 'weatherproof'],
    seoTitle: 'Vintage Bier Stube Sticker Pack - Weather Resistant Vinyl',
    seoDescription: 'Show your Bier Stube pride anywhere with our vintage sticker collection.',
    weight: 0.05
  },

  {
    name: 'Bottle Opener Keychain',
    description: 'Heavy-duty metal bottle opener keychain with engraved Bier Stube logo. Compact design perfect for your keys or belt loop. Never be without a bottle opener again!',
    category: 'accessories' as ProductCategory,
    price: 8.99,
    images: [
      {
        id: '1',
        url: '/images/products/bottle-opener-keychain.jpg',
        alt: 'Bier Stube Bottle Opener Keychain',
        order: 0,
        isMain: true
      }
    ],
    stock: 80,
    sku: 'BS-OPENER-KEY',
    isActive: true,
    isFeatured: false,
    tags: ['accessories', 'bottle-opener', 'keychain', 'metal', 'engraved'],
    seoTitle: 'Bottle Opener Keychain - Engraved Bier Stube Logo',
    seoDescription: 'Always be ready to open a cold one with our engraved keychain bottle opener.',
    weight: 0.1
  },

  // Collectibles
  {
    name: '60th Anniversary Commemorative Pin',
    description: 'Limited edition enamel pin celebrating 60 years of Bier Stube history. Features the original 1964 logo design with gold-plated accents. Only 500 made - a true collector\'s item.',
    category: 'collectibles' as ProductCategory,
    price: 14.99,
    images: [
      {
        id: '1',
        url: '/images/products/60th-anniversary-pin.jpg',
        alt: '60th Anniversary Commemorative Pin',
        order: 0,
        isMain: true
      }
    ],
    stock: 45,
    sku: 'BS-PIN-60TH',
    isActive: true,
    isFeatured: true,
    tags: ['collectibles', 'pin', 'anniversary', '60th', 'limited-edition', 'enamel'],
    seoTitle: '60th Anniversary Pin - Limited Edition Collectible',
    seoDescription: 'Own a piece of Bier Stube history with our limited 60th anniversary commemorative pin.',
    weight: 0.02
  },

  {
    name: 'Vintage Coaster Set',
    description: 'Set of 4 cork-backed coasters featuring different decades of Bier Stube history. Each coaster represents a different era with authentic vintage artwork from the 60s, 70s, 80s, and 90s.',
    category: 'collectibles' as ProductCategory,
    price: 16.99,
    images: [
      {
        id: '1',
        url: '/images/products/vintage-coaster-set.jpg',
        alt: 'Vintage Bier Stube Coaster Set',
        order: 0,
        isMain: true
      }
    ],
    stock: 60,
    sku: 'BS-COASTERS-VINTAGE',
    isActive: true,
    isFeatured: false,
    tags: ['collectibles', 'coasters', 'vintage', 'cork', 'history', 'decades'],
    seoTitle: 'Vintage Coaster Set - Four Decades of Bier Stube History',
    seoDescription: 'Protect your furniture while celebrating Bier Stube history with our vintage coaster collection.',
    weight: 0.3
  },

  // Gift Cards
  {
    name: 'Bier Stube Gift Card - $25',
    description: 'Perfect for any beer lover or Buckeye fan! Digital gift card valid for merchandise purchases. Card will be emailed after purchase and never expires.',
    category: 'gift-cards' as ProductCategory,
    price: 25.00,
    images: [
      {
        id: '1',
        url: '/images/products/gift-card-25.jpg',
        alt: '$25 Bier Stube Gift Card',
        order: 0,
        isMain: true
      }
    ],
    stock: 999,
    sku: 'BS-GIFT-25',
    isActive: true,
    isFeatured: false,
    tags: ['gift-cards', 'digital', 'gift', 'twenty-five'],
    seoTitle: '$25 Bier Stube Gift Card - Perfect Gift',
    seoDescription: 'Give the gift of Bier Stube merchandise with our convenient digital gift cards.',
    weight: 0
  },

  {
    name: 'Bier Stube Gift Card - $50',
    description: 'Perfect for any beer lover or Buckeye fan! Digital gift card valid for merchandise purchases. Card will be emailed after purchase and never expires.',
    category: 'gift-cards' as ProductCategory,
    price: 50.00,
    images: [
      {
        id: '1',
        url: '/images/products/gift-card-50.jpg',
        alt: '$50 Bier Stube Gift Card',
        order: 0,
        isMain: true
      }
    ],
    stock: 999,
    sku: 'BS-GIFT-50',
    isActive: true,
    isFeatured: true,
    tags: ['gift-cards', 'digital', 'gift', 'fifty'],
    seoTitle: '$50 Bier Stube Gift Card - Perfect Gift',
    seoDescription: 'Give the gift of Bier Stube merchandise with our convenient digital gift cards.',
    weight: 0
  }
];

// Sample Events Data
export const sampleEvents: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    title: 'Grand Reopening Celebration',
    description: 'Join us for the grand reopening of Bier Stube at our new location on 234 King Avenue! Live music, special menu items, and commemorative giveaways. First 100 guests receive a free anniversary t-shirt.',
    category: 'special' as EventCategory,
    startDate: Timestamp.fromDate(new Date('2025-08-15T16:00:00')),
    endDate: Timestamp.fromDate(new Date('2025-08-15T23:00:00')),
    startTime: '4:00 PM',
    endTime: '11:00 PM',
    location: {
      name: 'Bier Stube',
      address: '234 King Avenue, Columbus, OH 43201',
      coordinates: {
        lat: 39.9995,
        lng: -83.0197
      }
    },
    images: ['/images/events/grand-reopening.jpg'],
    isRecurring: false,
    capacity: 200,
    currentAttendees: 45,
    isActive: true,
    isFeatured: true,
    tags: ['reopening', 'celebration', 'special', 'live-music', 'giveaway'],
    specialOffers: [
      {
        id: 'reopening-special',
        title: 'Reopening Special Menu',
        description: '20% off all food items during the event',
        discountType: 'percentage',
        discountValue: 20
      }
    ]
  },

  {
    title: 'OSU vs. Michigan Watch Party',
    description: 'The biggest game of the year deserves the biggest party! Join fellow Buckeyes for THE GAME with multiple big screens, game day specials, and the loudest crowd in Columbus. O-H-I-O chants guaranteed!',
    category: 'game_day' as EventCategory,
    startDate: Timestamp.fromDate(new Date('2025-11-30T11:00:00')),
    endDate: Timestamp.fromDate(new Date('2025-11-30T18:00:00')),
    startTime: '11:00 AM',
    endTime: '6:00 PM',
    location: {
      name: 'Bier Stube',
      address: '234 King Avenue, Columbus, OH 43201',
      coordinates: {
        lat: 39.9995,
        lng: -83.0197
      }
    },
    images: ['/images/events/osu-michigan-watch-party.jpg'],
    isRecurring: false,
    capacity: 150,
    currentAttendees: 89,
    isActive: true,
    isFeatured: true,
    tags: ['game-day', 'osu', 'michigan', 'watch-party', 'football', 'rivalry'],
    specialOffers: [
      {
        id: 'gameday-drinks',
        title: 'Game Day Drink Specials',
        description: '$3 domestic beers during the game',
        discountType: 'fixed',
        discountValue: 3,
        applicableProducts: ['draft-beers']
      },
      {
        id: 'gameday-food',
        title: 'Victory Wings',
        description: 'Buy one order of wings, get one half off',
        discountType: 'percentage',
        discountValue: 50,
        applicableProducts: ['wings']
      }
    ]
  },

  {
    title: 'Oktoberfest 2025',
    description: 'Authentic German celebration with traditional music, food, and beer! Features live polka band Die Gemütlichen, authentic German cuisine, and special Oktoberfest beer selections. Lederhosen and dirndls encouraged!',
    category: 'holiday' as EventCategory,
    startDate: Timestamp.fromDate(new Date('2025-09-20T12:00:00')),
    endDate: Timestamp.fromDate(new Date('2025-09-22T23:00:00')),
    startTime: '12:00 PM',
    endTime: '11:00 PM',
    location: {
      name: 'Bier Stube',
      address: '234 King Avenue, Columbus, OH 43201',
      coordinates: {
        lat: 39.9995,
        lng: -83.0197
      }
    },
    images: [
      '/images/events/oktoberfest-2025.jpg',
      '/images/events/oktoberfest-band.jpg',
      '/images/events/oktoberfest-food.jpg'
    ],
    isRecurring: true,
    recurringPattern: {
      frequency: 'daily',
      interval: 1,
      endDate: Timestamp.fromDate(new Date('2025-09-22T23:59:59'))
    },
    capacity: 180,
    currentAttendees: 67,
    ticketPrice: 15.00,
    isActive: true,
    isFeatured: true,
    tags: ['oktoberfest', 'german', 'polka', 'beer', 'authentic', 'traditional'],
    specialOffers: [
      {
        id: 'oktoberfest-stein',
        title: 'Commemorative Stein',
        description: 'Get a commemorative stein with any beer purchase',
        discountType: 'bogo',
        discountValue: 1
      }
    ]
  },

  {
    title: 'Trivia Night - Every Wednesday',
    description: 'Test your knowledge every Wednesday night! Categories include sports, history, pop culture, and of course, beer trivia. Winning team gets a $50 gift card and bragging rights until next week.',
    category: 'special' as EventCategory,
    startDate: Timestamp.fromDate(new Date('2025-08-07T19:00:00')),
    startTime: '7:00 PM',
    endTime: '9:30 PM',
    location: {
      name: 'Bier Stube',
      address: '234 King Avenue, Columbus, OH 43201',
      coordinates: {
        lat: 39.9995,
        lng: -83.0197
      }
    },
    images: ['/images/events/trivia-night.jpg'],
    isRecurring: true,
    recurringPattern: {
      frequency: 'weekly',
      interval: 1,
      daysOfWeek: [3] // Wednesday
    },
    capacity: 80,
    currentAttendees: 32,
    isActive: true,
    isFeatured: false,
    tags: ['trivia', 'weekly', 'competition', 'prizes', 'team-building'],
    specialOffers: [
      {
        id: 'trivia-drink-special',
        title: 'Trivia Night Drinks',
        description: '$1 off all drinks during trivia',
        discountType: 'fixed',
        discountValue: 1
      }
    ]
  },

  {
    title: 'Live Music: The Brewing Brass Band',
    description: 'German folk music meets American classics! The Brewing Brass Band brings their unique sound to Bier Stube with traditional polka, classic rock covers, and original compositions. Dancing encouraged!',
    category: 'live_music' as EventCategory,
    startDate: Timestamp.fromDate(new Date('2025-08-23T20:00:00')),
    endDate: Timestamp.fromDate(new Date('2025-08-23T23:00:00')),
    startTime: '8:00 PM',
    endTime: '11:00 PM',
    location: {
      name: 'Bier Stube',
      address: '234 King Avenue, Columbus, OH 43201',
      coordinates: {
        lat: 39.9995,
        lng: -83.0197
      }
    },
    images: ['/images/events/brewing-brass-band.jpg'],
    isRecurring: false,
    capacity: 120,
    currentAttendees: 28,
    ticketPrice: 10.00,
    isActive: true,
    isFeatured: false,
    tags: ['live-music', 'brass', 'polka', 'dancing', 'german-folk'],
    specialOffers: []
  },

  {
    title: 'Beer Tasting: German Imports',
    description: 'Educational beer tasting featuring 8 different German imports with food pairings. Learn about different beer styles, brewing traditions, and the history of German beer culture. Led by our certified Cicerone.',
    category: 'special' as EventCategory,
    startDate: Timestamp.fromDate(new Date('2025-09-05T18:00:00')),
    endDate: Timestamp.fromDate(new Date('2025-09-05T20:00:00')),
    startTime: '6:00 PM',
    endTime: '8:00 PM',
    location: {
      name: 'Bier Stube',
      address: '234 King Avenue, Columbus, OH 43201',
      coordinates: {
        lat: 39.9995,
        lng: -83.0197
      }
    },
    images: ['/images/events/beer-tasting-german.jpg'],
    isRecurring: false,
    capacity: 30,
    currentAttendees: 18,
    ticketPrice: 35.00,
    isActive: true,
    isFeatured: true,
    tags: ['beer-tasting', 'german', 'education', 'cicerone', 'food-pairing'],
    specialOffers: [
      {
        id: 'tasting-discount',
        title: 'Take Home Bottles',
        description: '15% off any German imports to take home',
        discountType: 'percentage',
        discountValue: 15,
        applicableProducts: ['german-imports']
      }
    ]
  },

  {
    title: 'New Year\'s Eve Bash 2025',
    description: 'Ring in 2026 at Bier Stube! All-inclusive party with champagne toast at midnight, party favors, DJ, dancing, and a special NYE menu. Advance tickets required - this event always sells out!',
    category: 'holiday' as EventCategory,
    startDate: Timestamp.fromDate(new Date('2025-12-31T20:00:00')),
    endDate: Timestamp.fromDate(new Date('2026-01-01T02:00:00')),
    startTime: '8:00 PM',
    endTime: '2:00 AM',
    location: {
      name: 'Bier Stube',
      address: '234 King Avenue, Columbus, OH 43201',
      coordinates: {
        lat: 39.9995,
        lng: -83.0197
      }
    },
    images: ['/images/events/nye-bash-2025.jpg'],
    isRecurring: false,
    capacity: 200,
    currentAttendees: 15,
    ticketPrice: 75.00,
    isActive: true,
    isFeatured: true,
    tags: ['new-years-eve', 'party', 'champagne', 'dj', 'dancing', 'all-inclusive'],
    specialOffers: [
      {
        id: 'early-bird-nye',
        title: 'Early Bird Special',
        description: '$10 off tickets purchased before November 1st',
        discountType: 'fixed',
        discountValue: 10
      }
    ]
  },

  {
    title: 'Sunday Brunch with Bottomless Mimosas',
    description: 'Every Sunday! German-inspired brunch menu with traditional favorites and American classics. Bottomless mimosas, Bloody Marys, and German coffee specialties available. Perfect for recovering from Saturday\'s game!',
    category: 'special' as EventCategory,
    startDate: Timestamp.fromDate(new Date('2025-08-10T10:00:00')),
    startTime: '10:00 AM',
    endTime: '3:00 PM',
    location: {
      name: 'Bier Stube',
      address: '234 King Avenue, Columbus, OH 43201',
      coordinates: {
        lat: 39.9995,
        lng: -83.0197
      }
    },
    images: ['/images/events/sunday-brunch.jpg'],
    isRecurring: true,
    recurringPattern: {
      frequency: 'weekly',
      interval: 1,
      daysOfWeek: [0] // Sunday
    },
    capacity: 100,
    currentAttendees: 0, // Varies each week
    isActive: true,
    isFeatured: false,
    tags: ['brunch', 'sunday', 'mimosas', 'german-inspired', 'weekly'],
    specialOffers: [
      {
        id: 'bottomless-mimosas',
        title: 'Bottomless Mimosas',
        description: '2 hours of bottomless mimosas for $25',
        discountType: 'fixed',
        discountValue: 25
      }
    ]
  }
];

// Function to initialize sample data (for admin use)
export const initializeSampleData = {
  products: sampleProducts,
  events: sampleEvents
};