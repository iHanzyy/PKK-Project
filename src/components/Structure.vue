<template>
  <div class="relative flex flex-col items-center justify-center space-y-16">
    <!-- Kartu Top Roles -->
    <div v-for="(item, index) in topRoles" :key="index" class="relative shadow-xl card group">
      <!-- Box 1: Foto -->
      <img :src="item.image" alt="role-image" class="w-60 h-72 rounded-t-xl" />

      <!-- Box 3: Role (visible initially, di depan item.name) -->
      <div class="z-20 p-4 text-black bg-white rounded-b-xl">
        <h1 class="font-bold text-center">{{ item.name }}</h1>
      </div>

      <!-- Box 2: Nama (hidden by default, muncul di belakang item.role saat hover) -->
      <div
        class="absolute left-0 z-10 w-full p-4 pb-2 text-center text-black transition-transform duration-300 transform translate-y-full bg-white bottom-[3.4rem] group-hover:translate-y-0"
      >
        <h1 class="font-bold">{{ item.role }}</h1>
      </div>
      <!-- Garis Vertikal untuk topRoles -->
      <div
        class="absolute z-50 w-1 h-16 transform -translate-x-1/2 bg-white top-full left-1/2"
      ></div>
    </div>

    <!-- Garis Horizontal Penghubung -->
    <div class="relative flex items-center justify-center w-full">
      <!-- Garis Horizontal -->
      <div class="absolute h-1 bg-white w-[calc(100%-30rem)] z-10"></div>
    </div>

    <!-- Kartu Bottom Roles -->
    <div class="relative flex flex-row items-center justify-center mt-16 space-x-16">
      <div v-for="(item, index) in bottomRoles" :key="index" class="relative shadow-xl card group">
        <!-- Box 1: Foto -->
        <img :src="item.image" alt="role-image" class="w-60 h-72 rounded-t-xl" />

        <!-- Box 3: Role (visible initially, di depan item.name) -->
        <div class="z-20 p-4 text-black bg-white rounded-b-xl">
          <h1 class="font-bold text-center">{{ item.name }}</h1>
        </div>

        <!-- Box 2: Nama (hidden by default, muncul di belakang item.role saat hover) -->
        <div
          class="absolute left-0 z-10 w-full p-4 pb-2 text-center text-black transition-transform duration-300 transform translate-y-full bg-white bottom-[3.4rem] group-hover:translate-y-0"
        >
          <h1 class="font-bold">{{ item.role }}</h1>
        </div>

        <!-- Garis Vertikal untuk bottomRoles -->
        <div
          class="absolute z-30 w-1 h-16 transform -translate-x-1/2 bg-white bottom-full left-1/2"
        ></div>
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
  overflow: visible;
}

.card img {
  object-fit: cover;
}

.card div {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
