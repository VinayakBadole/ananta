# Design Document

## Overview

This design document outlines the implementation of a modern, award-winning website for Project Ananta by Global One Consulting, inspired by the client's favorite sites: Zentry, ChungiYoo, Ventriloc, and Heights Agency. The website will feature a sophisticated Gold, White, and Black color scheme with day-to-night theme transitions, dual branding approach, and cutting-edge web technologies to create an immersive luxury real estate experience that matches the quality of top Awwwards-featured sites.

## Architecture

### Technology Stack

Based on our analysis of the client's favorite websites, we will use:

**Core Framework:**
- **Vite** - Modern build tool (faster alternative to Nuxt.js used by Zentry/ChungiYoo)
- **Vanilla JavaScript** with ES6+ modules for maximum performance
- **HTML5** with semantic structure

**Animation & Interaction:**
- **Lenis** - Smooth scrolling library (confirmed in Zentry's SmoothScrollLenis component)
- **GSAP 3** with ScrollTrigger - Professional animations (replicating ChungiYoo's data-preset system)
- **SplitType** - Text animation library for character-by-character effects
- **Intersection Observer API** - For scroll-triggered animations

**Styling:**
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Custom CSS Properties** - For advanced theming and animations
- **PostCSS** - CSS processing and optimization

**Media & Assets:**
- **Optimized video backgrounds** - Following luxury site patterns
- **WebP/AVIF images** with fallbacks
- **Custom cursor implementation** (inspired by ChungiYoo)
- **Lazy loading** for performance

### Project Structure

```
web/
├── src/
│   ├── js/
│   │   ├── main.js              # Entry point
│   │   ├── animations/
│   │   │   ├── lenis.js         # Smooth scrolling setup
│   │   │   ├── gsap.js          # GSAP configuration
│   │   │   ├── scroll-triggers.js # Scroll-based animations
│   │   │   └── text-animations.js # SplitType text effects
│   │   ├── components/
│   │   │   ├── cursor.js        # Custom cursor
│   │   │   ├── preloader.js     # Loading screen
│   │   │   ├── navigation.js    # Navigation interactions
│   │   │   └── video-player.js  # Video controls
│   │   └── utils/
│   │       ├── observers.js     # Intersection observers
│   │       └── helpers.js       # Utility functions
│   ├── styles/
│   │   ├── main.css            # Main stylesheet
│   │   ├── components/         # Component styles
│   │   └── animations.css      # Animation definitions
│   └── assets/
│       ├── videos/             # Background videos
│       ├── images/             # Optimized images
│       └── fonts/              # Custom fonts
├── public/                     # Static assets
├── index.html                  # Main HTML file
├── vite.config.js             # Vite configuration
├── tailwind.config.js         # Tailwind configuration
└── package.json               # Dependencies
```

## Components and Interfaces

### 1. Smooth Scrolling System (Lenis Integration)

**Implementation:** Replicate Zentry's SmoothScrollLenis component

```javascript
// src/js/animations/lenis.js
import Lenis from '@studio-freight/lenis'

class SmoothScroll {
  constructor() {
    this.lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })
  }

  init() {
    this.lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => {
      this.lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)
  }
}
```

### 2. Animation System (GSAP + Data Attributes)

**Implementation:** Replicate ChungiYoo's data-preset animation system

```javascript
// src/js/animations/scroll-triggers.js
class AnimationController {
  constructor() {
    this.animations = new Map()
  }

  init() {
    // Find all elements with data-preset attributes
    const animatedElements = document.querySelectorAll('[data-preset]')
    
    animatedElements.forEach((element, index) => {
      this.createAnimation(element, index)
    })
  }

  createAnimation(element, index) {
    const preset = element.dataset.preset
    const delay = parseFloat(element.dataset.delay) || 0
    const duration = parseFloat(element.dataset.duration) || 1
    
    // Parse preset (e.g., "opacity,y" or "scale,rotation")
    const properties = this.parsePreset(preset, element.dataset)
    
    gsap.set(element, properties.from)
    
    ScrollTrigger.create({
      trigger: element,
      start: "top 80%",
      onEnter: () => {
        gsap.to(element, {
          ...properties.to,
          duration: duration,
          delay: delay,
          ease: "power2.out"
        })
      }
    })
  }
}
```

### 3. Custom Cursor System

**Implementation:** Inspired by ChungiYoo's interactive cursor

```javascript
// src/js/components/cursor.js
class CustomCursor {
  constructor() {
    this.cursor = null
    this.follower = null
    this.isHovering = false
  }

  init() {
    this.createCursor()
    this.bindEvents()
  }

  createCursor() {
    this.cursor = document.createElement('div')
    this.cursor.className = 'custom-cursor'
    
    this.follower = document.createElement('div')
    this.follower.className = 'cursor-follower'
    
    document.body.appendChild(this.cursor)
    document.body.appendChild(this.follower)
  }

  bindEvents() {
    document.addEventListener('mousemove', this.updatePosition.bind(this))
    
    // Hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [data-cursor]')
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => this.setHoverState(true))
      el.addEventListener('mouseleave', () => this.setHoverState(false))
    })
  }
}
```

### 4. Dual Brand Logo Entry Mask System

**Implementation:** Global One to Ananta transition with Zentry-inspired cinematic entrance

```javascript
// src/js/components/logo-mask.js
class DualBrandLogoMask {
  constructor() {
    this.maskContainer = null
    this.globalOneLogo = null
    this.anantaLogo = null
    this.isAnimating = false
    this.timeline = null
  }

  init() {
    this.createMaskElements()
    this.setupDualBrandTimeline()
    this.startEntrySequence()
  }

  createMaskElements() {
    // Create full-screen mask container with dual branding
    this.maskContainer = document.createElement('div')
    this.maskContainer.className = 'dual-brand-entry-mask'
    this.maskContainer.innerHTML = `
      <div class="mask-background"></div>
      <div class="global-one-container">
        <img src="/images/global-one-logo.svg" alt="Global One Consulting" class="global-one-logo">
        <div class="company-text">Global One Consulting</div>
        <div class="presents-text">Presents</div>
      </div>
      <div class="ananta-container">
        <img src="/images/ananta-logo.svg" alt="अनंता" class="ananta-logo">
        <div class="project-text">अनंता</div>
      </div>
      <div class="expanding-circle"></div>
      <div class="click-to-enter">Click or Scroll to Enter</div>
    `
    document.body.appendChild(this.maskContainer)
  }

  setupTimeline() {
    this.timeline = gsap.timeline({
      onComplete: () => this.revealMainSite()
    })

    // Phase 1: Logo fade in and scale
    this.timeline
      .set('.logo-entry-mask', { opacity: 1, zIndex: 9999 })
      .set('.entry-logo, .logo-text', { opacity: 0, scale: 0.8 })
      .set('.expanding-circle', { scale: 0, opacity: 0 })
      
      // Logo entrance
      .to('.entry-logo', {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power2.out"
      })
      .to('.logo-text', {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.6")
      
      // Hold for brand recognition
      .to({}, { duration: 1.5 })
      
      // Phase 2: Expanding circle reveal
      .to('.expanding-circle', {
        opacity: 1,
        scale: 50,
        duration: 1.8,
        ease: "power2.inOut"
      })
      .to('.entry-logo, .logo-text', {
        opacity: 0,
        scale: 1.2,
        duration: 0.6,
        ease: "power2.in"
      }, "-=1.2")
  }

  startEntrySequence() {
    // Prevent scrolling during entrance
    document.body.style.overflow = 'hidden'
    this.timeline.play()
  }

  revealMainSite() {
    // Fade out mask and reveal main content
    gsap.to('.logo-entry-mask', {
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      onComplete: () => {
        this.maskContainer.remove()
        document.body.style.overflow = 'auto'
        this.initMainSiteAnimations()
      }
    })
  }

  initMainSiteAnimations() {
    // Trigger main site entrance animations
    const event = new CustomEvent('logoMaskComplete')
    document.dispatchEvent(event)
  }
}
```

**CSS for Logo Entry Mask:**

```css
/* src/styles/components/logo-mask.css */
.logo-entry-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  opacity: 0;
}

.mask-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
}

.logo-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  z-index: 2;
}

.entry-logo {
  width: 120px;
  height: 120px;
  filter: drop-shadow(0 0 20px rgba(236, 187, 79, 0.3));
}

.logo-text {
  font-family: 'Tiro Devanagari Hindi', serif;
  font-size: 4rem;
  color: #ecbb4f;
  font-weight: 400;
  text-shadow: 0 0 30px rgba(236, 187, 79, 0.5);
}

.expanding-circle {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100px;
  height: 100px;
  background: radial-gradient(circle, rgba(236, 187, 79, 0.1) 0%, transparent 70%);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  mix-blend-mode: screen;
}

@media (max-width: 768px) {
  .entry-logo {
    width: 80px;
    height: 80px;
  }
  
  .logo-text {
    font-size: 2.5rem;
  }
}
```

### 5. Video Background System

**Implementation:** Optimized video backgrounds with fallbacks

```javascript
// src/js/components/video-player.js
class VideoBackground {
  constructor(element) {
    this.video = element
    this.poster = element.dataset.poster
    this.sources = this.getVideoSources()
  }

  init() {
    this.setupIntersectionObserver()
    this.handleLoadingStates()
  }

  setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadVideo()
        } else {
          this.pauseVideo()
        }
      })
    }, { threshold: 0.1 })

    observer.observe(this.video)
  }
}
```

### 5. Text Animation System

**Implementation:** Character-by-character text reveals using SplitType

```javascript
// src/js/animations/text-animations.js
import SplitType from 'split-type'

class TextAnimations {
  constructor() {
    this.splitTexts = []
  }

  init() {
    const textElements = document.querySelectorAll('[data-text-animation]')
    
    textElements.forEach(element => {
      const split = new SplitType(element, { types: 'chars,words,lines' })
      this.splitTexts.push(split)
      
      this.createTextAnimation(element, split)
    })
  }

  createTextAnimation(element, split) {
    const animationType = element.dataset.textAnimation
    
    gsap.set(split.chars, { opacity: 0, y: 50 })
    
    ScrollTrigger.create({
      trigger: element,
      start: "top 80%",
      onEnter: () => {
        gsap.to(split.chars, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.02,
          ease: "power2.out"
        })
      }
    })
  }
}
```

### 6. Day-to-Night Theme Transition System

**Implementation:** Zentry-inspired progressive theme shifting based on scroll position

```javascript
// src/js/components/theme-transition.js
class ThemeTransition {
  constructor() {
    this.scrollProgress = 0
    this.themeStages = [
      { name: 'dawn', start: 0, end: 0.2, colors: { bg: '#ffffff', text: '#000000', accent: '#ecbb4f' } },
      { name: 'day', start: 0.2, end: 0.4, colors: { bg: '#f8f8f8', text: '#1a1a1a', accent: '#d4af37' } },
      { name: 'dusk', start: 0.4, end: 0.7, colors: { bg: '#2a2a2a', text: '#e0e0e0', accent: '#ffd700' } },
      { name: 'night', start: 0.7, end: 1, colors: { bg: '#000000', text: '#ffffff', accent: '#ecbb4f' } }
    ]
  }

  init() {
    this.setupScrollListener()
    this.createCSSVariables()
  }

  setupScrollListener() {
    window.addEventListener('scroll', () => {
      this.scrollProgress = window.scrollY / (document.body.scrollHeight - window.innerHeight)
      this.updateTheme()
    })
  }

  updateTheme() {
    const currentStage = this.getCurrentThemeStage()
    const nextStage = this.getNextThemeStage()
    
    if (currentStage && nextStage) {
      const blendRatio = this.calculateBlendRatio(currentStage, nextStage)
      const blendedColors = this.blendColors(currentStage.colors, nextStage.colors, blendRatio)
      this.applyCSSVariables(blendedColors)
    }
  }

  applyCSSVariables(colors) {
    document.documentElement.style.setProperty('--theme-bg', colors.bg)
    document.documentElement.style.setProperty('--theme-text', colors.text)
    document.documentElement.style.setProperty('--theme-accent', colors.accent)
  }
}
```

### 7. Luxury Color Theory System

**Implementation:** Sophisticated Gold, White, Black palette with luxury principles

```javascript
// src/js/utils/color-theory.js
class LuxuryColorSystem {
  constructor() {
    this.colorPalette = {
      // Primary Gold Variations (60% of design)
      gold: {
        primary: '#ecbb4f',    // Main gold accent
        light: '#ffd700',      // Bright highlights
        dark: '#d4af37',       // Deeper gold for contrast
        muted: '#b8860b'       // Subtle gold for backgrounds
      },
      
      // Neutral Base (30% of design)
      neutral: {
        white: '#ffffff',      // Pure white for clean backgrounds
        offWhite: '#f8f8f8',   // Soft white for subtle contrast
        lightGray: '#e0e0e0',  // Light gray for borders
        darkGray: '#2a2a2a',   // Dark gray for text
        black: '#000000'       // Pure black for maximum contrast
      },
      
      // Accent Colors (10% of design)
      accent: {
        warmGold: '#ffb347',   // Warm gold for hover states
        coolGold: '#daa520',   // Cool gold for active states
        shadow: 'rgba(236, 187, 79, 0.3)' // Gold shadow for depth
      }
    }
  }

  // Apply 60-30-10 luxury color rule
  getColorScheme(section) {
    const schemes = {
      hero: {
        dominant: this.colorPalette.neutral.black,    // 60%
        secondary: this.colorPalette.neutral.white,   // 30%
        accent: this.colorPalette.gold.primary        // 10%
      },
      about: {
        dominant: this.colorPalette.neutral.white,    // 60%
        secondary: this.colorPalette.neutral.darkGray, // 30%
        accent: this.colorPalette.gold.light         // 10%
      },
      contact: {
        dominant: this.colorPalette.neutral.black,    // 60%
        secondary: this.colorPalette.neutral.offWhite, // 30%
        accent: this.colorPalette.gold.dark          // 10%
      }
    }
    return schemes[section] || schemes.hero
  }
}
```

## Data Models

### Animation Configuration

```javascript
// Animation presets configuration with luxury timing
const ANIMATION_PRESETS = {
  'fade-up': {
    from: { opacity: 0, y: 50 },
    to: { opacity: 1, y: 0 },
    timing: { duration: 1.2, ease: "power2.out" }
  },
  'fade-in': {
    from: { opacity: 0 },
    to: { opacity: 1 },
    timing: { duration: 0.8, ease: "power1.out" }
  },
  'scale-in': {
    from: { opacity: 0, scale: 0.8 },
    to: { opacity: 1, scale: 1 },
    timing: { duration: 1.0, ease: "back.out(1.7)" }
  },
  'slide-left': {
    from: { opacity: 0, x: 100 },
    to: { opacity: 1, x: 0 },
    timing: { duration: 1.2, ease: "power2.out" }
  }
}
```

### Content Structure Configuration

```javascript
// Content categories with placeholder media structure
const CONTENT_STRUCTURE = {
  amenities: {
    categories: [
      {
        name: 'Sports & Recreation',
        items: [
          { title: 'RC Toy Competitions', placeholder: 'rc-toys-placeholder.mp4', description: 'Remote control racing events' },
          { title: 'Swimming Pool', placeholder: 'pool-placeholder.jpg', description: 'Olympic-sized swimming facility' },
          { title: 'Tennis Court', placeholder: 'tennis-placeholder.jpg', description: 'Professional tennis courts' }
        ]
      },
      {
        name: 'Wellness & Fitness',
        items: [
          { title: 'Spa & Wellness Center', placeholder: 'spa-placeholder.jpg', description: 'Luxury wellness facilities' },
          { title: 'Fitness Center', placeholder: 'gym-placeholder.jpg', description: 'State-of-the-art equipment' },
          { title: 'Yoga Studio', placeholder: 'yoga-placeholder.jpg', description: 'Peaceful meditation spaces' }
        ]
      },
      {
        name: 'Entertainment',
        items: [
          { title: 'Clubhouse', placeholder: 'clubhouse-placeholder.jpg', description: 'Social gathering spaces' },
          { title: 'Children\'s Play Area', placeholder: 'playground-placeholder.jpg', description: 'Safe play environments' },
          { title: 'Event Halls', placeholder: 'events-placeholder.jpg', description: 'Celebration venues' }
        ]
      }
    ]
  },
  
  projectHighlights: {
    dayTimeActivities: [
      { title: 'Morning Yoga Sessions', placeholder: 'morning-yoga.jpg', theme: 'light' },
      { title: 'Pool Activities', placeholder: 'pool-day.jpg', theme: 'light' },
      { title: 'RC Racing Events', placeholder: 'rc-racing-day.mp4', theme: 'light' }
    ],
    nightTimeActivities: [
      { title: 'Evening Social Events', placeholder: 'evening-social.jpg', theme: 'dark' },
      { title: 'Night Pool Ambiance', placeholder: 'pool-night.jpg', theme: 'dark' },
      { title: 'Clubhouse Gatherings', placeholder: 'clubhouse-night.jpg', theme: 'dark' }
    ]
  }
}
```

### Section Configuration

```javascript
// Section-specific configurations with theme transitions
const SECTIONS_CONFIG = {
  hero: {
    background: 'video',
    animations: ['fade-up', 'scale-in'],
    scrollTrigger: true,
    theme: 'dawn',
    content: 'dayTimeActivities'
  },
  stats: {
    background: 'gradient',
    animations: ['counter-up', 'fade-in'],
    counters: true,
    theme: 'day'
  },
  about: {
    background: 'image',
    animations: ['slide-left', 'fade-up'],
    parallax: true,
    theme: 'day'
  },
  amenities: {
    background: 'carousel',
    animations: ['horizontal-scroll', 'fade-in'],
    theme: 'dusk',
    content: 'amenities'
  },
  contact: {
    background: 'gradient',
    animations: ['fade-up', 'scale-in'],
    theme: 'night',
    content: 'nightTimeActivities'
  }
}
```

## Error Handling

### Animation Fallbacks

```javascript
// Graceful degradation for animations
class AnimationFallbacks {
  static init() {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (prefersReducedMotion) {
      this.disableAnimations()
    }
    
    // Check for performance constraints
    if (this.isLowPerformanceDevice()) {
      this.simplifyAnimations()
    }
  }

  static disableAnimations() {
    gsap.set('*', { clearProps: 'all' })
    ScrollTrigger.getAll().forEach(trigger => trigger.kill())
  }

  static isLowPerformanceDevice() {
    return navigator.hardwareConcurrency < 4 || 
           navigator.deviceMemory < 4 ||
           /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  }
}
```

### Loading States

```javascript
// Preloader and loading management
class LoadingManager {
  constructor() {
    this.loadedAssets = 0
    this.totalAssets = 0
    this.preloader = document.querySelector('#preloader')
  }

  init() {
    this.countAssets()
    this.loadAssets()
    this.showPreloader()
  }

  countAssets() {
    const images = document.querySelectorAll('img[data-src]')
    const videos = document.querySelectorAll('video[data-src]')
    this.totalAssets = images.length + videos.length
  }

  onAssetLoaded() {
    this.loadedAssets++
    const progress = (this.loadedAssets / this.totalAssets) * 100
    
    this.updateProgress(progress)
    
    if (this.loadedAssets === this.totalAssets) {
      this.hidePreloader()
    }
  }
}
```

## Testing Strategy

### Performance Testing

1. **Lighthouse Audits**
   - Target: 90+ scores across all metrics
   - Automated testing in CI/CD pipeline
   - Mobile and desktop testing

2. **Animation Performance**
   - FPS monitoring during animations
   - Memory usage tracking
   - Battery impact assessment on mobile

3. **Loading Performance**
   - Critical resource prioritization
   - Lazy loading implementation
   - Progressive enhancement

### Cross-Browser Testing

1. **Modern Browsers**
   - Chrome 90+
   - Firefox 88+
   - Safari 14+
   - Edge 90+

2. **Mobile Testing**
   - iOS Safari
   - Chrome Mobile
   - Samsung Internet

3. **Fallback Testing**
   - JavaScript disabled
   - Slow network conditions
   - Reduced motion preferences

### Accessibility Testing

1. **Keyboard Navigation**
   - Tab order verification
   - Focus indicators
   - Skip links implementation

2. **Screen Reader Testing**
   - ARIA labels and descriptions
   - Semantic HTML structure
   - Alternative text for media

3. **Motion Sensitivity**
   - Respect for prefers-reduced-motion
   - Alternative static presentations
   - User controls for animations

## Implementation Phases

### Phase 1: Foundation Setup
- Vite project initialization
- Tailwind CSS configuration
- Basic HTML structure
- Asset optimization pipeline

### Phase 2: Core Animation System
- Lenis smooth scrolling integration
- GSAP setup and configuration
- Data-attribute animation system
- ScrollTrigger implementation

### Phase 3: Interactive Components
- Custom cursor implementation
- Video background system
- Navigation interactions
- Preloader animation

### Phase 4: Content Integration
- Section-by-section implementation
- Text animation system
- Image and video optimization
- Responsive design refinement

### Phase 5: Performance Optimization
- Code splitting and lazy loading
- Animation performance tuning
- Accessibility enhancements
- Cross-browser testing

### Phase 6: Polish and Launch
- Final animations and micro-interactions
- Performance audits
- User testing and feedback
- Production deployment

This design provides a comprehensive roadmap for creating a modern, award-winning website that matches the quality and sophistication of the client's favorite sites while showcasing Project Ananta's luxury positioning.