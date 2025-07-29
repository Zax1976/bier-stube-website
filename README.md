# Bier Stube Website

A React TypeScript application for the new Bier Stube website at 234 King Avenue, Columbus, OH.

## Features

- **Modern React Stack**: TypeScript, React Router, Tailwind CSS
- **OSU Branding**: Scarlet (#BB0000) and Grey (#666666) color scheme
- **Vintage Aesthetic**: German beer hall styling with modern functionality
- **Firebase Integration**: Authentication, Firestore database, and storage
- **Animations**: Framer Motion for smooth transitions and effects
- **Responsive Design**: Mobile-first approach

## Pages

1. **Homepage** - Hero section, featured products, upcoming events
2. **Our Story** - 60-year history timeline and reopening information
3. **Merch Store** - Firebase-powered e-commerce with cart functionality
4. **Events/Game Day** - Calendar view with OSU game day specials
5. **Contact/Visit Us** - Location info, contact form, and directions

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Firebase (Optional)

1. Create a Firebase project at https://console.firebase.google.com
2. Enable Authentication, Firestore, and Storage
3. Copy your Firebase config to `.env`:

```env
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-bucket.firebasestorage.app
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
```

### 3. Run Development Server

```bash
npm start
```

The app will open at http://localhost:3000

### 4. Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/           # Reusable React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── HeroSection.tsx
│   ├── ProductCard.tsx
│   ├── EventCard.tsx
│   └── ContactForm.tsx
├── pages/               # Main application pages
│   ├── Homepage.tsx
│   ├── OurStory.tsx
│   ├── MerchStore.tsx
│   ├── Events.tsx
│   └── Contact.tsx
├── firebase/            # Firebase configuration and services
│   ├── config.ts
│   ├── auth.ts
│   ├── database.ts
│   └── types.ts
├── assets/              # Images and static assets
│   └── images/
├── App.tsx              # Main application component
└── index.tsx            # Application entry point
```

## Technologies Used

- **React 18** - Component-based UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Firebase** - Backend services (Auth, Firestore, Storage)
- **Framer Motion** - Animation library

## OSU Branding

The website uses Ohio State University's official colors:
- **Scarlet**: #BB0000 (primary brand color)
- **Grey**: #666666 (secondary color)

Typography combines vintage serif (Playfair Display) for headings with modern sans-serif (Montserrat) for body text.

## License

© 2025 Bier Stube. All rights reserved.