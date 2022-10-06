import Tag from "../tags/Tag.js";
import Article from "./articleModel.js";
import fs from 'fs'

// Create a new Article
export const createArticle = async (req, res, next) => {
	try {
		let payload = req.body

		// Edit payload user 
		payload = { ...payload, user: req.user._id }

		// Edit payload tags and create tag if not available
		if (payload.tags && payload.tags.length > 0) {
			let tags = await Tag.find({ name: payload.tags })
			if (tags.length < 1) {
				payload.tags.map(async (tag) => {
					await Tag.create({ name: tag })
				})
			} else {
				payload.tags.map(item => {
					tags.map((tag) => {
						if (tag.name !== item) {
							Tag.create({ name: item })
						}
					})
				})
			}
		}

		let tags = await Tag.find({ name: payload.tags });
		payload = { ...payload, tags: tags.map(tag => tag._id) }


		setTimeout(async () => {
			await Article.create(payload)
				.then(async (article) => {
					await Tag.updateMany({ _id: { $in: payload.tags } }, { $push: { article: article._id } });
					return res.status(200).json({
						message: "Success Create Article",
						data: article
					})
				}).catch(err => {
					if (err && err.name === 'ValidationError') {
						return res.json({
							error: 1,
							message: err.message,
							fields: err.errors
						})
					}
				})
		},)
	} catch (err) {
		next(err)
	}
}

// Get all article public
export const getAllArticle = async (req, res, next) => {
	try {
		// Set query search article
		let { skip = 0, limit = 10, q = '', tags = '' } = req.query
		let criteria = {}
		let countArticle = await Article.find().countDocuments()

		if(skip.length){ 
			criteria = {...criteria, skip}
		}

		if (q.length) {
			criteria = { ...criteria, title: { $regex: `${q}`, $options: 'i' } }
			countArticle = await Article.find({ title: criteria.title }).countDocuments()
		}

		if (tags.length) {
			tags = await Tag.find({ name: { $in: tags } })
			criteria = { ...criteria, tags: { $in: tags.map(tag => tag.id) } }
			countArticle = await Article.find({ tags: criteria.tags }).countDocuments()
		}


		const article = await Article.find(criteria).limit(parseInt(limit)).skip(parseInt(skip)).populate('tags', ["id", "name"])
		return res.status(200).json({
			message: 'Get all article',
			data: article,
			totalArticle: countArticle
		})

	} catch (error) {
		next(error)
	}
}

// Get all article base on user login
export const getArticle = async (req, res) => {
	if (!req.user) return res.status(401).json({ message: 'Your not logged in' })
	const article = await Article.find({ user: req.user._id })
		.populate('tags', ['_id', 'name'])
		.populate('user', ['_id', 'username', 'firstname', 'lastname', 'email'])
	return res.status(200).json(article)
}

// Get one article
export const getOneArticle = async (req, res) => {
	try {
		const { _id } = req.params
		const article = await Article.findOne({ _id })
			.populate('tags', ['_id', 'name'])
			.populate('user', ['_id', 'username', 'firstname', 'lastname', 'email'])
		return res.status(200).json(article)
	} catch (error) {
		if (error?.messageFormat === undefined) {
			return res.status(404).json({ message: 'Article Not Found' })
		}
	}
}


// Update article base on user login
export const updateArticle = async (req, res, next) => {
	try {
		const { _id } = req.params
		let payload = req.body

		// Edit payload tags
		if (payload.tags && payload.tags.length > 0) {
			const tags = await Tag.find({ name: payload.tags })
			if (tags.length) {
				payload = { ...payload, tags: tags.map(tag => tag._id) }
			} else {
				delete payload.tags
			}
		}

		// Query update article
		await Article.findOneAndUpdate(_id, payload)
			.then(async (article) => {
				// Pull All
				await Tag.updateMany({ article: { $in: [article._id] } }, { $pull: { article: article._id } }, { useFindAndModify: false })
				// Push All
				await Tag.updateMany({ _id: { $in: payload.tags } }, { $push: { article: article._id } });

				// Get new article
				const newArticle = await Article.findOne(article._id)
				return res.status(200).json({
					message: "Success Update Article",
					data: newArticle
				})
			})

	} catch (error) {
		next(error)
	}

}


// Deleted article
export const destroyArticle = async (req, res, next) => {
	const { _id } = req.params
	let article = await Article.findById(_id)
	if (!article) return res.status(404).json({ message: 'Article Not Found' })
	if ((article.user).toString() !== req.user._id) return res.status(401).json({ message: 'Access Denied' })
	await Article.findByIdAndRemove(_id)
		.then(async (article) => {
			await Tag.updateMany({ article: { $in: [article._id] } }, { $pull: { article: article._id } }, { useFindAndModify: false })
			return res.status(200).json({ message: 'Success Delete Article' })
		})
}
