<script setup>
import NavSection from '@/components/NavbarSection.vue'
import HomeSection from '@/components/HomeSection.vue'
import GallerySection from '@/components/GallerySection.vue'
import StructureSection from '@/components/Structure&ScheduleSection.vue'
import FooterSection from '@/components/FooterSection.vue'
</script>

<template>
  <div>
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

<script setup>

</script>

<style scoped></style>