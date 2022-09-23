import User from "../app/user/userModel.js";
import jwt from 'jsonwebtoken'
import { config } from "../app/config.js";

function decodeToken() {
	return async function (req, res, next) {
		try {
			const token = req.session.token
			if (!token) return next()
			req.user = jwt.verify(token, config.secretKey)
			let user = await User.findOne({ token: { $in: [token] } })
			if (!user) {
				res.json({
					error: 3,
					message: 'Token expired, Please login your account '
				})
			}
		} catch (err) {
			if (err && err.name === 'JsonWebToken') {
				return res.json({
					error: 1,
					message: err.message
				})
			}
			next(err)
		}
		return next()
	}
}

export { decodeToken }