<template>
  <section id="home" class="section-container" data-aos="fade-up">
    <div class="relative w-full min-h-screen">
      <div class="w-full min-h-screen bg-center bg-cover" :style="{ backgroundImage: `url(${bgHome})` }">
        <!-- Overlay dengan gradient untuk efek yang lebih dinamis -->
        <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-red-800/50 to-black/60"></div>

        <!-- Konten utama dengan animasi dan responsivitas lebih baik -->
        <div class="relative flex flex-col items-center justify-center w-full min-h-screen px-4 text-white">
          <div class="w-full max-w-6xl space-y-4 md:space-y-8 lg:space-y-12">
            <!-- Text dengan animasi fade-in -->
            <div class="opacity-0 animate-fade-in-down" :style="{ animationDelay: '0.3s' }">
              <h2
                class="text-2xl leading-tight tracking-wider text-center md:text-4xl lg:text-5xl font-poppins md:leading-relaxed">
                Hello Everyone!
              </h2>
            </div>

            <!-- Judul utama dengan efek hover -->
            <div class="opacity-0 animate-fade-in-up" :style="{ animationDelay: '0.6s' }">
              <h1
                class="text-6xl font-extrabold text-center transition-all duration-500 transform md:text-8xl lg:text-9xl hover:scale-105 hover:text-shadow-glow">
                WELCOME
              </h1>
            </div>

            <!-- Subjudul dengan animasi -->
            <div class="opacity-0 animate-fade-in-down" :style="{ animationDelay: '0.9s' }">
              <h3 class="text-3xl tracking-wide text-center md:text-5xl lg:text-6xl font-poppins">
                TO XI DKV 3
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import backgroundHome from '../assets/bgHome.png'

const bgHome = backgroundHome
</script>

<style scoped>
.section-container {
  width: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');

.font-poppins {
  font-family: 'Poppins', sans-serif;
}

/* Animasi Kustom */
@keyframes fade-in-down {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-down {
  animation: fade-in-down 1s ease-out forwards;
}

.animate-fade-in-up {
  animation: fade-in-up 1s ease-out forwards;
}

/* Efek Glow pada Hover */
.hover-text-shadow-glow:hover {
  text-shadow:
    0 0 30px rgba(251, 0, 4, 0.8),
    0 0 50px rgba(251, 0, 4, 0.6);
}

/* Responsive Text */
@media (max-width: 640px) {
  h1 {
    font-size: 4rem;
  }

  h3 {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  h1 {
    font-size: 3rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  h3 {
    font-size: 1.75rem;
  }
}
</style>
