<template>
  <nav class="navBar dark:bg-gray-900">
    <div class="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto">
      <a href="#" class="flex items-center space-x-9">
        <img :src="logo" class="mr-4 size-10" alt="DKV Logo" />
      </a>
      <button
        data-collapse-toggle="navbar-default"
        type="button"
        class="inline-flex items-center justify-center w-10 h-10 p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-default"
        aria-expanded="false"
      >
        <span class="sr-only">Open main menu</span>
        <svg
          class="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 14"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>
      </button>
      <div class="hidden w-full md:block md:w-auto" id="navbar-default">
        <ul
          class="flex flex-col p-4 mt-4 font-medium bg-red-600 border border-black rounded-lg md:p-0 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-red-600 dark:bg-white md:dark:bg-white dark:border-white"
        >
          <li>
            <a
              href="#"
              class="block px-3 py-2 text-white bg-red-600 rounded md:bg-transparent md:text-white md:p-0 dark:text-white md:dark:text-white"
              aria-current="page"
              >Home</a
            >
          </li>
          <li>
            <a
              href="#"
              class="block px-3 py-2 text-white bg-red-600 rounded md:bg-transparent md:text-white md:p-0 dark:text-white md:dark:text-white"
              >Gallery</a
            >
          </li>
          <li>
            <a
              href="#"
              class="block px-3 py-2 text-white bg-red-600 rounded md:bg-transparent md:text-white md:p-0 dark:text-white md:dark:text-white"
              >Structure & Schedule</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import logoDKV from '../assets/dkv-logo.png'

const logo = logoDKV
</script>

<style>
.navBar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 20px;
  background: rgba(255, 104, 137, 0.7);
  backdrop-filter: blur(8px);
  z-index: 1000;
  transition: all 0.3s ease;
}
</style>
