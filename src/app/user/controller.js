import User from './model.js'
import Profile from '../profile/model.js'
import fs from 'fs'

export const getAllUser = async (req, res, next) => {
	try {
		const user = await Profile.find().populate('user', ['-password', '-token', '-__v'])
		return res.status(200).json({ message: 'Get All', data: user })
	} catch (error) {
		return next(error)
	}
}

export const deleteUser = async (req, res, next) => {
	try {
		const { id } = req.params
		let user = await Profile.findById(id)
		if (!user) return next("User not found")
		await Profile.findByIdAndRemove(id)
			.then(async () => {
				const imagePath = `public/${user.profile_image}`
				if (fs.existsSync(imagePath)) {
					fs.unlinkSync(imagePath)
				}
				await User.findByIdAndDelete(user.user._id)
				return res.status(200).json({ message: "User Deleted" })
			})
	} catch (error) {
		return next(error)
	}
}