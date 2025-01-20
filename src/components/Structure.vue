<template>
  <div class="relative flex flex-col items-center justify-center space-y-16">
    <!-- Kartu Top Roles -->
    <div v-for="(item, index) in topRoles" :key="index" class="relative shadow-xl card group">
      <!-- Box 1: Foto -->
      <img :src="item.image" alt="role-image" class="w-60 h-72 rounded-t-xl" />

      <!-- Box 3: Role (visible initially, di depan item.name) -->
      <div class="z-20 p-4 text-black bg-white rounded-b-xl">
        <h1 class="font-bold text-center">{{ item.role }}</h1>
      </div>

      <!-- Box 2: Nama (hidden by default, muncul di belakang item.role saat hover) -->
      <div
        class="absolute left-0 z-10 w-full p-4 text-center text-black transition-transform duration-300 transform translate-y-full bg-white bottom-16 group-hover:translate-y-0"
      >
        <h1 class="font-bold">{{ item.name }}</h1>
      </div>

      <!-- Garis Vertikal untuk topRoles -->
      <div class="absolute w-1 h-16 transform -translate-x-1/2 bg-white top-full left-1/2"></div>
    </div>

    <!-- Garis Horizontal Penghubung -->
    <div class="relative flex items-center justify-center w-full">
      <!-- Garis Horizontal -->
      <div class="absolute h-1 bg-white w-[calc(100%-30rem)]"></div>
    </div>

    <!-- Kartu Bottom Roles -->
    <div class="flex flex-row items-center justify-center mt-16 space-x-20">
      <div v-for="(item, index) in bottomRoles" :key="index" class="relative shadow-xl card group">
        <!-- Box 1: Foto -->
        <img :src="item.image" alt="role-image" class="w-60 h-72 rounded-t-xl" />

        <!-- Box 3: Role (visible initially, di depan item.name) -->
        <div class="z-20 p-4 text-black bg-white rounded-b-xl">
          <h1 class="font-bold text-center">{{ item.role }}</h1>
        </div>

        <!-- Box 2: Nama (hidden by default, muncul di belakang item.role saat hover) -->
        <div
          class="absolute left-0 z-10 w-full p-4 text-center text-black transition-transform duration-300 transform translate-y-full bg-white bottom-16 group-hover:translate-y-0"
        >
          <h1 class="font-bold">{{ item.name }}</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import waliKelasImg from '../assets/waliKelas.jpg'
import ketuaKelasImg from '../assets/ketuaKelas.jpg'
import wakilKetuaKelasImg from '../assets/wakilKetuaKelas.jpg'
import sekretaris1Img from '../assets/sekretaris1.jpg'
import sekretaris2Img from '../assets/sekretaris2.jpg'
import bendahara1Img from '../assets/bendahara1.jpg'
import bendahara2Img from '../assets/bendahara2.jpg'

const topRoles = [
  { role: 'Wali Kelas', name: 'Kamiludin, S.Kom', image: waliKelasImg },
  { role: 'Ketua Kelas', name: 'Putri Retno W. K', image: ketuaKelasImg },
  { role: 'Wakil Ketua Kelas', name: 'Fathir Al Habsyi Hakim', image: wakilKetuaKelasImg },
]

const bottomRoles = [
  { role: 'Sekretaris 1', name: 'Maudy Intanisa Zahra', image: sekretaris1Img },
  { role: 'Sekretaris 2', name: 'Hadasa Ester Lika', image: sekretaris2Img },
  { role: 'Bendahara 1', name: 'Nayza Fitri Putriana', image: bendahara1Img },
  { role: 'Bendahara 2', name: 'Malika Danish Ara', image: bendahara2Img },
]
</script>

<style scoped>
.card {
  position: relative;
  overflow: hidden; /* Agar item.name tidak terlihat di luar area card */
}

/* Box 2 (Nama) pada tampilan awal berada di bawah, tersembunyi */
.card .role-name {
  position: absolute;
  left: 0;
  bottom: 0; /* Nama di bawah item.role */
  width: 100%;
  transform: translateY(100%); /* Mulai dari bawah, tersembunyi */
  transition: transform 0.3s ease; /* Animasi smooth */
  z-index: 10; /* Di belakang item.role */
}

/* Animasi untuk Nama (Box 2) */
.card .group:hover .role-name {
  transform: translateY(0); /* Muncul dari bawah ke atas */
}

/* Box 3 (Role) tetap di depan */
.card .role-text {
  position: relative;
  z-index: 20;
}
</style>
