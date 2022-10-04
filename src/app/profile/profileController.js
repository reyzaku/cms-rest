import Profile from './profileModel.js'
import fs from 'fs'

export const editProfile = async (req, res, next) => {
	try {
		const payload = req.body
		if (req.file) {
			let profile = await Profile.findOne({ user: req.user._id })
			if (!profile) return next("User not found")
			const imagePath = `public/${profile.profile_image}`
			if (fs.existsSync(imagePath)) {
				fs.unlinkSync(imagePath)
			}
			await Profile.findOneAndUpdate({ user: req.user._id }, { ...payload, profile_image: `images/profile_images/${req.file.filename}` })
			profile = await Profile.findOne({ user: req.user._id })
			return res.status(200).json({ message: 'Edit Success', data: profile })
		} else {
			const profile = await Profile.findOneAndUpdate({ user: req.user._id }, payload, {
				new: true,
				runValidators: true
			}).populate('user', ['username'])
			return res.status(200).json({ message: 'Edit Success', data: profile })
		}
	} catch (error) {
		next(error)
	}
}

export const getProfile = async (req, res, next) => {
	if(!req.user) return res.status(401).json({message: 'Token null, Please login again!'})
	const profile = await Profile.findOne({ user: req.user._id }).populate('user', ['username', 'email', 'firstname', 'lastname'])
	return res.status(200).json({ message: `Get Profile ${(req.user.username)}`, data: profile })
}