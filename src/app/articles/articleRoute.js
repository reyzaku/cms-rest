import express from 'express'
import { createArticle, destroyArticle, getArticle, getOneArticle, updateArticle } from './articleController.js'
import multer from 'multer'
import { filterFile, storageMulter } from '../../middleware/storageMulter.js'

const router = express.Router()

router.post('/articles',
	multer({ storage: storageMulter({ folderPath: 'cover_images' }), fileFilter: filterFile }).single('cover_image'),
	createArticle)
router.get('/articles', getArticle
)
router.get('/articles/:_id', getOneArticle)
router.delete('/articles/:_id',
	destroyArticle
)
router.put('/articles/:_id',
	multer({ storage: storageMulter({ folderPath: 'cover_images' }), fileFilter: filterFile }).single('cover_image'),
	updateArticle
)

export default router