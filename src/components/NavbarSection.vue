<template>
  <!-- Navbar wrapper with height -->
  <header class="fixed top-0 left-0 z-50 w-full h-20 md:h-24">
    <!-- Navbar with background but no fixed position -->
    <nav class="bg-gradient-to-r from-[#C40C0C] to-[#D92323] w-full h-full transition-all duration-300"
      :class="{ 'shadow-lg': isScrolled }">
      <div class=" px-4 mx-auto sm:px-6 lg:px-8 min-h-[80px]">
        <div class="flex items-center justify-between h-20 md:h-24">
          <!-- Logo -->
          <a href="#" class="flex items-center flex-shrink-0" @click.prevent="scrollToTop"
            v-motion="{ hover: { scale: 1.1 } }">
            <img :src="logo" alt="DKV Logo"
              class="w-12 h-12 transition-transform duration-300 rounded-full md:h-16 md:w-16" />
          </a>

          <!-- Desktop Menu -->
          <div class="items-center hidden space-x-4 md:flex lg:space-x-8">
            <a v-for="(nav, index) in navigation" :key="index" :href="nav.href"
              class="px-3 py-2 text-xl lg:text-3xl font-poppins font-semibold text-white capitalize hover:bg-[#FF6500] hover:rounded-full transition-all duration-300 ease-out hover:scale-105"
              @click.prevent="scrollToSection(nav.href)">
              {{ nav.name }}
            </a>
          </div>

          <!-- Mobile Menu Button -->
          <button @click="toggleMenu"
            class="md:hidden p-2 rounded-lg text-white hover:bg-[#FF6500]/80 focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors duration-300"
            :aria-expanded="isMenuOpen.toString()">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                :d="isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'" />
            </svg>
          </button>
        </div>

        <!-- Mobile Menu -->
        <transition enter-active-class="transition duration-200 ease-out" enter-from-class="-translate-y-5 opacity-0"
          enter-to-class="translate-y-0 opacity-100" leave-active-class="transition duration-150 ease-in"
          leave-from-class="translate-y-0 opacity-100" leave-to-class="-translate-y-5 opacity-0">
          <div v-show="isMenuOpen" class="md:hidden absolute top-full left-0 w-full bg-[#C40C0C] shadow-xl">
            <div class="px-4 pt-2 pb-4 space-y-3">
              <a v-for="(nav, index) in navigation" :key="index" href="#"
                @click.prevent="(scrollToSection(nav.href), closeMenu())"
                class="block px-4 py-3 text-2xl font-poppins text-white rounded-lg hover:bg-[#FF6500] transition-colors duration-300">
                {{ nav.name }}
              </a>
            </div>
          </div>
        </transition>
      </div>

      <!-- Mobile Menu Backdrop -->
      <transition enter-active-class="transition-opacity duration-200 ease-linear" enter-from-class="opacity-0"
        enter-to-class="opacity-100" leave-active-class="transition-opacity duration-200 ease-linear"
        leave-from-class="opacity-100" leave-to-class="opacity-0">
        <div v-show="isMenuOpen" @click="closeMenu" class="fixed inset-0 z-40 bg-black/30 md:hidden"></div>
      </transition>
    </nav>
  </header>

  <!-- Spacer -->
  <div class="h-20"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const logo = '/dkvicon.png'

const navigation = [
  { name: 'Home', href: '#home' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Structure & Schedule', href: '#structure' },
]

const isMenuOpen = ref(false)
const isScrolled = ref(false)

// Scroll ke section yang sesuai
const scrollToSection = (sectionId) => {
  closeMenu()
  const element = document.querySelector(sectionId)
  if (element) {
    // Tambahkan offset untuk navbar
    const offset = 80 // Sesuaikan dengan tinggi navbar
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
    window.scrollTo({
      top: elementPosition - offset,
      behavior: 'smooth',
    })
  }
}

// Scroll ke atas saat logo diklik
const scrollToTop = () => {
  closeMenu()
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  // Nonaktifkan scroll pada body saat menu mobile terbuka
  if (isMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

const closeMenu = () => {
  isMenuOpen.value = false
  document.body.style.overflow = ''
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
  if (window.innerWidth < 768 && isMenuOpen.value) {
    closeMenu()
  }
}

// Tutup menu saat ukuran layar berubah ke desktop
const handleResize = () => {
  if (window.innerWidth >= 768 && isMenuOpen.value) {
    closeMenu()
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleResize)
})
</script>

<style>
.font-poppins {
  font-family: 'Poppins', sans-serif;
}

/* Perbaikan tampilan hamburger icon */
[aria-expanded='true'] svg {
  stroke: #ff6500;
  /* Warna orange saat menu aktif */
  stroke-width: 2.5px;
}

/* Animasi lebih halus */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}

/* Memastikan menu mobile tetap di atas konten lain */
.md\:hidden {
  z-index: 50;
}
</style>
