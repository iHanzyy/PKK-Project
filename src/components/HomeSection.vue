<template>
  <section id="home" class="section-container">
    <!-- Responsive container with aspect ratio control -->
    <div class="home-container">
      <div class="background-wrapper" :style="{ backgroundImage: `url(${bgHome})` }">
        <!-- Overlay with gradient for dynamic effect -->
        <div class="gradient-overlay"></div>

        <!-- Main content with better responsive layout -->
        <div class="content-wrapper">
          <div class="content-inner">
            <!-- First text with animation -->
            <div class="opacity-0 animate-fade-in-down" :style="{ animationDelay: '0.3s' }">
              <h2 class="greeting-text">
                Hello Everyone!
              </h2>
            </div>

            <!-- Main title with hover effect -->
            <div class="opacity-0 animate-fade-in-up" :style="{ animationDelay: '0.6s' }">
              <h1 class="welcome-text">
                WELCOME
              </h1>
            </div>

            <!-- Subtitle with animation -->
            <div class="opacity-0 animate-fade-in-down" :style="{ animationDelay: '0.9s' }">
              <h3 class="class-text">
                TO XI DKV 3
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import backgroundHome from '../assets/bgHome.png'

const bgHome = backgroundHome
</script>

<style scoped>
.section-container {
  width: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.home-container {
  position: relative;
  width: 100%;
  height: 100vh;
  /* Default full height on desktop */
}

.background-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

.gradient-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(168, 28, 28, 0.5), rgba(0, 0, 0, 0.6));
}

.content-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 1rem;
  text-align: center;
  color: white;
}

.content-inner {
  width: 100%;
  max-width: 72rem;
  /* 6xl in Tailwind */
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.greeting-text {
  font-size: 2.5rem;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  letter-spacing: 0.05em;
  line-height: 1.2;
}

.welcome-text {
  font-size: 9rem;
  font-weight: 800;
  letter-spacing: 0.025em;
  transition: all 0.5s ease;
}

.welcome-text:hover {
  transform: scale(1.05);
  text-shadow: 0 0 30px rgba(251, 0, 4, 0.8), 0 0 50px rgba(251, 0, 4, 0.6);
}

.class-text {
  font-size: 4rem;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  letter-spacing: 0.05em;
}

/* Animations */
@keyframes fade-in-down {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-down {
  animation: fade-in-down 1s ease-out forwards;
}

.animate-fade-in-up {
  animation: fade-in-up 1s ease-out forwards;
}

/* Mobile Responsive Styles */
@media (max-width: 1024px) {
  .content-inner {
    gap: 2rem;
  }

  .greeting-text {
    font-size: 2rem;
  }

  .welcome-text {
    font-size: 7rem;
  }

  .class-text {
    font-size: 3.5rem;
  }
}

@media (max-width: 768px) {
  .home-container {
    height: auto;
  }

  .background-wrapper {
    /* 16:9 aspect ratio container */
    padding-top: 56.25%;
    height: 0;
  }

  .content-wrapper {
    position: absolute;
    top: 0;
  }

  .greeting-text {
    font-size: 1.75rem;
  }

  .welcome-text {
    font-size: 5rem;
  }

  .class-text {
    font-size: 3rem;
  }

  .content-inner {
    gap: 1.5rem;
  }
}

@media (max-width: 640px) {
  .greeting-text {
    font-size: 1.5rem;
  }

  .welcome-text {
    font-size: 3.5rem;
  }

  .class-text {
    font-size: 2.25rem;
  }

  .content-inner {
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .greeting-text {
    font-size: 1.25rem;
  }

  .welcome-text {
    font-size: 3rem;
  }

  .class-text {
    font-size: 1.75rem;
  }
}
</style>
