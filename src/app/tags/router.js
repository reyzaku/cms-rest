import express from 'express'
import adminOnly from '../../middleware/adminOnly.js'
import { verifyUser } from '../../middleware/verifyUser.js'
import { createTag, deleteTag, editTag, getTag } from './Controller.js'

const router = express.Router()

router.post('/tags',
	verifyUser,
	createTag)
router.get('/tags', getTag)
router.put('/tags/:_id',
	verifyUser,
	adminOnly,
	editTag)
router.delete('/tags/:_id',
	verifyUser,
	adminOnly,
	deleteTag)

export default router