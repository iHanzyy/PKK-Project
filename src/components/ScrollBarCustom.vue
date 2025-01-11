<template>
  <div class="custom-scrollbar-container">
    <!-- Wrapper untuk konten yang dapat di-scroll -->
    <div
      class="px-4 overflow-y-auto h-96 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-500 dark:scrollbar-thumb-gray-700 dark:scrollbar-track-gray-800"
    >
      <!-- Konten yang dapat di-scroll -->
      <div class="space-y-4">
        <div v-for="i in 20" :key="i" class="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
          Item {{ i }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Tidak ada logic khusus yang diperlukan
</script>

<style>
/* Kustomisasi scrollbar untuk webkit browsers (Chrome, Safari, dll) */
.custom-scrollbar-container ::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar-container ::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.custom-scrollbar-container ::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.custom-scrollbar-container ::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* Kustomisasi scrollbar untuk Firefox */
.custom-scrollbar-container {
  scrollbar-width: thin;
  scrollbar-color: #888 #f1f1f1;
}
</style>
