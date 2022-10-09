import express from 'express'
import adminOnly from '../../middleware/adminOnly.js'
import { verifyUser } from '../../middleware/verifyUser.js'
import { deleteUser, getAllUser } from './controller.js'


const router = express.Router()

router.get('/users',
	verifyUser,
	adminOnly,
	getAllUser)
router.delete('/users/:id',
	verifyUser,
	adminOnly,
	deleteUser)

export default router 