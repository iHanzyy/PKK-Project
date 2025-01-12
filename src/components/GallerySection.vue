<template>
  <div class="relative w-full min-h-screen">
    <!-- Gallery Section -->
    <div class="px-8 py-16 bg-gradient-to-b from-pink-500 via-red-600 to-red-700">
      <h1 class="mb-10 text-5xl font-extrabold text-center text-white font-poppins">Our Gallery</h1>
      <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <img
          class="w-full h-72 object-cover rounded-[20px] shadow-xl transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
          src="../assets/galerry-1.jpg"
          alt="Gallery 1"
        />
        <img
          class="w-full h-72 object-cover rounded-[20px] shadow-xl transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
          src="../assets/galerry-2.jpg"
          alt="Gallery 2"
        />
        <img
          class="w-full h-72 object-cover rounded-[20px] shadow-xl transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
          src="../assets/galerry-3.jpg"
          alt="Gallery 3"
        />
        <img
          class="w-full h-72 object-cover rounded-[20px] shadow-xl transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
          src="../assets/galerry-4.jpg"
          alt="Gallery 4"
        />
        <img
          class="w-full h-72 object-cover rounded-[20px] shadow-xl transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
          src="../assets/galerry-5.jpg"
          alt="Gallery 5"
        />
        <img
          class="w-full h-72 object-cover rounded-[20px] shadow-xl transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
          src="../assets/galerry-6.jpg"
          alt="Gallery 6"
        />
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');

.font-poppins {
  font-family: 'Poppins', Helvetica;
}
</style>
