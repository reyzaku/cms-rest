import express from 'express'
import { editProfile, getProfile } from './profileController.js'
import multer from 'multer'
import { filterFile, storageMulter,  } from '../../middleware/storageMulter.js'

const router = express.Router()


router.get('/profile', getProfile)
router.put('/profile',
	multer({
		storage: storageMulter({ folderPath: 'profile_images' }), fileFilter: filterFile }).single('profile_image'),
	editProfile)

export default router