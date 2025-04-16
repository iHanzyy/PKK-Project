<template>
  <div class="container-structure">
    <!-- Top Roles -->
    <div class="top-roles">
      <div v-for="(item, index) in topRoles" :key="index" class="card-wrapper">
        <div class="card group" data-aos="fade-up" data-aos-duration="700">
          <img :src="item.image" loading="lazy" alt="role-image" />

          <div class="role-name">
            <h1>{{ item.name }}</h1>
          </div>

          <div class="role-title">
            <h1>{{ item.role }}</h1>
          </div>
        </div>
        <!-- Vertical line for top roles -->
        <div class="vertical-line-top"></div>
      </div>
    </div>

    <!-- Horizontal connecting line -->
    <div class="horizontal-line"></div>

    <!-- Bottom Roles -->
    <div class="bottom-roles">
      <div v-for="(item, index) in bottomRoles" :key="index" class="card-wrapper">
        <!-- Vertical line for bottom roles -->
        <div class="vertical-line-bottom"></div>
        <div class="card group" data-aos="fade-up" data-aos-duration="700">
          <img :src="item.image" loading="lazy" alt="role-image" />

          <div class="role-name">
            <h1>{{ item.name }}</h1>
          </div>

          <div class="role-title">
            <h1>{{ item.role }}</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import waliKelasImg from '../assets/waliKelas.webp'
import ketuaKelasImg from '../assets/ketuaKelas.webp'
import wakilKetuaKelasImg from '../assets/wakilKetuaKelas.webp'
import sekretaris1Img from '../assets/sekretaris1.webp'
import sekretaris2Img from '../assets/sekretaris2.webp'
import bendahara1Img from '../assets/bendahara1.webp'
import bendahara2Img from '../assets/bendahara2.webp'

const topRoles = [
  { role: 'Wali Kelas', name: 'Kamiludin, S.Kom', image: waliKelasImg },
  { role: 'Ketua Kelas', name: 'Putri Retno W. K', image: ketuaKelasImg },
  { role: 'Wakil Ketua Kelas', name: 'Fathir Al Habsyi Hakim', image: wakilKetuaKelasImg },
]

const bottomRoles = [
  { role: 'Sekretaris 1', name: 'Maudy Intanisa Zahra', image: sekretaris1Img },
  { role: 'Sekretaris 2', name: 'Hadasa Ester Lika', image: sekretaris2Img },
  { role: 'Bendahara 1', name: 'Nayza Fitri Putriana', image: bendahara1Img },
  { role: 'Bendahara 2', name: 'Malika Danish Ara', image: bendahara2Img },
]

</script>

<style scoped>
.container-structure {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.top-roles {
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;
  align-items: center;
  margin-bottom: 0;
  position: relative;
}

.bottom-roles {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  width: 100%;
  justify-items: center;
  margin-top: 0;
  position: relative;
}

.card-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.card {
  position: relative;
  width: 220px;
  overflow: hidden;
  background: #ffffff;
  border-radius: 1rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.04);
  transition: all 0.35s ease;
  border: 1px solid rgba(240, 240, 240, 0.8);
}



.card img {
  width: 100%;
  height: 288px;
  object-fit: cover;
  transition: all 0.5s ease;
  filter: brightness(0.98);
}

.card:hover img {
  filter: brightness(1.05);
}

.role-name {
  position: relative;
  z-index: 20;
  padding: 1rem;
  background: white;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  border-top: 1px solid rgba(0, 0, 0, 0.03);
}

.role-title {
  position: absolute;
  left: 0;
  bottom: 15%;
  width: 100%;
  padding: 1rem 1rem 0.8rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(4px);
  transform: translateY(100%);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  z-index: 10;
  opacity: 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
}

.card:hover .role-title {
  transform: translateY(0);
  opacity: 1;
}

.vertical-line-top,
.vertical-line-bottom,
.horizontal-line {
  background: linear-gradient(90deg, rgba(245, 245, 245, 0.4), rgba(255, 255, 255, 1), rgba(245, 245, 245, 0.4));
  position: relative;
  z-index: 1;
  box-shadow: 0 0 12px 2px rgba(255, 255, 255, 0.8);
  border-radius: 6px;
}

.vertical-line-top {
  width: 2px;
  height: 40px;
  margin: 0;
}

.vertical-line-bottom {
  width: 2px;
  height: 40px;
  margin: 0;
}

.horizontal-line {
  width: 77%;
  height: 2px;
  margin: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.9), transparent);
}

.role-name h1,
.role-title h1 {
  font-weight: 600;
  text-align: center;
  color: #333;
  font-size: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 0.5rem;
  letter-spacing: 0.01em;
}

.role-title h1 {
  color: #506377;
  font-weight: 500;
  font-size: 0.95rem;
}

@media (max-width: 1200px) {
  .horizontal-line {
    width: 85vw;
  }

  .container-structure {
    padding: 1rem;
  }

  .top-roles {
    gap: 0;
  }

  .bottom-roles {
    grid-template-columns: repeat(2, 1fr);
    gap: 0;
    margin-top: 0;
  }

  .card {
    width: 180px;
  }

  .card img {
    height: 220px;
  }

  .role-name h1,
  .role-title h1 {
    font-size: 0.875rem;
    padding: 0 0.25rem;
  }

  .vertical-line-top,
  .vertical-line-bottom {
    height: 30px;
    margin: 0;
  }

  .horizontal-line {
    width: 50.6%;
  }
}

@media (max-width: 992px) {

  .vertical-line-top,
  .vertical-line-bottom {
    height: 35px;
    margin: 0;
  }
}

@media (max-width: 768px) {
  .container-structure {
    padding: 1rem;
  }

  .top-roles {
    gap: 0;
  }

  .bottom-roles {
    grid-template-columns: repeat(2, 1fr);
    gap: 0;
    margin-top: 0;
  }

  .card {
    width: 180px;
  }

  .card img {
    height: 220px;
  }

  .role-name h1,
  .role-title h1 {
    font-size: 0.875rem;
    padding: 0 0.25rem;
  }

  .vertical-line-top,
  .vertical-line-bottom {
    height: 30px;
    margin: 0;
  }

  .horizontal-line {
    width: 50.6%;
  }
}

@media (max-width: 480px) {
  .container-structure {
    padding: 1rem 0.5rem;
  }

  .top-roles {
    gap: 0;
    width: 100%;
  }

  .bottom-roles {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    gap: 0 !important;
    /* This ensures no vertical spacing between rows */
    margin-top: 0;
  }

  /* To maintain horizontal spacing only */
  .bottom-roles {
    column-gap: 1rem;
  }

  /* Ensure all vertical lines from bottom roles connect properly */
  .vertical-line-bottom {
    height: 25px;
    margin-top: -2px;
    /* Connect to horizontal line */
    margin-bottom: 0;
  }

  .card {
    width: 120px;
  }

  .card img {
    height: 180px;
  }

  .role-name,
  .role-title {
    padding: 0.5rem;
  }

  .role-name h1,
  .role-title h1 {
    font-size: 0.7rem;
  }

  .vertical-line-top,
  .vertical-line-bottom {
    height: 25px;
    margin-top: 0;
  }

  .horizontal-line {
    width: 42.6vw;
  }
}

/* Tambahan untuk mencegah text wrapping dan overflow */
.role-name,
.role-title {
  width: 100%;
  min-width: 0;
}

.card {
  min-width: 0;
  overflow: hidden;
}
</style>
