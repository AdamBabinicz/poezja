# Neurological Atlas of a Poet's Mind

## Overview

This project is an immersive, interactive poetry visualization platform called "Neurological Atlas of a Poet's Mind." It presents controversial poetry through an innovative neural network-inspired interface where each poem is represented as a node in an interconnected web of thoughts and themes. Users explore poetry through a non-linear, visually-driven experience that emphasizes the relationships between different works.

The application creates a full-screen, immersive environment where users can pan, zoom, and interact with floating neural nodes representing individual poems. Rather than traditional list-based navigation, the platform uses spatial exploration and thematic connections to guide discovery of the poet's work.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React + TypeScript**: Modern component-based architecture with strict typing
- **Vite**: Fast development build tool with hot module replacement
- **Tailwind CSS**: Utility-first styling with custom neural network color schemes
- **Framer Motion**: Advanced animations for smooth transitions, node interactions, and modal presentations
- **Component Structure**: Modular design with dedicated components for neural nodes, connections, controls, and modals

### Interactive Visualization System
- **Neural Atlas**: Main canvas component managing node positioning, zoom/pan controls, and spatial relationships
- **Node System**: Each poem represented as an interactive node with hover states, click handlers, and visual feedback
- **Connection Mapping**: Visual links between thematically related poems using SVG paths and animated connections
- **Spatial Navigation**: Mouse/touch-based panning and zooming with smooth animations and boundary constraints

### Content Management
- **Static Data Architecture**: Poems stored in JSON format with metadata including keywords, connections, and positioning
- **Multilingual Support**: Full i18n implementation using react-i18next with Polish and English translations
- **Theme System**: Dark/light mode toggle with neural network-specific color palettes
- **SEO Integration**: Dynamic meta tag management using react-helmet-async

### User Interface Patterns
- **Modal System**: Immersive full-screen poem reading experience with animated text reveal
- **Control Interface**: Floating toolbar with zoom controls, theme toggle, and language switching
- **Accessibility Features**: Comprehensive keyboard navigation, ARIA labels, and screen reader support
- **Responsive Design**: Mobile-optimized touch interactions and adaptive layouts

### State Management
- **React Context**: Theme and language preferences with localStorage persistence
- **Component State**: Local state management for atlas interactions, selected poems, and UI controls
- **Query Management**: TanStack React Query for potential future API integration

## External Dependencies

### Core UI Framework
- **Radix UI**: Comprehensive accessible component primitives for modals, buttons, tooltips, and form controls
- **Lucide React**: Consistent icon system for navigation and interactive elements

### Animation and Interaction
- **Framer Motion**: Physics-based animations for neural node movements, modal transitions, and hover effects
- **Embla Carousel**: Potential carousel functionality for poem browsing

### Development and Build Tools
- **TypeScript**: Static typing with strict configuration for enhanced development experience
- **ESLint/Prettier**: Code quality and formatting standards
- **PostCSS**: CSS processing pipeline with Tailwind CSS integration

### Data and Content
- **React i18next**: Internationalization framework supporting Polish and English content
- **Date-fns**: Date manipulation utilities for metadata handling
- **Wouter**: Lightweight client-side routing for language-based URLs

### Database Integration (Configured but Optional)
- **Drizzle ORM**: Type-safe PostgreSQL integration with schema definitions
- **Neon Database**: Cloud PostgreSQL provider for potential future data persistence
- The application currently operates with static JSON data but includes database infrastructure for future expansion

### Backend Foundation
- **Express.js**: Server framework with middleware for development and production builds
- **Vite Development Server**: Hot module replacement and development proxy integration
- The backend currently serves static content but provides foundation for future API development