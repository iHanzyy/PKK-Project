<script setup>
import { ref, onMounted } from 'vue'

import Loader from './components/Loader.vue'
import AOS from 'aos'
import 'aos/dist/aos.css'

const isLoading = ref(true)

onMounted(() => {
  // Inisialisasi AOS
  AOS.init()
  // Simulasikan delay loading (sesuaikan dengan kebutuhan atau hapus jika sudah optimal)
  setTimeout(() => {
    isLoading.value = false
  }, 1000)
})
</script>

<template>
  <div>
    <Loader v-if="isLoading" />
    <div v-else class="app-container">
      <router-view />
    </div>
  </div>
</template>

<style>
.app-container {
  min-height: 100vh;
  overflow-x: hidden;
  background-color: #fafafa;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
}

/* Reset margin dan padding default */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

/* Add this to create smoother transitions between sections */
section {
  width: 100%;
  margin: 0;
  padding: 0;
  position: relative;
}

/* Add this class to any section that needs a soft drop shadow */
.section-shadow {
  box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.05);
  position: relative;
  z-index: 10;
}

/* This helps create gentle transitions between sections */
.section-overlap {
  margin-top: -2rem;
  padding-top: 2rem;
  position: relative;
  z-index: 5;
}
</style>
