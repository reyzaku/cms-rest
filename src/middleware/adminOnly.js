import User from "../app/user/userModel.js"

const adminOnly = async (req, res, next) => {
	try {
		const user = await User.findById(req.user._id).select('-token -password')
		if (!user) return res.status(401).json({ message: 'Please login your account' })
		if (user.role !== 'admin') return res.status(401).json({ message: 'Access Denied' })
		next()
	} catch (error) {
		return next(res.status(401).json(error))
	}
}

export default adminOnly