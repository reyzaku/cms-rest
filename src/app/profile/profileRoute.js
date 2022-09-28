import express from 'express'
import { editProfile, getProfile } from './profileController.js'
import multer from 'multer'
import { fileURLToPath } from 'url'
import path from 'path'
const __filename = fileURLToPath(import.meta.url)

const diskStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__filename, '../../../../public/images/profile_images'))
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
	}
})

const router = express.Router()

router.get('/profile', getProfile)
router.put('/profile',
	multer({ storage: diskStorage }).single('profile_image'),
	editProfile)

export default router