import { config } from '../app/config.js';
import User from '../app/user/model.js'
import jwt from 'jsonwebtoken'

export const verifyUser = async (req, res, next) => {
	if (!req.session.token) {
		return res.status(401).json({ msg: "Please login your account!" })
	}
	let user = await User.findOne({ token: { $in: [req.session.token] } })
	try {
		req.user = jwt.verify(req.session.token, config.secretKey)
	} catch (error) {
		user?.token.map((token) => {
			jwt.verify(token, config.secretKey, async (err, user) => {
				if (err?.message === 'jwt expired') {
					await User.findOneAndUpdate({ token: { $in: [token] } }, { $pull: { token: token } }, { useFindAndModify: false })
				}
			})
		})
	}
	next()
}