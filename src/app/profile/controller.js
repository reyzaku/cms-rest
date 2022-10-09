import Profile from './model.js'

// Edit Profile By User login
export const editProfile = async (req, res, next) => {
	if(!req.user) return res.status(401).json({message: 'Please login your account!'})
	try {
		const payload = req.body
		if (req.file) {
			let profile = await Profile.findOne({ user: req.user._id })
			if (!profile) return next("User not found")
			await Profile.findOneAndUpdate({ user: req.user._id }, { ...payload, })
			profile = await Profile.findOne({ user: req.user._id })
			return res.status(200).json({ message: 'Edit Success', data: profile })
		} else {
			const profile = await Profile.findOneAndUpdate({ user: req.user._id }, payload, {
				new: true,
				runValidators: true
			}).populate('user', ['username'])
			return res.status(200).json({ message: 'Edit Success', data: profile })
		}
	} catch (err) {
		if (err && err.name === 'ValidaitonError') {
			return res.json({
				error: 1,
				message: err.message,
				fields: err.errors
			})
		}
		next(err)
	}
}

// Get profile by user login
export const getProfile = async (req, res, next) => {
	if(!req.user) return res.status(401).json({message: 'Token null, Please login again!'})
	const profile = await Profile.findOne({ user: req.user._id }).populate('user', ['username', 'email', 'firstname', 'lastname'])
	return res.status(200).json({ message: `Get Profile ${(req.user.username)}`, data: profile })
}