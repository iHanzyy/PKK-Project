<script setup>
import NavSection from './components/NavbarSection.vue'
import HomeSection from './components/HomeSection.vue'
import GallerySection from './components/GallerySection.vue'
import StructureSection from './components/StructureSection.vue'
import FooterSection from './components/FooterSection.vue'
import AOS from 'aos'
import 'aos/dist/aos.css'

AOS.init()
</script>

<template>
  <div class="app-container">
    <NavSection />
    <div class="content-wrapper">
      <HomeSection />
      <GallerySection />
      <StructureSection />
      <schedule-section />
      <FooterSection />
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
