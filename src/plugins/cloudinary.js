import { cloudinaryConfig } from '../config/cloudinary'

export default {
  install: (app) => {
    app.config.globalProperties.$cloudinary = {
      cloudName: cloudinaryConfig.cloudName,
      uploadImage: async (file, options = {}) => {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', cloudinaryConfig.uploadPreset)

        Object.entries(options).forEach(([key, value]) => {
          formData.append(key, value)
        })

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
          {
            method: 'POST',
            body: formData,
          },
        )

        return response.json()
      },
    }
  },
}
