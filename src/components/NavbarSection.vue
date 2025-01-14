<template>
  <nav
    class="bg-[rgba(211,77,102,0.8)] h-[67px] fixed w-full top-0 left-0 backdrop-blur-md z-10 transition-all duration-300 flex items-center"
  >
    <div class="flex items-center justify-between w-full h-full max-w-screen-xl mx-auto">
      <a href="#" class="flex items-center h-full space-x-4">
        <img :src="logo" alt="DKV Logo" class="object-cover w-16 h-16 mr-5" />
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
      <div class="hidden h-full md:block" id="navbar-default">
        <ul class="flex items-center h-full space-x-8">
          <li>
            <a
              href="#home"
              class="px-4 py-2 text-white text-[30px] font-poppins font-semibold capitalize hover:bg-[#DC0037] hover:rounded-full transition-all duration-300 ease-in-out"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#gallery"
              class="px-4 py-2 text-white text-[30px] font-poppins font-semibold capitalize hover:bg-[#DC0037] hover:rounded-full transition-all duration-300 ease-in-out"
            >
              Gallery
            </a>
          </li>
          <li>
            <a
              href="#structure"
              class="px-4 py-2 text-white text-[30px] font-poppins font-semibold capitalize hover:bg-[#DC0037] hover:rounded-full transition-all duration-300 ease-in-out"
            >
              Structure & Schedule
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import logoDKV from '/public/dkvicon.svg'

const logo = logoDKV

// set the target element that will be collapsed or expanded (eg. navbar menu)
const $targetEl = document.getElementById('navbar-default')

// optionally set a trigger element (eg. a button, hamburger icon)
const $triggerEl = document.getElementById('button')

// optional options with default values and callback functions
const options = {
  onCollapse: () => {
    console.log('element has been collapsed')
  },
  onExpand: () => {
    console.log('element has been expanded')
  },
  onToggle: () => {
    console.log('element has been toggled')
  },
}

const instanceOptions = {
  id: 'targetEl',
  override: true,
}

import { Collapse } from 'flowbite'

/*
 * $targetEl: required
 * $triggerEl: optional
 * options: optional
 */
const collapse = new Collapse($targetEl, $triggerEl, options, instanceOptions)
// // show the target element
// collapse.expand()

// // hide the target element
// collapse.collapse()

// // toggle the visibility of the target element
// collapse.toggle()
</script>
