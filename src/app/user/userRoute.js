import express from 'express'
import adminOnly from '../../middleware/adminOnly.js'
import { deleteUser, getAllUser } from './userController.js'


const router = express.Router()

router.get('/users',
	adminOnly,
	getAllUser)
router.delete('/users/:id',
	adminOnly,
	deleteUser)

export default router 