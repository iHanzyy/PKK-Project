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

section {
  width: 100%;
  margin: 0;
  padding: 0;
}
</style>
