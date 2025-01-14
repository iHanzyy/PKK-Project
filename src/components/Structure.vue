<template>
  <div class="flex flex-col items-center justify-center space-y-16">
    <div v-for="(role, index) in topRoles" :key="index" class="card shadow-xl">
      <img :src="img" alt="role-image" class="w-48 h-52 rounded-t-xl" />
      <div class="bg-white rounded-b-xl text-black p-2">
        <h1 class="text-center font-bold">{{ role }}</h1>
        <p class="text-center">{{ topNames[index] }}</p>
      </div>
    </div>
  </div>

  <div class="mt-32 flex flex-row items-center justify-center space-x-20">
    <div v-for="(role, index) in bottomRoles" :key="index" class="card shadow-xl">
      <img :src="img" alt="role-image" class="w-48 h-52 rounded-t-xl" />
      <div class="bg-white rounded-b-xl text-black p-2">
        <h1 class="text-center font-bold">{{ role }}</h1>
        <p class="text-center">{{ bottomNames[index] }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import image from '../assets/himmel.jpg'

const img = image

const topRoles = ['Wali Kelas', 'Ketua Kelas', 'Wakil Ketua Kelas']
const topNames = ['Windah', 'Himmel', 'Kamiludin']

const bottomRoles = ['Sekretaris 1', 'Sekretaris 2', 'Bendahara 1', 'Bendahara 2']
const bottomNames = ['Aldo', 'Bimo', 'Dewi', 'Fajar']
</script>

<style scoped></style>
