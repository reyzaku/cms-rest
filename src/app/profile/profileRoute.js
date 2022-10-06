import express from 'express'
import { editProfile, getProfile } from './profileController.js'

const router = express.Router()


router.get('/profile', getProfile)
router.put('/profile',editProfile)

export default router