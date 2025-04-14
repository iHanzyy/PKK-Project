<template>
  <div class="container-structure">
    <!-- Top Roles -->
    <div class="top-roles">
      <div v-for="(item, index) in topRoles" :key="index" class="card-wrapper">
        <div class="card group" data-aos="fade-up" data-aos-duration="700">
          <img :src="item.image" alt="role-image" />

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
          <img :src="item.image" alt="role-image" />

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
import waliKelasImg from '../assets/waliKelas.jpg'
import ketuaKelasImg from '../assets/ketuaKelas.jpg'
import wakilKetuaKelasImg from '../assets/wakilKetuaKelas.jpg'
import sekretaris1Img from '../assets/sekretaris1.jpg'
import sekretaris2Img from '../assets/sekretaris2.jpg'
import bendahara1Img from '../assets/bendahara1.jpg'
import bendahara2Img from '../assets/bendahara2.jpg'

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
  overflow: visible;
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.card img {
  width: 100%;
  height: 288px;
  object-fit: cover;
  border-top-left-radius: 0.75rem;
  border-top-right-radius: 0.75rem;
}

.role-name {
  position: relative;
  z-index: 20;
  padding: 1rem;
  background: white;
  border-bottom-left-radius: 0.75rem;
  border-bottom-right-radius: 0.75rem;
}

.role-title {
  position: absolute;
  left: 0;
  bottom: 3.4rem;
  width: 100%;
  padding: 1rem 1rem 0.5rem;
  background: white;
  transform: translateY(100%);
  transition:
    transform 0.3s ease,
    opacity 0.2s ease;
  z-index: 10;
  opacity: 0;
}

.card:hover .role-title {
  transform: translateY(0);
  opacity: 1;
}

.vertical-line-top,
.vertical-line-bottom,
.horizontal-line {
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.7));
  position: relative;
  z-index: 1;
  box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.7);
  border-radius: 4px;
}

.vertical-line-top {
  width: 4px;
  height: 40px;
  margin: 0;
}

.vertical-line-bottom {
  width: 4px;
  height: 40px;
  margin: 0;
}

.horizontal-line {
  width: 77%;
  height: 4px;
  margin: 0;
}

.role-name h1,
.role-title h1 {
  font-weight: bold;
  text-align: center;
  color: black;
  font-size: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 0.5rem;
}

@media (max-width: 1200px) {
  .horizontal-line {
    width: 85%;
  }
}

@media (max-width: 992px) {
  .horizontal-line {
    width: 80%;
  }

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
    gap: 0.75rem;
  }

  .bottom-roles {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
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
    width: 85%;
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
    row-gap: 0; /* This ensures no vertical spacing between rows */
    margin-top: 0;
  }

  /* To maintain horizontal spacing only */
  .bottom-roles {
    column-gap: 1rem; 
  }

  /* Ensure all vertical lines from bottom roles connect properly */
  .vertical-line-bottom {
    height: 25px;
    margin-top: -2px; /* Connect to horizontal line */
    margin-bottom: 0;
  }

  .card {
    width: 150px;
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
    width: 55%;
    height: 4px;
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
