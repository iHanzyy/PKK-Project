<template>
  <section id="gallery" class="section-container">
    <div class="w-full">
      <div class="py-16 bg-gradient-to-b from-[#C40C0C] to-[#FF6500] relative">
        <h1 class="mb-10 text-5xl font-extrabold text-center text-white font-poppins">
          Our Gallery
        </h1>

        <!-- Loading state -->
        <div v-if="isLoading" class="flex items-center justify-center py-20">
          <div class="w-16 h-16 border-4 border-white rounded-full border-t-transparent animate-spin"></div>
        </div>

        <!-- No images message -->
        <div v-else-if="galleryImages.length === 0" class="flex flex-col items-center justify-center py-20">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-24 h-24 text-white opacity-70" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p class="mt-4 text-2xl font-medium text-white">No images available</p>
        </div>

        <!-- Marquee Gallery Container -->
        <div v-else class="marquee-container">
          <div class="marquee-content" ref="marqueeContent" :class="{ paused: hoveredIndex !== null }">
            <div v-for="(image, index) in [...galleryImages, ...galleryImages]" :key="index" class="marquee-item"
              :class="{
                active: hoveredIndex === index,
                inactive: hoveredIndex !== null && hoveredIndex !== index
              }" @mouseenter="hoveredIndex = index" @mouseleave="hoveredIndex = null">
              <div class="image-wrapper">
                <img :src="image.image" :alt="image.description" width="450" height="337" loading="lazy"
                  class="w-full aspect-[4/3] object-cover rounded-[20px] shadow-xl" @click="showModal(image)" />
              </div>
            </div>
          </div>
        </div>

        <!-- Modal for image preview -->
        <div v-if="selectedImage" class="modal-overlay" @click="closeModal">
          <div class="modal-content" @click.stop>
            <img :src="selectedImage.image" :alt="selectedImage.description" class="modal-image" />
            <p class="modal-description">{{ selectedImage.description }}</p>
            <button class="modal-close" @click="closeModal">&times;</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getAllGalleryItems } from '../services/galleryService'

const galleryImages = ref([])
const isLoading = ref(true)
const selectedImage = ref(null)
const marqueeContent = ref(null)
const hoveredIndex = ref(null)

const showModal = (image) => {
  selectedImage.value = image
}

const closeModal = () => {
  selectedImage.value = null
}

onMounted(async () => {
  try {
    isLoading.value = true
    galleryImages.value = await getAllGalleryItems()
  } catch (error) {
    console.error('Error fetching gallery images:', error)
  } finally {
    isLoading.value = false
  }
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');

.font-poppins {
  font-family: 'Poppins', Helvetica;
}

.section-container {
  width: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.container {
  height: calc(100vh - 200px);
  /* Menyesuaikan dengan header dan padding */
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #ff6500 rgba(0, 0, 0, 0.1);
}

.container::-webkit-scrollbar {
  width: 6px;
}

.container::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
}

.container::-webkit-scrollbar-thumb {
  background-color: #ff6500;
  border-radius: 3px;
}

.marquee-container {
  width: 100%;
  overflow: hidden;
  position: relative;
  padding: 0 0 100px 0;
  padding-top: 3rem;
  padding-bottom: 11rem;
  /* Tambahkan padding bottom untuk memberi jarak */
}

.marquee-content {
  display: flex;
  animation: marquee 30s linear infinite;
  gap: 0.5rem;
}

.marquee-content.paused {
  animation-play-state: paused;
}

.marquee-item {
  flex: 0 0 auto;
  width: 450px;
  padding: 10px;
  transition: transform 0.5s ease;
  transform: scale(1);
}

.marquee-item.active {
  transform: scale(1.2);
  z-index: 10;
}

.marquee-item.inactive {
  transform: scale(0.8);
  opacity: 0.7;
}

.image-wrapper {
  overflow: hidden;
  border-radius: 20px;
  width: 100%;
  height: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.5s ease;
}

@keyframes marquee {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-50%);
  }
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 1rem;
  border-radius: 10px;
  max-width: 90vw;
  max-height: 90vh;
  position: relative;
}

.modal-image {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
}

.modal-description {
  text-align: center;
  margin-top: 1rem;
  color: #333;
}

.modal-close {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #333;
}

/* Update media query for responsive design */
@media (max-width: 768px) {
  .marquee-item {
    width: 300px;
  }

  .marquee-item.active {
    transform: scale(1.1);
  }

  .marquee-item.inactive {
    transform: scale(0.8);
  }

  .marquee-content {
    gap: 1.5rem;
  }

  .modal-content {
    width: 95vw;
  }
}
</style>