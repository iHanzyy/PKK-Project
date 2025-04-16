import { MotionPlugin } from '@vueuse/motion'
import AOS from 'aos'
import 'aos/dist/aos.css'

export function initAnimations() {
  // Initialize AOS with optimized settings
  AOS.init({
    // Only animate elements when they're visible
    once: true,
    // Disable on mobile devices to improve performance
    disable: window.innerWidth < 768,
    // Increase threshold to start animations later
    offset: 120,
  })
}

export function setupMotion(app) {
  app.use(MotionPlugin)
}
