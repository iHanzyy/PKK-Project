<template>
  <div class="admin-dashboard">
    <!-- Login Form - Improved accessibility and mobile experience -->
    <div v-if="!user" class="login-container">
      <div class="login-box" role="region" aria-label="Admin login">
        <div class="login-header">
          <div class="logo-container" aria-hidden="true">
            <img src="/jacicon.svg" alt="" class="w-12 h-12" />
          </div>
          <h1 class="mb-2 text-2xl font-bold sm:text-3xl text-slate-800">Admin Portal</h1>
          <p class="text-slate-600">Sign in to manage your gallery</p>
        </div>

        <form @submit.prevent="login" class="login-form" aria-label="Login form">
          <div class="form-group">
            <label for="email-input" class="form-label">Email</label>
            <div class="input-container">
              <svg xmlns="http://www.w3.org/2000/svg" class="input-icon" viewBox="0 0 20 20" fill="currentColor"
                aria-hidden="true">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <input v-model="email" id="email-input" type="email" class="form-input" placeholder="admin@example.com"
                required aria-describedby="email-error" />
            </div>
          </div>

          <div class="form-group">
            <label for="password-input" class="form-label">Password</label>
            <div class="input-container">
              <svg xmlns="http://www.w3.org/2000/svg" class="input-icon" viewBox="0 0 20 20" fill="currentColor"
                aria-hidden="true">
                <path fill-rule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2-2zm8-2v2H7V7a3 3 0 016 0z"
                  clip-rule="evenodd" />
              </svg>
              <input v-model="password" id="password-input" type="password" class="form-input" placeholder="••••••••"
                required aria-describedby="password-error" />
            </div>
          </div>

          <button type="submit" class="login-button" :class="{ 'loading': isLoading }" :disabled="isLoading"
            aria-busy="isLoading">
            <span v-if="!isLoading">Login</span>
            <span v-else class="spinner" aria-hidden="true"></span>
            <span v-if="isLoading" class="sr-only">Logging in...</span>
          </button>
        </form>

        <transition name="fade">
          <p v-if="error" id="login-error" class="error-message" role="alert">{{ error }}</p>
        </transition>
      </div>
    </div>

    <!-- Dashboard Section - Mobile-first responsive approach -->
    <div v-else class="dashboard-container">
      <!-- Improved header for all screen sizes -->
      <header class="dashboard-header">
        <div class="header-left">
          <h1 class="text-xl font-bold sm:text-2xl text-slate-800">Gallery Dashboard</h1>
          <div class="flex items-center mt-1">
            <span class="status-indicator" aria-hidden="true"></span>
            <span class="text-sm text-emerald-700">Active Session</span>
          </div>
        </div>

        <div class="w-full mt-4 header-right sm:mt-0 sm:w-auto">
          <div class="user-info">
            <span class="text-sm text-slate-600">{{ user?.email }}</span>
            <span class="text-xs text-slate-500">Admin</span>
          </div>
          <button @click="logout" class="mt-2 logout-button sm:mt-0" aria-label="Logout from admin dashboard">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </header>

      <!-- Stats Section - Improved grid -->
      <section aria-labelledby="stats-heading" class="stats-section">
        <h2 id="stats-heading" class="sr-only">Gallery Statistics</h2>
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon gallery-icon" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24"
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
      </section>

      <!-- Gallery Management Section - Enhanced for accessibility -->
      <section aria-labelledby="gallery-heading" class="content-box">
        <div class="content-header">
          <h2 id="gallery-heading" class="text-lg font-semibold sm:text-xl text-slate-800">Gallery Management</h2>
          <button class="action-button" @click="openAddModal" aria-label="Add new photo to gallery">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-1" viewBox="0 0 20 20" fill="currentColor"
              aria-hidden="true">
              <path fill-rule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clip-rule="evenodd" />
            </svg>
            Add Photo
          </button>
        </div>

        <!-- Loading state -->
        <div v-if="isGalleryLoading" class="flex items-center justify-center p-10" aria-live="polite">
          <div class="loading-animation" role="status">
            <span class="sr-only">Loading gallery images...</span>
          </div>
        </div>

        <!-- Empty state -->
        <div v-else-if="galleryItems.length === 0" class="p-10 text-center text-slate-500" aria-live="polite">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 mx-auto mb-4 opacity-50" fill="none"
            viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p class="text-lg">No images have been uploaded yet</p>
          <p class="mt-2">Click "Add Photo" to upload your first image</p>
        </div>

        <!-- Gallery grid with unified responsive design -->
        <div v-else class="gallery-grid" aria-live="polite">
          <div class="gallery-item" v-for="item in galleryItems" :key="item.id">
            <!-- Responsive image - adapts to both mobile and desktop -->
            <div class="gallery-image-container">
              <img :src="item.image" :alt="item.description" class="gallery-img" loading="lazy">
            </div>

            <!-- Responsive controls - adapts to both mobile and desktop -->
            <div class="gallery-controls">
              <div class="gallery-description-container">
                <p class="truncate gallery-description">{{ item.description }}</p>
              </div>
              <div class="gallery-buttons">
                <button class="gallery-button edit" @click="openEditModal(item)" aria-label="Edit this gallery item">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </button>
                <button class="gallery-button delete" @click="confirmDelete(item)"
                  aria-label="Delete this gallery item">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Add/Edit Modal with improved accessibility -->
      <div v-if="showGalleryModal" class="fixed inset-0 z-50 overflow-y-auto" role="dialog"
        aria-labelledby="gallery-modal-title" aria-modal="true">
        <div class="flex items-center justify-center min-h-screen px-4">
          <div class="fixed inset-0 bg-black opacity-50" @click="closeGalleryModal"></div>
          <div class="z-10 w-full max-w-md mx-auto bg-white rounded-lg shadow-xl">
            <div class="px-6 py-4 border-b">
              <h2 id="gallery-modal-title" class="text-xl font-semibold text-black">
                {{ editingItem ? 'Edit' : 'Add' }} Gallery Item
              </h2>
            </div>
            <form @submit.prevent="saveGalleryItem" class="p-6 space-y-4">
              <div class="space-y-2">
                <label for="gallery-image" class="block text-sm font-medium text-gray-900">Image</label>
                <input id="gallery-image" type="file" @change="handleImageChange" accept="image/*"
                  class="w-full p-2 border rounded min-h-[48px] text-gray-500" :required="!editingItem">
                <div v-if="imagePreview || (editingItem && editingItem.image)" class="mt-2">
                  <img :src="imagePreview || editingItem?.image" class="object-cover w-full h-40 rounded" alt="Preview">
                </div>
              </div>
              <div class="space-y-2">
                <label for="gallery-description" class="block text-sm font-medium text-gray-700">Description</label>
                <input id="gallery-description" type="text" v-model="galleryDescription"
                  placeholder="Enter image description" class="w-full p-2 text-black border rounded min-h-[48px]"
                  required>
              </div>

              <!-- Upload progress indicator with ARIA support -->
              <div v-if="isSubmitting && uploadProgress > 0" class="mt-2" role="progressbar"
                :aria-valuenow="uploadProgress" aria-valuemin="0" aria-valuemax="100">
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

              <div class="flex flex-col justify-end pt-4 space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
                <button type="button" @click="closeGalleryModal"
                  class="px-4 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 min-h-[48px] w-full sm:w-auto">
                  Cancel
                </button>
                <button type="submit"
                  class="px-4 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 min-h-[48px] w-full sm:w-auto"
                  :disabled="isSubmitting" aria-busy="isSubmitting">
                  <span v-if="isSubmitting" class="spinner-sm" aria-hidden="true"></span>
                  <span v-else>{{ editingItem ? 'Update' : 'Add' }}</span>
                  <span v-if="isSubmitting" class="sr-only">Uploading...</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Delete Confirmation Modal with improved accessibility -->
      <div v-if="showDeleteModal" class="fixed inset-0 z-50 overflow-y-auto" role="alertdialog"
        aria-labelledby="delete-modal-title" aria-describedby="delete-modal-description" aria-modal="true">
        <div class="flex items-center justify-center min-h-screen px-4">
          <div class="fixed inset-0 bg-black opacity-50" @click="closeDeleteModal"></div>
          <div class="z-10 w-full max-w-md mx-auto bg-white rounded-lg shadow-xl">
            <div class="px-6 py-4 border-b">
              <h2 id="delete-modal-title" class="text-xl font-semibold text-red-600">Delete Confirmation</h2>
            </div>
            <div class="p-6 text-black">
              <p id="delete-modal-description">Are you sure you want to delete this image? This action cannot be undone.
              </p>
              <div class="flex flex-col justify-end mt-6 space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
                <button @click="closeDeleteModal"
                  class="px-4 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 min-h-[48px] w-full sm:w-auto">
                  Cancel
                </button>
                <button @click="deleteItem"
                  class="px-4 py-3 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 min-h-[48px] w-full sm:w-auto"
                  :disabled="isDeleting" aria-busy="isDeleting">
                  <span v-if="isDeleting" class="spinner-sm" aria-hidden="true"></span>
                  <span v-else>Delete</span>
                  <span v-if="isDeleting" class="sr-only">Deleting...</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading overlay with proper accessibility -->
    <transition name="fade">
      <div v-if="isLoading" class="loading-overlay" role="status" aria-live="polite">
        <div class="loading-animation">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { auth } from '../firebase'
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, setPersistence, browserSessionPersistence } from 'firebase/auth'
import { getAllGalleryItems, createGalleryItem, updateGalleryItem, deleteGalleryItem } from '../services/galleryService'

// State management
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
const focusableModalElement = ref(null)

// Authentication functions
const login = async () => {
  error.value = ''
  isLoading.value = true
  try {
    await setPersistence(auth, browserSessionPersistence);
    const res = await signInWithEmailAndPassword(auth, email.value, password.value)
    user.value = res.user
  } catch (err) {
    // Improved user-friendly error messages
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

// Gallery management functions
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

// Modal management functions with improved focus handling
const openAddModal = () => {
  editingItem.value = null
  galleryDescription.value = ''
  selectedImage.value = null
  imagePreview.value = null
  showGalleryModal.value = true

  // Set focus to the first input after modal is shown
  nextTick(() => {
    const fileInput = document.getElementById('gallery-image')
    if (fileInput) fileInput.focus()
  })
}

const openEditModal = (item) => {
  editingItem.value = item
  galleryDescription.value = item.description
  imagePreview.value = null
  selectedImage.value = null
  showGalleryModal.value = true

  // Set focus to the description input for edit mode
  nextTick(() => {
    const descInput = document.getElementById('gallery-description')
    if (descInput) descInput.focus()
  })
}

const closeGalleryModal = () => {
  showGalleryModal.value = false
}

// Image handling
const handleImageChange = (e) => {
  const file = e.target.files[0]
  if (file) {
    selectedImage.value = file

    // Create a preview with safer type checking
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          imagePreview.value = e.target.result
        }
      }
      reader.readAsDataURL(file)
    }
  }
}

// CRUD operations
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

  // Set focus to the cancel button
  nextTick(() => {
    const cancelBtn = document.querySelector('[aria-describedby="delete-modal-description"] button:first-child')
    if (cancelBtn) cancelBtn.focus()
  })
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

// Lifecycle hook
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
/* Base Styles - Mobile first approach */
.admin-dashboard {
  @apply min-h-screen bg-slate-50 font-sans;
}

/* Login Form Styles - Enhanced for touch */
.login-container {
  @apply min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 to-slate-100;
}

.login-box {
  @apply w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300;
}

.login-header {
  @apply p-6 md:p-8 pb-2 text-center;
}

.logo-container {
  @apply mx-auto mb-4 md:mb-6 w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center;
}

.login-form {
  @apply p-6 md:p-8 space-y-5;
}

.form-group {
  @apply space-y-2;
}

.form-label {
  @apply text-sm font-medium text-slate-700 ml-1 block;
}

.input-container {
  @apply relative;
}

.input-icon {
  @apply absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400;
}

.form-input {
  @apply w-full px-10 py-3 min-h-[48px] bg-slate-50 border border-slate-200 rounded-lg text-slate-800 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent focus:bg-white placeholder-slate-400;
}

.login-button {
  @apply w-full py-3 px-4 min-h-[48px] bg-indigo-500 text-white rounded-lg font-medium transition-all duration-200 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center;
}

.error-message {
  @apply mt-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100;
}

/* Dashboard Container - Improved spacing */
.dashboard-container {
  @apply max-w-7xl mx-auto p-4 space-y-6 pt-6;
}

/* Header Styles - More touch friendly */
.dashboard-header {
  @apply flex flex-col sm:flex-row justify-between items-start sm:items-center p-5 bg-white rounded-xl shadow-sm mb-6 gap-4;
}

.header-left {
  @apply flex flex-col;
}

.header-right {
  @apply flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4;
}

.status-indicator {
  @apply w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse;
}

.user-info {
  @apply flex flex-col items-start sm:items-end w-full sm:w-auto sm:mr-3;
}

.logout-button {
  @apply px-4 py-2 min-h-[48px] bg-white border border-red-200 text-red-600 rounded-lg flex items-center justify-center hover:bg-red-50 transition-colors duration-200 w-full sm:w-auto;
}

/* Stats Section - Better responsiveness */
.stats-section {
  @apply mb-6;
}

.stats-grid {
  @apply grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-3 md:p-5;
}

.stat-card {
  @apply bg-white rounded-lg shadow-md p-4 md:p-5 flex items-center space-x-4;
}

.stat-icon {
  @apply flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-indigo-100 rounded-full;
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
  @apply text-lg md:text-xl font-bold text-slate-800;
}

.stat-badge {
  @apply mt-1;
}

/* Content box - Enhanced for touchscreens */
.content-box {
  @apply bg-white rounded-xl shadow-sm overflow-hidden;
}

.content-header {
  @apply flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 md:p-5 border-b border-slate-100 gap-3;
}

.action-button {
  @apply px-4 py-3 min-h-[48px] bg-indigo-500 text-white rounded-lg flex items-center text-sm font-medium hover:bg-indigo-600 transition-colors duration-200 w-full sm:w-auto justify-center sm:justify-start;
}

/* Gallery Grid - Fully responsive for all devices */
.gallery-grid {
  @apply grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-3 md:p-5;
}

.gallery-item {
  @apply bg-slate-50 rounded-lg overflow-hidden transition-all hover:shadow-md flex flex-row sm:flex-col;
  /* Horizontal on mobile, vertical on desktop */
}

.gallery-image-container {
  @apply w-1/3 h-24 sm:w-full sm:h-40 bg-slate-200 overflow-hidden;
  /* 1/3 width on mobile, full width on desktop */
}

.gallery-img {
  @apply object-cover w-full h-full;
}

.gallery-controls {
  @apply flex flex-col justify-between w-2/3 sm:w-full p-3 md:p-4;
  /* 2/3 width on mobile, full width on desktop */
}

.gallery-description-container {
  @apply min-h-[24px] flex items-center mb-2;
}

.gallery-description {
  @apply text-xs md:text-sm text-slate-700;
}

.gallery-buttons {
  @apply flex space-x-2;
}

.gallery-button {
  @apply px-3 py-2 min-h-[40px] rounded text-xs font-medium flex items-center justify-center flex-1;
}

.gallery-button.edit {
  @apply bg-slate-100 text-slate-600 hover:bg-slate-200;
}

.gallery-button.delete {
  @apply bg-red-50 text-red-600 hover:bg-red-100;
}

/* Loading - Accessible animations */
.loading-overlay {
  @apply fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50;
}

.loading-animation {
  @apply w-12 h-12 md:w-16 md:h-16 border-4 border-indigo-100 border-t-indigo-500 rounded-full animate-spin;
}

.spinner {
  @apply w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin;
}

.spinner-sm {
  @apply w-4 h-4 border-2 border-white border-t-transparent rounded-full inline-block animate-spin mr-2;
}

/* Accessibility helper */
.sr-only {
  @apply absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0;
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

/* Responsive adjustments */
@media (max-width: 640px) {
  .gallery-controls {
    @apply flex-col;
  }

  .gallery-button {
    @apply w-full;
  }

  .gallery-item {
    @apply w-full;
  }
}
</style>
