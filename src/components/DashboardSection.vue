<template>
  <div class="admin-dashboard">
    <!-- Refined Login Form -->
    <div v-if="!user" class="login-container">
      <div class="login-box">
        <div class="login-header">
          <div class="logo-container">
            <div class="logo-animation"></div>
          </div>
          <h2 class="text-3xl font-bold text-slate-800">Admin Portal</h2>
          <p class="text-slate-600">Sign in to manage your gallery</p>
        </div>

        <form @submit.prevent="login" class="login-form">
          <div class="form-group">
            <label class="form-label">Email</label>
            <div class="input-container">
              <svg xmlns="http://www.w3.org/2000/svg" class="input-icon" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <input v-model="email" type="email" class="form-input" placeholder="admin@example.com" required />
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Password</label>
            <div class="input-container">
              <svg xmlns="http://www.w3.org/2000/svg" class="input-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clip-rule="evenodd" />
              </svg>
              <input v-model="password" type="password" class="form-input" placeholder="••••••••" required />
            </div>
          </div>

          <button type="submit" class="login-button" :class="{ 'loading': isLoading }" :disabled="isLoading">
            <span v-if="!isLoading">Login</span>
            <span v-else class="spinner"></span>
          </button>
        </form>

        <transition name="fade">
          <p v-if="error" class="error-message">{{ error }}</p>
        </transition>
      </div>
    </div>

    <!-- Simplified Admin Dashboard -->
    <div v-else class="dashboard-container">
      <!-- Header with improved layout -->
      <div class="dashboard-header">
        <div class="header-left">
          <h2 class="text-2xl font-bold text-slate-800">Gallery Dashboard</h2>
          <div class="flex items-center">
            <span class="status-indicator"></span>
            <span class="text-sm text-emerald-700">Active Session</span>
          </div>
        </div>

        <div class="header-right">
          <div class="user-info">
            <span class="text-sm text-slate-600">{{ user?.email }}</span>
            <span class="text-xs text-slate-500">Admin</span>
          </div>
          <button @click="logout" class="logout-button">
            <span>Logout</span>
          </button>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon gallery-icon">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div class="stat-content">
            <h3 class="stat-title">Gallery Images</h3>
            <p class="stat-value">{{ galleryItems.length }} Photos</p>
            <div class="stat-badge" v-if="galleryItems.length > 0">
              <span v-if="lastUpdated" class="text-xs text-slate-500">
                Updated {{ lastUpdated }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Gallery Management Section -->
      <div class="content-box">
        <div class="content-header">
          <h3 class="text-xl font-semibold text-slate-800">Gallery Management</h3>
          <button class="action-button" @click="openAddModal">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clip-rule="evenodd" />
            </svg>
            Add Photo
          </button>
        </div>

        <div v-if="isGalleryLoading" class="flex items-center justify-center p-10">
          <div class="loading-animation"></div>
        </div>

        <div v-else-if="galleryItems.length === 0" class="p-10 text-center text-slate-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 mx-auto mb-4 opacity-50" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p class="text-lg">No images have been uploaded yet</p>
          <p class="mt-2">Click "Add Photo" to upload your first image</p>
        </div>

        <div v-else class="gallery-grid">
          <div class="gallery-item" v-for="item in galleryItems" :key="item.id">
            <div class="gallery-image">
              <img :src="item.image" :alt="item.description" class="object-cover w-full h-full">
            </div>
            <div class="gallery-controls">
              <div class="truncate gallery-description">{{ item.description }}</div>
              <div class="flex space-x-2">
                <button class="gallery-button edit" @click="openEditModal(item)">Edit</button>
                <button class="gallery-button delete" @click="confirmDelete(item)">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Add/Edit Modal -->
      <div v-if="showGalleryModal" class="fixed inset-0 z-50 overflow-y-auto">
        <div class="flex items-center justify-center min-h-screen px-4">
          <div class="fixed inset-0 bg-black opacity-50" @click="closeGalleryModal"></div>
          <div class="z-10 w-full max-w-md mx-auto bg-white rounded-lg shadow-xl">
            <div class="px-6 py-4 border-b">
              <h3 class="text-xl font-semibold">{{ editingItem ? 'Edit' : 'Add' }} Gallery Item</h3>
            </div>
            <form @submit.prevent="saveGalleryItem" class="p-6 space-y-4">
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700">Image</label>
                <input type="file" @change="handleImageChange" accept="image/*" class="w-full p-2 border rounded"
                  :required="!editingItem">
                <div v-if="imagePreview || (editingItem && editingItem.image)" class="mt-2">
                  <img :src="imagePreview || editingItem?.image" class="object-cover w-full h-40 rounded" alt="Preview">
                </div>
              </div>
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700">Description</label>
                <input type="text" v-model="galleryDescription" placeholder="Enter image description"
                  class="w-full p-2 text-black border rounded" required>
              </div>
              <div v-if="isSubmitting && uploadProgress > 0" class="mt-2">
                <div class="relative pt-1">
                  <div class="flex items-center justify-between">
                    <div>
                      <span class="inline-block text-xs font-semibold text-indigo-600">
                        Uploading...
                      </span>
                    </div>
                    <div class="text-right">
                      <span class="inline-block text-xs font-semibold text-indigo-600">
                        {{ uploadProgress }}%
                      </span>
                    </div>
                  </div>
                  <div class="flex h-2 mb-4 overflow-hidden text-xs bg-indigo-200 rounded">
                    <div :style="{ width: uploadProgress + '%' }"
                      class="flex flex-col justify-center text-center text-white transition-all duration-300 bg-indigo-500 shadow-none whitespace-nowrap">
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex justify-end pt-4 space-x-3">
                <button type="button" @click="closeGalleryModal"
                  class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                  Cancel
                </button>
                <button type="submit"
                  class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                  :disabled="isSubmitting">
                  <span v-if="isSubmitting" class="spinner-sm"></span>
                  <span v-else>{{ editingItem ? 'Update' : 'Add' }}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Delete Confirmation Modal -->
      <div v-if="showDeleteModal" class="fixed inset-0 z-50 overflow-y-auto">
        <div class="flex items-center justify-center min-h-screen px-4">
          <div class="fixed inset-0 bg-black opacity-50" @click="closeDeleteModal"></div>
          <div class="z-10 w-full max-w-md mx-auto bg-white rounded-lg shadow-xl">
            <div class="px-6 py-4 border-b">
              <h3 class="text-xl font-semibold text-red-600">Delete Confirmation</h3>
            </div>
            <div class="p-6 text-black">
              <p>Are you sure you want to delete this image? This action cannot be undone.</p>
              <div class="flex justify-end mt-6 space-x-3">
                <button @click="closeDeleteModal"
                  class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                  Cancel
                </button>
                <button @click="deleteItem"
                  class="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                  :disabled="isDeleting">
                  <span v-if="isDeleting" class="spinner-sm"></span>
                  <span v-else>Delete</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading overlay -->
    <transition name="fade">
      <div v-if="isLoading" class="loading-overlay">
        <div class="loading-animation"></div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { auth } from '../firebase'
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, setPersistence, browserSessionPersistence } from 'firebase/auth'
import { getAllGalleryItems, createGalleryItem, updateGalleryItem, deleteGalleryItem } from '../services/galleryService'

const email = ref('')
const password = ref('')
const error = ref('')
const user = ref(null)
const isLoading = ref(false)
const isGalleryLoading = ref(false)
const galleryItems = ref([])
const showGalleryModal = ref(false)
const showDeleteModal = ref(false)
const editingItem = ref(null)
const itemToDelete = ref(null)
const galleryDescription = ref('')
const selectedImage = ref(null)
const imagePreview = ref(null)
const isSubmitting = ref(false)
const isDeleting = ref(false)
const uploadProgress = ref(0)
const lastUpdated = ref(null)

const login = async () => {
  error.value = ''
  isLoading.value = true
  try {
    await setPersistence(auth, browserSessionPersistence);
    const res = await signInWithEmailAndPassword(auth, email.value, password.value)
    user.value = res.user
  } catch (err) {
    // More user-friendly error messages
    if (err.code === 'auth/user-not-found') {
      error.value = 'Email not found. Please check your email address.'
    } else if (err.code === 'auth/wrong-password') {
      error.value = 'Incorrect password. Please try again.'
    } else if (err.code === 'auth/too-many-requests') {
      error.value = 'Too many login attempts. Please try again later.'
    } else {
      error.value = 'Login failed. Please try again.'
    }
    console.error(err.code, err.message)
  } finally {
    isLoading.value = false
  }
}

const logout = async () => {
  isLoading.value = true
  await signOut(auth)
  user.value = null
  isLoading.value = false
}

const fetchGalleryItems = async () => {
  isGalleryLoading.value = true
  try {
    galleryItems.value = await getAllGalleryItems()
    lastUpdated.value = new Date().toLocaleString()
  } catch (error) {
    console.error('Error fetching gallery items:', error)
  } finally {
    isGalleryLoading.value = false
  }
}

const openAddModal = () => {
  editingItem.value = null
  galleryDescription.value = ''
  selectedImage.value = null
  imagePreview.value = null
  showGalleryModal.value = true
}

const openEditModal = (item) => {
  editingItem.value = item
  galleryDescription.value = item.description
  imagePreview.value = null
  selectedImage.value = null
  showGalleryModal.value = true
}

const closeGalleryModal = () => {
  showGalleryModal.value = false
}

const handleImageChange = (e) => {
  const file = e.target.files[0]
  if (file) {
    selectedImage.value = file

    // Create a preview
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreview.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const saveGalleryItem = async () => {
  isSubmitting.value = true
  uploadProgress.value = 0

  try {
    if (editingItem.value) {
      await updateGalleryItem(
        editingItem.value.id,
        selectedImage.value,
        galleryDescription.value,
        (progress) => { uploadProgress.value = progress }
      )
    } else {
      await createGalleryItem(
        selectedImage.value,
        galleryDescription.value,
        (progress) => { uploadProgress.value = progress }
      )
    }

    await fetchGalleryItems()
    closeGalleryModal()
  } catch (error) {
    console.error('Error saving gallery item:', error)
  } finally {
    isSubmitting.value = false
  }
}

const confirmDelete = (item) => {
  itemToDelete.value = item
  showDeleteModal.value = true
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  itemToDelete.value = null
}

const deleteItem = async () => {
  if (!itemToDelete.value) return

  isDeleting.value = true
  try {
    await deleteGalleryItem(itemToDelete.value.id)
    galleryItems.value = galleryItems.value.filter(item => item.id !== itemToDelete.value.id)
    closeDeleteModal()
  } catch (error) {
    console.error('Error deleting item:', error)
  } finally {
    isDeleting.value = false
  }
}

onMounted(() => {
  isLoading.value = true
  onAuthStateChanged(auth, (currentUser) => {
    user.value = currentUser
    isLoading.value = false

    // Fetch gallery items when user is authenticated
    if (currentUser) {
      fetchGalleryItems()
    }
  })
})
</script>

<style scoped>
/* Base Styles */
.admin-dashboard {
  @apply min-h-screen bg-slate-50 font-sans;
}

/* Login Form Styles */
.login-container {
  @apply min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 to-slate-100;
}

.login-box {
  @apply w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl;
}

.login-header {
  @apply p-8 pb-2 text-center;
}

.logo-container {
  @apply mx-auto mb-6 w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center;
}

.logo-animation {
  @apply w-10 h-10 bg-indigo-500 rounded-md animate-pulse;
}

.login-form {
  @apply p-8 space-y-5;
}

.form-group {
  @apply space-y-1;
}

.form-label {
  @apply text-sm font-medium text-slate-700 ml-1;
}

.input-container {
  @apply relative;
}

.input-icon {
  @apply absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400;
}

.form-input {
  @apply w-full px-10 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent focus:bg-white placeholder-slate-400;
}

.login-button {
  @apply w-full py-3 px-4 bg-indigo-500 text-white rounded-lg font-medium transition-all duration-200 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center;
}

.error-message {
  @apply mt-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100;
}

/* Dashboard Container */
.dashboard-container {
  @apply max-w-7xl mx-auto p-4 space-y-6 pt-6;
}

/* Header Styles */
.dashboard-header {
  @apply flex flex-col sm:flex-row justify-between items-start sm:items-center p-5 bg-white rounded-xl shadow-sm mb-6;
}

.header-left {
  @apply flex flex-col mb-4 sm:mb-0;
}

.header-right {
  @apply flex items-center space-x-4;
}

.status-indicator {
  @apply w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse;
}

.user-info {
  @apply flex flex-col items-end mr-3;
}

.logout-button {
  @apply px-4 py-2 bg-white border border-red-200 text-red-600 rounded-lg flex items-center hover:bg-red-50 transition-colors duration-200;
}

/* Stats Grid */
.stats-grid {
  @apply grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-5;
}

.stat-card {
  @apply bg-white rounded-lg shadow-md p-4 flex items-center space-x-4;
}

.stat-icon {
  @apply flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-full;
}

.gallery-icon {
  @apply text-indigo-500;
}

.stat-content {
  @apply flex-1;
}

.stat-title {
  @apply text-sm font-medium text-slate-700;
}

.stat-value {
  @apply text-lg font-bold text-slate-800;
}

.stat-badge {
  @apply mt-1;
}

/* Content box */
.content-box {
  @apply bg-white rounded-xl shadow-sm overflow-hidden;
}

.content-header {
  @apply flex justify-between items-center p-5 border-b border-slate-100;
}

.action-button {
  @apply px-4 py-2 bg-indigo-500 text-white rounded-lg flex items-center text-sm font-medium hover:bg-indigo-600 transition-colors duration-200;
}

/* Gallery Grid */
.gallery-grid {
  @apply grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-5;
}

.gallery-item {
  @apply bg-slate-50 rounded-lg overflow-hidden relative transition-all hover:shadow-md;
}

.gallery-image {
  @apply h-40 bg-slate-200 overflow-hidden;
}

.gallery-controls {
  @apply p-3 flex justify-between;
}

.gallery-button {
  @apply px-3 py-1 rounded text-xs font-medium;
}

.gallery-button.edit {
  @apply bg-slate-100 text-slate-600 hover:bg-slate-200;
}

.gallery-button.delete {
  @apply bg-red-50 text-red-600 hover:bg-red-100;
}

.gallery-description {
  @apply text-xs text-slate-700;
}

/* Loading */
.loading-overlay {
  @apply fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50;
}

.loading-animation {
  @apply w-16 h-16 border-4 border-indigo-100 border-t-indigo-500 rounded-full animate-spin;
}

.spinner {
  @apply w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin;
}

.spinner-sm {
  @apply w-4 h-4 border-2 border-white border-t-transparent rounded-full inline-block animate-spin;
}

/* Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@media (max-width: 640px) {
  .content-header {
    @apply flex-col items-start space-y-3;
  }

  .action-button {
    @apply w-full justify-center;
  }
}
</style>
