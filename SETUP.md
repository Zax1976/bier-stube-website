# Bier Stube Website Setup Instructions

## Quick Start

The React application has been created but needs dependencies installed. Follow these steps:

### 1. Open Command Prompt/PowerShell as Administrator

Navigate to the project folder:
```bash
cd C:\Users\zckpe\Documents\claude-projects\bier-stube-website
```

### 2. Install Dependencies

Try the following commands in order until one works:

**Option A (Recommended):**
```bash
npm install --force
```

**Option B (If Option A fails):**
```bash
npm install --legacy-peer-deps
```

**Option C (If both fail):**
```bash
npm cache clear --force
npm install
```

### 3. Start the Development Server

```bash
npm start
```

The website will open at **http://localhost:3000**

## What's Already Set Up

✅ **Complete React TypeScript Application**
- 5 pages: Homepage, Our Story, Merch Store, Events, Contact
- Responsive design with Tailwind CSS
- OSU branding (#BB0000 scarlet, #666666 grey)
- Logo integration (images.jpg)

✅ **Components Created**
- Header with navigation and mobile menu
- Footer with contact information
- Simple page layouts with OSU theming

✅ **Configuration Files**
- package.json with dependencies
- tailwind.config.js with OSU colors
- tsconfig.json for TypeScript
- postcss.config.js for CSS processing

## Current Features

### Homepage
- Hero section with logo and CTAs
- Welcome section with 3 feature cards
- Featured merchandise preview
- Location information (234 King Ave)

### Navigation
- Responsive header with mobile menu
- OSU-branded "Game Day Specials" button
- Footer with quick links and contact info

### Styling
- Tailwind CSS utility classes
- Custom OSU color scheme
- Google Fonts: Playfair Display + Montserrat
- Responsive mobile-first design

## If Installation Fails

### Alternative: Simplified Version

If npm installation continues to fail, you can create a simpler version:

1. Create a basic HTML version by copying the JSX content
2. Use CDN links for React and Tailwind
3. Convert to static HTML/CSS/JS

### Dependencies Issues

The application is set up with:
- React 18.2.0
- TypeScript 4.9.5  
- React Router 6.20.1
- Tailwind CSS 3.3.6

If you encounter module conflicts, the simplified components avoid complex dependencies like Framer Motion and Firebase for now.

## Next Steps (After Basic Setup Works)

1. **Add Firebase Integration**
   - Uncomment Firebase code in components
   - Set up Firebase project
   - Configure authentication and database

2. **Enhanced Components**
   - Add Framer Motion animations
   - Implement shopping cart functionality
   - Create event calendar system

3. **Content Management**
   - Add real product data
   - Set up event management
   - Create admin dashboard

## Troubleshooting

**Port Already in Use:**
```bash
npm start -- --port 3001
```

**Permission Errors:**
- Run Command Prompt as Administrator
- Try: `npm config set prefix /usr/local`

**Module Not Found:**
```bash
rm -rf node_modules package-lock.json
npm install
```

The basic website should work once dependencies are installed! 🏈🍺