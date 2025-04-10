<template>
  <footer
    class="relative flex flex-col items-center w-full py-6 bg-gradient-to-b from-[#FF8A08] to-[#FFC100]"
  >
    <div class="container px-4 mx-auto">
      <div class="flex flex-col gap-4 justify-center items-center md:flex-row md:justify-between">
        <!-- Logo dan Nama -->
        <div class="flex items-center mb-2">
          <img
            class="w-16 h-16 transition-transform md:w-24 md:h-24 hover:scale-110"
            src="/public/jacicon.svg"
            alt="JACorporation Logo"
          />
          <span class="text-white text-lg md:text-xl font-semibold font-['Poppins'] ml-2">
            CREATED BY JACorporation
          </span>
        </div>
      </div>

      <!-- Divider -->
      <div class="my-2 w-full border-t-2 border-white/50"></div>

      <!-- Copyright -->
      <div class="text-center">
        <p
          class="text-white text-sm md:text-base font-['Poppins'] hover:text-yellow-200 transition-colors"
        >
          © 2025 XI DKV 3 | All Rights Reserved
        </p>
      </div>
    </div>
  </footer>
</template>

<script></script>

<style scoped>
@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

.container img:hover {
  animation: pulse 1.5s infinite;
}

@media (max-width: 640px) {
  .container {
    text-align: center;
  }
}
</style>
