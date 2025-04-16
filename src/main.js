import './assets/base.css'
import './index.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import cloudinaryPlugin from './plugins/cloudinary'

// Create app immediately without waiting for AOS
const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(cloudinaryPlugin)

// Mount app first
app.mount('#app')

// Defer loading animation libraries
import('./plugins/animations.js').then(({ initAnimations }) => {
  // Initialize animations after app is mounted
  initAnimations()
})
