<template>
  <section id="structure" class="section-container">
    <div class="w-full bg-gradient-to-b from-[#FF6500] to-[#FF8A08]">
      <h1 class="flex justify-center mb-10 text-4xl font-extrabold text-center text-white font-poppins">
        <span @click="activeComponent = 'Structure'" :class="getClass('Structure')" class="cursor-pointer">
          Structure
        </span>
        &
        <span @click="activeComponent = 'Schedule'" :class="getClass('Schedule')" class="cursor-pointer">
          Schedule
        </span>
      </h1>
      <div class="p-10">
        <transition name="fade" mode="out-in">
          <component :is="activeComponentComponent" />
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

const getClass = (component) => {
  return activeComponent.value === component ? 'font-bold' : 'font-normal'
}

const activeComponentComponent = computed(() => {
  return activeComponent.value === 'Structure' ? Structure : Schedule
})
</script>

<style scoped>
.section-container {
  width: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 640px) {
  h1 {
    font-size: 2rem;
    text-align: center;
  }
}
</style>
