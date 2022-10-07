import express from 'express'
import { createArticle, destroyArticle, getAllArticle, getArticle, getOneArticle, updateArticle } from './articleController.js'

const router = express.Router()

// Create article
router.post('/articles', createArticle )

// get all article public
router.get('/articles', getAllArticle)

// Get all article base on login user
router.get('/articles/:email', getArticle)

// get one article by id
router.get('/article/:_id', getOneArticle)

// delete one article by id
router.delete('/articles/:_id', destroyArticle)

// update article by id
router.put('/articles/:_id', updateArticle)

export default router