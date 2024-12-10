import * as CloudinaryCore from 'cloudinary-core'

const cloudinaryInstance = new CloudinaryCore.Cloudinary({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  secure: true,
})

export default cloudinaryInstance
