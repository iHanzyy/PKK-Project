<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavSection from './components/NavbarSection.vue'
import HomeSection from './components/HomeSection.vue'
import GallerySection from './components/GallerySection.vue'
import StructureSection from './components/StructureSection.vue'
import FooterSection from './components/FooterSection.vue'
import ScrollBarCustom from './components/ScrollBarCustom.vue'
</script>

<template>
  <NavSection />
  <HomeSection />
  <GallerySection />
  <StructureSection />
  <schedule-section />
  <FooterSection />
</template>

<style></style>
