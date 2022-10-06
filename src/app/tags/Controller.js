import Tag from "./Tag.js";

export const createTag = async (req, res, next) => {
	try {
		const payload = req.body
		const tag = await Tag.create(payload)
		return res.status(200).json(tag)
	} catch (error) {
		next(error)
	}
}

export const getTag = async (req, res, next) => {
	try {
		const tag = await Tag.find().populate('article', ["_id"])
		return res.status(200).json(tag)
	} catch (error) {
		next(error.message)
	}
}

export const editTag = async (req, res, next) => {
	try {
		const { _id } = req.params
		let payload = req.body
		await Tag.findByIdAndUpdate(_id, payload)
		const tag = await Tag.findById(_id)
		return res.status(200).json({ message: 'Update Tag Sucessfull', data: tag })
	} catch (error) {
		console.log(error);
	}
}

export const deleteTag = async (req, res, next) => {
	try {
		const { _id } = req.params
		const tag = await Tag.findByIdAndDelete(_id)
		return res.status(200).json({ message: 'Delete Sucessfull', data: tag })
	} catch (error) {
		next(error)
	}
}