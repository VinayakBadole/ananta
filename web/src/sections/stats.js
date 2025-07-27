import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Enhanced statistics section with luxury animations and theme transitions
export function initStatsCounters() {
  const statsSection = document.getElementById('stats')
  const counters = document.querySelectorAll('[data-counter]')
  const progressBars = document.querySelectorAll('[data-progress]')
  const statCards = document.querySelectorAll('.stat-card')
  
  if (!statsSection || !counters.length) return

  // Clean up any existing ScrollTriggers for this section
  ScrollTrigger.getAll().forEach(trigger => {
    if (trigger.vars.trigger === statsSection) {
      trigger.kill()
    }
  })

  // Initialize stats section animations
  initStatsLayout()
  initOptimizedAnimations()
  initCardHoverEffects()
  initMicroInteractions()
  
  console.log('📊 Enhanced statistics section with optimized performance initialized')
}

function initStatsLayout() {
  const statsSection = document.getElementById('stats')
  if (!statsSection) return
  
  // Set initial states for animation
  gsap.set('.stat-card', {
    opacity: 0,
    y: 50,
    scale: 0.9
  })
  
  gsap.set('.stat-counter', {
    opacity: 0,
    scale: 0.8
  })
  
  gsap.set('.stat-progress-bar', {
    scaleX: 0,
    transformOrigin: 'left center'
  })
  
  // Add performance optimizations
  gsap.set('.stat-card', { willChange: 'transform, opacity' })
  gsap.set('.stat-counter', { willChange: 'transform, opacity' })
  gsap.set('.stat-icon', { willChange: 'transform' })
  gsap.set('.stat-progress-bar', { willChange: 'transform' })
}

// Consolidated animation function to reduce ScrollTrigger instances
function initOptimizedAnimations() {
  const statsSection = document.getElementById('stats')
  const counters = document.querySelectorAll('[data-counter]')
  const progressBars = document.querySelectorAll('[data-progress]')
  const statCards = document.querySelectorAll('.stat-card')
  
  if (!statsSection) return
  
  // Single master timeline for all animations
  const masterTl = gsap.timeline({
    scrollTrigger: {
      trigger: statsSection,
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse',
      onEnter: () => {
        statsSection.classList.add('stats-entering')
      },
      onLeave: () => {
        statsSection.classList.remove('stats-entering')
      }
    }
  })
  
  // Phase 1: Section entrance
  masterTl
    .from(statsSection, {
      opacity: 0,
      scale: 0.95,
      duration: 0.8,
      ease: 'power2.out'
    })
    
  // Phase 2: Section title
  const sectionTitle = statsSection.querySelector('.section-title')
  if (sectionTitle) {
    masterTl
      .from(sectionTitle, {
        opacity: 0,
        y: 30,
        scale: 0.9,
        duration: 0.6,
        ease: 'back.out(1.7)'
      }, '-=0.4')
  }
  
  // Phase 3: Cards entrance with counters and progress bars
  masterTl
    .to('.stat-card', {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      stagger: 0.15,
      ease: 'back.out(1.4)'
    }, '-=0.3')
    
  // Phase 4: Individual card elements
  statCards.forEach((card, index) => {
    const delay = index * 0.1
    
    // Icon entrance
    masterTl
      .from(card.querySelector('.stat-icon'), {
        opacity: 0,
        scale: 0.5,
        rotation: -90,
        duration: 0.5,
        ease: 'back.out(2.7)'
      }, `-=${0.6 - delay}`)
      
    // Counter entrance and animation
    const counter = card.querySelector('.stat-counter')
    const target = parseInt(counter.dataset.counter, 10)
    const suffix = counter.dataset.suffix || ''
    const prefix = counter.dataset.prefix || ''
    
    masterTl
      .from(counter, {
        opacity: 0,
        scale: 0.3,
        y: 15,
        duration: 0.4,
        ease: 'back.out(1.7)'
      }, `-=${0.5 - delay}`)
      .to({ value: 0 }, {
        value: target,
        duration: 1.5,
        ease: 'power2.out',
        onUpdate: function() {
          const currentValue = Math.floor(this.targets()[0].value)
          counter.textContent = prefix + currentValue.toLocaleString() + suffix
        }
      }, `-=${0.3 - delay}`)
      
    // Progress bar animation
    const progressBar = card.querySelector('.stat-progress-bar')
    const progress = parseFloat(progressBar.dataset.progress) || 100
    
    masterTl
      .to(progressBar, {
        scaleX: progress / 100,
        duration: 1.2,
        ease: 'power2.out'
      }, `-=${0.8 - delay}`)
      
    // Label and description
    masterTl
      .from([card.querySelector('.stat-label'), card.querySelector('.stat-description')], {
        opacity: 0,
        y: 10,
        duration: 0.3,
        stagger: 0.05,
        ease: 'power2.out'
      }, `-=${0.4 - delay}`)
  })
}

function initCardHoverEffects() {
  const statCards = document.querySelectorAll('.stat-card')
  
  statCards.forEach((card) => {
    // Create hover timeline
    const hoverTl = gsap.timeline({ paused: true })
    
    hoverTl
      .to(card, {
        y: -6,
        scale: 1.02,
        duration: 0.2,
        ease: 'power2.out'
      })
      .to(card.querySelector('.stat-icon'), {
        scale: 1.1,
        rotation: 3,
        duration: 0.2,
        ease: 'back.out(1.7)'
      }, 0)
      .to(card.querySelector('.stat-counter'), {
        scale: 1.05,
        duration: 0.2,
        ease: 'power2.out'
      }, 0)
    
    // Mouse events
    card.addEventListener('mouseenter', () => {
      hoverTl.play()
      
      // Add subtle glow effect
      gsap.to(card, {
        boxShadow: '0 10px 20px rgba(236, 187, 79, 0.15), 0 0 0 1px rgba(236, 187, 79, 0.1)',
        duration: 0.2,
        ease: 'power2.out'
      })
    })
    
    card.addEventListener('mouseleave', () => {
      hoverTl.reverse()
      
      // Remove glow effect
      gsap.to(card, {
        boxShadow: '0 4px 6px var(--theme-shadow)',
        duration: 0.2,
        ease: 'power2.out'
      })
    })
  })
}

// Optimized micro-interactions
function initMicroInteractions() {
  const statCards = document.querySelectorAll('.stat-card')
  
  statCards.forEach((card) => {
    const counter = card.querySelector('.stat-counter')
    
    // Add click interaction
    card.addEventListener('click', () => {
      // Simple pulse effect on click
      gsap.to(card, {
        scale: 0.98,
        duration: 0.1,
        ease: 'power2.out',
        yoyo: true,
        repeat: 1
      })
      
      // Counter pulse
      gsap.to(counter, {
        scale: 1.1,
        duration: 0.15,
        ease: 'back.out(2.7)',
        yoyo: true,
        repeat: 1
      })
    })
  })
}

// Enhanced stats data structure for dynamic content
export const statsData = [
  {
    id: 'towers',
    value: 5,
    label: 'Luxury Towers',
    icon: '🏢',
    suffix: '',
    progress: 100,
    description: 'Premium residential towers'
  },
  {
    id: 'units',
    value: 800,
    label: 'Service Apartments',
    icon: '🏠',
    suffix: '+',
    progress: 85,
    description: 'Well-appointed living spaces'
  },
  {
    id: 'amenities',
    value: 18,
    label: 'World-Class Amenities',
    icon: '⭐',
    suffix: '',
    progress: 100,
    description: 'Exclusive lifestyle facilities'
  },
  {
    id: 'maintenance',
    value: 0,
    label: 'Maintenance Cost',
    icon: '💰',
    prefix: '₹',
    suffix: '',
    progress: 100,
    description: 'Lifetime maintenance-free living'
  }
]

// Function to create enhanced stats HTML structure
export function createStatsSection() {
  const statsSection = document.getElementById('stats')
  if (!statsSection) return
  
  // Enhanced HTML structure with luxury styling
  statsSection.innerHTML = `
    <div class="container-luxury">
      <div class="text-center mb-16">
        <h2 class="section-title text-responsive-lg font-montserrat font-light mb-4 theme-aware-text">
          Project Highlights
        </h2>
        <p class="text-lg theme-aware-text-secondary max-w-2xl mx-auto font-montserrat font-light">
          Discover the exceptional features that make Project Ananta a landmark destination for luxury living
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" ">
        ${statsData.map((stat, index) => `
          <div class="stat-card card-luxury p-8 text-center group cursor-pointer" 
               data-stat-id="${stat.id}"
               data-cursor="hover">
            <div class="stat-icon text-4xl mb-4 transition-transform duration-300 ">
              ${stat.icon}
            </div>
            
            <div class="stat-counter text-4xl md:text-5xl font-bold accent-gold mb-2 font-montserrat font-light"
                 data-counter="${stat.value}"
                 data-prefix="${stat.prefix || ''}"
                 data-suffix="${stat.suffix || ''}"
                 data-duration="2.5"
                 data-delay="${index * 0.2}"
                 style="padding: 0 1rem;">
              ${stat.prefix || ''}0${stat.suffix || ''}
            </div>
            
            <h3 class="stat-label text-sm uppercase tracking-wider theme-aware-text font-montserrat font-medium mb-3"
                style="padding: 0 1rem;">
              ${stat.label}
            </h3>
            
            <p class="stat-description text-xs theme-aware-text-secondary font-montserrat font-light mb-4"
               style="padding: 0 1rem;">
              ${stat.description}
            </p>
            
            <div class="stat-progress-container w-full h-1 bg-gray-200 rounded-full overflow-hidden">
              <div class="stat-progress-bar h-full bg-gradient-to-r from-gold-primary to-gold-light rounded-full"
                   data-progress="${stat.progress}"
                   data-duration="2"
                   data-delay="${index * 0.3}">
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `
}
