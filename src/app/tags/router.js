import express from 'express'
import adminOnly from '../../middleware/adminOnly.js'
import { createTag, deleteTag, editTag, getTag } from './Controller.js'

const router = express.Router()

router.post('/tags', createTag)
router.get('/tags', getTag)
router.put('/tags/:_id',
	adminOnly,
	editTag)
router.delete('/tags/:_id',
	adminOnly,
	deleteTag)

export default router