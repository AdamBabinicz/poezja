# Neurological Atlas of a Poet's Mind - Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from immersive data visualization platforms like Observable, Flourish, and interactive art installations. This project demands a custom, experience-focused design that prioritizes visual storytelling and emotional engagement over conventional UI patterns.

## Core Design Principles
- **Organic Flow**: Neural-inspired layouts with curved connections and flowing transitions
- **Immersive Exploration**: Full-screen canvas experience with minimal UI chrome
- **Poetic Elegance**: Refined typography and subtle animations that enhance rather than distract
- **Accessibility First**: Comprehensive keyboard navigation and screen reader support

## Color Palette

### Dark Mode (Primary)
- **Background**: Deep neural blue `220 25% 8%`
- **Canvas**: Rich midnight `220 20% 12%` 
- **Neural Nodes**: Luminous cyan `180 60% 70%`
- **Active Connections**: Electric blue `200 80% 65%`
- **Text Primary**: Soft white `0 0% 95%`
- **Text Secondary**: Neural gray `220 15% 70%`

### Light Mode
- **Background**: Warm cream `45 40% 96%`
- **Canvas**: Pure white `0 0% 100%`
- **Neural Nodes**: Deep teal `180 45% 35%`
- **Active Connections**: Ocean blue `200 60% 45%`
- **Text Primary**: Rich charcoal `220 25% 15%`

### Accent Colors
- **Poetry Highlight**: Gentle amber `40 60% 75%`
- **Interactive Elements**: Soft coral `10 55% 70%`

## Typography
- **Primary**: Inter (Google Fonts) - Clean, readable for UI elements
- **Poetry Display**: Crimson Text (Google Fonts) - Elegant serif for poem content
- **Neural Labels**: Inter Mono - Technical elements and metadata

## Layout System
**Tailwind Spacing**: Primary units of 2, 4, 8, and 16 for consistent rhythm
- Micro spacing: `p-2, m-2` (8px)
- Standard spacing: `p-4, m-4` (16px) 
- Section spacing: `p-8, m-8` (32px)
- Major layout: `p-16, m-16` (64px)

## Component Library

### Navigation
- **Floating Toolbar**: Semi-transparent overlay with blur backdrop
- **Zoom Controls**: Organic, rounded buttons with neural-inspired icons
- **Language Toggle**: Subtle flag indicators

### Neural Visualization
- **Node Design**: Glowing circles with pulsing animation
- **Connection Lines**: Curved paths with gradient flow effects
- **Cluster Groups**: Subtle background halos for thematic groupings

### Poem Display
- **Modal Overlay**: Full-screen with darkened background
- **Text Animation**: Line-by-line reveal with gentle fade-in
- **Keyword Highlights**: Interactive underlines with connection previews

### Forms & Controls
- **Search Input**: Floating design with neural-inspired focus states
- **Theme Toggle**: Animated switch with sun/moon iconography
- **Accessibility Controls**: Always-visible options panel

## Animations
**Minimal & Purposeful**: 
- Neural node pulsing (subtle, 2-second intervals)
- Connection flow animations (gentle, directional)
- Text reveal sequences (smooth, readable pace)
- Zoom/pan transitions (fluid, physics-based)

## Images
No large hero image required. The neural network visualization serves as the primary visual element. Consider:
- **Subtle Background Textures**: Organic, neural-inspired patterns at very low opacity
- **Poem Thumbnails**: AI-generated abstract representations for each poem
- **Author Portraits**: Small, circular avatars integrated into node designs

## Responsive Behavior
- **Desktop**: Full immersive canvas experience
- **Tablet**: Simplified navigation with touch-optimized controls  
- **Mobile**: Condensed view with essential functionality, gesture-based navigation

## Accessibility Features
- High contrast mode availability
- Keyboard-first navigation patterns
- Comprehensive ARIA labeling
- Audio descriptions for visual elements
- Reduced motion preferences respected