<template>
    <div class="flex flex-col items-center space-y-8 text-white text-2xl uppercase">
      <div v-for="(day, index) in displayedSchedule" :key="index" class="p-4 rounded w-[450px]">
        <h2 class="text-center font-bold text-3xl mb-4">{{ day.name }}</h2>
        <div v-for="(slot, index) in day.schedule" :key="index" class="flex items-center">
          <p class="w-1/2 text-right pr-4">{{ slot.time }}</p>
          <div class="border-l border-white h-full"></div>
          <p class="w-1/2 text-left pl-4">{{ slot.subject }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const schedule = {
    senin: [
      { time: '08.00 – 10.00', subject: 'Matematika' },
      { time: '10.00 – 10.20', subject: 'Istirahat' },
      { time: '10.20 – 12.20', subject: 'B. Inggris' },
      { time: '12.20 – 12.40', subject: 'Istirahat' },
      { time: '12.40 – 13.00', subject: 'B. Inggris' },
    ],
    selasa: [
      { time: '08.00 – 10.00', subject: 'Matematika' },
      { time: '10.00 – 10.20', subject: 'Istirahat' },
      { time: '10.20 – 12.20', subject: 'B. Inggris' },
      { time: '12.20 – 12.40', subject: 'Istirahat' },
      { time: '12.40 – 13.00', subject: 'B. Inggris' },
    ],
    rabu: [
      { time: '08.00 – 10.00', subject: 'Matematika' },
      { time: '10.00 – 10.20', subject: 'Istirahat' },
      { time: '10.20 – 12.20', subject: 'B. Inggris' },
      { time: '12.20 – 12.40', subject: 'Istirahat' },
      { time: '12.40 – 13.00', subject: 'B. Inggris' },
    ],
    kamis: [
      { time: '08.00 – 10.00', subject: 'IPA' },
      { time: '10.00 – 10.20', subject: 'Istirahat' },
      { time: '10.20 – 12.20', subject: 'IPS' },
      { time: '12.20 – 12.40', subject: 'Istirahat' },
      { time: '12.40 – 13.00', subject: 'IPS' },
    ],
    jumat: [
      { time: '08.00 – 10.00', subject: 'Agama' },
      { time: '10.00 – 10.20', subject: 'Istirahat' },
      { time: '10.20 – 12.20', subject: 'Bahasa Indonesia' },
      { time: '12.20 – 12.40', subject: 'Istirahat' },
      { time: '12.40 – 13.00', subject: 'Bahasa Indonesia' },
    ],
  };
  
  const today = new Date().getDay(); 
  
  let displayedDays;
  if (today >= 0 && today <= 3) {
    displayedDays = ['senin', 'selasa', 'rabu'];
  } else {
    displayedDays = ['kamis', 'jumat'];
  }
  
  const displayedSchedule = displayedDays.map((day) => ({
    name: day.charAt(0).toUpperCase() + day.slice(1),
    schedule: schedule[day],
  }));
  </script>
  
  <style scoped>
 
  </style>
  