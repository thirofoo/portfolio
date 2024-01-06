import * as CloudinaryCore from 'cloudinary-core'

const cloudinaryInstance = new CloudinaryCore.Cloudinary({
  cloud_name: 'dq8pi3jes', // Cloudinaryアカウントの名前
  secure: true, // httpsで配信するオプション
})

export default cloudinaryInstance
