import User from "../app/user/userModel.js";
import jwt from 'jsonwebtoken'
import { config } from "../app/config.js";
import { getToken } from "../utils/getToken.js";

function decodeToken() {
	return async function (req, res, next) {
		try {
			const token = getToken(req)
			if (!token) return next()
			let user = await User.findOne({ token: { $in: [token] } })
			try {
				req.user = jwt.verify(token, config.secretKey)
			} catch (error) {
				user?.token.map((token) => {
					jwt.verify(token, config.secretKey, async (err, user) => {
						if (err?.message === 'jwt expired') {
							await User.findOneAndUpdate({ token: { $in: [token] } }, { $pull: { token: token } }, { useFindAndModify: false })
						}
					})
				})
			}

			if (!user) {
				res.status(401).json({
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
			next()
		}
		return next()
	}
}

export { decodeToken }