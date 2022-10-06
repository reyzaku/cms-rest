import User from "../app/user/userModel.js"

const adminOnly = async (req, res, next) => {
	try {
		if(!req.user) return res.status(401).json({message: "Access token not found, please login your account!"})
		const user = await User.findById(req.user._id).select('-token -password')
		if (user.role !== 'admin') return res.status(401).json({ message: 'Access Denied' })
		next()
	} catch (error) {
		return res.status(401).json(error)
	}
}

export default adminOnly