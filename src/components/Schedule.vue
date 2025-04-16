<template>
  <div class="schedule-container" data-aos="fade-up" data-aos-duration="800">
    <!-- Current Block Indicator -->
    <div class="block-indicator" data-aos="fade-in" data-aos-delay="200">
      <span class="block-label">BLOK {{ currentBlock }}</span>
      <span class="week-info">{{ weekInfo }}</span>
    </div>

    <!-- Schedule Navigation -->
    <div class="schedule-nav" data-aos="fade-up" data-aos-delay="300">
      <button @click="viewBlock = 1" :class="['nav-btn', viewBlock === 1 ? 'active' : '']">
        Blok 1
      </button>
      <button @click="viewBlock = 2" :class="['nav-btn', viewBlock === 2 ? 'active' : '']">
        Blok 2
      </button>
    </div>

    <!-- Days Navigation -->
    <div class="days-nav" data-aos="fade-up" data-aos-delay="400">
      <button v-for="(day, index) in daysOfWeek" :key="index" @click="selectedDay = index"
        :class="['day-btn', selectedDay === index ? 'active' : '', isToday(index) ? 'today' : '']">
        {{ day.short }}
      </button>
    </div>

    <!-- Schedule Content -->
    <div class="schedule-content" data-aos="fade-up" data-aos-delay="500">
      <!-- Weekend Message -->
      <div v-if="selectedDay === 5 || selectedDay === 6" class="weekend-message">
        <div class="libur-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2">
            <path d="M5 3v18M19 9v12M12 3v18M5 9h7M12 17h7"></path>
          </svg>
        </div>
        <h3>{{ daysOfWeek[selectedDay].name }}</h3>
        <p>Libur</p>
      </div>

      <!-- Weekday Schedule -->
      <div v-else class="day-schedule">
        <transition name="fade" mode="out-in">
          <div :key="`${viewBlock}-${selectedDay}`" class="schedule-slots">
            <div v-for="(slot, slotIndex) in currentSchedule" :key="slotIndex" class="schedule-slot"
              :class="isCurrentTimeSlot(slot) ? 'current-slot' : ''" data-aos="fade-up"
              :data-aos-delay="100 + (slotIndex * 50)">
              <div class="time">
                {{ slot.time }}
                <span v-if="isCurrentTimeSlot(slot)" class="current-indicator">Sekarang</span>
              </div>
              <div class="subject-container">
                <div class="subject">{{ slot.subject }}</div>
                <div v-if="slot.teacher" class="teacher">{{ slot.teacher }}</div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import AOS from 'aos'

// Initialize the block start date (adjust this to when BLOK 1 started)
const blok1StartDate = new Date('2025-04-08') // Tuesday, April 8, 2025
const twoWeeksMs = 14 * 24 * 60 * 60 * 1000 // 2 weeks in milliseconds

// Days of the week
const daysOfWeek = [
  { name: 'Senin', short: 'Sen' },
  { name: 'Selasa', short: 'Sel' },
  { name: 'Rabu', short: 'Rab' },
  { name: 'Kamis', short: 'Kam' },
  { name: 'Jumat', short: 'Jum' },
  { name: 'Sabtu', short: 'Sab' },
  { name: 'Minggu', short: 'Min' }
]

// Define schedules for both blocks
const scheduleBlocks = {
  // BLOK 1
  1: {
    // Monday
    0: [
      { time: '07:00 - 08:00', subject: 'Upacara Bendera/Apel' },
      { time: '08:00 - 10:00', subject: 'MTK', teacher: 'Bu Eska' },
      { time: '10:00 - 10:20', subject: 'Istirahat Pertama' },
      { time: '10:20 - 12:20', subject: 'B. Inggris', teacher: 'Miss Suci' },
      { time: '12:20 - 13:00', subject: 'Istirahat Kedua' },
      { time: '13:00 - 13:40', subject: 'B. Inggris', teacher: 'Miss Suci' },
      { time: '13:40 - 15:40', subject: 'B. Indonesia', teacher: 'Bu Meiria' }
    ],
    // Tuesday
    1: [
      { time: '07:00 - 07:40', subject: 'Dhuha' },
      { time: '07:40 - 09:40', subject: 'P5', teacher: 'Bu Meiria' },
      { time: '09:40 - 10:00', subject: 'Istirahat Pertama' },
      { time: '10:00 - 10:40', subject: 'P5', teacher: 'Bu Meiria' },
      { time: '10:40 - 12:00', subject: 'B. Inggris', teacher: 'Miss Suci' },
      { time: '12:00 - 12:40', subject: 'Istirahat Kedua' },
      { time: '12:40 - 14:00', subject: 'MTK', teacher: 'Bu Eska' },
      { time: '14:00 - 16:00', subject: 'PJOK', teacher: 'Pak Rizky' }
    ],
    // Wednesday
    2: [
      { time: '07:00 - 07:40', subject: 'Dhuha' },
      { time: '07:40 - 09:40', subject: 'PKK', teacher: 'Pak Didin' },
      { time: '09:40 - 10:00', subject: 'Istirahat Pertama' },
      { time: '10:00 - 12:00', subject: 'PKK', teacher: 'Pak Didin' },
      { time: '12:00 - 12:40', subject: 'Istirahat Kedua' },
      { time: '12:40 - 15:20', subject: 'PKK', teacher: 'Pak Didin' }
    ],
    // Thursday
    3: [
      { time: '07:00 - 07:40', subject: 'Dhuha' },
      { time: '07:40 - 09:40', subject: 'Sejarah', teacher: 'Pak Primo' },
      { time: '09:40 - 10:00', subject: 'Istirahat Pertama' },
      { time: '10:00 - 12:00', subject: 'PABP', teacher: 'Bu Salbiyah' },
      { time: '12:00 - 12:40', subject: 'Istirahat Kedua' },
      { time: '12:40 - 15:20', subject: 'P5', teacher: 'Pak Dedi' }
    ],
    // Friday
    4: [
      { time: '07:00 - 08:00', subject: 'Jumsih/Jumseh' },
      { time: '08:00 - 10:00', subject: 'P. Pancasila', teacher: 'Bu Tika' },
      { time: '10:00 - 10:20', subject: 'Istirahat Pertama' },
      { time: '10:20 - 11:40', subject: 'B. Indonesia', teacher: 'Bu Meiria' },
      { time: '11:40 - 13:00', subject: 'Istirahat Kedua' },
      { time: '13:00 - 14:20', subject: 'PABP', teacher: 'Bu Salbiyah' }
    ]
  },
  // BLOK 2
  2: {
    // Monday
    0: [
      { time: '07:00 - 08:00', subject: 'Upacara Bendera/Apel' },
      { time: '08:00 - 10:00', subject: 'DI', teacher: 'Pak Angga' },
      { time: '10:00 - 10:20', subject: 'Istirahat Pertama' },
      { time: '10:20 - 12:20', subject: 'DI', teacher: 'Pak Angga' },
      { time: '12:20 - 13:00', subject: 'Istirahat Kedua' },
      { time: '13:00 - 15:40', subject: 'DI', teacher: 'Pak Angga' }
    ],
    // Tuesday
    1: [
      { time: '07:00 - 07:40', subject: 'Dhuha' },
      { time: '07:40 - 09:00', subject: 'Video', teacher: 'Pak Indra' },
      { time: '09:00 - 09:40', subject: 'Brief', teacher: 'Pak Kamil' },
      { time: '09:40 - 10:00', subject: 'Istirahat Pertama' },
      { time: '10:00 - 12:00', subject: 'Brief', teacher: 'Pak Kamil' },
      { time: '12:00 - 12:40', subject: 'Istirahat Kedua' },
      { time: '12:40 - 16:00', subject: 'Brief', teacher: 'Pak Kamil' }
    ],
    // Wednesday
    2: [
      { time: '07:00 - 07:40', subject: 'Dhuha' },
      { time: '07:40 - 09:00', subject: 'DI', teacher: 'Pak Angga' },
      { time: '09:00 - 09:40', subject: '3D', teacher: 'Pak Indra' },
      { time: '09:40 - 10:00', subject: 'Istirahat Pertama' },
      { time: '10:00 - 12:00', subject: '3D', teacher: 'Pak Indra' },
      { time: '12:00 - 12:40', subject: 'Istirahat Kedua' },
      { time: '12:40 - 16:00', subject: '3D', teacher: 'Pak Indra' }
    ],
    // Thursday
    3: [
      { time: '07:00 - 07:40', subject: 'Dhuha' },
      { time: '07:40 - 09:40', subject: 'B. Jepang', teacher: 'Sensei Novi' },
      { time: '09:40 - 10:00', subject: 'Istirahat Pertama' },
      { time: '10:00 - 10:40', subject: 'B. Jepang', teacher: 'Sensei Novi' },
      { time: '10:40 - 12:00', subject: 'Video', teacher: 'Pak Indra' },
      { time: '12:00 - 12:40', subject: 'Istirahat Kedua' },
      { time: '12:40 - 15:20', subject: 'Video', teacher: 'Pak Indra' }
    ],
    // Friday
    4: [
      { time: '07:00 - 08:00', subject: 'Jumsih/Jumseh' },
      { time: '08:00 - 10:00', subject: 'Brief', teacher: 'Pak Kamil' },
      { time: '10:00 - 10:20', subject: 'Istirahat Pertama' },
      { time: '10:20 - 11:40', subject: 'Video', teacher: 'Pak Indra' },
      { time: '11:40 - 13:00', subject: 'Istirahat Kedua' },
      { time: '13:00 - 14:20', subject: 'Video', teacher: 'Pak Indra' }
    ]
  }
}

// State
const now = ref(new Date())
const selectedDay = ref(new Date().getDay() - 1) // Current day (0 = Monday, 6 = Sunday)
if (selectedDay.value < 0) selectedDay.value = 6 // If it's Sunday, set to 6
if (selectedDay.value > 6) selectedDay.value = 0 // Safety check

// Determine current block
const currentBlock = computed(() => {
  const daysSinceStart = Math.floor((now.value - blok1StartDate) / (24 * 60 * 60 * 1000))
  const weeksSinceStart = Math.floor(daysSinceStart / 7)
  const blockNumber = Math.floor(weeksSinceStart / 2) % 2 + 1 // Alternating between 1 and 2
  return blockNumber
})

// Week info for display
const weekInfo = computed(() => {
  const daysUntilNextBlock = 14 - ((now.value - blok1StartDate) / (24 * 60 * 60 * 1000)) % 14
  return daysUntilNextBlock <= 7
    ? `${Math.ceil(daysUntilNextBlock)} hari menuju BLOK ${currentBlock.value === 1 ? 2 : 1}`
    : `Minggu ${Math.ceil((14 - daysUntilNextBlock) / 7)} dari 2`
})

// Block being viewed (can be changed by user)
const viewBlock = ref(currentBlock.value)

// Watch for changes to make sure we're showing the correct schedule
watch(() => currentBlock.value, (newBlock) => {
  viewBlock.value = newBlock
})

// Computed current schedule based on selected day and block
const currentSchedule = computed(() => {
  if (selectedDay.value === 5 || selectedDay.value === 6) {
    return [] // Weekend
  }
  return scheduleBlocks[viewBlock.value][selectedDay.value] || []
})

// Check if a given day is today
const isToday = (dayIndex) => {
  const today = new Date().getDay() - 1 // 0 = Monday
  return dayIndex === (today < 0 ? 6 : today) // Sunday becomes 6
}

// Check if the current time falls within a time slot
const isCurrentTimeSlot = (slot) => {
  const currentHour = now.value.getHours()
  const currentMinute = now.value.getMinutes()
  const currentTimeInMinutes = currentHour * 60 + currentMinute

  // Extract start and end times from the slot
  const [startStr, endStr] = slot.time.split(' - ')
  const [startHour, startMinute] = startStr.split(':').map(Number)
  const [endHour, endMinute] = endStr.split(':').map(Number)

  const startTimeInMinutes = startHour * 60 + startMinute
  const endTimeInMinutes = endHour * 60 + endMinute

  return currentTimeInMinutes >= startTimeInMinutes &&
    currentTimeInMinutes <= endTimeInMinutes &&
    selectedDay.value === (now.value.getDay() - 1) &&
    viewBlock.value === currentBlock.value
}

// Update current time every minute
setInterval(() => {
  now.value = new Date()
}, 60000) // 60000 ms = 1 minute

onMounted(() => {
  // Initialize AOS
  AOS.refresh()

  // Set interval to update current time
  setInterval(() => {
    now.value = new Date()
  }, 60000)
})
</script>

<style scoped>
.schedule-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
}

.block-indicator {
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
}

.block-label {
  font-size: 2rem;
  font-weight: bold;
  display: block;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  letter-spacing: 2px;
}

.week-info {
  font-size: 1rem;
  opacity: 0.8;
  display: block;
  margin-top: 0.25rem;
}

.schedule-nav {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.nav-btn {
  padding: 0.5rem 1.5rem;
  background-color: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  border-radius: 9999px;
  font-weight: bold;
  transition: all 0.3s ease;
}

.nav-btn.active {
  background-color: rgba(255, 255, 255, 0.9);
  color: #C40C0C;
  transform: scale(1.05);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.days-nav {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  gap: 0.5rem;
}

.day-btn {
  flex: 1;
  padding: 0.5rem;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
}

.day-btn.active {
  background-color: rgba(255, 255, 255, 0.8);
  color: #FF6500;
  transform: translateY(-5px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.day-btn.today::after {
  content: '';
  position: absolute;
  width: 8px;
  height: 8px;
  background-color: #FF6500;
  border-radius: 50%;
  top: 4px;
  right: 4px;
}

.schedule-content {
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  padding: 1.5rem;
  backdrop-filter: blur(5px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.weekend-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
}

.libur-icon {
  width: 80px;
  height: 80px;
  margin-bottom: 1rem;
  color: white;
  opacity: 0.7;
}

.weekend-message h3 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.weekend-message p {
  font-size: 1.5rem;
  opacity: 0.9;
  font-weight: 600;
}

.schedule-slots {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.schedule-slot {
  display: flex;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  border-left: 4px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.schedule-slot:hover {
  background-color: rgba(255, 255, 255, 0.2);
  transform: translateX(5px);
}

.current-slot {
  background-color: rgba(255, 255, 255, 0.25);
  border-left: 4px solid #FF6500;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.time {
  width: 120px;
  flex-shrink: 0;
  font-weight: 500;
  font-size: 0.9rem;
  position: relative;
  padding-right: 10px;
  padding-top: 5px;
  display: flex;
  align-items: center;
}

.current-slot .time {
  padding-top: 5px;
}

.current-indicator {
  position: absolute;
  font-size: 0.7rem;
  background-color: #FF6500;
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  top: -10px;
  left: 0;
  animation: pulse 2s infinite;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  z-index: 2;
  font-weight: 600;
  letter-spacing: 0.2px;
}

/* Responsive styles for the current indicator */
@media (max-width: 768px) {
  .current-indicator {
    font-size: 0.65rem;
    padding: 2px 5px;
    top: -8px;
    left: initial;
    right: 0;
  }
}

@media (max-width: 576px) {
  .schedule-slot {
    padding-top: 1.25rem;
    position: relative;
  }

  .time {
    display: flex;
    align-items: center;
    position: relative;
    padding-right: 0;
    width: 100%;
    justify-content: flex-start;
  }

  .current-indicator {
    position: absolute;
    top: -14px;
    right: 8px;
    left: initial;
    padding: 1px 8px;
    font-size: 0.65rem;
    border-radius: 3px;
    font-weight: 500;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  }
}

/* Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

@keyframes pulse {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.6;
  }
}

/* Responsive styles */
@media (max-width: 768px) {
  .schedule-container {
    padding: 0.5rem;
  }

  .time {
    width: 110px;
    font-size: 0.8rem;
    padding-right: 12px;
    /* More space for indicator */
  }

  .current-indicator {
    font-size: 0.65rem;
    padding: 1px 5px;
  }

  .subject {
    font-size: 1rem;
  }

  .teacher {
    font-size: 0.8rem;
  }

  .schedule-slot {
    padding: 0.75rem;
  }
}

@media (max-width: 576px) {
  .block-label {
    font-size: 1.5rem;
  }

  .day-btn {
    font-size: 0.75rem;
    padding: 0.4rem 0.2rem;
  }

  .schedule-slot {
    flex-direction: column;
    gap: 0.5rem;
    position: relative;
    padding-top: 16px;
    /* Add space for indicator at top */
  }

  .time {
    width: 100%;
    margin-bottom: 0.25rem;
  }

  .current-indicator {
    top: -8px;
    right: 10px;
  }

  .weekend-message {
    padding: 2rem 1rem;
  }

  .libur-icon {
    width: 60px;
    height: 60px;
  }
}
</style>
