import axios from 'axios'
import { cloudinaryConfig } from '../config/cloudinary'
import {
  addGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
  getGalleryImages,
} from '../firebase'

const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`

export const uploadImage = async (file, onProgress = () => {}) => {
  // Create form data for upload
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', cloudinaryConfig.uploadPreset)

  try {
    // Upload to Cloudinary
    const response = await axios.post(CLOUDINARY_URL, formData, {
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        onProgress(percentCompleted)
      },
    })

    return response.data.secure_url
  } catch (error) {
    console.error('Error uploading image:', error)
    throw error
  }
}

export const createGalleryItem = async (file, description, onProgress) => {
  try {
    const imageUrl = await uploadImage(file, onProgress)

    return await addGalleryImage({
      image: imageUrl,
      description,
    })
  } catch (error) {
    console.error('Error creating gallery item:', error)
    throw error
  }
}

export const getAllGalleryItems = async () => {
  return await getGalleryImages()
}

export const updateGalleryItem = async (id, file, description, onProgress) => {
  try {
    let updateData = { description }

    if (file) {
      const imageUrl = await uploadImage(file, onProgress)
      updateData.image = imageUrl
    }

    return await updateGalleryImage(id, updateData)
  } catch (error) {
    console.error('Error updating gallery item:', error)
    throw error
  }
}

export const deleteGalleryItem = async (id) => {
  try {
    return await deleteGalleryImage(id)
  } catch (error) {
    console.error('Error deleting gallery item:', error)
    throw error
  }
}
