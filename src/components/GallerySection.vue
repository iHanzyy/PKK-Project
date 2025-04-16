<template>
  <section id="gallery" class="section-container">
    <div class="w-full">
      <div class="py-16 bg-gradient-to-b from-[#D92323] to-[#FF6500] relative">
        <!-- Subtle texture overlay -->
        <div class="absolute inset-0 pattern-overlay"></div>

        <!-- Gallery Header with Refined Spacing -->
        <div class="container px-4 mx-auto mb-12">
          <h1 class="text-4xl font-extrabold text-center text-white md:text-5xl font-poppins" data-aos="fade-down"
            data-aos-duration="800">
            Our Gallery
          </h1>
          <div class="w-24 h-1 mx-auto mt-4 rounded-full bg-white/30"></div>
        </div>

        <!-- Loading state -->
        <div v-if="isLoading" class="flex items-center justify-center py-12">
          <div class="w-16 h-16 border-4 border-white rounded-full border-t-transparent animate-spin"></div>
        </div>

        <!-- No images message -->
        <div v-else-if="filteredImages.length === 0" class="flex flex-col items-center justify-center py-16">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-24 h-24 text-white opacity-70" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p class="mt-4 text-xl font-medium text-white md:text-2xl">No images available</p>
        </div>

        <!-- Improved Marquee Gallery Container -->
        <div v-else ref="galleryContainer" class="gallery-container">
          <!-- First Row: Left to Right -->
          <div class="marquee-row" data-aos="fade-left" data-aos-duration="1200">
            <div class="marquee-track">
              <div class="marquee-content" :class="{ paused: isPaused }">
                <!-- Multiple copies to ensure continuous flow -->
                <div v-for="(image, index) in repeatedImages" :key="`row1-${index}`" class="gallery-item"
                  :class="{ active: activeItem === `row1-${index}` }" @mouseenter="setActiveItem(`row1-${index}`)"
                  @mouseleave="clearActiveItem">
                  <div class="image-wrapper">
                    <img :src="image.image" :alt="image.description" loading="lazy" class="gallery-image"
                      @click="showModal(image)" />
                    <div class="image-overlay">
                      <span class="image-caption">{{ image.description }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Duplicate for seamless looping -->
              <div class="marquee-content" :class="{ paused: isPaused }">
                <div v-for="(image, index) in repeatedImages" :key="`row1-dup-${index}`" class="gallery-item"
                  :class="{ active: activeItem === `row1-dup-${index}` }"
                  @mouseenter="setActiveItem(`row1-dup-${index}`)" @mouseleave="clearActiveItem">
                  <div class="image-wrapper">
                    <img :src="image.image" :alt="image.description" loading="lazy" class="gallery-image"
                      @click="showModal(image)" />
                    <div class="image-overlay">
                      <span class="image-caption">{{ image.description }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Second Row: Right to Left (Reverse) -->
          <div class="marquee-row reverse" data-aos="fade-right" data-aos-duration="1200" data-aos-delay="200">
            <div class="marquee-track reverse">
              <div class="marquee-content reverse" :class="{ paused: isPaused }">
                <!-- Multiple copies to ensure continuous flow -->
                <div v-for="(image, index) in repeatedImagesReverse" :key="`row2-${index}`" class="gallery-item"
                  :class="{ active: activeItem === `row2-${index}` }" @mouseenter="setActiveItem(`row2-${index}`)"
                  @mouseleave="clearActiveItem">
                  <div class="image-wrapper">
                    <img :src="image.image" :alt="image.description" loading="lazy" class="gallery-image"
                      @click="showModal(image)" />
                    <div class="image-overlay">
                      <span class="image-caption">{{ image.description }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Duplicate for seamless looping -->
              <div class="marquee-content reverse" :class="{ paused: isPaused }">
                <div v-for="(image, index) in repeatedImagesReverse" :key="`row2-dup-${index}`" class="gallery-item"
                  :class="{ active: activeItem === `row2-dup-${index}` }"
                  @mouseenter="setActiveItem(`row2-dup-${index}`)" @mouseleave="clearActiveItem">
                  <div class="image-wrapper">
                    <img :src="image.image" :alt="image.description" loading="lazy" class="gallery-image"
                      @click="showModal(image)" />
                    <div class="image-overlay">
                      <span class="image-caption">{{ image.description }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Enhanced Modal for Image Preview -->
        <div v-if="selectedImage" class="modal-overlay" @click="closeModal">
          <div class="modal-content" @click.stop>
            <button class="modal-close" @click="closeModal" aria-label="Close preview">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="black">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img :src="selectedImage.image" :alt="selectedImage.description" class="modal-image" />
            <div class="modal-footer">
              <p class="modal-description">{{ selectedImage.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { getAllGalleryItems } from '../services/galleryService'

const galleryImages = ref([])
const isLoading = ref(true)
const selectedImage = ref(null)
const activeItem = ref(null)

// Computed property to check if any item is active (hovered)
const isPaused = computed(() => activeItem.value !== null)

// Filter out any invalid images
const filteredImages = computed(() => {
  return galleryImages.value.filter(img => img && img.image);
})

// Create repeated arrays to ensure we have enough images for smooth scrolling
const repeatedImages = computed(() => {
  if (filteredImages.value.length === 0) return [];

  // Repeat the images enough times to fill any screen
  let repeated = [];
  let minCount = Math.max(8, filteredImages.value.length);

  while (repeated.length < minCount) {
    repeated = [...repeated, ...filteredImages.value];
  }

  return repeated;
})

// Create a reversed version for the second row
const repeatedImagesReverse = computed(() => {
  return [...repeatedImages.value].reverse();
})

const setActiveItem = (id) => {
  activeItem.value = id
}

const clearActiveItem = () => {
  activeItem.value = null
}

const showModal = (image) => {
  selectedImage.value = image
  document.body.style.overflow = 'hidden' // Prevent background scrolling
}

const closeModal = () => {
  selectedImage.value = null
  document.body.style.overflow = '' // Restore scrolling
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
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

.section-container {
  width: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

/* Refined Gallery Container */
.gallery-container {
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem 0 5rem;
}

/* Marquee Row Styling */
.marquee-row {
  position: relative;
  width: 100%;
  overflow: hidden;
  padding: 0.5rem 0;
}

/* New track container for seamless flow */
.marquee-track {
  display: flex;
  width: fit-content;
  will-change: transform;
  animation: track 100s linear infinite;
}

.marquee-track.reverse {
  animation: track-reverse 105s linear infinite;
}

/* Content styling */
.marquee-content {
  display: flex;
  gap: 1rem;
  padding: 0 0.5rem;
}

.marquee-content.paused {
  animation-play-state: paused;
}

/* Gallery Item Styling */
.gallery-item {
  flex: 0 0 auto;
  width: 280px;
  height: 210px;
  transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
  transform-origin: center;
  position: relative;
}

.gallery-item.active {
  transform: scale(1.08);
  z-index: 5;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

.image-wrapper {
  width: 100%;
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.5s ease;
}

.gallery-item:hover .gallery-image {
  transform: scale(1.05);
}

/* Image Overlay and Caption */
.image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  padding: 1rem;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;
}

.gallery-item:hover .image-overlay {
  opacity: 1;
  transform: translateY(0);
}

.image-caption {
  color: white;
  font-size: 0.9rem;
  font-weight: 500;
  display: block;
  text-align: center;
}

/* NEW: Marquee Track Animation for perfect looping */
@keyframes track {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-50%);
  }
}

@keyframes track-reverse {
  0% {
    transform: translateX(-50%);
  }

  100% {
    transform: translateX(0);
  }
}

/* Pattern overlay */
.pattern-overlay {
  background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.03' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E");
  pointer-events: none;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .gallery-container {
    gap: 1.5rem;
  }

  .gallery-item {
    width: 240px;
    height: 180px;
  }

  .marquee-track {
    animation-duration: 100s;
  }

  .marquee-track.reverse {
    animation-duration: 105s;
  }
}

@media (max-width: 480px) {
  .gallery-item {
    width: 180px;
    height: 135px;
  }

  .marquee-track {
    animation-duration: 100s;
  }

  .marquee-track.reverse {
    animation-duration: 105s;
  }

  .image-caption {
    font-size: 0.8rem;
  }
}

/* Rest of your modal styles remain unchanged */

/* Add these styles to fix your modal popup issues */

/* Modal Overlay - covers the entire screen with a semi-transparent background */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  /* Ensure it's above everything else */
  padding: 1rem;
  backdrop-filter: blur(5px);
  animation: fadeIn 0.25s ease;
  overscroll-behavior: contain;
  /* Prevents scroll chaining */
  overflow: hidden;
}

/* Modal Content Container */
.modal-content {
  background: white;
  border-radius: 12px;
  max-width: 90vw;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  animation: scaleIn 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
}

/* Image Container */
.modal-image {
  max-width: 100%;
  max-height: 80vh;
  height: auto;
  object-fit: contain;
  display: block;
  background: #0a0a0a;
  /* Dark background for transparent images */
}

/* Footer with description */
.modal-footer {
  padding: 1rem 1.5rem;
  background: white;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}

.modal-description {
  margin: 0;
  font-family: 'Poppins', sans-serif;
  color: #333;
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  line-height: 1.5;
}

/* Close button */
.modal-close {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 10;
  transition: all 0.2s ease;
}

.modal-close:hover {
  transform: scale(1.1);
  background: #f3f3f3;
}

.modal-close:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(255, 101, 0, 0.4), 0 2px 10px rgba(0, 0, 0, 0.2);
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes scaleIn {
  from {
    transform: scale(0.9);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .modal-content {
    max-width: 95vw;
  }

  .modal-description {
    font-size: 0.95rem;
  }
}

@media (max-width: 480px) {
  .modal-content {
    max-width: 100vw;
    max-height: 95vh;
    margin: 0;
    border-radius: 8px;
  }

  .modal-close {
    top: 8px;
    right: 8px;
    width: 32px;
    height: 32px;
  }

  .modal-footer {
    padding: 0.75rem 1rem;
  }

  .modal-description {
    font-size: 0.9rem;
  }
}
</style>