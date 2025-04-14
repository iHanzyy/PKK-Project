<template>
  <section id="structure" class="section-container">
    <div class="w-full bg-gradient-to-b from-[#FF6500] to-[#FF8A08] pb-16 relative">
      <!-- Subtle texture overlay -->
      <div class="absolute inset-0 pattern-overlay"></div>

      <!-- Properly structured semantic heading and tab navigation -->
      <div class="relative pb-12 text-center">

        <!-- Separated tab navigation from heading -->
        <div class="tab-navigation">
          <div class="tab-container">
            <div class="tab-wrapper">
              <button @click="activeComponent = 'Structure'"
                :class="['tab-button', activeComponent === 'Structure' ? 'active' : '']" v-motion="{
                  hover: { scale: 1.05, y: -3 },
                  tap: { scale: 0.95 }
                }">
                <span class="tab-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </span>
                Structure
              </button>

              <div class="tab-divider">
                <span class="tab-divider-text">&</span>
              </div>

              <button @click="activeComponent = 'Schedule'"
                :class="['tab-button', activeComponent === 'Schedule' ? 'active' : '']" v-motion="{
                  hover: { scale: 1.05, y: -3 },
                  tap: { scale: 0.95 }
                }">
                <span class="tab-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </span>
                Schedule
              </button>
            </div>

            <!-- Fixed positioning of indicator -->
            <div class="tab-indicator-container">
              <div class="tab-indicator" :class="activeComponent === 'Structure' ? 'left' : 'right'"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Content Container with Enhanced Transitions -->
      <div class="px-6 md:px-10 lg:px-16">
        <transition name="content-switch" mode="out-in" @before-enter="onBeforeEnter" @enter="onEnter" @leave="onLeave">
          <component :is="activeComponentComponent" :key="activeComponent" />
        </transition>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import Structure from './Structure.vue'
import Schedule from './Schedule.vue'

const activeComponent = ref('Structure') // Default = Structure

const activeComponentComponent = computed(() => {
  return activeComponent.value === 'Structure' ? Structure : Schedule
})

// Enhanced transition hooks with improved timing
const onBeforeEnter = (el) => {
  el.style.opacity = 0
  el.style.transform = activeComponent.value === 'Structure'
    ? 'translateX(-15px)'
    : 'translateX(15px)'
}

const onEnter = (el, done) => {
  setTimeout(() => {
    el.style.transition = 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)'
    el.style.opacity = 1
    el.style.transform = 'translateX(0)'
    el.addEventListener('transitionend', done, { once: true })
  }, 30)
}

const onLeave = (el, done) => {
  el.style.transition = 'all 0.35s cubic-bezier(0.22, 1, 0.36, 1)'
  el.style.opacity = 0
  el.style.transform = activeComponent.value === 'Structure'
    ? 'translateX(15px)'
    : 'translateX(-15px)'
  el.addEventListener('transitionend', done, { once: true })
}
</script>

<style scoped>
.section-container {
  width: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

/* Tab Navigation Container */
.tab-navigation {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

/* Tab Container Styling */
.tab-container {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
}

.tab-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  backdrop-filter: blur(8px);
  padding: 6px 10px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15), inset 0 1px 1px rgba(255, 255, 255, 0.2);
  position: relative;
  z-index: 5;
  gap: 10px;
  border: 1px solid rgba(255, 255, 255, 0.15);
}

/* Tab Button Styling */
.tab-button {
  position: relative;
  padding: 10px 24px;
  font-size: 1.5rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.85);
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  outline: none;
  z-index: 10;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 8px;
}

.tab-button:hover {
  color: white;
  background: rgba(255, 255, 255, 0.1);
}

.tab-button.active {
  font-weight: 700;
  color: #FFF;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.2);
}

.tab-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.4s ease;
}

.tab-button:hover .tab-icon {
  transform: rotate(12deg);
}

/* Divider Styling */
.tab-divider {
  position: relative;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tab-divider-text {
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 300;
  transform: rotate(0deg);
  transition: transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  display: inline-block;
}

.tab-container:hover .tab-divider-text {
  transform: rotate(360deg);
}

/* Active Tab Indicator Container with Fixed Layout */
.tab-indicator-container {
  position: relative;
  width: 100%;
  height: 4px;
  margin-top: 10px;
}

/* Active Tab Indicator */
.tab-indicator {
  position: absolute;
  bottom: 0;
  height: 4px;
  background: linear-gradient(90deg, #FFF 0%, rgba(255, 255, 255, 0.7) 100%);
  border-radius: 4px;
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.8), 0 0 5px rgba(255, 255, 255, 0.9);

  /* Default values */
  width: 100px;
  left: 50%;
  transform: translateX(-50%);
}

/* Positioning for Structure tab */
.tab-indicator.left {
  width: 100px;
  left: calc(25% - 5px);
  /* Adjust to align with Structure tab */
  transform: translateX(-50%);
}

/* Positioning for Schedule tab */
.tab-indicator.right {
  width: 100px;
  left: calc(75% + 15px);
  /* Adjust to align with Schedule tab */
  transform: translateX(-50%);
}

/* Mobile adjustments - Medium screens */
@media (max-width: 640px) {
  .tab-indicator {
    width: 85px;
  }

  .tab-indicator.left {
    width: 85px;
    left: calc(25% - 3px);
  }

  .tab-indicator.right {
    width: 85px;
    left: calc(75% + 3px);
  }
}

/* Mobile adjustments - Small screens */
@media (max-width: 400px) {
  .tab-indicator {
    width: 75px;
  }

  .tab-indicator.left {
    width: 75px;
    left: calc(25% - 2px);
  }

  .tab-indicator.right {
    width: 75px;
    left: calc(75% + 9px);
  }
}

/* Smallest screens */
@media (max-width: 360px) {
  .tab-button {
    padding: 6px 10px;
    font-size: 1rem;
    gap: 4px;
  }

  .tab-divider {
    width: 12px;
  }

  .tab-indicator {
    width: 65px;
  }

  .tab-indicator.left {
    width: 65px;
    left: calc(25% - 0px);
  }

  .tab-indicator.right {
    width: 65px;
    left: calc(75% + 0px);
  }
}

/* Mobile adjustments for indicator */
@media (max-width: 640px) {
  .tab-button {
    padding: 8px 16px;
    font-size: 1.25rem;
  }

  .tab-divider {
    width: 24px;
  }

  .tab-divider-text {
    font-size: 1.25rem;
  }

  .tab-wrapper {
    border-radius: 12px;
  }
}

@media (max-width: 400px) {
  .tab-button {
    padding: 6px 12px;
    font-size: 1.1rem;
  }

  .tab-divider {
    width: 16px;
  }
}

/* Enhanced Content Transitions */
.content-switch-enter-from,
.content-switch-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Add this pattern overlay class */
.pattern-overlay {
  background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.03' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E");
  pointer-events: none;
}
</style>
