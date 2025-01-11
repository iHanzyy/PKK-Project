<template>
  <div class="bg-red-700">
    <title class="flex flex-col items-center justify-center text-xl font-bold text-white">
      Structure & Schedule
    </title>
    <div class="structure-item">
      <div class="overlap">
        <div :class="['picture', property1]">
          <template v-if="property1 === 'default'">
            <img class="MOHAMMAD-JONAH" alt="Mohammad JONAH" :src="image" />
            <div class="TEXT">
              <div class="overlap-group">
                <div class="rectangle" />
                <div class="text-wrapper">Kamiludin, S.Kom</div>
              </div>
            </div>
          </template>
          <template v-else-if="property1 === 'variant-2'">
            <div class="div">
              <img class="MOHAMMAD-JONAH" alt="Mohammad JONAH" :src="image" />
              <div class="overlap-group-wrapper">
                <div class="overlap-group">
                  <div class="rectangle" />
                  <div class="text-wrapper">Kamiludin, S.Kom</div>
                </div>
              </div>
            </div>
          </template>
        </div>
        <div class="overlap-wrapper">
          <div class="div-wrapper">
            <div class="text-wrapper-2">Wali Kelas</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineProps } from 'vue'
import image from '../assets/himmel.jpg'

export default {
  name: 'HumanImg',
  setup() {
    const props = defineProps({
      property1: {
        type: String,
        validator: (value) => ['variant-2', 'default'].includes(value),
      },
      MOHAMMADJonah: {
        type: String,
        default: 'himmel.jpg',
      },
    })
    return { ...props, image }
  },
}
</script>

<style>
.struktur {
  border-radius: 10px;
  height: 346px;
  overflow: hidden;
  width: 229px;
}

.struktur .overlap {
  height: 346px;
  position: relative;
  width: 231px;
}

.struktur .picture {
  left: 0;
  position: absolute;
  top: 0;
  width: 229px;
}

.struktur .MOHAMMAD-JONAH {
  height: 303px;
  left: 1px;
  object-fit: cover;
  position: absolute;
  top: 0;
  width: 228px;
}

.struktur .TEXT {
  height: 31px;
  left: 0;
  position: absolute;
  top: 312px;
  width: 231px;
}

.struktur .overlap-group {
  border-radius: 2px;
  height: 31px;
  position: relative;
  width: 229px;
}

.struktur .rectangle {
  background-color: #ffffff;
  border-radius: 2px;
  height: 31px;
  left: 0;
  opacity: 0.6;
  position: absolute;
  top: 0;
  width: 229px;
}

.struktur .text-wrapper {
  color: #000000;
  font-family: 'Poppins-Light', Helvetica;
  font-size: 15px;
  font-weight: 300;
  height: 20px;
  left: 37px;
  letter-spacing: 2px;
  line-height: 20px;
  position: absolute;
  text-align: center;
  top: 6px;
  white-space: nowrap;
}

.struktur .div {
  height: 303px;
  position: relative;
  width: 231px;
}

.struktur .overlap-group-wrapper {
  height: 31px;
  left: 0;
  position: absolute;
  top: 272px;
  width: 231px;
}

.struktur .overlap-wrapper {
  height: 43px;
  left: 0;
  position: absolute;
  top: 303px;
  width: 231px;
}

.struktur .div-wrapper {
  background-color: #d9d9d9;
  border-radius: 2px;
  height: 43px;
  position: relative;
  width: 229px;
}

.struktur .text-wrapper-2 {
  color: #000000;
  font-family: 'Poppins-SemiBold', Helvetica;
  font-size: 15px;
  font-weight: 600;
  height: 33px;
  left: 57px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  text-align: center;
  top: 6px;
  width: 115px;
}

.struktur .default {
  height: 343px;
}

.struktur .variant-2 {
  height: 303px;
}
</style>
