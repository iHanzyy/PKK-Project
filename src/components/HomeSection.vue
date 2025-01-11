<!-- <template>
  <div class="w-full h-screen bg-cover" :style="{ backgroundImage: `url(${bgHome})` }">
    <div
      class="fixed top-0 left-0 flex flex-col items-center justify-center w-screen h-full text-xl font-bold text-white bg-black bg-opacity-70"
    >
      <div class="relative w-screen h-full">
        <div
          class="whitespace-nowrap left-[626px] absolute h-5 mb-4 text-3xl font-normal leading-5 tracking-[5px] text-center text-white top-[427px] font-poppins"
        >
          Hello Everyone !
        </div>
        <div
          class="mb-4 font-extrabold leading-5 text-center text-white font-poppins text-7xl left-[566px] tracking-[5px] absolute [text-shadow:0px_0px_25px_#fb0004] top-[496px] whitespace-nowrap"
        >
          WELCOME
        </div>
        <div
          class="h-5 text-2xl font-normal text-center left-[679px] tracking-[5px] leading-5 absolute top-[576px] whitespace-nowrap text-white font-poppins"
        >
          TO XI DKV 3
        </div>
      </div>
    </div>
  </div>
</template> -->

<template>
  <div class="w-full min-h-screen bg-cover" :style="{ backgroundImage: `url(${bgHome})` }">
    <div
      class="fixed top-0 left-0 flex flex-col items-center justify-center w-screen min-h-screen text-white bg-black bg-opacity-70"
    >
      <div class="flex flex-col items-center justify-center px-4 py-8 space-y-6">
        <div
          class="text-2xl tracking-widest text-center text-white font-poppins sm:text-3xl md:text-4xl lg:text-5xl"
        >
          Hello Everyone!
        </div>
        <div
          class="text-center text-white font-poppins text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-widest [text-shadow:0px_0px_25px_#fb0004]"
        >
          WELCOME
        </div>
        <div
          class="text-xl tracking-widest text-center text-white font-poppins sm:text-2xl md:text-3xl lg:text-4xl"
        >
          TO XI DKV 3
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import backgroundHome from '../assets/bgHome.png'

const bgHome = backgroundHome
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');

.font-poppins {
  font-family: 'Poppins', Helvetica;
}
</style>
