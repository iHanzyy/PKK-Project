<template>
  <footer class="footer">
    <div class="footer-content">
      <!-- Brand Section -->
      <div class="brand-container">
        <div class="logo-container">
          <img class="logo" src="/public/jacicon.svg" alt="JACorporation Logo" />
        </div>
        <div class="brand-info">
          <h3 class="brand-name">JACorporation</h3>
          <p class="brand-tagline">Web Development & Design</p>
        </div>
      </div>

      <!-- Divider with improved styling -->
      <div class="footer-divider"></div>

      <!-- Bottom Section -->
      <div class="footer-bottom">
        <p class="copyright">© 2025 XI DKV 3</p>
        <p class="rights">All Rights Reserved</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
// No additional logic needed
</script>

<style scoped>
.footer {
  background: linear-gradient(to bottom, #FF8A08, #FFC100);
  padding: 2rem 0 1.5rem;
  position: relative;
  overflow: hidden;
  /* Removed the box-shadow that was creating the visual divide */
  margin-top: -1px;
  /* Prevents any pixel gap between sections */
}

/* Improve the pattern overlay */
.footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.04' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E");
  pointer-events: none;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
}

.brand-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.logo-container {
  position: relative;
  width: 60px;
  height: 60px;
  overflow: hidden;
}

.logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.logo:hover {
  transform: scale(1.15);
}

.brand-info {
  display: flex;
  flex-direction: column;
}

.brand-name {
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 1.5rem;
  color: white;
  margin: 0;
  letter-spacing: 0.5px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.brand-tagline {
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.85);
  margin: 0.25rem 0 0;
}

.footer-divider {
  height: 1px;
  background: linear-gradient(to right,
      rgba(255, 255, 255, 0.1),
      rgba(255, 255, 255, 0.6),
      rgba(255, 255, 255, 0.1));
  margin: 1.25rem 0;
}

.footer-bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.copyright,
.rights {
  font-family: 'Poppins', sans-serif;
  font-size: 0.875rem;
  color: white;
  margin: 0;
  transition: color 0.3s ease;
}

.rights {
  font-size: 0.75rem;
  opacity: 0.85;
}

.footer-bottom:hover .copyright {
  color: #FFF;
}

/* Responsive adjustments */
@media (min-width: 768px) {
  .footer {
    padding: 3rem 0 2rem;
  }

  .brand-container {
    justify-content: flex-start;
  }

  .logo-container {
    width: 80px;
    height: 80px;
  }

  .brand-name {
    font-size: 1.75rem;
  }

  .brand-tagline {
    font-size: 1rem;
  }

  .footer-bottom {
    flex-direction: row;
    justify-content: center;
    gap: 0.75rem;
  }

  .copyright::after {
    content: '|';
    margin-left: 0.75rem;
    opacity: 0.6;
  }
}

/* Animation for logo */
@keyframes float {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-5px);
  }
}

.logo-container:hover .logo {
  animation: float 2s ease-in-out infinite;
}
</style>
