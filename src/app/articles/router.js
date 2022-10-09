import express from 'express'
import { verifyUser } from '../../middleware/verifyUser.js'
import { createArticle, destroyArticle, getAllArticle, getArticle, getOneArticle, updateArticle } from './controller.js'

const router = express.Router()

// Create article
router.post('/articles',
	verifyUser,
	createArticle)

// get all article public
router.get('/articles', getAllArticle)

// Get all article base on login user
router.get('/articles/:email',
	verifyUser,
	getArticle)

// get one article by id
router.get('/article/:_id', getOneArticle)

// delete one article by id
router.delete('/articles/:_id',
	verifyUser,
	destroyArticle)

// update article by id
router.put('/articles/:_id',
	verifyUser,
	updateArticle)

export default router