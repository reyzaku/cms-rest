import Tag from "../tags/Tag.js";
import Article from "./articleModel.js";
import fs from 'fs'

export const createArticle = async (req, res, next) => {
	try {
		let payload = req.body

		// Edit payload user 
		payload = { ...payload, user: req.user._id }

		// Edit payload tags
		if (payload.tags && payload.tags.length > 0) {
			let tags = await Tag.find({ name: payload.tags })
			payload.tags.map(item => {
				tags.map((tag) => {
					if (tag.name !== item) {
						Tag.create({ name: item })
					}
				})
			})
			let newTag = await Tag.find({ name: payload.tags })
			payload = { ...payload, tags: newTag.map(tag => tag._id) }

		}

		console.log(payload);

		// Edit Payload image Name
		payload = { ...payload, cover_image: `images/cover_images/${req.file.filename}` }

		await Article.create(payload)
			.then(async (article) => {
				await Tag.updateMany({ _id: { $in: payload.tags } }, { $push: { article: article._id } });
				return res.status(200).json({
					message: "Success Create Article",
					data: article
				})
			})

	} catch (error) {
		return next(error)
	}
}

export const getArticle = async (req, res) => {
	const article = await Article.find({ user: req.user._id })
		.populate('tags', ['_id', 'name'])
		.populate('user', ['_id', 'username', 'firstname', 'lastname', 'email'])
	return res.status(200).json(article)
}

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

		// Edit Payload image Name
		payload = { ...payload, cover_image: `images/cover_images/${req.file.filename}` }

		await Article.findOneAndUpdate(_id, payload)
			.then(async (article) => {
				const folderPath = `public/${article.cover_image}`
				if (fs.existsSync(folderPath)) {
					fs.unlinkSync(folderPath)
				}
				// Pull All
				await Tag.updateMany({ article: { $in: [article._id] } }, { $pull: { article: article._id } }, { useFindAndModify: false })
				// Push All
				await Tag.updateMany({ _id: { $in: payload.tags } }, { $push: { article: article._id } });

				return res.status(200).json({
					message: "Success Update Article",
					data: article
				})
			})

	} catch (error) {
		next(error)
	}

}

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

export const destroyArticle = async (req, res, next) => {
	const { _id } = req.params
	let article = await Article.findById(_id)
	if (!article) return res.status(404).json({ message: 'Article Not Found' })
	if ((article.user).toString() !== req.user._id) return res.status(401).json({ message: 'Access Denied' })
	await Article.findByIdAndRemove(_id)
		.then(async (article) => {
			const folderPath = `public/${article.cover_image}`
			if (fs.existsSync(folderPath)) {
				fs.unlinkSync(folderPath)
			}
			await Tag.updateMany({ article: { $in: [article._id] } }, { $pull: { article: article._id } }, { useFindAndModify: false })
			return res.status(200).json({ message: 'Success Delete Article' })
		})
}
