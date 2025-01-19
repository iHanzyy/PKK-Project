<template>
  <div class="relative flex flex-col items-center justify-center space-y-16">
    <!-- Kartu Top Roles -->
    <div v-for="(item, index) in topRoles" :key="index" class="relative shadow-xl card">
      <img :src="item.image" alt="role-image" class="w-60 h-72 rounded-t-xl" />
      <div class="p-4 text-black bg-white rounded-b-xl">
        <h1 class="font-bold text-center">{{ item.role }}</h1>
        <!-- <p class="text-center">{{ item.name }}</p> -->
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
      <div v-for="(item, index) in bottomRoles" :key="index" class="relative shadow-xl card">
        <!-- Garis Vertikal untuk bottomRoles -->
        <div class="absolute w-1 h-16 transform -translate-x-1/2 bg-white -top-16 left-1/2"></div>
        <img :src="item.image" alt="role-image" class="w-60 h-72 rounded-t-xl" />
        <div class="p-4 text-black bg-white rounded-b-xl">
          <h1 class="font-bold text-center">{{ item.role }}</h1>
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

<style scoped></style>
