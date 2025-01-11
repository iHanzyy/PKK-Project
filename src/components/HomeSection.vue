<template>
  <div class="w-full h-screen bg-cover" :style="{ backgroundImage: `url(${bgHome})` }">
    <div
      class="flex flex-col items-center justify-center w-full h-full text-xl font-bold text-white bg-black bg-opacity-50"
    >
      <h1 class="mb-4 text-4xl text-center">Hello Everyone !</h1>
      <h1 class="mb-4 text-4xl text-center">WELCOME</h1>
      <h1 class="text-4xl text-center">TO XI DKV 3</h1>
    </div>
  </div>
</template>

<script setup>
import backgroundHome from '../assets/bgHome.png'
const bgHome = backgroundHome
</script>
