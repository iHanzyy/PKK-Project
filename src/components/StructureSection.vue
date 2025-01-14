<template>
  <div id="structure">
    <div class="bg-red-700">
      <h1 class="mb-10 text-5xl font-extrabold text-center text-white font-poppins">
        <span
          @click="activeComponent = 'Structure'"
          :class="getClass('Structure')"
          class="cursor-pointer"
        >
          Structure
        </span>
        &
        <span
          @click="activeComponent = 'Schedule'"
          :class="getClass('Schedule')"
          class="cursor-pointer"
        >
          Schedule
        </span>
      </h1>
      <div class="p-10">
        <Structure v-if="activeComponent === 'Structure'" />
        <Schedule v-if="activeComponent === 'Schedule'" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Structure from './Structure.vue'
import Schedule from './Schedule.vue'

const activeComponent = ref('Structure') // Default is 'Structure'

const getClass = (component) => {
  return activeComponent.value === component ? 'font-bold' : 'font-normal'
}
</script>

<style scoped></style>
