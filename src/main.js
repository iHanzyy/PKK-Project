import './assets/base.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { MotionPlugin } from '@vueuse/motion'

import App from './App.vue'
import router from './router'
import './index.css'
import cloudinaryPlugin from './plugins/cloudinary'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(MotionPlugin)
app.use(cloudinaryPlugin)

app.mount('#app')
