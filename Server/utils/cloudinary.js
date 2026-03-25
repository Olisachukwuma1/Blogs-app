const cloudinary = require('cloudinary').v2
const {CloudinaryStorage} = require('multer-storage-cloudinary')
require("dotenv").config()


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,//address
    params: {
        format: async (req, file) => { 
        const filetype = file.mimetype.split("/")[1];
        return ["jpeg","png", "jpg"].includes(filetype) ? filetype : "png"
        },
        public_id:(req, file) =>
            `${Date.now()}-${file.originalname.split(".")[0]}`,
    },
})

module.exports = {
    cloudinary,
    storage
}