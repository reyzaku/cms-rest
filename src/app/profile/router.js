import express from 'express'
import { verifyUser } from '../../middleware/verifyUser.js'
import { editProfile, getProfile } from './controller.js'

const router = express.Router()


router.get('/profile',
	verifyUser,
	getProfile)
router.put('/profile',
	verifyUser,
	editProfile)

export default router